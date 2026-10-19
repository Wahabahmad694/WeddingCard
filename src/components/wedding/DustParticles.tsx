import { useMemo } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface DustParticlesProps {
  count?: number;
}

const DustParticles = ({ count = 25 }: DustParticlesProps) => {
  const isMobile = useIsMobile();
  const actualCount = isMobile ? Math.floor(count / 2) : count;

  const motes = useMemo(() =>
    Array.from({ length: actualCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 1,
      delay: Math.random() * 6,
      duration: Math.random() * 8 + 8,
      opacity: Math.random() * 0.5 + 0.15,
      drift: Math.random() * 40 - 20,
    })),
    [actualCount]
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-10">
      {motes.map((m) => (
        <div
          key={m.id}
          className="absolute rounded-full animate-dust-float"
          style={{
            left: `${m.x}%`,
            top: `${m.y}%`,
            width: m.size,
            height: m.size,
            backgroundColor: "hsl(var(--gold-light))",
            opacity: m.opacity,
            animationDelay: `${m.delay}s`,
            animationDuration: `${m.duration}s`,
            "--dust-drift": `${m.drift}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

export default DustParticles;
