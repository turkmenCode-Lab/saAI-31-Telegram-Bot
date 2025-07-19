import { greetings, farewells } from "../assets/syntax";

export default async function Answer(word: string): Promise<string> {
  const greet = greetings[Math.floor(Math.random() * greetings.length)];
  const bye = farewells[Math.floor(Math.random() * farewells.length)];
  return `${greet}\n${word}\n${bye}`;
}
