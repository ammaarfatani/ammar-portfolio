"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const navItems = ["Work", "About", "Stack", "Playground", "Contact"] as const;

export function Navigation() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useMotionValueEvent(scrollY, "change", (latest) => setIsScrolled(latest > 24));

  useEffect(() => {
    const sections = navItems.map((item) => document.getElementById(item.toLowerCase())).filter((section): section is HTMLElement => section !== null);
    if (!sections.length) return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.find((entry) => entry.isIntersecting);
      if (visible) setActive(visible.target.id);
    }, { rootMargin: "-35% 0px -55% 0px" });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <header className={cn("site-header", isScrolled && "nav-scrolled", isOpen && "nav-open")}>
      <nav className="floating-nav" aria-label="Primary navigation">
        <Link href="/" className="floating-nav-brand" aria-label="Ammar Fatani, home">AMMAR<span>.F</span></Link>
        <div className="floating-nav-links" aria-label="Portfolio sections">
          {navItems.map((item) => {
            const id = item.toLowerCase();
            const isActive = active === id;

            return (
              <a key={item} href={`#${id}`} className="floating-nav-link" data-active={isActive}>
                {isActive && <motion.span className="floating-nav-indicator" layoutId="navigation-active" transition={{ type: "spring", stiffness: 340, damping: 32 }} />}
                <span>{item}</span>
              </a>
            );
          })}
        </div>
        <button className="floating-nav-toggle" type="button" onClick={() => setIsOpen((open) => !open)} aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={isOpen} aria-controls="mobile-navigation">
          <span>{isOpen ? "Close" : "Menu"}</span>
          {isOpen ? <X size={16} strokeWidth={1.6} /> : <Menu size={16} strokeWidth={1.6} />}
        </button>
      </nav>
      <AnimatePresence>{isOpen && <motion.div id="mobile-navigation" className="mobile-navigation" initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} exit={{ clipPath: "inset(0 0 100% 0)" }} transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}><div className="mobile-navigation-inner"><div className="flex flex-col items-start gap-2">{navItems.map((item, index) => <motion.a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsOpen(false)} className="mobile-nav-link" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} transition={{ delay: 0.12 + index * 0.05, duration: 0.35 }}><span className="font-mono text-xs text-subtle">0{index + 1}</span>{item}</motion.a>)}</div><a href="mailto:fataniammar188@gmail.com" className="mobile-navigation-email">fataniammar188@gmail.com</a></div></motion.div>}</AnimatePresence>
    </header>
  );
}
