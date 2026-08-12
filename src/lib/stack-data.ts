import type { LucideIcon } from "lucide-react";
import {
  Atom,
  Bot,
  Braces,
  Code2,
  Cpu,
  Database,
  FileCode2,
  FolderGit2,
  GitBranch,
  Globe2,
  Layers3,
  Network,
  Palette,
  Server,
  Sparkles,
  TerminalSquare,
  Workflow,
  Zap,
  Box,
  Flame,
  Terminal,
  Wand2
} from "lucide-react";

export type StackCategory = "Frontend" | "Backend" | "Database" | "Infrastructure" | "AI & Tools";

export type StackSkill = {
  id: string;
  name: string;
  category: StackCategory;
  description: string;
  icon: LucideIcon;
  bgClass: string;
  textClass: string;
  borderClass: string;
};

export const stackSkills: StackSkill[] = [
  // Frontend
  { id: "react", name: "React.js", category: "Frontend", description: "UI library for building reactive interfaces.", icon: Atom, bgClass: "bg-[#0e2a38]", textClass: "text-[#38bdf8]", borderClass: "border-[#0284c7]" },
  { id: "next", name: "Next.js", category: "Frontend", description: "Full-stack React framework for web production.", icon: Layers3, bgClass: "bg-[#18181b]", textClass: "text-white", borderClass: "border-[#52525b]" },
  { id: "typescript", name: "TypeScript", category: "Frontend", description: "Typed JavaScript for predictable code.", icon: FileCode2, bgClass: "bg-[#0c2a4a]", textClass: "text-[#60a5fa]", borderClass: "border-[#2563eb]" },
  { id: "javascript", name: "JavaScript", category: "Frontend", description: "Core web programming language.", icon: Braces, bgClass: "bg-[#423b08]", textClass: "text-[#facc15]", borderClass: "border-[#ca8a04]" },
  { id: "tailwind", name: "Tailwind CSS", category: "Frontend", description: "Utility-first design system engine.", icon: Zap, bgClass: "bg-[#042f2e]", textClass: "text-[#2dd4bf]", borderClass: "border-[#0d9488]" },
  { id: "framer", name: "Framer Motion", category: "Frontend", description: "Production-ready motion library.", icon: Sparkles, bgClass: "bg-[#3b0764]", textClass: "text-[#e879f9]", borderClass: "border-[#c084fc]" },
  { id: "html", name: "HTML5", category: "Frontend", description: "Semantic document structure.", icon: Code2, bgClass: "bg-[#431407]", textClass: "text-[#fb923c]", borderClass: "border-[#ea580c]" },
  { id: "css", name: "CSS3", category: "Frontend", description: "Modern responsive layout and styling.", icon: Palette, bgClass: "bg-[#1e1b4b]", textClass: "text-[#818cf8]", borderClass: "border-[#4f46e5]" },
  { id: "bootstrap", name: "Bootstrap", category: "Frontend", description: "Component toolkit foundation.", icon: Globe2, bgClass: "bg-[#2e1065]", textClass: "text-[#c084fc]", borderClass: "border-[#7c3aed]" },

  // Backend
  { id: "node", name: "Node.js", category: "Backend", description: "Scalable server-side JS runtime.", icon: Server, bgClass: "bg-[#052e16]", textClass: "text-[#4ade80]", borderClass: "border-[#16a34a]" },
  { id: "express", name: "Express.js", category: "Backend", description: "Minimalist Node.js API framework.", icon: Network, bgClass: "bg-[#27272a]", textClass: "text-[#e4e4e7]", borderClass: "border-[#71717a]" },
  { id: "rest", name: "REST APIs", category: "Backend", description: "Structured endpoint architecture.", icon: Workflow, bgClass: "bg-[#142e15]", textClass: "text-[#86efac]", borderClass: "border-[#22c55e]" },

  // Database
  { id: "mongodb", name: "MongoDB", category: "Database", description: "Document NoSQL database engine.", icon: Database, bgClass: "bg-[#022c22]", textClass: "text-[#34d399]", borderClass: "border-[#059669]" },
  { id: "postgres", name: "PostgreSQL", category: "Database", description: "Enterprise relational database.", icon: TerminalSquare, bgClass: "bg-[#172554]", textClass: "text-[#93c5fd]", borderClass: "border-[#3b82f6]" },
  { id: "firebase", name: "Firebase", category: "Database", description: "Realtime cloud database & auth.", icon: Flame, bgClass: "bg-[#451a03]", textClass: "text-[#fbbf24]", borderClass: "border-[#d97706]" },

  // Infrastructure / Tools
  { id: "docker", name: "Docker", category: "Infrastructure", description: "Containerized application packaging.", icon: Box, bgClass: "bg-[#0c4a6e]", textClass: "text-[#38bdf8]", borderClass: "border-[#0284c7]" },
  { id: "git", name: "Git", category: "Infrastructure", description: "Distributed version control.", icon: GitBranch, bgClass: "bg-[#451a03]", textClass: "text-[#f97316]", borderClass: "border-[#ea580c]" },
  { id: "github", name: "GitHub", category: "Infrastructure", description: "Code collaboration platform.", icon: FolderGit2, bgClass: "bg-[#18181b]", textClass: "text-white", borderClass: "border-[#71717a]" },

  // AI & Tools
  { id: "gemini", name: "Gemini AI", category: "AI & Tools", description: "Multimodal AI model integration.", icon: Bot, bgClass: "bg-[#2e1065]", textClass: "text-[#a78bfa]", borderClass: "border-[#8b5cf6]" },
  { id: "codex", name: "Codex", category: "AI & Tools", description: "AI code generation engine.", icon: Cpu, bgClass: "bg-[#142900]", textClass: "text-[#c8ff3d]", borderClass: "border-[#657d13]" },
  { id: "cursor", name: "Cursor IDE", category: "AI & Tools", description: "AI-native code environment.", icon: Terminal, bgClass: "bg-[#0f172a]", textClass: "text-[#94a3b8]", borderClass: "border-[#475569]" },
  { id: "antigravity", name: "Antigravity", category: "AI & Tools", description: "Agentic coding framework.", icon: Wand2, bgClass: "bg-[#1a3a00]", textClass: "text-[#c8ff3d]", borderClass: "border-[#657d13]" },
  { id: "n8n", name: "n8n Workflows", category: "AI & Tools", description: "Node-based workflow automation.", icon: Workflow, bgClass: "bg-[#4c0519]", textClass: "text-[#fb7185]", borderClass: "border-[#f43f5e]" },
];
