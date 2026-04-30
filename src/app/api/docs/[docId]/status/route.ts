import { db } from "@/lib/db";
import { documents } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { docId: string } }
) {
  const { docId } = await params;

  try {
    const doc = await db.query.documents.findFirst({
      where: eq(documents.id, docId),
      columns: {
        status: true,
      },
    });

    if (!doc) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }

    return NextResponse.json({ status: doc.status });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}