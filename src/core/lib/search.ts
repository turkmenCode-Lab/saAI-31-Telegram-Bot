import * as fs from "fs/promises";
import * as path from "path";
import stringSimilarity from "string-similarity";

export type Entry = {
  id: number;
  category: string;
  tags: string[];
  text: string;
};

export default async function Search(words: string[]): Promise<Entry | null> {
  const filePath = path.join("D:", "Shit", "TS AI", "data", "knowledge.json");

  let jsonData: { data: Entry[] };
  try {
    const rawData = await fs.readFile(filePath, "utf8");
    jsonData = JSON.parse(rawData);
  } catch (err: any) {
    console.error("Error reading or parsing JSON:", err);
    return null;
  }

  const entries = jsonData.data;

  let bestMatch: { entry: Entry; score: number } | null = null;

  for (const entry of entries) {
    const searchableTokens = [
      ...entry.category.split(/\s+/).map((t) => t.toLowerCase()),
      ...entry.tags.map((t) => t.toLowerCase()),
      ...entry.text.split(/\s+/).map((t) => t.toLowerCase()),
      entry.text.toLowerCase(),
    ].filter((t) => t.length > 0);

    const inputTokens = words
      .flatMap((word) => {
        const lowerWord = word.toLowerCase();
        return lowerWord.includes(".") ? lowerWord.split(".") : [lowerWord];
      })
      .filter((t) => t.length > 0);

    const scores = inputTokens.map((token) => {
      const bestMatch = stringSimilarity.findBestMatch(
        token,
        searchableTokens
      ).bestMatch;
      return bestMatch.rating;
    });

    const tagMatches = entry.tags
      .map((t) => t.toLowerCase())
      .filter((t) => inputTokens.includes(t)).length;
    const categoryMatch = inputTokens.includes(entry.category.toLowerCase())
      ? 1
      : 0;
    const maxSimilarity = Math.max(...scores);

    const weightedScore =
      0.5 * maxSimilarity + 0.3 * tagMatches + 0.2 * categoryMatch;

    if (!bestMatch || weightedScore > bestMatch.score) {
      bestMatch = { entry, score: weightedScore };
    }
  }

  if (bestMatch && bestMatch.score > 0.1) {
    console.log("Best Match:", bestMatch.entry, "Score:", bestMatch.score);
    return bestMatch.entry;
  } else {
    console.log("No good match found. Best score:", bestMatch?.score || 0);
    return null;
  }
}
