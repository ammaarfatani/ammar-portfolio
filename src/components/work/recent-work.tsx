"use client";

import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { Eyebrow } from "@/components/ui/type";
import { projects, additionalScreenshots } from "@/lib/projects";

// Generate a unified list of screenshot items
const screenshotItems = [
  ...projects.flatMap((p) =>
    p.screenshots.map((src, idx) => ({
      id: `${p.id}-shot-${idx}`,
      src,
      title: p.title,
      category: p.category,
      slug: p.slug
    }))
  ),
  ...additionalScreenshots.map((s, idx) => ({
    id: `additional-${idx}`,
    src: s.src,
    title: s.title,
    category: s.category,
    slug: null
  }))
];

export function RecentWork() {
  const reduceMotion = useReducedMotion();
  const [pausedRow, setPausedRow] = useState<number | null>(null);

  // Split items into 3 rows
  const row1 = screenshotItems.slice(0, Math.ceil(screenshotItems.length / 3));
  const row2 = screenshotItems.slice(Math.ceil(screenshotItems.length / 3), Math.ceil(screenshotItems.length / 3) * 2);
  const row3 = screenshotItems.slice(Math.ceil(screenshotItems.length / 3) * 2);

  const rows = [row1, row2, row3];

  return (
    <section id="work" className="recent-work" aria-labelledby="recent-work-title">
      <div className="recent-work-header">
        <Eyebrow>Selected Work</Eyebrow>
        <h2 id="recent-work-title">Recent <span className="text-accent">Works</span></h2>
        <p>A selection of digital products, systems and experiences I&apos;ve built.</p>
      </div>
      {screenshotItems.length > 0 && <div className="recent-work-marquee" aria-label="Recent projects">
        {rows.map((row, index) => {
          if (row.length === 0) return null;
          // Duplicate items to ensure smooth infinite scroll
          const loop = [...row, ...row, ...row, ...row];
          return <div key={index} className="recent-work-row" onPointerEnter={() => setPausedRow(index)} onPointerLeave={() => setPausedRow(null)}>
            <div className={`recent-work-track ${index % 2 ? "is-reversed" : ""} ${reduceMotion || pausedRow === index ? "is-paused" : ""}`}>
              {loop.map((item, cardIndex) => {
                const CardWrapper = item.slug ? Link : "div";
                const wrapperProps = item.slug ? { href: `/projects/${item.slug}`, "data-cursor-label": "View project" } : { "data-cursor-label": "View" };

                return (
                  // @ts-ignore
                  <CardWrapper key={`${item.id}-${cardIndex}`} className="recent-work-card" {...wrapperProps}>
                    <div className="recent-work-preview" style={{ position: "relative", width: "100%", height: "100%" }}>
                      <Image src={item.src} alt={item.title} fill sizes="(max-width: 767px) 78vw, (max-width: 1023px) 48vw, 32vw" className="object-cover" />
                    </div>
                    <span className="recent-work-card-meta"><span>{item.category}</span><strong>{item.title}</strong>{item.slug && <i>View project</i>}</span>
                  </CardWrapper>
                )
              })}
            </div>
          </div>;
        })}
      </div>}
      <div className="recent-work-footer"><Link href="/work" className="recent-work-cta">View all works <span aria-hidden>↗</span></Link></div>
    </section>
  );
}
