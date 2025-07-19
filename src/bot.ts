import { Telegraf, Context, Markup } from "telegraf";
import * as dotenv from "dotenv";
import LocalSession from "telegraf-session-local";
import {
  sendStartMessage,
  sendAskResponse,
  sendSearchResponse,
  sendModelResponse,
  sendCancelResponse,
  sendHelpResponse,
  sendFAQResponse,
  sendLicenseResponse,
} from "./utils/botHandlers";
import Runner from "./core/index";
import lang from "./assets/lang";

dotenv.config();

interface CustomContext extends Context {
  session: {
    mode: string | null;
    lang: "tk" | "en";
    selectedModel: string | null;
  };
}

const userTimestamps = new Map<number, number>();

const rateLimit = async (ctx: CustomContext, next: () => Promise<void>) => {
  const userId = ctx.from?.id;
  if (!userId) {
    return ctx.reply("⚠️ User ID not found. Please try again.");
  }

  const now = Date.now();
  const lastInteraction = userTimestamps.get(userId) || 0;
  const cooldown = 3000;

  if (now - lastInteraction < cooldown) {
    const l = lang[ctx.session.lang || "tk"];
    return ctx.reply(
      `⏳ ${l.error} Please wait ${Math.ceil(
        (cooldown - (now - lastInteraction)) / 1000
      )} seconds before sending another request.`
    );
  }

  userTimestamps.set(userId, now);
  await next();
};

const bot = new Telegraf<CustomContext>(process.env.BOT_TOKEN as string);

bot.use(new LocalSession({ database: "sessions.json" }).middleware());
bot.use(rateLimit);

bot.start(async (ctx) => {
  ctx.session.mode = null;
  ctx.session.lang = "tk";
  ctx.session.selectedModel = "deepSeek";
  await sendStartMessage(ctx);
});

bot.command("start", async (ctx) => {
  ctx.session.mode = null;
  ctx.session.lang = "tk";
  ctx.session.selectedModel = "deepSeek";
  await sendStartMessage(ctx);
});

bot.command("lang", async (ctx) => {
  ctx.session.lang = ctx.session.lang === "tk" ? "en" : "tk";
  await ctx.reply(
    `🌐 Language switched to ${
      ctx.session.lang === "tk" ? "Türkmen" : "English"
    }! 😊`
  );
  await sendStartMessage(ctx);
});

bot.command("cancel", async (ctx) => {
  await sendCancelResponse(ctx);
});

bot.command("help", async (ctx) => {
  await sendHelpResponse(ctx);
});

bot.command("faq", async (ctx) => {
  await sendFAQResponse(ctx);
});

bot.command("license", async (ctx) => {
  await sendLicenseResponse(ctx);
});

bot.hears(/^🔄 Täzeden başlat|🔄 Restart$/, async (ctx) => {
  ctx.session.mode = null;
  ctx.session.lang = ctx.session.lang || "tk";
  ctx.session.selectedModel = ctx.session.selectedModel || "deepSeek";
  await sendStartMessage(ctx);
});

bot.hears(/^🔙 Ýatyrmak|🔙 Cancel$/, async (ctx) => {
  await sendCancelResponse(ctx);
});

bot.hears(/^🗒 Kömek|🗒 Help$/, async (ctx) => {
  await sendHelpResponse(ctx);
});

bot.hears(/^🎛 AI görnüşi çalyş|🎛 Change AI Model$/, async (ctx) => {
  await sendModelResponse(ctx);
});

bot.hears(/^💬 Sora|💬 Ask(?:\s+(.+))?$/, async (ctx) => {
  const userInput = ctx.match[1] || "";
  const l = lang[ctx.session.lang || "tk"];

  if (!userInput) {
    await sendAskResponse(ctx);
    return;
  }

  await ctx.replyWithChatAction("typing");
  try {
    const response = await Runner(userInput, ctx.session.selectedModel);
    ctx.session.mode = "ask";
    return ctx.reply(`✨ ${response} 😊`);
  } catch (err) {
    console.error("Runner error:", err);
    return ctx.reply(`❌ ${l.error} 😔`);
  }
});

bot.hears(/^🔍 Gözle|🔍 Search(?:\s+(.+))?$/, async (ctx) => {
  const userInput = ctx.match[1] || "";
  const l = lang[ctx.session.lang || "tk"];

  if (!userInput) {
    await sendSearchResponse(ctx);
    return;
  }

  await ctx.replyWithChatAction("typing");
  try {
    const response = await Runner(userInput, ctx.session.selectedModel);
    ctx.session.mode = "search";
    return ctx.reply(`🔎 ${response} 🎉`);
  } catch (err) {
    console.error("Runner error:", err);
    return ctx.reply(`❌ ${l.error} 😔`);
  }
});

bot.on("text", async (ctx) => {
  if (!ctx.session.mode) return;

  const userInput = ctx.message.text.trim();
  const l = lang[ctx.session.lang || "tk"];

  await ctx.replyWithChatAction("typing");
  try {
    const response = await Runner(userInput, ctx.session.selectedModel);
    return ctx.reply(
      ctx.session.mode === "ask" ? `✨ ${response} 😊` : `🔎 ${response} 🎉`
    );
  } catch (err) {
    console.error("Error in text handler:", err);
    return ctx.reply(`❌ ${l.error} 😔`);
  }
});

bot.action("ask", async (ctx) => sendAskResponse(ctx));
bot.action("search", async (ctx) => sendSearchResponse(ctx));
bot.action("restart", async (ctx) => {
  ctx.session.mode = null;
  ctx.session.lang = ctx.session.lang || "tk";
  ctx.session.selectedModel = ctx.session.selectedModel || "deepSeek";
  await sendStartMessage(ctx);
});

bot.action(/model_(.+)/, async (ctx) => {
  const model = ctx.match[1];
  ctx.session.selectedModel = model;
  ctx.session.mode = null;
  const l = lang[ctx.session.lang || "tk"];
  await ctx.reply(
    `🤖 ${l.model} ${l.models[model as keyof typeof l.models]} ✅`
  );
  await sendStartMessage(ctx);
});

bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
