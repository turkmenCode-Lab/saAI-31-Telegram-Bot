import { synonyms } from "../assets/syntax";
import stringSimilarity from "string-similarity";

export default function synonymController(lemmatise: string[]) {
  return lemmatise.map((word) => {
    for (let synonymGroup of synonyms) {
      if (synonymGroup.includes(word)) {
        stringSimilarity.findBestMatch(word, synonymGroup);
      }
    }
    return word;
  });
}
