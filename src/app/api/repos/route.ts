import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { account } from "@/lib/schema";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { Octokit } from "octokit";
import { eq } from "drizzle-orm";

export async function GET() {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const userAccount = await db.query.account.findFirst({
        where: eq(account.userId, session.user.id),
    });

    if (!userAccount || !userAccount.accessToken) {
        return new NextResponse("No GitHub account connected", { status: 400 });
    }

    const octokit = new Octokit({
        auth: userAccount.accessToken,
    });

    try {
        const { data: repos, headers: githubHeaders } = await octokit.rest.repos.listForAuthenticatedUser({
            visibility: "all",
            affiliation: "owner,collaborator,organization_member",
            sort: "updated",
            per_page: 100,
        });

        const scopes = githubHeaders['x-oauth-scopes'] as string || "";
        const hasRepoScope = scopes.split(',').map(s => s.trim()).includes('repo');
        
        if (!hasRepoScope) {
            console.warn("GitHub token is missing 'repo' scope. Private repos will not be visible.");
        }

        const formattedRepos = repos.map(repo => ({
            id: repo.id,
            name: repo.name,
            full_name: repo.full_name,
            url: repo.html_url,
            owner: repo.owner.login,
            private: repo.private,
            has_repo_scope: hasRepoScope,
        }));

        return NextResponse.json(formattedRepos);
    } catch (error: any) {
        console.error("Error fetching repos:", error);
        
        if (error.status === 401) {
            return new NextResponse(
                "GitHub token expired or invalid. Please sign out and sign back in.", 
                { status: 401 }
            );
        }
        
        return new NextResponse(`Failed to fetch repositories: ${error.message}`, { status: 500 });
    }
}