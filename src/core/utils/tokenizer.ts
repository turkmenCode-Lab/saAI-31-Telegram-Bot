import natural from "natural";
import Lemmatizer from "../lib/lemmatizer";
import synonymController from "../lib/synonym";
import stopWords from "../lib/stopwords";
import Search, { Entry } from "../lib/search";
import Answer from "../lib/answer";
import runGemini from "../services/gemAI";
import {
  runDeepSeek,
  runOpenRouterAI,
  runKimiAI,
} from "../services/openRouter";

export default async function Tokenizer(
  string: string,
  model: string
): Promise<{
  answer: string;
  tokens?: string[];
  lemmatise?: string[];
  synonym?: string[];
  stopwords?: string[];
  search?: Entry | null;
}> {
  if (model === "gemini") {
    await runGemini(string);
    return { answer: "No response from Gemini" };
  } else if (model === "llama") {
    const result = await runOpenRouterAI(string);
    return { answer: result || "No response from Llama" };
  } else if (model === "deepSeek") {
    const result = await runDeepSeek(string);
    return { answer: result || "No response from DeepSeek" };
  } else if (model === "kimi") {
    const result = await runKimiAI(string);
    return { answer: result || "No response from Kimi" };
  } else {
    const tokens = new natural.WordTokenizer().tokenize(string);
    const lemmatise = tokens ? Lemmatizer(tokens) : [];
    const synonym = lemmatise ? synonymController(lemmatise) : [];
    const stopwords = synonym ? stopWords(synonym) : [];
    const mergedWords = Array.from(
      new Set([
        ...(stopwords ?? []),
        ...(synonym ?? []),
        ...(lemmatise ?? []),
        ...(tokens ?? []),
      ])
    );
    const search: Entry | null = mergedWords.length
      ? await Search(mergedWords)
      : null;
    const answer = search ? await Answer(search.text) : "";

    return {
      tokens: tokens || [],
      lemmatise,
      synonym,
      stopwords,
      search,
      answer,
    };
  }
}
