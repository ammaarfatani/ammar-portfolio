"use client";

import { ArrowUpRight, Command, CornerDownLeft } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/type";

const commands = {
  "/skills": { label: "Skills", title: "The build toolkit.", body: "JavaScript, TypeScript, React, Next.js, Node.js, Express, REST APIs, MongoDB, PostgreSQL, Git, GitHub, and Axios.", tags: ["Frontend", "Backend", "Data"] },
  "/projects": { label: "Projects", title: "Selected work is being prepared.", body: "Project case studies are structured to show the thinking, systems, and technology behind each verified build.", tags: ["Case studies", "Systems"] },
  "/automation": { label: "Automation", title: "Intelligent workflows.", body: "AI-powered applications and automation designed to make useful digital workflows more capable and focused.", tags: ["AI", "Workflows"] },
  "/fullstack": { label: "Full-stack", title: "From interface to infrastructure.", body: "Considered React and Next.js interfaces, connected through APIs, Node.js services, and application data layers.", tags: ["React", "Node.js", "APIs"] },
  "/contact": { label: "Contact", title: "Let’s make something useful.", body: "For a role, a product, or a new idea—Ammar is available at fataniammar188@gmail.com.", tags: ["Email", "LinkedIn"] },
} as const;

type CommandName = keyof typeof commands;
const initialPrompt = "> what_can_ammar_build?";

function useTyping(value: string) {
  const [typed, setTyped] = useState("");
  useEffect(() => {
    let index = 0;
    const timer = window.setInterval(() => { index += 1; setTyped(value.slice(0, index)); if (index >= value.length) window.clearInterval(timer); }, 18);
    return () => window.clearInterval(timer);
  }, [value]);
  return typed;
}

function TypingText({ value }: { value: string }) {
  return <>{useTyping(value)}</>;
}

export function AiBuilder() {
  const [active, setActive] = useState<CommandName>("/skills");
  const [input, setInput] = useState("");
  const [invalid, setInvalid] = useState(false);
  const response = commands[active];

  const runCommand = (command: CommandName) => { setActive(command); setInput(""); setInvalid(false); };
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); const command = input.trim().toLowerCase() as CommandName; if (command in commands) runCommand(command); else setInvalid(true); };

  return <section id="ai" className="ai-builder" aria-labelledby="ai-builder-title"><div className="ai-builder-header"><Eyebrow>AI Builder</Eyebrow><h2 id="ai-builder-title">I don&apos;t just use AI.<br />I build with it.</h2><p>Practical intelligence, designed into full-stack products and workflows.</p></div><div className="ai-terminal-wrap"><div className="ai-terminal" data-cursor-label="Explore"><div className="terminal-topbar"><span className="terminal-mark"><i /><i /><i /></span><span>ammar@workspace:~</span><span>interactive system / 01</span></div><div className="terminal-body"><p className="terminal-prompt"><TypingText value={initialPrompt} /><span className="terminal-caret" aria-hidden /></p><div className="terminal-response" role="status" aria-live="polite"><span className="terminal-command">{active}</span><h3><TypingText key={response.title} value={response.title} /><span className="terminal-caret" aria-hidden /></h3><p>{response.body}</p><ul>{response.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>{active === "/contact" && <a href="mailto:fataniammar188@gmail.com">Send a message <ArrowUpRight size={14} /></a>}</div><form className="terminal-input" onSubmit={submit}><label htmlFor="terminal-command"><span>›</span>Enter a command</label><input id="terminal-command" value={input} onChange={(event) => { setInput(event.target.value); setInvalid(false); }} placeholder="/skills" autoComplete="off" aria-describedby={invalid ? "terminal-error" : undefined} /><button type="submit" aria-label="Run command"><CornerDownLeft size={15} /></button>{invalid && <span id="terminal-error" className="terminal-error">Choose an available command below.</span>}</form></div><div className="terminal-command-list" aria-label="Available terminal commands">{(Object.keys(commands) as CommandName[]).map((command) => <button key={command} type="button" onClick={() => runCommand(command)} className={cn(active === command && "is-active")}><Command size={13} />{command}<span>{commands[command].label}</span></button>)}</div></div></div><div className="playground-transition" aria-hidden><span>Playground / Lab</span><i /><span>Next system loading</span></div></section>;
}
