import { pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
	id: text("id").primaryKey(),
	email: text("email").notNull().unique(),
	name: text("name").notNull(),
	emailVerified: boolean("emailVerified").notNull(),
	image: text("image"),
	createdAt: timestamp("createdAt").notNull(),
	updatedAt: timestamp("updatedAt").notNull(),
});

export const session = pgTable("session", {
	id: text("id").primaryKey(),
	expiresAt: timestamp("expiresAt").notNull(),
	token: text("token").notNull().unique(),
	createdAt: timestamp("createdAt").notNull(),
	updatedAt: timestamp("updatedAt").notNull(),
	ipAddress: text("ipAddress"),
	userAgent: text("userAgent"),
	userId: text("userId").notNull().references(() => user.id),
});

export const verification = pgTable("verification", {
	id: text("id").primaryKey(),
	identifier: text("identifier").notNull(),
	value: text("value").notNull(),
	expiresAt: timestamp("expiresAt").notNull(),
	createdAt: timestamp("createdAt"),
	updatedAt: timestamp("updatedAt"),
});

export const account = pgTable("account", {
	id: text("id").primaryKey(),
	providerId: text("providerId").notNull(),
	accountId: text("accountId").notNull(),
	userId: text("userId").notNull().references(() => user.id),
	accessToken: text("accessToken"),
	refreshToken: text("refreshToken"),
	idToken: text("idToken"),
	accessTokenExpiresAt: timestamp("accessTokenExpiresAt"),
	refreshTokenExpiresAt: timestamp("refreshTokenExpiresAt"),
	scope: text("scope"),
	password: text("password"),
	createdAt: timestamp("createdAt").notNull(),
	updatedAt: timestamp("updatedAt").notNull(),
});

export const documents = pgTable("documents", {
	id: text("id").primaryKey(),
	userId: text("userId").notNull().references(() => user.id),
	repoUrl: text("repoUrl").notNull(),
	repoName: text("repoName").notNull(),
	status: text("status").notNull(),
	overview: text("overview"),
	techStack: text("techStack"),
	architectureSummary: text("architectureSummary"),
	folderStructure: text("folderStructure"),
	importantFiles: text("importantFiles"),
	apiRoutes: text("apiRoutes"),
	components: text("components"),
	dependencies: text("dependencies"),
	codebaseHealth: text("codebaseHealth"),
	recentActivity: text("recentActivity"),
	keyFeatures: text("keyFeatures"),
	createdAt: timestamp("createdAt").notNull(),
	updatedAt: timestamp("updatedAt").notNull(),
});