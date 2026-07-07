import Groq from "groq-sdk";
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.GROQ_API_KEY) {
  console.warn("⚠️ Warning: GROQ_API_KEY is missing from environment variables.");
}

export const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});