import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getEmbedding } from "@/lib/ai";
import { Pinecone } from "@pinecone-database/pinecone";
import OpenAI from "openai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const PUTER_AUTH_TOKEN = process.env.PUTER_AUTH_TOKEN;

const puterClient = PUTER_AUTH_TOKEN
  ? new OpenAI({
      baseURL: "https://api.puter.com/puterai/openai/v1/",
      apiKey: PUTER_AUTH_TOKEN,
    })
  : null;

const pc = new Pinecone({
  apiKey: process.env.PINECONE_DB_API_KEY!,
});

async function puterChat(prompt: string): Promise<string> {
  if (!puterClient) throw new Error("PUTER_AUTH_TOKEN not set.");

  const response = await puterClient.chat.completions.create({
    model: "gemini-2.5-flash-lite",
    messages: [{ role: "user", content: prompt }],
  });

  const text = response.choices[0]?.message?.content;
  if (!text?.trim()) throw new Error("Puter returned empty response.");
  return text.trim();
}

export async function POST(req: Request) {
  try {
    const { message, docId } = await req.json();

    const embedding = await getEmbedding(message);
    if (!embedding) {
      return NextResponse.json({
        response:
          "I couldn't process your message. Please try asking something specific about the codebase.",
      });
    }

    const index = pc.index(process.env.PINECONE_INDEX_NAME!);
    const queryResponse = await index.query({
      vector: embedding,
      topK: 5,
      filter: { docId: { $eq: docId } },
      includeMetadata: true,
    });

    const context = queryResponse.matches
      .map(
        (match: any) =>
          `File: ${match.metadata.filePath}\nSummary: ${match.metadata.summary}`
      )
      .join("\n\n");

    const prompt = `You are RepoMind AI, an expert software assistant. Use the provided repository context to answer the user's question accurately.
    
    Context:
    ${context}
    
    User Question:
    ${message}`;

    if (puterClient) {
      try {
        const text = await puterChat(prompt);
        return NextResponse.json({ response: text });
      } catch (error) {
        console.warn("[chat/route] Puter AI failed, falling back to Google AI:", error);
      }
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    
    return NextResponse.json({ response: result.response.text() });
  } catch (error) {
    console.error("Chat Error:", error);
    return NextResponse.json({ error: "Failed to process message" }, { status: 500 });
  }
}