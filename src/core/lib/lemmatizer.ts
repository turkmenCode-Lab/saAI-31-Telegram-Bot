import { suffixes, names } from "../assets/syntax";

export default function Lemmatizer(arr: string[]): string[] {
  return arr.map((word) => {
    if (names.includes(word)) {
      return word;
    }

    for (let suffix of suffixes) {
      if (word.endsWith(suffix)) {
        return word.slice(0, word.length - suffix.length);
      }
    }

    return word;
  });
}
