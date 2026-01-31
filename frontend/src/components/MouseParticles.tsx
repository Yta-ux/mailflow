import { useEffect, useRef, useState, useCallback } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  color: string;
  opacity: number;
}

const PARTICLE_COLORS = [
  "var(--primary)",
  "var(--accent)",
  "var(--secondary)",
];

function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

export function MouseParticles() {
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = typeof window !== "undefined" 
    && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const [particles, setParticles] = useState<Particle[]>(() => {
    if (typeof window === "undefined") return [];
    
    // Lazy initialization - runs only once
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) return [];

    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 4 + 2,
      speed: Math.random() * 0.08 + 0.05,
      color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
      opacity: Math.random() * 0.4 + 0.3,
    }));
  });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion || particles.length === 0) return;

    const animate = () => {
      setParticles((prev) =>
        prev.map((particle) => {
          const mouseInfluence = 0.5 + (1 - particle.size / 6) * 0.5;
          const targetX = lerp(particle.x, mouseRef.current.x, particle.speed * mouseInfluence);
          const targetY = lerp(particle.y, mouseRef.current.y, particle.speed * mouseInfluence);

          return {
            ...particle,
            x: targetX,
            y: targetY,
          };
        })
      );

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [prefersReducedMotion, particles.length]);

  if (prefersReducedMotion) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full will-change-transform"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </div>
  );
}
