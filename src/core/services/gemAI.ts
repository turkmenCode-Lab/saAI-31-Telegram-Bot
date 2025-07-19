import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

export default async function runGemini(prompt: string) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error("GEMINI_API_KEY not found in environment variables.");
    console.error(
      'Please create a .env file with GEMINI_API_KEY="YOUR_API_KEY"'
    );
    return;
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    console.log(text);
  } catch (error) {
    console.error("Error interacting with Gemini API:", error);
  }
}
