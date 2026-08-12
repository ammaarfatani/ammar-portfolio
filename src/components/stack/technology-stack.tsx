"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import Matter from "matter-js";
import { RotateCcw, Sparkles, X } from "lucide-react";
import { stackSkills, type StackSkill } from "@/lib/stack-data";
import { Eyebrow } from "@/components/ui/type";

/* -------------------------------------------------------------
   RESPONSIVE SWITCH
   -------------------------------------------------------------
   - On screens ≥ 768 px we keep the original Matter.js physics canvas.
   - On screens ≤ 767 px we render a lightweight, fully‑responsive
     flex‑wrap layout that guarantees every pill stays inside the
     viewport without absolute positioning.
-------------------------------------------------------------- */

export function TechnologyStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSkill, setActiveSkill] = useState<StackSkill | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<StackSkill | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [pillTransforms, setPillTransforms] = useState<{
    [key: string]: { x: number; y: number; angle: number };
  }>({});
  const [resetCount, setResetCount] = useState(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  /* ------------------- media‑query listener ------------------- */
  useEffect(() => {
    const checkSize = () => setIsMobile(window.innerWidth <= 767);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  /* ------------------- Desktop physics (≥768px) ------------------- */
  useEffect(() => {
    if (isMobile) return; // skip physics on mobile

    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = Math.max(container.clientHeight, 480);

    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 0.9, scale: 0.001 },
    });
    const world = engine.world;

    // ----- bounds -----
    const wallOpts = { isStatic: true, friction: 0.8, restitution: 0.4 };
    const ground = Matter.Bodies.rectangle(
      width / 2,
      height + 30,
      width * 2,
      60,
      wallOpts,
    );
    const leftWall = Matter.Bodies.rectangle(-30, height / 2, 60, height * 3, wallOpts);
    const rightWall = Matter.Bodies.rectangle(width + 30, height / 2, 60, height * 3, wallOpts);
    const ceiling = Matter.Bodies.rectangle(width / 2, -500, width * 2, 60, wallOpts);
    Matter.Composite.add(world, [ground, leftWall, rightWall, ceiling]);

    // ----- pills -----
    const bodyMap: { [key: string]: Matter.Body } = {};
    const pillWidth = Math.min(160, Math.max(130, width / 4));
    const pillHeight = 44;

    stackSkills.forEach((skill, i) => {
      const cols = Math.max(2, Math.floor(width / (pillWidth + 12)));
      const col = i % cols;
      const row = Math.floor(i / cols);
      const startX = (col + 0.5) * (width / cols) + (Math.random() * 20 - 10);
      const startY = -100 - row * 70 - Math.random() * 40;
      const angle = (Math.random() - 0.5) * 0.4;

      const body = Matter.Bodies.rectangle(startX, startY, pillWidth, pillHeight, {
        chamfer: { radius: 22 },
        restitution: 0.45,
        friction: 0.3,
        frictionAir: 0.015,
        density: 0.002,
        angle,
      });
      bodyMap[skill.id] = body;
      Matter.Composite.add(world, body);
    });

    // ----- mouse drag -----
    const mouse = Matter.Mouse.create(container);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });
    Matter.Composite.add(world, mouseConstraint);

    // interaction flag
    Matter.Events.on(mouseConstraint, "startdrag", () => setHasInteracted(true));

    // ----- cursor repulsion -----
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      Object.values(bodyMap).forEach((body) => {
        const dx = body.position.x - mx;
        const dy = body.position.y - my;
        const dist = Math.hypot(dx, dy);
        if (dist < 80 && dist > 0) {
          const force = (80 - dist) * 0.00008;
          Matter.Body.applyForce(body, body.position, {
            x: (dx / dist) * force,
            y: (dy / dist) * force,
          });
        }
      });
    };
    container.addEventListener("mousemove", handleMouseMove);

    // ----- animation loop -----
    let animId: number;
    const update = () => {
      Matter.Engine.update(engine, 1000 / 60);
      const newTrans: typeof pillTransforms = {};
      stackSkills.forEach((skill) => {
        const b = bodyMap[skill.id];
        if (b) {
          newTrans[skill.id] = { x: b.position.x, y: b.position.y, angle: b.angle };
        }
      });
      setPillTransforms(newTrans);
      animId = requestAnimationFrame(update);
    };
    animId = requestAnimationFrame(update);

    // ----- cleanup -----
    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener("mousemove", handleMouseMove);
      Matter.World.clear(world, false);
      Matter.Engine.clear(engine);
    };
  }, [resetCount, isMobile]);

  /* ------------------- Mobile flex layout (≤767px) ------------------- */
  const mobilePills = (
    <div className="flex flex-wrap justify-center gap-2">
      {stackSkills.map((skill) => {
        const Icon = skill.icon;
        const isHover = hoveredSkill?.id === skill.id;
        const isActive = activeSkill?.id === skill.id;
        return (
          <button
            key={skill.id}
            onMouseEnter={() => setHoveredSkill(skill)}
            onMouseLeave={() => setHoveredSkill(null)}
            onClick={() => setActiveSkill(skill)}
            className={`
              flex items-center gap-2 px-3 py-1.5 rounded-full border
              ${skill.bgClass} ${skill.textClass} ${skill.borderClass}
              ${isHover || isActive ? "scale-105 ring-2 ring-accent" : "scale-100"}
              transition-all duration-150
            `}
          >
            <Icon size={14} />
            <span className="text-xs font-medium whitespace-nowrap">{skill.name}</span>
          </button>
        );
      })}
    </div>
  );

  return (
    <section
      id="stack"
      className="technology-stack bg-[#070809] py-24 px-4 sm:px-8 border-t border-white/10 relative overflow-hidden"
      aria-labelledby="stack-title"
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-accent uppercase tracking-widest">
              <Sparkles size={14} />
              <span>/ MY DIGITAL TOOLKIT</span>
            </div>

            <h2
              id="stack-title"
              className="text-4xl sm:text-6xl font-bold tracking-tight text-white uppercase leading-none"
            >
              Technologies <br className="hidden sm:inline" />
              <span className="text-accent">I work with</span>
            </h2>

            <p className="text-neutral-400 text-xs sm:text-sm font-mono uppercase tracking-wider pt-1">
              DRAG. EXPLORE. BUILD.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-neutral-300">
              <span className="text-accent font-bold">{stackSkills.length}+</span> TOOLS &
              TECHNOLOGIES
            </div>

            <button
              type="button"
              onClick={() => {
                setResetCount((c) => c + 1);
                setActiveSkill(null);
              }}
              className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-neutral-300 hover:text-white hover:border-accent transition-colors flex items-center gap-1.5 uppercase tracking-wider"
            >
              <RotateCcw size={13} />
              <span>Reset Stack</span>
            </button>
          </div>
        </div>

        {/* Category Micro‑details */}
        <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono text-neutral-500 uppercase tracking-widest">
          <span className="text-accent">/ 01 FRONTEND</span>
          <span>&bull;</span>
          <span>/ 02 BACKEND</span>
          <span>&bull;</span>
          <span>/ 03 DATABASE</span>
          <span>&bull;</span>
          <span>/ 04 INFRASTRUCTURE</span>
          <span>&bull;</span>
          <span>/ 05 AI &amp; TOOLS</span>
        </div>

        {/* PLAYGROUND OR FLEX LAYOUT */}
        <div
          ref={containerRef}
          className={`
            relative w-full h-[520px] bg-[#0c0e10] border border-white/15 rounded-2xl overflow-hidden shadow-2xl
            ${isMobile ? "h-auto p-4" : ""}
          `}
        >
          {/* instruction overlay */}
          {!hasInteracted && !isMobile && (
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none px-4 py-2 rounded-full bg-black/80 border border-accent/40 text-accent font-mono text-xs uppercase tracking-widest flex items-center gap-2 animate-pulse">
              <span>DRAG. THROW. EXPLORE. &rarr;</span>
            </div>
          )}

          {/* Desktop physics pills */}
          {!isMobile &&
            stackSkills.map((skill) => {
              const transform = pillTransforms[skill.id] || { x: -300, y: -300, angle: 0 };
              const Icon = skill.icon;
              const isHover = hoveredSkill?.id === skill.id;
              const isActive = activeSkill?.id === skill.id;
              return (
                <div
                  key={skill.id}
                  onMouseEnter={() => setHoveredSkill(skill)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  onClick={() => setActiveSkill(skill)}
                  style={{
                    transform: `translate3d(${transform.x - 70}px, ${transform.y - 22}px, 0) rotate(${transform.angle}rad)`,
                  }}
                  className={`
                    absolute left-0 top-0 w-[140px] sm:w-[155px] h-[44px] rounded-full border-2 flex items-center justify-start px-3.5 gap-2.5
                    ${skill.bgClass} ${skill.textClass} ${skill.borderClass}
                    ${isHover || isActive ? "ring-2 ring-accent scale-105 z-30 shadow-lg" : "shadow-md"}
                    transition-shadow duration-150
                  `}
                >
                  <Icon size={18} className="shrink-0" />
                  <span className="text-xs font-mono font-bold truncate">{skill.name}</span>
                </div>
              );
            })}

          {/* Mobile flex pills */}
          {isMobile && mobilePills}

          {/* Hover tooltip (shared) */}
          {hoveredSkill && (
            <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto z-30 pointer-events-none p-3.5 bg-black/90 border border-accent/40 rounded-xl flex items-center gap-3 backdrop-blur-md shadow-2xl">
              <hoveredSkill.icon size={18} className={hoveredSkill.textClass} />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white font-mono">{hoveredSkill.name}</span>
                  <span className="text-[10px] font-mono text-accent uppercase px-1.5 py-0.5 rounded bg-accent/10 border border-accent/20">
                    {hoveredSkill.category}
                  </span>
                </div>
                <p className="text-[11px] font-mono text-neutral-400 mt-0.5">{hoveredSkill.description}</p>
              </div>
            </div>
          )}

          {/* Inspector sidebar (desktop only) */}
          {activeSkill && !isMobile && (
            <div className="absolute top-4 right-4 z-40 w-80 bg-[#111315] border border-white/20 rounded-xl p-5 shadow-2xl space-y-3 font-mono">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-[10px] text-accent uppercase tracking-widest">TECHNOLOGY / INSPECTOR</span>
                <button type="button" onClick={() => setActiveSkill(null)} className="text-neutral-400 hover:text-white transition-colors">
                  <X size={14} />
                </button>
              </div>

              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-lg border ${activeSkill.bgClass} ${activeSkill.textClass} ${activeSkill.borderClass}`}>
                  <activeSkill.icon size={22} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{activeSkill.name}</h3>
                  <span className="text-[10px] text-neutral-400 uppercase">{activeSkill.category}</span>
                </div>
              </div>

              <p className="text-xs text-neutral-300 leading-relaxed font-light">{activeSkill.description}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
