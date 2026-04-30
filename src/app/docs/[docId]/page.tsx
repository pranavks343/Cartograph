import { db } from "@/lib/db";
import { documents } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { DocView } from "./doc-view";
import { ProcessingView } from "./processing-view";

export default async function Page({ params }: { params: { docId: string } }) {
  const { docId } = await params;
  
  const doc = await db.query.documents.findFirst({
    where: eq(documents.id, docId),
  });

  if (!doc) notFound();

  if (doc.status === "PROCESSING") {
    return <ProcessingView docId={docId} />;
  }

  return <DocView doc={doc} />;
}