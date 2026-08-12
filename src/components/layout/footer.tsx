"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, ArrowUpRight, Check, Copy, Mail, MessageCircle, Network } from "lucide-react";

const WHATSAPP_NUMBER_DISPLAY = "+92 336 2567192";
const WHATSAPP_LINK = "https://wa.me/923362567192";

const editorialNav = [
  { num: "01", label: "WORK", href: "/#work" },
  { num: "02", label: "ABOUT", href: "/#about" },
  { num: "03", label: "STACK", href: "/#stack" },
  { num: "04", label: "PLAYGROUND", href: "/#playground" },
  { num: "05", label: "CONTACT", href: "/#contact" },
] as const;

export function Footer() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("fataniammar188@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer
      className="site-footer bg-[#050607] text-neutral-200 pt-20 sm:pt-28 pb-20 sm:pb-28 px-4 sm:px-8 border-t border-white/15 relative font-sans"
      aria-labelledby="footer-title"
    >
      <div className="max-w-7xl mx-auto space-y-16 sm:space-y-20 relative z-10">
        
        {/* Main Editorial Closing Statement */}
        <div className="border-b border-white/10 pb-12 sm:pb-16 pt-2">
          <h2
            id="footer-title"
            className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight uppercase text-white leading-[0.92] max-w-5xl"
          >
            The next<br />
            system<br />
            starts <span className="text-accent">Here.</span>
          </h2>
        </div>

        {/* Asymmetrical Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Column 1: Numbered Editorial Navigation */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest block">
              / SYSTEM INDEX
            </span>
            <nav className="flex flex-col space-y-3 font-mono">
              {editorialNav.map((item) => (
                <Link
                  key={item.num}
                  href={item.href}
                  className="group flex items-center justify-between py-2.5 border-b border-white/10 hover:border-accent transition-colors text-sm sm:text-base text-neutral-300 hover:text-white"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-neutral-500 text-xs group-hover:text-accent group-hover:translate-x-1 transition-all">
                      {item.num}
                    </span>
                    <span className="font-bold tracking-wider group-hover:text-accent transition-colors">
                      {item.label}
                    </span>
                  </div>
                  <ArrowRight
                    size={16}
                    className="text-neutral-600 group-hover:text-accent group-hover:translate-x-1 transition-all opacity-0 group-hover:opacity-100"
                  />
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 2: Direct Contact Channels */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest block">
              / OPEN FOR SELECT PROJECTS
            </span>

            <div className="space-y-3 font-mono text-xs">
              {/* WhatsApp Action */}
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between p-3.5 bg-white/5 border border-white/10 rounded-xl hover:border-accent hover:bg-white/10 transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <MessageCircle size={15} className="text-accent" />
                  <span className="text-neutral-200 group-hover:text-white transition-colors">
                    WHATSAPP ({WHATSAPP_NUMBER_DISPLAY})
                  </span>
                </div>
                <ArrowUpRight size={14} className="text-neutral-500 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              {/* Email & Copy Action */}
              <div className="flex items-center gap-2">
                <a
                  href="mailto:fataniammar188@gmail.com"
                  className="group flex-1 flex items-center justify-between p-3.5 bg-white/5 border border-white/10 rounded-xl hover:border-accent hover:bg-white/10 transition-all min-w-0"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Mail size={15} className="text-accent shrink-0" />
                    <span className="text-neutral-200 group-hover:text-white transition-colors truncate">
                      fataniammar188@gmail.com
                    </span>
                  </div>
                  <ArrowUpRight size={14} className="text-neutral-500 group-hover:text-accent transition-all shrink-0" />
                </a>

                <button
                  type="button"
                  onClick={copyEmail}
                  className="px-3 py-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-accent text-neutral-400 hover:text-white transition-all shrink-0 flex items-center gap-1"
                >
                  {copied ? <Check size={14} className="text-accent" /> : <Copy size={14} />}
                </button>
              </div>

              {/* LinkedIn Action */}
              <a
                href="https://linkedin.com/in/ammar-afzal-fatani-b04970292"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between p-3.5 bg-white/5 border border-white/10 rounded-xl hover:border-accent hover:bg-white/10 transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <Network size={15} className="text-accent" />
                  <span className="text-neutral-200 group-hover:text-white transition-colors">
                    LINKEDIN PROFILE
                  </span>
                </div>
                <ArrowUpRight size={14} className="text-neutral-500 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            </div>
          </div>

          {/* Column 3: Location & System Metadata */}
          <div className="lg:col-span-3 space-y-4 font-mono text-xs">
            <span className="text-neutral-500 uppercase tracking-widest block">
              / SYSTEM METADATA
            </span>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3 text-neutral-400">
              <div>
                <span className="text-[10px] text-neutral-500 block uppercase">LOCATION</span>
                <span className="text-white font-bold">KARACHI / PK</span>
              </div>

              <div>
                <span className="text-[10px] text-neutral-500 block uppercase">CURRENT STATE</span>
                <span className="text-neutral-200">AVAILABLE FOR NEW PROJECTS</span>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
                <span>SYSTEM STATUS</span>
                <span className="text-accent font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  ONLINE
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Stable Signature Area */}
        <div className="pt-12 sm:pt-16 border-t border-white/10 space-y-3">
          <div className="group cursor-default w-fit">
            <h3 className="text-6xl sm:text-8xl lg:text-9xl font-extrabold tracking-tighter text-white leading-none uppercase select-none">
              AMMAR<span className="group-hover:text-accent transition-colors duration-300">.F</span>
            </h3>
            <p className="text-xs sm:text-sm font-mono text-neutral-400 mt-3 flex items-center gap-2">
              <span className="text-accent">&rarr;</span>
              <span>FULL-STACK &amp; AI DEVELOPER</span>
            </p>
          </div>
        </div>

        {/* Bottom System Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-neutral-500">
          <p>&copy; {new Date().getFullYear()} AMMAR.F / DIGITAL SYSTEM</p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span className="text-neutral-400 uppercase tracking-widest text-[11px]">
              SYSTEM ONLINE
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
