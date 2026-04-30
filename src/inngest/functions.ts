import { inngest } from "./client";
import { db } from "@/lib/db";
import { documents, account } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { Octokit } from "octokit";
import { 
  getEmbedding, 
  getSummary, 
  getCodebaseInsights, 
  upsertToPinecone 
} from "@/lib/ai";
import { nanoid } from "nanoid";

const IGNORED_PATHS = [
  "node_modules", ".git", "package-lock.json", "yarn.lock", "bun.lockb",
  "dist", "build", ".next", "out", "public", "assets", "images",
  ".png", ".jpg", ".jpeg", ".gif", ".svg", ".ico", ".pdf", ".zip"
];

function shouldIgnore(path: string) {
  return IGNORED_PATHS.some(ignored => path.includes(ignored));
}

export const analyzeRepository = inngest.createFunction(
  { 
    id: "analyze-repository",
    triggers: [{ event: "repo/analyze" }] 
  },
  async ({ event, step }) => {
    const { docId, userId, repoUrl } = event.data;

    const userAccount = await step.run("get-github-token", async () => {
      const results = await db.select().from(account).where(eq(account.userId, userId));
      const githubAccount = results.find(a => a.providerId === "github");
      if (!githubAccount) throw new Error("GitHub account not found");
      return githubAccount;
    });

    const octokit = new Octokit({ auth: userAccount.accessToken });
    
    const [owner, repo] = repoUrl.replace("https://github.com/", "").split("/");

    const fileTree = await step.run("fetch-file-tree", async () => {
      const { data } = await octokit.rest.git.getTree({
        owner,
        repo,
        tree_sha: "main",
        recursive: "true",
      });
      return data.tree.filter(item => item.type === "blob" && !shouldIgnore(item.path!));
    });

    const sourceFiles = await step.run("fetch-source-files", async () => {
      const processedFiles = [];
      for (const item of fileTree.slice(0, 50)) {
        try {
          const { data }: any = await octokit.rest.repos.getContent({
            owner,
            repo,
            path: item.path!,
          });
          const content = Buffer.from(data.content, "base64").toString("utf-8");
          processedFiles.push({ path: item.path!, content });
        } catch (e) {
          console.error(`Failed to fetch ${item.path}`, e);
        }
      }
      return processedFiles;
    });

    await step.run("process-chunks", async () => {
      const vectors = [];
      for (const file of sourceFiles) {
        const summary = await getSummary(file.content, file.path);
        const embedding = await getEmbedding(summary);
        
        if (embedding) {
          vectors.push({
            id: nanoid(),
            values: embedding,
            metadata: {
              docId,
              repoName: repo,
              filePath: file.path,
              language: file.path.split('.').pop() || "unknown",
              summary,
              chunkType: "file",
              startLine: 1,
              endLine: file.content.split('\n').length,
            }
          });
        }
      }
      if (vectors.length > 0) {
        await upsertToPinecone(vectors);
      }
    });

    const insights = await step.run("generate-insights", async () => {
      return await getCodebaseInsights(sourceFiles);
    });

    await step.run("update-document", async () => {
      await db.update(documents).set({
        status: "COMPLETED",
        overview: insights.overview,
        techStack: JSON.stringify(insights.techStack),
        architectureSummary: insights.architectureSummary,
        folderStructure: insights.folderStructure,
        importantFiles: JSON.stringify(insights.importantFiles),
        apiRoutes: JSON.stringify(insights.apiRoutes),
        components: JSON.stringify(insights.components),
        dependencies: JSON.stringify(insights.dependencies),
        codebaseHealth: JSON.stringify(insights.codebaseHealth),
        recentActivity: JSON.stringify(insights.recentActivity),
        updatedAt: new Date(),
      }).where(eq(documents.id, docId));
    });

    return { status: "success", docId };
  }
);