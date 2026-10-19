import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";
import DustParticles from "./DustParticles";
import LightBloom from "./LightBloom";

interface DoorAnimationProps {
  isOpen: boolean;
  onOpen: () => void;
}

const DoorAnimation = ({ isOpen, onOpen }: DoorAnimationProps) => {
  const [bloomActive, setBloomActive] = useState(false);

  const handleDoorOpen = () => {
    // Delay bloom to sync with doors at ~60% open
    setTimeout(() => setBloomActive(true), 600);
    onOpen();
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          {/* Background */}
          <div className="absolute inset-0 paper-grain" style={{ background: "linear-gradient(180deg, hsl(25 30% 15%), hsl(20 25% 10%))" }} />
          <div className="absolute inset-0 pattern-islamic opacity-10" />

          {/* Dust in light beams */}
          <DustParticles count={20} />

          {/* Light bloom */}
          <LightBloom isActive={bloomActive} />

          {/* Light leak between doors */}
          <motion.div
            className="absolute z-[5] pointer-events-none"
            style={{
              width: 4,
              height: "55vh",
              background: "linear-gradient(180deg, transparent, hsl(var(--gold-glow) / 0.6), hsl(var(--gold-light) / 0.8), hsl(var(--gold-glow) / 0.6), transparent)",
              filter: "blur(6px)",
            }}
            animate={isOpen ? { opacity: 0, scaleX: 20 } : { opacity: [0.3, 0.6, 0.3] }}
            transition={isOpen ? { duration: 0.5 } : { repeat: Infinity, duration: 3, ease: "easeInOut" }}
          />

          {/* Door Container with camera zoom */}
          <motion.div
            className="relative w-[85vw] max-w-sm h-[70vh] max-h-[600px] flex overflow-hidden"
            animate={isOpen ? { scale: 1.15 } : { scale: 1 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Left Door */}
            <motion.div
              className="w-1/2 h-full origin-left relative"
              style={{ perspective: 1200 }}
              animate={isOpen ? { rotateY: -110 } : { rotateY: 0 }}
              transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                className="w-full h-full rounded-l-lg border border-r-0 flex items-center justify-end pr-2 relative"
                style={{
                  background: `linear-gradient(135deg, hsl(25 30% 30%), hsl(var(--door-wood)), hsl(25 35% 18%))`,
                  borderColor: "hsl(var(--gold) / 0.5)",
                }}
              >
                {/* Carved ornaments */}
                <div className="absolute inset-3 border rounded-l-sm opacity-40" style={{ borderColor: "hsl(var(--gold-light))" }}>
                  <div className="absolute inset-3 border rounded-l-sm opacity-50" style={{ borderColor: "hsl(var(--gold-light))" }}>
                    <div className="absolute inset-3 border rounded-l-sm opacity-30" style={{ borderColor: "hsl(var(--gold))" }} />
                  </div>
                </div>
                {/* Corner ornaments */}
                <div className="absolute top-4 left-4 w-6 h-6 border-t border-l opacity-50" style={{ borderColor: "hsl(var(--gold))" }} />
                <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l opacity-50" style={{ borderColor: "hsl(var(--gold))" }} />
                {/* Door handle */}
                <div className="w-3.5 h-10 rounded-full relative z-10" style={{ background: "var(--gradient-gold)", boxShadow: "0 0 12px hsl(var(--gold-glow) / 0.5)" }} />
              </div>
            </motion.div>

            {/* Right Door */}
            <motion.div
              className="w-1/2 h-full origin-right relative"
              style={{ perspective: 1200 }}
              animate={isOpen ? { rotateY: 110 } : { rotateY: 0 }}
              transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                className="w-full h-full rounded-r-lg border border-l-0 flex items-center justify-start pl-2 relative"
                style={{
                  background: `linear-gradient(225deg, hsl(25 30% 30%), hsl(var(--door-wood)), hsl(25 35% 18%))`,
                  borderColor: "hsl(var(--gold) / 0.5)",
                }}
              >
                <div className="absolute inset-3 border rounded-r-sm opacity-40" style={{ borderColor: "hsl(var(--gold-light))" }}>
                  <div className="absolute inset-3 border rounded-r-sm opacity-50" style={{ borderColor: "hsl(var(--gold-light))" }}>
                    <div className="absolute inset-3 border rounded-r-sm opacity-30" style={{ borderColor: "hsl(var(--gold))" }} />
                  </div>
                </div>
                <div className="absolute top-4 right-4 w-6 h-6 border-t border-r opacity-50" style={{ borderColor: "hsl(var(--gold))" }} />
                <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r opacity-50" style={{ borderColor: "hsl(var(--gold))" }} />
                <div className="w-3.5 h-10 rounded-full relative z-10" style={{ background: "var(--gradient-gold)", boxShadow: "0 0 12px hsl(var(--gold-glow) / 0.5)" }} />
              </div>
            </motion.div>
          </motion.div>

          {/* Text overlay */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-6 z-[6]"
            animate={isOpen ? { opacity: 0, scale: 0.9 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-serif text-sm tracking-[0.3em] uppercase mb-4 text-champagne/80">
              You Are Cordially Invited
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-center leading-tight gold-foil mb-2">
              Asad & Afreenish Khan
            </h1>
            <div className="w-16 h-px my-4" style={{ background: "var(--gradient-gold)" }} />
            <p className="font-serif text-lg italic text-champagne/60">
              Request the pleasure of your company
            </p>
          </motion.div>

          {/* Open prompt */}
          <motion.button
            className="absolute bottom-10 flex flex-col items-center gap-2 cursor-pointer z-10"
            onClick={handleDoorOpen}
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ChevronUp size={24} className="text-gold-light" />
            <span className="font-sans text-xs tracking-widest uppercase text-champagne/60">
              Swipe Up or Tap to Open
            </span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DoorAnimation;
