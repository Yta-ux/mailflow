import { useState, useMemo } from "react";
import { MouseParticles } from "./MouseParticles";

interface MeshOrb {
  id: number;
  x: number;
  y: number;
  size: number;
  color: "primary" | "secondary" | "accent";
  duration: number;
  blur: number;
  opacity: number;
}

export function AnimatedBackground() {
  // Hydration fix - start true if window exists (SPA mode)
  const [isClient] = useState(() => typeof window !== "undefined");

  const meshOrbs = useMemo<MeshOrb[]>(() => [
    { id: 0, x: 0, y: 0, size: 800, color: "primary", duration: 60, blur: 150, opacity: 0.12 },
    { id: 1, x: 70, y: 20, size: 600, color: "secondary", duration: 70, blur: 140, opacity: 0.1 },
    { id: 2, x: 30, y: 60, size: 700, color: "accent", duration: 65, blur: 160, opacity: 0.08 },
  ], []);

  const getGradientColor = (color: MeshOrb["color"]) => {
    const colors = {
      primary: "--gradient-primary",
      secondary: "--gradient-secondary",
      accent: "--gradient-accent",
    };
    return colors[color];
  };

  if (!isClient) return null;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 gradient-mesh" />

      {meshOrbs.map((orb, index) => (
        <div
          key={orb.id}
          className="absolute rounded-full will-change-transform"
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            background: `radial-gradient(circle, color-mix(in oklch, var(${getGradientColor(orb.color)}), transparent ${100 - orb.opacity * 100}%) 0%, transparent 70%)`,
            filter: `blur(${orb.blur}px)`,
            animation: `mesh-${(index % 2) + 1} ${orb.duration}s ease-in-out infinite`,
          }}
        />
      ))}

      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(
            ellipse 80% 60% at 50% 50%,
            transparent 0%,
            color-mix(in oklch, var(--background), transparent 70%) 70%,
            color-mix(in oklch, var(--background), transparent 50%) 100%
          )`,
        }}
      />

      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-linear-to-br from-primary/5 to-transparent blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-linear-to-tl from-accent/5 to-transparent blur-3xl" />

      <MouseParticles />
    </div>
  );
}
