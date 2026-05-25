import { GoogleGenerativeAI } from "@google/generative-ai";
import { Pinecone } from "@pinecone-database/pinecone";
import OpenAI from "openai";

const PUTER_AUTH_TOKEN = process.env.PUTER_AUTH_TOKEN;

let _genAI: GoogleGenerativeAI | null = null;
function getGenAI() {
  _genAI ??= new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  return _genAI;
}

let _puterClient: OpenAI | null = null;
function getPuterClient() {
  if (!PUTER_AUTH_TOKEN) return null;
  _puterClient ??= new OpenAI({
    baseURL: "https://api.puter.com/puterai/openai/v1/",
    apiKey: PUTER_AUTH_TOKEN,
  });
  return _puterClient;
}

let _pinecone: Pinecone | null = null;
export function getPinecone() {
  _pinecone ??= new Pinecone({
    apiKey: process.env.PINECONE_DB_API_KEY!,
  });
  return _pinecone;
}
async function puterChat(prompt: string): Promise<string> {
  const client = getPuterClient();
  if (!client) throw new Error("PUTER_AUTH_TOKEN not set.");

  const response = await client.chat.completions.create({
    model: "gemini-2.5-flash-lite",
    messages: [{ role: "user", content: prompt }],
  });

  const text = response.choices[0]?.message?.content;
  if (!text?.trim()) throw new Error("Puter returned empty response.");
  return text.trim();
}

export const getEmbedding = async (text: string) => {
  if (!text || text.trim().length === 0) return null;

  const model = getGenAI().getGenerativeModel({ model: "gemini-embedding-001" });

  try {
    const result = await model.embedContent({
      content: { parts: [{ text: text.trim() }], role: "user" },
      outputDimensionality: 1536,
    } as any);
    return result.embedding.values;
  } catch (error) {
    console.error("Embedding generation failed:", error);
    throw error;
  }
};

export const getSummary = async (code: string, fileName: string) => {
  const prompt = `Summarize the following code file: ${fileName}. Provide a concise explanation of its purpose, main functions, and components.
  
  Code:
  ${code}`;

  if (getPuterClient()) {
    try {
      return await puterChat(prompt);
    } catch (error) {
      console.warn("[getSummary] Puter AI failed, falling back to Google AI:", error);
    }
  }

  const model = getGenAI().getGenerativeModel({ model: "gemini-2.5-flash" });
  const result = await model.generateContent(prompt);
  return result.response.text();
};

export const getCodebaseInsights = async (
  files: { path: string; content: string }[]
) => {
  const context = files
    .map((f) => `File: ${f.path}\nContent Snippet: ${f.content.slice(0, 1000)}`)
    .join("\n\n");

  const prompt = `You are a world-class software architect. Based on the following file snippets from a repository, provide a structured analysis in JSON format.
  
  Required JSON structure:
  {
    "overview": "General description",
    "techStack": ["React", "Next.js", ...],
    "architectureSummary": "High-level design",
    "folderStructure": [{"path": "app/", "description": "Core application routes"}, ...],
    "keyFeatures": ["Feature 1", "Feature 2", ...],
    "importantFiles": [{"path": "...", "reason": "..."}],
    "apiRoutes": [{"path": "...", "method": "GET/POST", "description": "..."}],
    "components": [{"name": "...", "description": "..."}],
    "dependencies": [{"name": "...", "type": "Frontend/Backend/...", "version": "..."}],
    "codebaseHealth": {
      "maintainability": 0-100,
      "documentation": 0-100,
      "security": 0-100,
      "structure": 0-100,
      "testCoverage": 0-100,
      "overall": 0-100,
      "status": "Good/Fair/Poor"
    },
    "recentActivity": [{"text": "...", "time": "..."}]
  }

  Respond ONLY with the raw JSON object. No markdown fences, no explanation.

  Files:
  ${context}`;

  if (getPuterClient()) {
    try {
      const text = await puterChat(prompt);
      const jsonStr = text.replace(/```json\n?|\n?```/g, "").trim();
      return JSON.parse(jsonStr);
    } catch (error) {
      console.warn("[getCodebaseInsights] Puter AI failed, falling back to Google AI:", error);
    }
  }

  const model = getGenAI().getGenerativeModel({ model: "gemini-2.5-flash" });
  const result = await model.generateContent(prompt);
  const text = result.response.text();
  const jsonStr = text.replace(/```json\n?|\n?```/g, "").trim();
  
  return JSON.parse(jsonStr);
};

export const upsertToPinecone = async (vectors: any[]) => {
  const index = getPinecone().index({ name: process.env.PINECONE_INDEX_NAME! });
  await index.upsert({ records: vectors });
};