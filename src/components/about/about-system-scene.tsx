"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import type { MotionValue } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { useRef } from "react";
import type { Group } from "three";

type SystemMode = "profile";

const modules = [
  { position: [-1.45, 0.72, 0.18], scale: [1.18, 0.16, 0.78], color: "#e9e8e2" },
  { position: [0.35, 1.1, -0.12], scale: [0.72, 0.18, 1.2], color: "#c8ff3d" },
  { position: [1.35, 0.15, 0.2], scale: [0.18, 1.46, 0.74], color: "#b9bdb7" },
  { position: [-0.38, -0.1, 0.45], scale: [1.5, 0.22, 0.52], color: "#727972" },
  { position: [-1.08, -1.02, -0.28], scale: [0.62, 0.17, 1.34], color: "#d6d8d1" },
  { position: [0.82, -1.1, 0.1], scale: [1.25, 0.16, 0.63], color: "#9da59d" },
];

function DigitalSystem({ progress, mode }: { progress: MotionValue<number>; mode: SystemMode }) {
  const group = useRef<Group>(null);
  const reduceMotion = useReducedMotion();
  const emphasis = mode === "profile" ? 1.04 : 1;

  useFrame(({ clock, pointer }) => {
    if (!group.current) return;
    const scroll = progress.get();
    const time = reduceMotion ? 0 : clock.getElapsedTime();
    group.current.rotation.y += ((scroll * 2.4 + (reduceMotion ? 0 : pointer.x * 0.22) + Math.sin(time * 0.22) * 0.08) - group.current.rotation.y) * 0.055;
    group.current.rotation.x += (((reduceMotion ? 0.18 : pointer.y * -0.15) + 0.24 - scroll * 0.34) - group.current.rotation.x) * 0.055;
    group.current.position.y = Math.sin(time * 0.7) * (reduceMotion ? 0 : 0.08) - scroll * 0.35;
    group.current.scale.setScalar(emphasis);
  });

  return <group ref={group} rotation={[0.24, -0.4, 0]}><group>
    {modules.map((module, index) => <mesh key={index} position={module.position as [number, number, number]} scale={module.scale as [number, number, number]} castShadow receiveShadow><boxGeometry args={[1, 1, 1]} /><meshStandardMaterial color={module.color} emissive={module.color} emissiveIntensity={index === 1 ? 0.45 : 0.06} metalness={0.56} roughness={0.34} /></mesh>)}
    {[-1, -0.5, 0, 0.5, 1].map((x, index) => <mesh key={`node-${index}`} position={[x, 0.1 + (index % 2) * 0.38, 1.02]}><boxGeometry args={[0.12, 0.12, 0.12]} /><meshStandardMaterial color={index === 2 ? "#c8ff3d" : "#f1f0ed"} emissive={index === 2 ? "#c8ff3d" : "#111315"} emissiveIntensity={index === 2 ? 1.2 : 0.14} /></mesh>)}
    <mesh position={[0, 0.05, -0.72]} rotation={[0.3, 0.1, 0]}><boxGeometry args={[3.55, 0.035, 2.55]} /><meshStandardMaterial color="#303632" metalness={0.7} roughness={0.46} /></mesh>
  </group></group>;
}

export function AboutSystemScene({ progress, mode }: { progress: MotionValue<number>; mode: SystemMode }) {
  return <Canvas className="about-system-canvas" dpr={[1, 1.5]} camera={{ position: [0, 0, 7.2], fov: 38 }} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }} aria-hidden><ambientLight intensity={0.9} /><directionalLight position={[4, 5, 4]} intensity={2.4} color="#f5f4eb" /><pointLight position={[-3, -2, 3]} intensity={8} distance={8} color="#c8ff3d" /><DigitalSystem progress={progress} mode={mode} /></Canvas>;
}
