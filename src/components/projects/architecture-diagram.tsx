"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ArchitectureNode } from "@/lib/projects";

export function ArchitectureDiagram({ nodes }: { nodes: ArchitectureNode[] }) {
  const reduceMotion = useReducedMotion();
  return <div className="architecture-diagram" role="list" aria-label="Project architecture">{nodes.map((node, index) => <div className="architecture-step" key={`${node.label}-${index}`} role="listitem"><motion.div className="architecture-node" initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: reduceMotion ? 0.01 : 0.45, delay: index * 0.08 }}><span>{String(index + 1).padStart(2, "0")}</span><strong>{node.label}</strong>{node.detail && <p>{node.detail}</p>}</motion.div>{index < nodes.length - 1 && <motion.div className="architecture-link" initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: reduceMotion ? 0.01 : 0.35, delay: index * 0.08 + 0.2 }} aria-hidden />}</div>)}</div>;
}
