import Tokenizer from "./utils/tokenizer";

export type Model = {
  openAISearch: boolean;
  prompt: string;
};

export type Entry = {
  text: string;
};

export default async function Runner(
  value: string,
  model: string | null
): Promise<string> {
  const result = await Tokenizer(value, model || "deepSeek");
  return result.answer || "No answer available";
}
