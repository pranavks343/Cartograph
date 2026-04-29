import "./globals.css";
import type { Metadata } from "next";
import { Roboto_Condensed } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  variable: "--font-roboto-condensed",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "RepoMind - Understand Any Codebase 10x Faster",
  icons: {
    icon: "/favicon.png"
  },
  description: "RepoMind analyzes your GitHub repository and generates intelligent documentation, architecture insights, and answers — in seconds. AI-powered codebase understanding for modern developers.",
  keywords: [
    "AI documentation",
    "codebase analysis",
    "GitHub repository",
    "code understanding",
    "developer tools",
    "architecture insights",
  ],
  authors: [{ name: "Vivek" }],
  creator: "Vivek",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "RepoMind — Understand Any Codebase 10x Faster",
    description: "AI-powered documentation and insights for your GitHub repositories. Understand any codebase in seconds.",
    siteName: "RepoMind",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en" 
      className={`${robotoCondensed.className} h-full antialiased`}
      suppressHydrationWarning 
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          defaultTheme="light"
          disableTransitionOnChange
          attribute="class"
          enableSystem
        >
          <Toaster />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}