import { Markup, Context } from "telegraf";
import lang from "../assets/lang";

interface CustomContext extends Context {
  session: {
    mode: string | null;
    lang: "tk" | "en";
    selectedModel: string | null;
  };
}

export async function sendStartMessage(ctx: CustomContext) {
  const l = lang[ctx.session.lang || "tk"];

  await ctx.reply(
    `🎉 ${l.start} 😊`,
    Markup.keyboard([
      [
        l.buttons.search,
        l.buttons.ask,
        l.buttons.changeModel,
        l.buttons.restart,
      ],

      [l.buttons.help, l.buttons.faq, l.buttons.cancel],
    ]).resize()
  );

  await ctx.reply(
    `⚡️ ${l.choose} 🚀`,
    Markup.inlineKeyboard([
      [
        Markup.button.callback(l.buttons.search, "search"),
        Markup.button.callback(l.buttons.ask, "ask"),
      ],
    ])
  );
}

export async function sendAskResponse(ctx: CustomContext) {
  const l = lang[ctx.session.lang || "tk"];
  ctx.session.mode = "ask";
  return ctx.reply(`${l.buttons.ask} - ${l.choose} ✨`);
}

export async function sendSearchResponse(ctx: CustomContext) {
  const l = lang[ctx.session.lang || "tk"];
  ctx.session.mode = "search";
  return ctx.reply(`${l.buttons.search} - ${l.choose} ✨`);
}

export async function sendModelResponse(ctx: CustomContext) {
  const l = lang[ctx.session.lang || "tk"];
  await ctx.reply(
    `🎛 ${l.model} 🤖`,
    Markup.inlineKeyboard([
      [
        Markup.button.callback(l.models.gem, "model_gem"),
        Markup.button.callback(l.models.llama, "model_llama"),
      ],
      [
        Markup.button.callback(l.models.deepSeek, "model_deepSeek"),
        Markup.button.callback(l.models.kimi, "model_kimi"),
      ],
      [Markup.button.callback(l.models.saai31, "model_saai31")],
    ])
  );
}

export async function sendCancelResponse(ctx: CustomContext) {
  const l = lang[ctx.session.lang || "tk"];
  ctx.session.mode = null;
  return ctx.reply(`🔙 ${l.cancel} ✅`);
}

export async function sendHelpResponse(ctx: CustomContext) {
  const l = lang[ctx.session.lang || "tk"];
  return ctx.reply(`🗒 ${l.help} ℹ️`);
}

export async function sendFAQResponse(ctx: CustomContext) {
  const l = lang[ctx.session.lang || "tk"];
  return ctx.reply(`📞 ${l.faq} ❓`);
}

export async function sendLicenseResponse(ctx: CustomContext) {
  const l = lang[ctx.session.lang || "tk"];
  return ctx.reply(`📜 ${l.license} ⚖️`);
}
