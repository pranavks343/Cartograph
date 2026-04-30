<div align="center">
  <img src="./public/favicon.png" alt="RepoMind Logo" width="80" height="80" />
  <h1>RepoMind</h1>
  <p><strong>Transform your codebase into clarity with AI-powered intelligence.</strong></p>

  [![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
  [![Drizzle](https://img.shields.io/badge/Drizzle-ORM-C5F74F?style=for-the-badge)](https://orm.drizzle.team/)
  [![Pinecone](https://img.shields.io/badge/Pinecone-Vector_DB-27272a?style=for-the-badge)](https://www.pinecone.io/)
</div>

---

## 🚀 Overview

RepoMind is a sophisticated repository analysis platform designed to give developers and teams an instant, high-fidelity understanding of any codebase. By leveraging state-of-the-art Large Language Models (LLMs) and Vector Databases, RepoMind automates the process of architectural review, documentation generation, and health assessment.

Whether you're onboarding to a new project or maintaining a complex monorepo, RepoMind acts as your AI co-pilot, surfacing critical insights that usually take weeks to manually document.

## ✨ Key Features

- **🧠 Deep Codebase Intelligence**: Automatically extracts system architecture, key product features, and folder structures using Google Gemini & Puter AI.
- **🛡️ Codebase Health Analytics**: Get an instant "Health Score" based on maintainability, documentation quality, security posture, and structural integrity.
- **💬 Ask RepoMind (RAG)**: Chat directly with your codebase. Ask about implementation details, bug hunting, or refactoring strategies using high-performance vector search (Pinecone).
- **📂 Automated Doc-Gen**: Generates comprehensive views for:
  - **System Architecture**: High-level design patterns and data flows.
  - **API Explorer**: Automatic discovery of routes, methods, and descriptions.
  - **Component Library**: Deep dive into your frontend UI architecture.
  - **Dependency Mapping**: Visualize your tech stack and library versions.
- **📊 Interactive Dashboard**: Manage your entire repository portfolio with real-time analysis status and aggregate health metrics.
- **⚡ Background Pipeline**: Powered by **Inngest**, ensuring robust, asynchronous analysis that scales with your repository size.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Drizzle ORM](https://orm.drizzle.team/)
- **Vector DB**: [Pinecone](https://www.pinecone.io/) (for RAG context)
- **AI Models**: Google Gemini 2.0/2.5 via [Puter.ai](https://puter.com/)
- **Background Tasks**: [Inngest](https://www.inngest.com/)
- **Authentication**: [Better-Auth](https://better-auth.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)

## 🏁 Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL Database
- Pinecone API Key
- Puter Auth Token / Google Gemini API Key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Vivek-736/RepoMind.git
   cd repo-mind
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root and add your credentials:
   ```env
   DATABASE_URL=your_postgres_url
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   
   # AI Providers
   PUTER_AUTH_TOKEN=your_puter_token
   GEMINI_API_KEY=your_google_gemini_key
   
   # Vector DB
   PINECONE_API_KEY=your_pinecone_key
   
   # Github Auth
   GITHUB_CLIENT_ID=your_id
   GITHUB_CLIENT_SECRET=your_secret
   ```

4. **Database Migration**
   ```bash
   npx drizzle-kit push
   ```

5. **Start the Development Server**
   ```bash
   npm run dev
   ```

6. **Start Inngest Dev Server**
   ```bash
   npx inngest-cli@latest dev
   ```

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

<div align="center">
  <p>Built with ❤️ by Vivek</p>
</div>