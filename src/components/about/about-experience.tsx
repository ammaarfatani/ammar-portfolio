"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef, useState } from "react";
import { Eyebrow } from "@/components/ui/type";

import { AboutInteractivePhoto } from "@/components/about/about-interactive-photo";

const learning = [
  ["Docker", "Learning", "Containerization, development environments and deployment workflows."],
  ["TypeScript", "Building with", "Improving type-safe application architecture and scalable code."],
  ["Nest.js", "Exploring", "Structured backend architecture and modern Node.js development."],
  ["TypeORM", "Learning", "Better database interaction and backend architecture."],
] as const;

export function AboutExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [focus, setFocus] = useState("identity");
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const reveal = { initial: { opacity: 0, y: reduceMotion ? 0 : 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.25 }, transition: { duration: reduceMotion ? 0.01 : 0.55, ease: [0.16, 1, 0.3, 1] as const } };

  return <section id="about" ref={sectionRef} className="about-profile" aria-labelledby="about-title"><div className="about-profile-grid" aria-hidden /><div className="about-profile-inner"><aside className="about-profile-visual" aria-label="Interactive developer profile photo"><AboutInteractivePhoto focus={focus} /></aside><div className="about-profile-content">
    <motion.header className="about-profile-intro" {...reveal}><Eyebrow>About / 01</Eyebrow><h2 id="about-title">Who I <span className="text-accent">am</span> <span>?</span></h2><p className="about-profile-lede">Hi, <span>I&apos;m Ammar — a developer</span> who enjoys turning ideas into modern digital experiences, useful applications and well-crafted interfaces.</p><p>I enjoy working across the frontend and backend, experimenting with new technologies and turning concepts into products that are not only functional, but also feel good to use.</p></motion.header>
    <motion.section className="about-profile-section about-profile-do" {...reveal}><Eyebrow>What I do / 02</Eyebrow><h3>I build digital <span className="text-accent">products.</span></h3><div className="about-do-list">{[["01", "Web experiences", "Modern responsive websites, interactive interfaces and frontend experiences."], ["02", "Applications", "Full-stack applications with real functionality, APIs, authentication and databases."], ["03", "Digital systems", "Admin panels, dashboards, business tools, CRM-style systems and other practical digital products."]].map(([number, title, copy]) => <button key={title} type="button" onPointerEnter={() => setFocus(title)} onFocus={() => setFocus(title)}><span>{number}</span><strong>{title}</strong><p>{copy}</p><i>System focus</i></button>)}</div></motion.section>
    <motion.section className="about-profile-section about-profile-learning" {...reveal}><Eyebrow>Currently learning / 03</Eyebrow><h3>Always building.<br />Always <span>learning.</span></h3><div className="about-learning-modules">{learning.map(([technology, status, copy], index) => <button key={technology} type="button" onPointerEnter={() => setFocus(technology)} onFocus={() => setFocus(technology)}><span>{String(index + 1).padStart(2, "0")}</span><div><small>{status}</small><strong>{technology}</strong><p>{copy}</p></div></button>)}</div></motion.section>
    <motion.section className="about-profile-section about-profile-approach" {...reveal}><Eyebrow>My approach / 04</Eyebrow><h3>I like to understand <span>before I build.</span></h3><div className="about-approach-flow">{[["01", "Understand", "Understand the problem, users and requirements."], ["02", "Build", "Turn the idea into a functional and scalable product."], ["03", "Refine", "Improve the interface, interactions, performance and details."]].map(([number, title, copy], index) => <article key={title}><span>{number}</span><i aria-hidden>{index < 2 ? "→" : "✓"}</i><strong>{title}</strong><p>{copy}</p></article>)}</div></motion.section>
    <motion.section className="about-profile-section about-profile-interests" {...reveal}><Eyebrow>Exploring / 05</Eyebrow><h3>Things that keep me <span>curious.</span></h3><div>{["Interactive web", "3D experiences", "UI / UX", "Full-stack development", "Product building", "New technologies"].map((interest) => <button key={interest} type="button" onPointerEnter={() => setFocus(interest)} onFocus={() => setFocus(interest)}>{interest}</button>)}</div></motion.section>
    <motion.section className="about-profile-section about-profile-beyond" {...reveal}><Eyebrow>Beyond the code / 06</Eyebrow><h3>There&apos;s more to building than <span>code.</span></h3><ul><li>I enjoy experimenting with new ideas.</li><li>I like learning by actually building things.</li><li>I care about interfaces as much as functionality.</li><li>I&apos;m constantly curious about how technology can solve real problems.</li></ul></motion.section>
    <motion.section className="about-profile-status" {...reveal}><Eyebrow>Current state / 07</Eyebrow><h3>Currently building.<br />Currently learning.<br /><span>Currently exploring.</span></h3><p>Building better digital products while continuously expanding my understanding of modern web technologies.</p><small><i />Always exploring</small><Link href="/work" data-cursor-label="Explore">Explore my work <ArrowRight size={16} /></Link></motion.section>
  </div></div></section>;
}
