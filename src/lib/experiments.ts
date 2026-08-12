export type Experiment = {
  slug: string;
  title: string;
  category: string;
  description: string;
  image?: string;
  interactiveUrl?: string;
  status?: string;
  tech?: string[];
};

export const experiments: Experiment[] = [
  {
    slug: "ai-agent-workflow",
    title: "Autonomous AI Agent Workflow",
    category: "AI & SYSTEM ARCHITECTURE",
    description: "Exploration into multi-agent task orchestration, real-time streaming state machines, and n8n webhook triggers.",
    status: "ACTIVE EXPERIMENT",
    tech: ["Next.js", "AI Agent", "n8n", "WebSockets"],
  },
  {
    slug: "webgl-shaders",
    title: "Interactive WebGL Shaders",
    category: "CREATIVE CODING & 3D",
    description: "Custom Fragment Shaders, torus knot deformations, and particle physics rendered with Three.js.",
    status: "PROTOTYPE",
    tech: ["Three.js", "GLSL", "React Three Fiber"],
  },
  {
    slug: "realtime-audio-canvas",
    title: "Real-time Audio Visualizer",
    category: "EXPERIMENTAL UI",
    description: "Frequency domain audio analysis and dynamic canvas rendering for reactive user interfaces.",
    status: "EXPLORATORY",
    tech: ["Web Audio API", "HTML5 Canvas", "Framer Motion"],
  },
];

export function getExperiment(slug: string) {
  return experiments.find((experiment) => experiment.slug === slug);
}
