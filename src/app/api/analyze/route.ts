import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { documents } from "@/lib/schema";
import { inngest } from "@/inngest/client";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function POST(req: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { repoUrl } = await req.json();
  if (!repoUrl) {
    return NextResponse.json({ error: "Repo URL is required" }, { status: 400 });
  }

  const repoName = repoUrl.split("/").pop() || "unknown-repo";
  const docId = nanoid();

  await db.insert(documents).values({
    id: docId,
    userId: session.user.id,
    repoUrl,
    repoName,
    status: "PROCESSING",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await inngest.send({
    name: "repo/analyze",
    data: {
      docId,
      userId: session.user.id,
      repoUrl,
    },
  });

  return NextResponse.json({ docId });
}