import { useRef, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

type SceneTheme = "mehndi" | "barat" | "walima";

interface SceneBackgroundProps {
  theme: SceneTheme;
}

const themeConfig = {
  mehndi: {
    // Golden evening sunset
    gradient: "linear-gradient(180deg, hsl(30 50% 28%) 0%, hsl(28 55% 22%) 30%, hsl(25 45% 16%) 60%, hsl(20 40% 12%) 100%)",
    bokehColor: "hsl(35 70% 55%)",
    bokehCount: 10,
    particleColor: "hsl(var(--gold-glow))",
    overlay: "pattern-floral",
    ambientGlow: "radial-gradient(ellipse at 50% 20%, hsl(30 60% 45% / 0.2) 0%, transparent 70%)",
  },
  barat: {
    // Deep royal night
    gradient: "linear-gradient(180deg, hsl(25 20% 8%) 0%, hsl(22 18% 6%) 40%, hsl(20 15% 5%) 70%, hsl(18 12% 4%) 100%)",
    bokehColor: "hsl(42 65% 60%)",
    bokehCount: 14,
    particleColor: "hsl(var(--gold-light))",
    overlay: "pattern-islamic",
    ambientGlow: "radial-gradient(ellipse at 50% 30%, hsl(40 50% 50% / 0.12) 0%, transparent 60%)",
  },
  walima: {
    // Fresh daylight garden
    gradient: "linear-gradient(180deg, hsl(45 40% 92%) 0%, hsl(42 35% 88%) 30%, hsl(40 30% 85%) 60%, hsl(38 28% 82%) 100%)",
    bokehColor: "hsl(45 40% 80%)",
    bokehCount: 6,
    particleColor: "hsl(var(--gold-glow))",
    overlay: "pattern-floral",
    ambientGlow: "radial-gradient(ellipse at 50% 0%, hsl(45 60% 90% / 0.4) 0%, transparent 60%)",
  },
};

const SceneBackground = ({ theme }: SceneBackgroundProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const config = themeConfig[theme];

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const farY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const midY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const decoY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  const bokehCount = isMobile ? Math.floor(config.bokehCount / 2) : config.bokehCount;

  const bokehs = useMemo(
    () =>
      Array.from({ length: bokehCount }, (_, i) => ({
        id: i,
        x: Math.random() * 90 + 5,
        y: Math.random() * 80 + 10,
        size: Math.random() * 80 + (isMobile ? 40 : 30),
        opacity: Math.random() * 0.15 + 0.05,
        delay: Math.random() * 4,
      })),
    [bokehCount, isMobile]
  );

  const particles = useMemo(
    () =>
      Array.from({ length: isMobile ? 8 : 15 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 3 + 1.5,
        delay: Math.random() * 6,
        duration: Math.random() * 6 + 6,
        opacity: Math.random() * 0.4 + 0.1,
      })),
    [isMobile]
  );

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      {/* Layer 0: Color gradient background */}
      <motion.div
        className="absolute inset-0"
        style={{ y: farY, background: config.gradient }}
      />

      {/* Layer 2: Bokeh / patterns */}
      <motion.div className="absolute inset-0" style={{ y: midY }}>
        <div className={`absolute inset-0 ${config.overlay} opacity-10`} />
        {bokehs.map((b) => (
          <div
            key={b.id}
            className="absolute rounded-full animate-bokeh-pulse"
            style={{
              left: `${b.x}%`,
              top: `${b.y}%`,
              width: b.size,
              height: b.size,
              background: `radial-gradient(circle, ${config.bokehColor} 0%, transparent 70%)`,
              opacity: b.opacity,
              animationDelay: `${b.delay}s`,
            }}
          />
        ))}
      </motion.div>

      {/* Layer 3: Decoration particles */}
      <motion.div className="absolute inset-0" style={{ y: decoY }}>
        {particles.map((p) => (
          <div
            key={p.id}
            className={`absolute rounded-full ${theme === "walima" ? "animate-breeze-drift" : "animate-particle-rise"}`}
            style={{
              left: `${p.x}%`,
              width: p.size,
              height: p.size,
              backgroundColor: config.particleColor,
              opacity: p.opacity,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </motion.div>

      {/* Ambient glow layer */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: config.ambientGlow }}
      />

      {/* Light rays for walima (daylight) */}
      {theme === "walima" && <div className="absolute inset-0 light-rays" />}

      {/* Sunset rays for mehndi (golden hour) */}
      {theme === "mehndi" && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(160deg, transparent 30%, hsl(30 60% 50% / 0.08) 45%, transparent 60%), linear-gradient(140deg, transparent 40%, hsl(35 55% 45% / 0.06) 50%, transparent 65%)",
          }}
        />
      )}

      {/* Night vignette for barat */}
      {theme === "barat" && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, hsl(20 15% 3% / 0.5) 100%)",
          }}
        />
      )}
    </div>
  );
};

export default SceneBackground;
