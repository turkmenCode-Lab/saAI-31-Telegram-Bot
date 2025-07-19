import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export async function runDeepSeek(prompt: string) {
  const completion = await openai.chat.completions.create({
    model: "deepseek/deepseek-r1-0528:free",
    messages: [
      { role: "system", content: "You are a code assistant." },
      { role: "user", content: prompt },
    ],
    max_tokens: 1024,
  });

  console.log("DeepSeek result:", completion.choices[0].message.content);
  return completion.choices[0].message.content;
}

export async function runOpenRouterAI(prompt: string) {
  const completion = await openai.chat.completions.create({
    model: "meta-llama/llama-3-8b-instruct",
    messages: [{ role: "user", content: prompt }],
  });

  console.log("OpenRouterAI result:", completion.choices[0].message.content);
  return completion.choices[0].message.content;
}

export async function runKimiAI(prompt: string) {
  const completion = await openai.chat.completions.create({
    model: "moonshotai/kimi-k2:free",
    messages: [
      { role: "system", content: "You are a code assistant." },
      { role: "user", content: prompt },
    ],
    max_tokens: 1024,
  });

  console.log("KimiAI result:", completion.choices[0].message.content);
  return completion.choices[0].message.content;
}
