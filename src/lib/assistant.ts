import { education, experience } from "@/lib/profile-data";
import { additionalScreenshots, projects } from "@/lib/projects";
import { stackSkills } from "@/lib/stack-data";

export type ChatRole = "user" | "assistant";
export type ChatTurn = { role: ChatRole; content: string };

const ROUTES = {
  home: "/",
  work: "/work",
  about: "/#about",
  stack: "/#stack",
  ai: "/#ai",
  experience: "/#experience",
  contact: "/#contact",
} as const;

const CONTACT = {
  email: "fataniammar188@gmail.com",
  whatsappDisplay: "+92 336 2567192",
  whatsapp: "https://wa.me/923362567192",
  linkedin: "https://linkedin.com/in/ammar-afzal-fatani-b04970292",
  github: "https://github.com/ammaarfatani",
  location: "Karachi, Pakistan",
} as const;

const ABOUT_DO = [
  "Modern responsive websites, interactive interfaces and frontend experiences",
  "Full-stack applications with real functionality, APIs, authentication and databases",
  "Admin panels, dashboards, business tools, CRM-style systems and other practical digital products",
] as const;

const LEARNING = [
  { technology: "Docker", status: "Learning", detail: "Containerization, development environments and deployment workflows." },
  { technology: "TypeScript", status: "Building with", detail: "Improving type-safe application architecture and scalable code." },
  { technology: "Nest.js", status: "Exploring", detail: "Structured backend architecture and modern Node.js development." },
  { technology: "TypeORM", status: "Learning", detail: "Better database interaction and backend architecture." },
] as const;

const PROCESS = [
  "Discover — understand the problem, users and requirements",
  "Plan — turn requirements into structure and technical direction",
  "Build — translate the approved direction into production code",
  "Refine — polish experience, accessibility and production readiness",
] as const;

function projectPath(slug: string) {
  return `/projects/${slug}`;
}

function link(label: string, href: string) {
  return `[${label}](${href})`;
}

export function getPortfolioKnowledge() {
  const skillsByCategory = stackSkills.reduce<Record<string, string[]>>((acc, skill) => {
    acc[skill.category] ??= [];
    acc[skill.category].push(skill.name);
    return acc;
  }, {});

  return {
    name: "Ammar Afzal Fatani",
    shortName: "Ammar Fatani",
    title: "Full-Stack & AI Developer",
    location: CONTACT.location,
    availability: "Available for select / new projects",
    about: "Ammar is a developer who enjoys turning ideas into modern digital experiences, useful applications and well-crafted interfaces. He works across frontend and backend, and also builds AI-powered interactions into products.",
    publishedHero: {
      experience: "1–1.5 years",
      completedProjectsRange: "30–35+",
      clientsRange: "15–20+",
    },
    experience,
    education,
    skillsByCategory,
    skillNames: stackSkills.map((skill) => skill.name),
    cvSkills: [
      "JavaScript",
      "TypeScript",
      "React.js",
      "Next.js",
      "HTML",
      "CSS",
      "Tailwind CSS",
      "Bootstrap",
      "Node.js",
      "Express.js",
      "REST APIs",
      "MongoDB",
      "PostgreSQL",
      "Git",
      "GitHub",
      "Axios",
    ],
    learning: LEARNING,
    services: ABOUT_DO,
    process: PROCESS,
    routes: ROUTES,
    contact: CONTACT,
    projects: projects.map((project) => ({
      title: project.title,
      slug: project.slug,
      path: projectPath(project.slug),
      category: project.category,
      summary: project.shortDescription,
      role: project.role,
      technologies: project.technologies,
      features: project.features,
      challenge: project.caseStudy.challenge,
      approach: project.caseStudy.approach,
      result: project.caseStudy.result,
    })),
    additionalWorkTitles: additionalScreenshots.map((item) => `${item.title} (${item.category})`),
  };
}

export function buildKnowledgePrompt() {
  const k = getPortfolioKnowledge();
  const experienceLines = k.experience.map(
    (item) => `- ${item.organization} — ${item.role}${item.type ? ` (${item.type})` : ""} — ${item.period}`,
  );
  const educationLines = k.education.map(
    (item) => `- ${item.organization} — ${item.program}, ${item.qualification} — ${item.period}`,
  );
  const skillLines = Object.entries(k.skillsByCategory).map(
    ([category, names]) => `- ${category}: ${names.join(", ")}`,
  );
  const projectLines = k.projects.map(
    (project) =>
      `- ${project.title} [${project.path}]: ${project.summary} Tech: ${project.technologies.join(", ")}. Role: ${project.role.join(", ")}.`,
  );

  return `You are the personal portfolio assistant for ${k.name} (${k.title}).
Answer only from this knowledge. Never invent projects, clients, companies, skills, awards, or experience.
If something is not in this knowledge, say it is not available on the portfolio.
Keep answers concise, natural, and professional.
When the visitor asks about work, projects, case studies, or examples, include the internal Work page: ${link("View Ammar's work", k.routes.work)}.
For a specific project, include that project's case-study path.
For contact or hiring, include ${link("Contact Ammar", k.routes.contact)} plus public contact details.
Use markdown links. Internal routes must stay as relative paths (example: /work, /#contact).

Identity:
- Name: ${k.name}
- Title: ${k.title}
- Location: ${k.location}
- Availability: ${k.availability}
- About: ${k.about}
- Published on the homepage (do not present as exact audited metrics unless asked about the site): experience ${k.publishedHero.experience}; completed projects ${k.publishedHero.completedProjectsRange}; clients ${k.publishedHero.clientsRange}.

Experience:
${experienceLines.join("\n")}

Education:
${educationLines.join("\n")}

What Ammar builds:
${k.services.map((item) => `- ${item}`).join("\n")}

How Ammar builds:
${k.process.map((item) => `- ${item}`).join("\n")}

Skills on the portfolio:
${skillLines.join("\n")}
CV skill list also includes: ${k.cvSkills.join(", ")}.

Currently learning / exploring (not claimed as production expertise):
${k.learning.map((item) => `- ${item.technology} (${item.status}): ${item.detail}`).join("\n")}

Featured projects (case studies):
${projectLines.join("\n")}

Additional work shown as screenshots only (no dedicated case-study page): ${k.additionalWorkTitles.join(", ")}.

Public contact (share only these; never secrets, API keys, env vars, or private data):
- Email: ${k.contact.email}
- WhatsApp: ${k.contact.whatsappDisplay} (${k.contact.whatsapp})
- LinkedIn: ${k.contact.linkedin}
- GitHub: ${k.contact.github}

Portfolio routes:
- Home: ${k.routes.home}
- Work / projects archive: ${k.routes.work}
- About: ${k.routes.about}
- Skills / stack: ${k.routes.stack}
- Interactive AI system section: ${k.routes.ai}
- Experience: ${k.routes.experience}
- Contact / hire: ${k.routes.contact}`;
}

type Topic =
  | "about"
  | "role"
  | "skills"
  | "work"
  | "project"
  | "systems"
  | "experience"
  | "education"
  | "services"
  | "contact"
  | "social"
  | "process"
  | "availability"
  | "learning"
  | "location"
  | "unknown";

function normalize(text: string) {
  return text.toLowerCase().replace(/[’']/g, "'").trim();
}

function includesAny(text: string, terms: string[]) {
  return terms.some((term) => text.includes(term));
}

function lastUserTopic(history: ChatTurn[]): Topic | null {
  const previous = [...history].reverse().find((turn) => turn.role === "user");
  if (!previous) return null;
  return classify(previous.content, null).topic;
}

function classify(raw: string, previousTopic: Topic | null): { topic: Topic; projectSlug?: string } {
  const text = normalize(raw);
  const knowledge = getPortfolioKnowledge();
  const followUp = /^(and |also |what about |how about |tell me more|more|that|those|this one|yes|yeah)/.test(text) || text.length < 18;

  const askingSkills =
    includesAny(text, ["skill", "stack", "technolog", "tech stack", "work with", "uses", "use react", "next.js", "node.js", "mongodb", "typescript", "javascript"]) ||
    /\b(react|next\.?js|node\.?js)\b/.test(text);

  const askingRole = includesAny(text, [
    "frontend or",
    "full-stack or",
    "fullstack or",
    "frontend or full",
    "is ammar a frontend",
    "is ammar a full",
  ]);

  const matchedProject = knowledge.projects.find((project) => {
    const title = project.title.toLowerCase();
    const slug = project.slug.toLowerCase();
    if (text.includes(slug.replace(/-/g, " ")) || text.includes(slug) || text.includes(title)) return true;
    const distinctive = title
      .split(/[\s&/]+/)
      .filter((token) => token.length > 4 && !["application", "company", "international", "custom", "fitness", "retail", "inventory", "house"].includes(token));
    return distinctive.length > 0 && distinctive.every((token) => text.includes(token));
  });

  if (includesAny(text, ["github", "linkedin", "social"])) return { topic: "social" };
  if (includesAny(text, ["contact", "email", "whatsapp", "hire", "hiring", "reach", "get in touch", "let's work", "lets work", "i have a project"])) return { topic: "contact" };
  if (includesAny(text, ["available", "availability", "open for"])) return { topic: "availability" };
  if (includesAny(text, ["where is", "location", "karachi", "pakistan"])) return { topic: "location" };
  if (includesAny(text, ["education", "aptech", "diploma", "accp"])) return { topic: "education" };
  if (includesAny(text, ["experience", "intern", "aykays", "tech io", "career"])) return { topic: "experience" };
  if (includesAny(text, ["how does he build", "how ammar builds", "process", "approach", "how he works"])) return { topic: "process" };
  if (includesAny(text, ["currently learning", "learning now", "nest.js", "typeorm"])) return { topic: "learning" };
  if (matchedProject && (text.includes(matchedProject.title.toLowerCase()) || text.includes(matchedProject.slug))) {
    return { topic: "project", projectSlug: matchedProject.slug };
  }
  if (includesAny(text, ["crm", "erp", "pos", "admin panel", "dashboard", "inventory"])) return { topic: "systems" };
  if (askingRole) return { topic: "role" };
  if (askingSkills) return { topic: "skills" };
  if (includesAny(text, ["service", "offer", "what kind", "what does ammar do", "what do you do", "can ammar build", "what can ammar"])) return { topic: "services" };
  if (matchedProject) return { topic: "project", projectSlug: matchedProject.slug };
  if (includesAny(text, ["project", "case study", "portfolio", "examples", "show me", "see ammar", "his work", "my work", "the work"])) return { topic: "work" };
  if (/\bwork\b/.test(text) && !askingSkills) return { topic: "work" };
  if (includesAny(text, ["who is", "about ammar", "about you", "tell me about"])) return { topic: "about" };
  if (includesAny(text, ["frontend", "full-stack", "fullstack"])) return { topic: "role" };

  if (followUp && previousTopic && previousTopic !== "unknown") {
    return { topic: previousTopic };
  }

  return { topic: "unknown" };
}

function answerFor(topic: Topic, projectSlug?: string) {
  const k = getPortfolioKnowledge();
  const workLink = link("View Ammar's work", k.routes.work);
  const contactLink = link("Contact / hire Ammar", k.routes.contact);

  switch (topic) {
    case "about":
      return `${k.name} is a ${k.title} based in ${k.location}. ${k.about}

He currently lists ${k.publishedHero.experience} of experience on his portfolio, with selected work across websites, full-stack apps, and business systems.

You can read more here: ${link("About Ammar", k.routes.about)}`;
    case "role":
      return `Ammar is a ${k.title} — he is not only a frontend developer. He builds frontend interfaces and full-stack products (APIs, databases, admin systems), and also integrates AI into experiences.

See his stack: ${link("Technologies Ammar uses", k.routes.stack)}`;
    case "skills": {
      const lines = Object.entries(k.skillsByCategory).map(([category, names]) => `- **${category}:** ${names.join(", ")}`);
      return `Yes — Ammar works with React.js, Next.js, and Node.js, among other tools on his portfolio.

${lines.join("\n")}

His CV skill list also includes Axios.

Explore the interactive stack here: ${link("Ammar's technology stack", k.routes.stack)}`;
    }
    case "work": {
      const highlights = k.projects
        .slice(0, 6)
        .map((project) => `- **${project.title}** — ${project.summary} ${link("Case study", project.path)}`)
        .join("\n");
      return `Sure — you can view Ammar's projects and work here: ${workLink}

Selected case studies include:
${highlights}

There is also a homepage work section: ${link("Selected work", "/#work")}.`;
    }
    case "project": {
      const project = k.projects.find((item) => item.slug === projectSlug);
      if (!project) {
        return `I don't have a dedicated case study for that. You can browse Ammar's available work here: ${workLink}`;
      }
      return `**${project.title}** (${project.category})
${project.summary}

- **Role:** ${project.role.join(", ")}
- **Tech:** ${project.technologies.join(", ")}
- **Result:** ${project.result}

Open the case study: ${link(project.title, project.path)}
All work: ${workLink}`;
    }
    case "systems": {
      const restro = k.projects.find((item) => item.slug === "restro-erp");
      const retail = k.projects.find((item) => item.slug === "retail-pos");
      return `Yes. Ammar builds practical business systems — including CRM-style tools, admin panels, ERP/POS platforms, and dashboards.

Examples on the portfolio:
${restro ? `- **${restro.title}** — ${restro.summary} ${link("RESTRO ERP case study", restro.path)}` : ""}
${retail ? `- **${retail.title}** — ${retail.summary} ${link("Retail POS case study", retail.path)}` : ""}

See more systems and products: ${workLink}`;
    }
    case "experience": {
      const lines = k.experience.map((item) => `- **${item.organization}** — ${item.role}${item.type ? ` (${item.type})` : ""} — ${item.period}`);
      return `Verified experience on the portfolio:
${lines.join("\n")}

The homepage also notes ${k.publishedHero.experience} of experience.

Full timeline: ${link("Experience", k.routes.experience)}`;
    }
    case "education": {
      const lines = k.education.map((item) => `- **${item.organization}** — ${item.program}, ${item.qualification} (${item.period})`);
      return `Education on the portfolio:
${lines.join("\n")}

${link("Experience & education", k.routes.experience)}`;
    }
    case "services":
      return `Ammar offers custom web and product work, including:
${k.services.map((item) => `- ${item}`).join("\n")}

That covers websites, web apps, e-commerce, media platforms, and business systems such as CRM/ERP/POS tools when they fit the project.

If you want to hire him: ${contactLink}`;
    case "contact":
      return `You can hire or reach Ammar through the contact page: ${contactLink}

Public contact details:
- Email: ${k.contact.email}
- WhatsApp: ${k.contact.whatsappDisplay} (${link("Message on WhatsApp", k.contact.whatsapp)})
- LinkedIn: ${link("Ammar on LinkedIn", k.contact.linkedin)}

He is currently ${k.availability.toLowerCase()}.`;
    case "social":
      return `Public profiles:
- LinkedIn: ${link("Ammar on LinkedIn", k.contact.linkedin)}
- GitHub: ${link("Ammar on GitHub", k.contact.github)}

Contact page: ${contactLink}`;
    case "process":
      return `Ammar's build process on the portfolio:
${k.process.map((item) => `- ${item}`).join("\n")}

More about how he works: ${link("How Ammar builds", k.routes.home)} and ${link("About / approach", k.routes.about)}`;
    case "availability":
      return `Ammar is ${k.availability.toLowerCase()}.

Start here: ${contactLink}`;
    case "learning":
      return `Currently learning / exploring (from the About section):
${k.learning.map((item) => `- **${item.technology}** (${item.status}) — ${item.detail}`).join("\n")}

${link("About Ammar", k.routes.about)}`;
    case "location":
      return `Ammar is based in ${k.location}.`;
    default:
      return `I can help with Ammar's background, skills, projects, services, and how to contact him — using only what's on this portfolio.

If you want to see his work: ${workLink}
To hire him: ${contactLink}

If something isn't listed on the site, I'll tell you rather than guess.`;
  }
}

export function answerFromKnowledge(message: string, history: ChatTurn[] = []) {
  const previousTopic = lastUserTopic(history);
  const { topic, projectSlug } = classify(message, previousTopic);
  return answerFor(topic, projectSlug);
}

function geminiKey() {
  return process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GOOGLE_API_KEY || "";
}

async function answerWithGemini(message: string, history: ChatTurn[]) {
  const apiKey = geminiKey();
  if (!apiKey) return null;

  const contents = [...history.slice(-12), { role: "user" as const, content: message }].map((turn) => ({
    role: turn.role === "assistant" ? "model" : "user",
    parts: [{ text: turn.content }],
  }));

  const models = ["gemini-2.5-flash", "gemini-2.0-flash"];
  for (const model of models) {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: buildKnowledgePrompt() }] },
          contents,
          generationConfig: { temperature: 0.4, maxOutputTokens: 700 },
        }),
        signal: AbortSignal.timeout(20000),
      },
    );

    if (!response.ok) continue;
    const data = (await response.json()) as {
      candidates?: { content?: { parts?: { text?: string }[] } }[];
    };
    const text = data.candidates?.[0]?.content?.parts?.map((part) => part.text ?? "").join("").trim();
    if (text) return text;
  }

  return null;
}

export async function generateAssistantReply(message: string, history: ChatTurn[] = []) {
  try {
    const llmReply = await answerWithGemini(message, history);
    if (llmReply) return llmReply;
  } catch {
    // Fall back to the knowledge assistant so the chat still works without Gemini.
  }
  return answerFromKnowledge(message, history);
}
