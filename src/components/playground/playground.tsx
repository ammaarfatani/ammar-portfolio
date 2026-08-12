"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Eyebrow } from "@/components/ui/type";
import {
  RotateCcw,
  Sparkles,
  Sliders,
  Activity,
  Layers,
  Cpu,
  Zap,
  Check,
  Shield,
  Database,
  CreditCard,
  LayoutDashboard,
  Webhook,
  BarChart3,
  Bell,
  ArrowRight,
  User,
  Server,
  ArrowRightLeft,
  MoveHorizontal,
  MoveVertical,
} from "lucide-react";

// ==========================================
// 01 — UI PLAYGROUND COMPONENT
// ==========================================
function UiPlayground() {
  const [layout, setLayout] = useState<"compact" | "balanced" | "spacious">("balanced");
  const [radius, setRadius] = useState<"sharp" | "soft" | "round">("soft");
  const [density, setDensity] = useState<"minimal" | "normal" | "dense">("normal");

  const reset = () => {
    setLayout("balanced");
    setRadius("soft");
    setDensity("normal");
  };

  const getRadiusStyle = () => {
    switch (radius) {
      case "sharp":
        return "0px";
      case "soft":
        return "8px";
      case "round":
        return "20px";
    }
  };

  const getPaddingStyle = () => {
    switch (density) {
      case "minimal":
        return "p-3 sm:p-4 gap-3";
      case "normal":
        return "p-5 sm:p-6 gap-5";
      case "dense":
        return "p-6 sm:p-8 gap-6";
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5 }}
      className="bg-[#111315] border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-8"
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-accent uppercase tracking-widest mb-1">
            <span>01 / UI PLAYGROUND</span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
            BUILD THE INTERFACE.
          </h3>
          <p className="text-neutral-400 text-sm sm:text-base font-light mt-1 max-w-xl">
            Change the interface and see how small design decisions change the experience.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-accent uppercase tracking-widest flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" /> ● INTERACTIVE
          </span>
          <button
            type="button"
            onClick={reset}
            className="px-3 py-1 rounded-md bg-white/5 border border-white/10 hover:border-accent text-xs font-mono text-neutral-300 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <RotateCcw size={12} /> Reset
          </button>
        </div>
      </div>

      {/* Grid: Controls Left, Live Preview Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-5 space-y-6 bg-black/40 border border-white/10 rounded-xl p-5 sm:p-6">
          <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest block mb-2">
            INTERFACE CONTROLS
          </span>

          {/* Layout Selector */}
          <div>
            <label className="text-xs font-mono text-neutral-300 block mb-2">LAYOUT</label>
            <div className="grid grid-cols-3 gap-2">
              {(["compact", "balanced", "spacious"] as const).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLayout(l)}
                  className={`py-2 text-xs font-mono capitalize rounded border transition-all ${
                    layout === l
                      ? "bg-accent text-black font-bold border-accent"
                      : "bg-white/5 text-neutral-300 border-white/10 hover:border-white/30"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* Radius Selector */}
          <div>
            <label className="text-xs font-mono text-neutral-300 block mb-2">RADIUS</label>
            <div className="grid grid-cols-3 gap-2">
              {(["sharp", "soft", "round"] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRadius(r)}
                  className={`py-2 text-xs font-mono capitalize rounded border transition-all ${
                    radius === r
                      ? "bg-accent text-black font-bold border-accent"
                      : "bg-white/5 text-neutral-300 border-white/10 hover:border-white/30"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Density Selector */}
          <div>
            <label className="text-xs font-mono text-neutral-300 block mb-2">DENSITY</label>
            <div className="grid grid-cols-3 gap-2">
              {(["minimal", "normal", "dense"] as const).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDensity(d)}
                  className={`py-2 text-xs font-mono capitalize rounded border transition-all ${
                    density === d
                      ? "bg-accent text-black font-bold border-accent"
                      : "bg-white/5 text-neutral-300 border-white/10 hover:border-white/30"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Preview Column */}
        <div className="lg:col-span-7 bg-black/80 border border-white/10 rounded-xl p-6 sm:p-8 min-h-[360px] flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 border-b border-white/10 pb-3 mb-6">
            <span>LIVE INTERFACE PREVIEW</span>
            <span className="text-accent uppercase">
              RADIUS: {getRadiusStyle()} | LAYOUT: {layout}
            </span>
          </div>

          {/* Responsive Preview Components */}
          <div
            className={`flex flex-col ${getPaddingStyle()} transition-all duration-300`}
            style={{ borderRadius: getRadiusStyle() }}
          >
            {/* Component 1: Metric Header */}
            <div
              className={`bg-white/5 border border-white/10 p-4 transition-all duration-300 flex flex-wrap items-center justify-between gap-4`}
              style={{ borderRadius: getRadiusStyle() }}
            >
              <div>
                <span className="text-[10px] font-mono text-accent uppercase tracking-widest block">
                  SYSTEM OVERVIEW
                </span>
                <h4 className="text-lg font-bold text-white">Active Product Engine</h4>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="px-3 py-1 bg-accent text-black font-mono text-xs font-bold transition-all"
                  style={{ borderRadius: getRadiusStyle() }}
                >
                  Deploy Status: 100%
                </span>
              </div>
            </div>

            {/* Component 2: Dynamic Arrangement Cards */}
            <div
              className={`grid ${
                layout === "compact"
                  ? "grid-cols-1"
                  : layout === "balanced"
                  ? "grid-cols-1 sm:grid-cols-2"
                  : "grid-cols-1 sm:grid-cols-3"
              } gap-4 transition-all duration-300`}
            >
              <div
                className="bg-white/5 border border-white/10 p-4 space-y-2 transition-all duration-300"
                style={{ borderRadius: getRadiusStyle() }}
              >
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                  <span>METRIC A</span>
                  <Zap size={14} className="text-accent" />
                </div>
                <div className="text-xl font-bold text-white font-mono">99.8%</div>
                {density !== "minimal" && (
                  <p className="text-[11px] text-neutral-400 font-light">Uptime SLA verified across regions</p>
                )}
              </div>

              <div
                className="bg-white/5 border border-white/10 p-4 space-y-2 transition-all duration-300"
                style={{ borderRadius: getRadiusStyle() }}
              >
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                  <span>METRIC B</span>
                  <Activity size={14} className="text-accent" />
                </div>
                <div className="text-xl font-bold text-white font-mono">14ms</div>
                {density !== "minimal" && (
                  <p className="text-[11px] text-neutral-400 font-light">Average request latency rate</p>
                )}
              </div>

              {layout === "spacious" && (
                <div
                  className="bg-white/5 border border-white/10 p-4 space-y-2 transition-all duration-300"
                  style={{ borderRadius: getRadiusStyle() }}
                >
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                    <span>METRIC C</span>
                    <Layers size={14} className="text-accent" />
                  </div>
                  <div className="text-xl font-bold text-white font-mono">256 Node</div>
                  {density !== "minimal" && (
                    <p className="text-[11px] text-neutral-400 font-light">Distributed container instances</p>
                  )}
                </div>
              )}
            </div>

            {/* Component 3: Data Row */}
            {density === "dense" && (
              <div
                className="bg-white/5 border border-white/10 p-3 flex items-center justify-between text-xs font-mono text-neutral-300 transition-all duration-300"
                style={{ borderRadius: getRadiusStyle() }}
              >
                <span>DATA PIPELINE: STREAM ACTIVE</span>
                <span className="text-accent">2,480 REQ / SEC</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

// ==========================================
// 02 — MOTION PLAYGROUND COMPONENT
// ==========================================
function MotionPlayground() {
  const [speed, setSpeed] = useState(50);
  const [smoothness, setSmoothness] = useState(50);
  const [distance, setDistance] = useState(40);
  const [direction, setDirection] = useState<"horizontal" | "vertical">("horizontal");
  const [triggerPulse, setTriggerPulse] = useState(0);

  const reset = () => {
    setSpeed(50);
    setSmoothness(50);
    setDistance(40);
    setDirection("horizontal");
  };

  // Convert speed (10-100) into duration or spring stiffness
  const durationSec = 2.5 - (speed / 100) * 2; // Range 0.5s to 2.5s
  const dampingVal = 5 + (smoothness / 100) * 35; // Damping 5 to 40
  const distancePx = (distance / 100) * 120; // 0px to 120px translation

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5 }}
      className="bg-[#111315] border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-8"
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-accent uppercase tracking-widest mb-1">
            <span>02 / MOTION PLAYGROUND</span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
            CONTROL THE MOTION.
          </h3>
          <p className="text-neutral-400 text-sm sm:text-base font-light mt-1 max-w-xl">
            See how timing, speed and movement change the feel of an interface.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-accent uppercase tracking-widest flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" /> ● LIVE PREVIEW
          </span>
          <button
            type="button"
            onClick={reset}
            className="px-3 py-1 rounded-md bg-white/5 border border-white/10 hover:border-accent text-xs font-mono text-neutral-300 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <RotateCcw size={12} /> Reset
          </button>
        </div>
      </div>

      {/* Grid: Sliders Left, Visual Motion Object Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Sliders Column */}
        <div className="lg:col-span-5 space-y-6 bg-black/40 border border-white/10 rounded-xl p-5 sm:p-6">
          <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest block mb-2">
            MOTION CONTROLS
          </span>

          {/* Speed Slider */}
          <div>
            <div className="flex justify-between text-xs font-mono text-neutral-300 mb-1">
              <span>SPEED</span>
              <span className="text-accent">{speed}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-full accent-[#c8ff3d] cursor-pointer bg-white/10 rounded"
            />
          </div>

          {/* Smoothness Slider */}
          <div>
            <div className="flex justify-between text-xs font-mono text-neutral-300 mb-1">
              <span>SMOOTHNESS</span>
              <span className="text-accent">{smoothness}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={smoothness}
              onChange={(e) => setSmoothness(Number(e.target.value))}
              className="w-full accent-[#c8ff3d] cursor-pointer bg-white/10 rounded"
            />
          </div>

          {/* Distance Slider */}
          <div>
            <div className="flex justify-between text-xs font-mono text-neutral-300 mb-1">
              <span>DISTANCE</span>
              <span className="text-accent">{distance}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={distance}
              onChange={(e) => setDistance(Number(e.target.value))}
              className="w-full accent-[#c8ff3d] cursor-pointer bg-white/10 rounded"
            />
          </div>

          {/* Direction Axis Toggle */}
          <div>
            <label className="text-xs font-mono text-neutral-300 block mb-2">DIRECTION</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setDirection("horizontal")}
                className={`py-2 text-xs font-mono rounded border flex items-center justify-center gap-2 transition-all ${
                  direction === "horizontal"
                    ? "bg-accent text-black font-bold border-accent"
                    : "bg-white/5 text-neutral-300 border-white/10 hover:border-white/30"
                }`}
              >
                <MoveHorizontal size={14} /> Horizontal (← →)
              </button>
              <button
                type="button"
                onClick={() => setDirection("vertical")}
                className={`py-2 text-xs font-mono rounded border flex items-center justify-center gap-2 transition-all ${
                  direction === "vertical"
                    ? "bg-accent text-black font-bold border-accent"
                    : "bg-white/5 text-neutral-300 border-white/10 hover:border-white/30"
                }`}
              >
                <MoveVertical size={14} /> Vertical (↑ ↓)
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setTriggerPulse((p) => p + 1)}
            className="w-full py-2.5 bg-accent text-black font-mono text-xs font-bold rounded hover:brightness-110 transition-all flex items-center justify-center gap-2"
          >
            <Zap size={14} /> Trigger Pulse Motion
          </button>
        </div>

        {/* Visual Motion Object Canvas */}
        <div className="lg:col-span-7 bg-black/80 border border-white/10 rounded-xl p-8 h-[360px] flex flex-col justify-between items-center relative overflow-hidden">
          <div className="w-full flex items-center justify-between text-[11px] font-mono text-neutral-500 border-b border-white/10 pb-3">
            <span>PHYSICS ENGINE CANVAS</span>
            <span className="text-accent uppercase">
              DURATION: {durationSec.toFixed(2)}s | DISTANCE: {distancePx.toFixed(0)}px
            </span>
          </div>

          {/* Animated Kinetic Object */}
          <div className="my-auto relative w-full h-full flex items-center justify-center">
            <motion.div
              key={`${direction}-${triggerPulse}`}
              animate={
                direction === "horizontal"
                  ? { x: [-distancePx, distancePx, -distancePx] }
                  : { y: [-distancePx, distancePx, -distancePx] }
              }
              transition={{
                duration: durationSec * 2,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
              className="bg-[#181b1d] border-2 border-accent rounded-2xl p-6 shadow-[0_0_40px_rgba(200,255,61,0.15)] flex flex-col items-center space-y-3 cursor-grab active:cursor-grabbing text-center max-w-xs"
            >
              <div className="w-12 h-12 rounded-full bg-accent/20 border border-accent flex items-center justify-center text-accent">
                <Sliders size={22} />
              </div>
              <h4 className="text-base font-bold text-white font-mono uppercase">
                Kinetic System Node
              </h4>
              <div className="text-[11px] font-mono text-neutral-400 bg-white/5 px-3 py-1 rounded border border-white/10">
                Speed: {speed}% | Smooth: {smoothness}%
              </div>
            </motion.div>
          </div>

          <div className="w-full flex items-center justify-between text-[10px] font-mono text-neutral-500 pt-3 border-t border-white/10">
            <span>AXIS: {direction.toUpperCase()}</span>
            <span>SPRING DAMPING: {dampingVal.toFixed(0)}</span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

// ==========================================
// 03 — THEME STUDIO COMPONENT
// ==========================================
function ThemeStudio() {
  const [accent, setAccent] = useState<"lime" | "cyan" | "amber" | "violet">("lime");
  const [contrast, setContrast] = useState<"low" | "high">("high");
  const [radius, setRadius] = useState<"sharp" | "round">("round");
  const [grid, setGrid] = useState<boolean>(true);

  const reset = () => {
    setAccent("lime");
    setContrast("high");
    setRadius("round");
    setGrid(true);
  };

  const getAccentHex = () => {
    switch (accent) {
      case "lime":
        return "#c8ff3d";
      case "cyan":
        return "#00f0ff";
      case "amber":
        return "#ffb703";
      case "violet":
        return "#a855f7";
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5 }}
      className="bg-[#111315] border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-8"
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-accent uppercase tracking-widest mb-1">
            <span>03 / THEME STUDIO</span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
            DESIGN YOUR OWN SYSTEM.
          </h3>
          <p className="text-neutral-400 text-sm sm:text-base font-light mt-1 max-w-xl">
            Change the visual language and see the interface adapt.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-accent uppercase tracking-widest flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" /> ● INTERACTIVE
          </span>
          <button
            type="button"
            onClick={reset}
            className="px-3 py-1 rounded-md bg-white/5 border border-white/10 hover:border-accent text-xs font-mono text-neutral-300 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <RotateCcw size={12} /> Reset
          </button>
        </div>
      </div>

      {/* Grid: Theme Controls Left, Local Theme Preview Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-5 space-y-6 bg-black/40 border border-white/10 rounded-xl p-5 sm:p-6">
          <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest block mb-2">
            VISUAL SYSTEM CONTROLS
          </span>

          {/* Accent Options */}
          <div>
            <label className="text-xs font-mono text-neutral-300 block mb-2">ACCENT COLOR</label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { name: "lime", hex: "#c8ff3d" },
                { name: "cyan", hex: "#00f0ff" },
                { name: "amber", hex: "#ffb703" },
                { name: "violet", hex: "#a855f7" },
              ].map((opt) => (
                <button
                  key={opt.name}
                  type="button"
                  onClick={() => setAccent(opt.name as any)}
                  className={`py-2 px-1 text-[11px] font-mono capitalize rounded border flex flex-col items-center gap-1 transition-all ${
                    accent === opt.name
                      ? "border-white text-white bg-white/10"
                      : "border-white/10 text-neutral-400 hover:border-white/30"
                  }`}
                >
                  <span
                    className="w-4 h-4 rounded-full border border-black/40"
                    style={{ backgroundColor: opt.hex }}
                  />
                  {opt.name}
                </button>
              ))}
            </div>
          </div>

          {/* Contrast Selector */}
          <div>
            <label className="text-xs font-mono text-neutral-300 block mb-2">CONTRAST</label>
            <div className="grid grid-cols-2 gap-2">
              {(["low", "high"] as const).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setContrast(c)}
                  className={`py-2 text-xs font-mono uppercase rounded border transition-all ${
                    contrast === c
                      ? "bg-white text-black font-bold border-white"
                      : "bg-white/5 text-neutral-300 border-white/10 hover:border-white/30"
                  }`}
                >
                  {c} Contrast
                </button>
              ))}
            </div>
          </div>

          {/* Radius Selector */}
          <div>
            <label className="text-xs font-mono text-neutral-300 block mb-2">CORNER RADIUS</label>
            <div className="grid grid-cols-2 gap-2">
              {(["sharp", "round"] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRadius(r)}
                  className={`py-2 text-xs font-mono uppercase rounded border transition-all ${
                    radius === r
                      ? "bg-white text-black font-bold border-white"
                      : "bg-white/5 text-neutral-300 border-white/10 hover:border-white/30"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Toggle */}
          <div>
            <label className="text-xs font-mono text-neutral-300 block mb-2">BACKGROUND GRID</label>
            <button
              type="button"
              onClick={() => setGrid(!grid)}
              className={`w-full py-2 text-xs font-mono uppercase rounded border transition-all ${
                grid
                  ? "bg-white/10 text-white border-white/30"
                  : "bg-white/5 text-neutral-400 border-white/10"
              }`}
            >
              GRID LINES: {grid ? "ON" : "OFF"}
            </button>
          </div>
        </div>

        {/* Local Theme Preview Box */}
        <div
          className={`lg:col-span-7 rounded-xl p-6 sm:p-8 min-h-[360px] flex flex-col justify-between relative overflow-hidden transition-all duration-300 ${
            contrast === "high"
              ? "bg-black border-2 border-white/30"
              : "bg-[#141719] border border-white/10 opacity-90"
          }`}
        >
          {/* Blueprint Grid Overlay if enabled */}
          {grid && (
            <div
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                backgroundImage: `linear-gradient(${getAccentHex()} 1px, transparent 1px), linear-gradient(90deg, ${getAccentHex()} 1px, transparent 1px)`,
                backgroundSize: "32px 32px",
              }}
            />
          )}

          <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-neutral-400 border-b border-white/15 pb-3">
            <span>LOCAL PREVIEW CONTAINER</span>
            <span style={{ color: getAccentHex() }} className="font-bold uppercase">
              ACCENT: {accent}
            </span>
          </div>

          {/* Preview Components inside Theme Box */}
          <div className="relative z-10 space-y-4 my-auto py-4">
            <div
              className="p-5 border transition-all duration-300 space-y-3"
              style={{
                borderRadius: radius === "sharp" ? "0px" : "16px",
                borderColor: contrast === "high" ? getAccentHex() : "rgba(255,255,255,0.15)",
                backgroundColor: "rgba(255,255,255,0.03)",
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold" style={{ color: getAccentHex() }}>
                  THEME COMPONENT CARD
                </span>
                <span
                  className="px-2.5 py-0.5 text-[10px] font-mono text-black font-bold uppercase"
                  style={{
                    backgroundColor: getAccentHex(),
                    borderRadius: radius === "sharp" ? "0px" : "999px",
                  }}
                >
                  Active System
                </span>
              </div>
              <h4 className="text-xl font-bold text-white">Custom Theme Token Palette</h4>
              <p className="text-xs text-neutral-300 font-light">
                Testing real-time token shifts without modifying global app styling.
              </p>

              <div className="pt-2 flex flex-wrap gap-2">
                <button
                  type="button"
                  className="px-4 py-1.5 text-xs font-mono font-bold text-black transition-transform active:scale-95"
                  style={{
                    backgroundColor: getAccentHex(),
                    borderRadius: radius === "sharp" ? "0px" : "8px",
                  }}
                >
                  Primary Action
                </button>
                <button
                  type="button"
                  className="px-4 py-1.5 text-xs font-mono text-white border border-white/20"
                  style={{
                    borderRadius: radius === "sharp" ? "0px" : "8px",
                  }}
                >
                  Secondary Action
                </button>
              </div>
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-neutral-400 pt-3 border-t border-white/15">
            <span>GRID: {grid ? "ENABLED" : "DISABLED"}</span>
            <span>SYSTEM TYPE: ISOLATED SCOPE</span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

// ==========================================
// 04 — SYSTEM BUILDER COMPONENT
// ==========================================
function SystemBuilder() {
  // Modules state
  const [selectedModules, setSelectedModules] = useState<string[]>([
    "AUTHENTICATION",
    "DATABASE",
    "API",
  ]);

  const toggleModule = (mod: string) => {
    if (["AUTHENTICATION", "DATABASE", "API"].includes(mod)) {
      // Core modules stay selected for valid architecture, or can toggle optional ones
      if (selectedModules.includes(mod)) {
        if (selectedModules.length > 1) {
          setSelectedModules(selectedModules.filter((m) => m !== mod));
        }
      } else {
        setSelectedModules([...selectedModules, mod]);
      }
      return;
    }

    if (selectedModules.includes(mod)) {
      setSelectedModules(selectedModules.filter((m) => m !== mod));
    } else {
      setSelectedModules([...selectedModules, mod]);
    }
  };

  const reset = () => {
    setSelectedModules(["AUTHENTICATION", "DATABASE", "API"]);
  };

  const allModules = [
    { id: "AUTHENTICATION", label: "AUTHENTICATION", icon: Shield, core: true },
    { id: "DATABASE", label: "DATABASE", icon: Database, core: true },
    { id: "API", label: "API", icon: Webhook, core: true },
    { id: "PAYMENTS", label: "PAYMENTS", icon: CreditCard, core: false },
    { id: "DASHBOARD", label: "DASHBOARD", icon: LayoutDashboard, core: false },
    { id: "ANALYTICS", label: "ANALYTICS", icon: BarChart3, core: false },
    { id: "NOTIFICATIONS", label: "NOTIFICATIONS", icon: Bell, core: false },
  ];

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5 }}
      className="bg-[#111315] border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-8"
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-accent uppercase tracking-widest mb-1">
            <span>04 / SYSTEM BUILDER</span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
            ASSEMBLE A DIGITAL SYSTEM.
          </h3>
          <p className="text-neutral-400 text-sm sm:text-base font-light mt-1 max-w-xl">
            Choose the building blocks and see how a digital product comes together.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-accent uppercase tracking-widest flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" /> ● LIVE SYSTEM
          </span>
          <button
            type="button"
            onClick={reset}
            className="px-3 py-1 rounded-md bg-white/5 border border-white/10 hover:border-accent text-xs font-mono text-neutral-300 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <RotateCcw size={12} /> Reset
          </button>
        </div>
      </div>

      {/* Selectable Modules Toggle Buttons */}
      <div className="space-y-3">
        <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest block">
          SELECT SYSTEM BUILDING BLOCKS (CLICK TO TOGGLE):
        </span>
        <div className="flex flex-wrap gap-2.5">
          {allModules.map((mod) => {
            const isSelected = selectedModules.includes(mod.id);
            const Icon = mod.icon;

            return (
              <button
                key={mod.id}
                type="button"
                onClick={() => toggleModule(mod.id)}
                className={`px-4 py-2.5 rounded-lg border text-xs font-mono transition-all flex items-center gap-2 ${
                  isSelected
                    ? "bg-accent text-black font-bold border-accent shadow-[0_0_15px_rgba(200,255,61,0.2)]"
                    : "bg-white/5 text-neutral-400 border-white/10 hover:border-white/30 hover:text-white"
                }`}
              >
                <Icon size={14} />
                <span>{mod.label}</span>
                {isSelected && <Check size={14} className="stroke-[3]" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Visual System Architecture Diagram */}
      <div className="bg-black/90 border border-white/10 rounded-xl p-6 sm:p-8 min-h-[380px] flex flex-col justify-between relative overflow-hidden">
        <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 border-b border-white/10 pb-3">
          <span>ACTIVE ARCHITECTURE PIPELINE</span>
          <span className="text-accent uppercase">
            ACTIVE NODES: {selectedModules.length + 2} / {allModules.length + 2}
          </span>
        </div>

        {/* Dynamic Nodes Flow Map */}
        <div className="my-auto py-8">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            
            {/* Node 1: User */}
            <div className="px-4 py-3 bg-white/5 border border-white/20 rounded-xl flex items-center gap-2 text-xs font-mono text-white shadow-lg">
              <User size={16} className="text-accent" />
              <span>USER</span>
            </div>

            <ArrowRight size={16} className="text-accent animate-pulse shrink-0" />

            {/* Dynamic Active Nodes */}
            <AnimatePresence>
              {allModules
                .filter((mod) => selectedModules.includes(mod.id))
                .map((mod, idx, arr) => {
                  const Icon = mod.icon;

                  return (
                    <div key={mod.id} className="flex items-center gap-3 sm:gap-4">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        className="px-4 py-3 bg-[#181b1d] border border-accent/60 rounded-xl flex items-center gap-2 text-xs font-mono text-white shadow-[0_0_20px_rgba(200,255,61,0.15)]"
                      >
                        <Icon size={16} className="text-accent" />
                        <span className="font-bold">{mod.label}</span>
                      </motion.div>

                      {idx < arr.length - 1 && (
                        <ArrowRight size={16} className="text-accent animate-pulse shrink-0" />
                      )}
                    </div>
                  );
                })}
            </AnimatePresence>

            <ArrowRight size={16} className="text-accent animate-pulse shrink-0" />

            {/* Node End: Application Output */}
            <div className="px-4 py-3 bg-accent text-black font-bold rounded-xl flex items-center gap-2 text-xs font-mono shadow-lg">
              <Server size={16} />
              <span>APPLICATION LIVE</span>
            </div>
          </div>
        </div>

        {/* System Architecture Metrics Footer */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10 text-xs font-mono text-neutral-400">
          <div>
            <span className="text-[10px] text-neutral-500 block uppercase">THROUGHPUT</span>
            <span className="text-white font-bold">{selectedModules.length * 1200} REQ/S</span>
          </div>
          <div>
            <span className="text-[10px] text-neutral-500 block uppercase">LATENCY</span>
            <span className="text-accent font-bold">12ms</span>
          </div>
          <div>
            <span className="text-[10px] text-neutral-500 block uppercase">SECURITY</span>
            <span className="text-white font-bold">ENCRYPTED</span>
          </div>
          <div>
            <span className="text-[10px] text-neutral-500 block uppercase">PIPELINE</span>
            <span className="text-accent font-bold">OPTIMIZED</span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

// ==========================================
// MAIN PLAYGROUND SECTION COMPONENT
// ==========================================
export function Playground() {
  return (
    <section
      id="playground"
      className="playground bg-[#0a0a0a] text-neutral-200 py-28 px-4 sm:px-8 border-t border-white/10"
      aria-labelledby="playground-title"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <header className="border-b border-white/10 pb-10">
          <div className="flex items-center gap-2 text-xs font-mono text-accent uppercase tracking-widest mb-3">
            <Sparkles size={14} />
            <span>Interactive / Playground</span>
          </div>

          <h2 id="playground-title" className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-4 uppercase">
            Make it <span className="text-accent">Yours.</span>
          </h2>

          <p className="text-neutral-400 text-base sm:text-lg max-w-2xl font-light leading-relaxed">
            Don&apos;t just explore the portfolio. Interact with the systems behind it.
          </p>
        </header>

        {/* Vertical Interactive Showcase Stack */}
        <div className="space-y-16">
          <UiPlayground />
          <MotionPlayground />
          <ThemeStudio />
          <SystemBuilder />
        </div>
      </div>
    </section>
  );
}
