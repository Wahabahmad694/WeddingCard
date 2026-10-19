import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { COUPLE } from "@/data/weddingData";
import sceneNameReveal from "@/assets/scene-name-reveal.webp";
import { ArrowRight, Sparkles } from "lucide-react";

interface NameRevealProps {
  onComplete: () => void;
}

const RevealChar = ({
  char,
  index,
  totalDelay,
}: {
  char: string;
  index: number;
  totalDelay: number;
}) => {
  if (char === " ") return <span className="inline-block w-[0.25em]" />;

  const delay = totalDelay + index * 0.05;

  return (
    <motion.span
      className="inline-block gold-foil-bright drop-shadow-md"
      initial={{
        opacity: 0,
        y: 25 + Math.random() * 15,
        scale: 0.4,
        filter: "blur(6px)",
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
      }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {char}
    </motion.span>
  );
};

const NameReveal = ({ onComplete }: NameRevealProps) => {
  const [phase, setPhase] = useState<"particles" | "names" | "hold" | "exit">("particles");

  const particles = useMemo(
    () =>
      Array.from({ length: 45 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        delay: Math.random() * 0.8,
        duration: Math.random() * 2.5 + 2,
      })),
    []
  );

  const gatherParticles = useMemo(
    () =>
      Array.from({ length: 35 }, (_, i) => ({
        id: i,
        startX: Math.random() * 100,
        startY: Math.random() * 100,
        size: Math.random() * 3.5 + 1.5,
        delay: Math.random() * 0.5,
      })),
    []
  );

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("names"), 900);
    const t2 = setTimeout(() => setPhase("hold"), 4200);
    const t3 = setTimeout(() => setPhase("exit"), 6500);
    const t4 = setTimeout(() => onComplete(), 7200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "exit" ? (
        <motion.section
          className="fixed inset-0 z-[90] flex items-center justify-center overflow-hidden"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Cartoon Scene Background with gentle zoom */}
          <motion.div
            className="absolute inset-0"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          >
            <img
              src={sceneNameReveal}
              alt=""
              className="w-full h-full object-cover"
              style={{ filter: "blur(2.5px) brightness(0.45)" }}
            />
          </motion.div>

          {/* Deep Royal Vignette Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, hsl(25 25% 10% / 0.6) 0%, hsl(20 30% 6% / 0.9) 100%)",
            }}
          />
          <div className="absolute inset-0 pattern-islamic opacity-15 pointer-events-none" />

          {/* Skip / Enter Invitation Early Button */}
          <motion.button
            className="absolute top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full glass-card hover:bg-white/80 text-amber-300 font-sans text-xs uppercase tracking-widest cursor-pointer shadow-lg"
            onClick={onComplete}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <span>Enter Invitation</span>
            <ArrowRight size={14} />
          </motion.button>

          {/* Converging Golden Light Particles */}
          {phase === "particles" && (
            <div className="absolute inset-0 pointer-events-none">
              {gatherParticles.map((p) => (
                <motion.div
                  key={p.id}
                  className="absolute rounded-full"
                  style={{
                    width: p.size,
                    height: p.size,
                    backgroundColor: "hsl(var(--gold-glow))",
                    boxShadow: "0 0 10px #ffd700",
                    left: `${p.startX}%`,
                    top: `${p.startY}%`,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0.9, 0],
                    scale: [0, 1.8, 1, 0],
                    x: `${50 - p.startX}vw`,
                    y: `${50 - p.startY}vh`,
                  }}
                  transition={{
                    duration: 1.1,
                    delay: p.delay,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          )}

          {/* Ambient Floating Dust */}
          <div className="absolute inset-0 pointer-events-none">
            {particles.map((p) => (
              <motion.div
                key={p.id}
                className="absolute rounded-full"
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  width: p.size,
                  height: p.size,
                  backgroundColor: "hsl(var(--gold-glow))",
                  boxShadow: "0 0 8px rgba(255, 215, 0, 0.6)",
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 0.7, 0.3, 0.7, 0],
                  scale: [0, 1.2, 0.8, 1.2, 0],
                  y: [0, -45, -90],
                }}
                transition={{
                  duration: p.duration + 3,
                  delay: p.delay + 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Central Radial Golden Aura */}
          <motion.div
            className="absolute pointer-events-none"
            style={{
              width: "80vw",
              height: "80vw",
              maxWidth: 700,
              maxHeight: 700,
              borderRadius: "50%",
              background: "radial-gradient(circle, hsl(42 75% 60% / 0.22) 0%, transparent 70%)",
            }}
            animate={{ scale: [1, 1.25, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Cinematic Names & Blessings */}
          {(phase === "names" || phase === "hold") && (
            <div className="relative z-10 text-center px-4 max-w-xl mx-auto">
              {/* Islamic Calligraphic Blessing */}
              <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="mb-4 space-y-1"
              >
                <p className="font-arabic text-2xl sm:text-3xl text-amber-200/90 font-normal tracking-wide drop-shadow-md">
                  {COUPLE.arabicBismillah}
                </p>
                <p className="font-cinzel text-[11px] sm:text-xs uppercase tracking-[0.3em] text-amber-100/75">
                  The Royal Wedding Celebration
                </p>
              </motion.div>

              {/* Groom's Name Reveal */}
              <motion.div
                className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {COUPLE.groom.split("").map((char, i) => (
                  <RevealChar key={`groom-${i}`} char={char} index={i} totalDelay={0.1} />
                ))}
              </motion.div>

              {/* Weds Connector */}
              <motion.div
                className="my-3 sm:my-4 flex items-center justify-center gap-4"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4, duration: 0.6, type: "spring" }}
              >
                <div className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
                <span className="font-script text-3xl sm:text-4xl text-amber-200 drop-shadow">
                  Weds
                </span>
                <div className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
              </motion.div>

              {/* Bride's Name Reveal */}
              <motion.div
                className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {COUPLE.bride.split("").map((char, i) => (
                  <RevealChar key={`bride-${i}`} char={char} index={i} totalDelay={1.8} />
                ))}
              </motion.div>

              {/* Beloved Parents attribution */}
              <motion.div
                className="mt-6 space-y-1"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.8, duration: 0.6 }}
              >
                <p className="font-serif italic text-base sm:text-lg text-amber-100/90">
                  Beloved son of {COUPLE.hosts}
                </p>
                <p className="font-sans text-xs tracking-widest uppercase text-amber-300/80">
                  Lahore, Pakistan • January 2027
                </p>
              </motion.div>

              {/* Enter Button trigger */}
              <motion.div
                className="mt-8 flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.2 }}
              >
                <button
                  type="button"
                  onClick={onComplete}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500/30 via-amber-400/50 to-amber-500/30 border border-amber-300/60 hover:border-amber-300 hover:scale-105 transition-all text-amber-100 font-cinzel text-xs tracking-[0.2em] uppercase flex items-center gap-2 shadow-lg"
                >
                  <Sparkles size={14} className="text-amber-300" />
                  <span>View Chronicle</span>
                  <ArrowRight size={14} />
                </button>
              </motion.div>
            </div>
          )}
        </motion.section>
      ) : null}
    </AnimatePresence>
  );
};

export default NameReveal;
