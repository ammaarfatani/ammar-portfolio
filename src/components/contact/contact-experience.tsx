"use client";

import { ArrowRight, ArrowUpRight, Mail, MessageCircle, Network } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";

// Direct WhatsApp link as requested
const WHATSAPP_NUMBER_DISPLAY = "+92 336 2567192";
const WHATSAPP_LINK = "https://wa.me/923362567192";

export function ContactExperience() {
  const scrollToForm = () => {
    const formElement = document.getElementById("project-brief-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="contact"
      className="contact-experience bg-[#f4f4f0] text-[#0b0c0e] py-24 px-4 sm:px-8 border-t-2 border-[#0b0c0e] relative overflow-hidden"
      aria-labelledby="contact-title"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Main Grid: Statement Left, Project Brief Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Status Tag, Huge High-Contrast Heading & Dual CTAs */}
          <div className="lg:col-span-6 space-y-8">
            
            {/* Status Indicator Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border-2 border-[#0b0c0e] font-mono text-xs font-bold text-[#0b0c0e] shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-[#657d13] animate-pulse" />
              <span>AVAILABLE FOR SELECT PROJECTS</span>
            </div>

            {/* Huge Art-Directed Editorial Heading — NEAR-BLACK HIGH CONTRAST */}
            <h2
              id="contact-title"
              className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight uppercase text-[#0b0c0e] leading-[0.95]"
            >
              Have an idea?<br />
              <br />
              Let&apos;s turn it<br />
              into something<br />
              <span className="text-[#657d13]">Real.</span>
            </h2>

            {/* High-Contrast Readable Body Description */}
            <p className="text-[#2b2e28] text-base sm:text-lg font-medium leading-relaxed max-w-md">
              Full-Stack &amp; AI Developer building considered web applications, performant interfaces, and custom software systems.
            </p>

            {/* Dual CTA System */}
            <div className="space-y-4 pt-2">
              <div className="flex flex-wrap items-center gap-4">
                {/* Primary CTA */}
                <button
                  type="button"
                  onClick={scrollToForm}
                  className="group px-6 py-3.5 bg-[#0b0c0e] text-white hover:bg-[#657d13] font-mono text-xs font-bold rounded border-2 border-[#0b0c0e] transition-all flex items-center gap-2 uppercase tracking-wider shadow-md"
                >
                  <span>Start A Project</span>
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Secondary Direct WhatsApp CTA */}
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="group px-6 py-3.5 bg-white text-[#0b0c0e] hover:bg-[#0b0c0e] hover:text-white border-2 border-[#0b0c0e] font-mono text-xs font-bold rounded transition-all flex items-center gap-2 uppercase tracking-wider shadow-md"
                >
                  <MessageCircle size={15} className="text-[#657d13] group-hover:text-[#c8ff3d]" />
                  <span>WhatsApp Me</span>
                  <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>

              {/* Direct WhatsApp Info Label */}
              <div className="text-xs font-mono text-[#111315] font-bold">
                <span>Available on WhatsApp: </span>
                <span className="text-[#0b0c0e] underline font-extrabold">{WHATSAPP_NUMBER_DISPLAY}</span>
              </div>
            </div>

          </div>

          {/* Right Column: Project Inquiry Brief Form */}
          <div className="lg:col-span-6">
            <ContactForm />
          </div>
        </div>

        {/* Bottom Direct Contact Options Bar */}
        <div className="pt-12 border-t-2 border-[#0b0c0e] grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono text-xs">
          
          {/* Email Option */}
          <a
            href="mailto:fataniammar188@gmail.com"
            className="group p-4 bg-white border-2 border-[#0b0c0e] rounded hover:border-[#657d13] transition-all flex items-center justify-between shadow-sm"
          >
            <div className="flex items-center gap-3">
              <Mail size={18} className="text-[#657d13]" />
              <div>
                <span className="text-[10px] text-[#444741] uppercase tracking-wider block font-bold">EMAIL CHANNEL</span>
                <span className="text-[#0b0c0e] font-bold text-xs">fataniammar188@gmail.com</span>
              </div>
            </div>
            <ArrowUpRight size={16} className="text-[#0b0c0e] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          {/* WhatsApp Direct Option */}
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noreferrer"
            className="group p-4 bg-white border-2 border-[#0b0c0e] rounded hover:border-[#657d13] transition-all flex items-center justify-between shadow-sm"
          >
            <div className="flex items-center gap-3">
              <MessageCircle size={18} className="text-[#657d13]" />
              <div>
                <span className="text-[10px] text-[#444741] uppercase tracking-wider block font-bold">WHATSAPP DIRECT</span>
                <span className="text-[#0b0c0e] font-bold text-xs">{WHATSAPP_NUMBER_DISPLAY}</span>
              </div>
            </div>
            <ArrowUpRight size={16} className="text-[#0b0c0e] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          {/* LinkedIn Option */}
          <a
            href="https://linkedin.com/in/ammar-afzal-fatani-b04970292"
            target="_blank"
            rel="noreferrer"
            className="group p-4 bg-white border-2 border-[#0b0c0e] rounded hover:border-[#657d13] transition-all flex items-center justify-between shadow-sm"
          >
            <div className="flex items-center gap-3">
              <Network size={18} className="text-[#657d13]" />
              <div>
                <span className="text-[10px] text-[#444741] uppercase tracking-wider block font-bold">LINKEDIN PROFILE</span>
                <span className="text-[#0b0c0e] font-bold text-xs">ammar-afzal-fatani</span>
              </div>
            </div>
            <ArrowUpRight size={16} className="text-[#0b0c0e] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

        </div>

      </div>
    </section>
  );
}
