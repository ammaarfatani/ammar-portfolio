import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function CaseStudySection({ number, title, children, className }: { number: string; title: string; children: ReactNode; className?: string }) {
  return <section className={cn("case-study-section", className)}><div className="case-section-label"><span>{number}</span><span>{title}</span></div><div className="case-section-content">{children}</div></section>;
}
