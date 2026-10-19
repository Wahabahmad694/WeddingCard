import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, Volume2, VolumeX, Sparkles } from "lucide-react";
import baseFlower from "@/assets/base.webp";
import { COUPLE } from "@/data/weddingData";

interface EnvelopeAnimationProps {
  isOpen: boolean;
  onOpen: () => void;
}

interface SparkleParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  angle: number;
  distance: number;
}

const EnvelopeAnimation = ({ isOpen, onOpen }: EnvelopeAnimationProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sealCracked, setSealCracked] = useState(false);

  // Sparkles that burst when seal is clicked
  const burstParticles = useMemo<SparkleParticle[]>(() => {
    return Array.from({ length: 24 }, (_, i) => ({
      id: i,
      x: 0,
      y: 0,
      size: Math.random() * 5 + 3,
      angle: (i / 24) * 360,
      distance: Math.random() * 80 + 40,
    }));
  }, []);

  useEffect(() => {
    if (isOpen && audioRef.current) {
      audioRef.current.play().catch(() => {
        // Autoplay may be restricted by browser until user gesture
      });
      setIsPlaying(true);
    }
  }, [isOpen]);

  const handleEnvelopeOpen = () => {
    if (sealCracked || isOpen) return;
    setSealCracked(true);
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
    setTimeout(() => {
      onOpen();
    }, 600);
  };

  const toggleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/wedding-music.mp3" preload="none" loop />
      
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden cursor-pointer select-none"
            onClick={handleEnvelopeOpen}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Rich Background */}
            <div
              className="absolute inset-0"
              style={{
                background: "radial-gradient(ellipse at 50% 40%, hsl(40 40% 95%) 0%, hsl(36 30% 88%) 60%, hsl(30 25% 80%) 100%)",
              }}
            />
            <div className="absolute inset-0 pattern-islamic opacity-10 pointer-events-none" />
            <div className="absolute inset-0 silk-texture opacity-30 pointer-events-none" />

            {/* Ambient Floating Dust */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {Array.from({ length: 16 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-amber-400/40"
                  style={{
                    width: (i % 3) + 2,
                    height: (i % 3) + 2,
                    left: `${(i * 19) % 100}%`,
                    top: `${(i * 27) % 100}%`,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    opacity: [0.2, 0.7, 0.2],
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 4 + (i % 4),
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            {/* Quick Skip Intro Button in top right */}
            <div className="absolute top-6 right-6 z-30">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpen();
                }}
                className="text-xs uppercase tracking-widest px-4 py-2 rounded-full glass-card hover:bg-white/90 text-gold-deep transition-all font-sans font-medium flex items-center gap-1.5 shadow-sm"
              >
                <span>Skip Intro</span>
                <ChevronUp className="rotate-90" size={14} />
              </button>
            </div>

            {/* Main Envelope Presentation Area */}
            <motion.div
              className="relative w-full max-w-xl px-4 flex flex-col items-center justify-center"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Header Inscription */}
              <motion.div
                className="text-center mb-6 space-y-1"
                animate={sealCracked ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className="font-arabic text-xl sm:text-2xl text-amber-900/80 tracking-wide">
                  {COUPLE.arabicBismillah}
                </p>
                <p className="font-serif italic text-xs sm:text-sm text-muted-foreground tracking-wide">
                  {COUPLE.quranicVerse}
                </p>
              </motion.div>

              {/* 3D Envelope Container */}
              <motion.div
                className="relative w-full max-w-md sm:max-w-lg mx-auto"
                style={{ perspective: 1400 }}
                animate={sealCracked ? { scale: 1.02 } : { scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                {/* Envelope Base Cardboard */}
                <div
                  className="relative w-full rounded-xl shadow-2xl border gold-card-frame overflow-hidden"
                  style={{
                    aspectRatio: "16 / 10",
                    background: "linear-gradient(135deg, hsl(40 40% 97%) 0%, hsl(36 32% 93%) 50%, hsl(32 28% 90%) 100%)",
                    borderColor: "hsl(40 50% 65%)",
                    boxShadow: "0 25px 70px -15px rgba(90, 60, 20, 0.3), 0 0 0 1px rgba(212, 175, 55, 0.3)",
                  }}
                >
                  {/* Decorative corner flourishes */}
                  <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-amber-600/30 rounded-tl-sm pointer-events-none" />
                  <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-amber-600/30 rounded-tr-sm pointer-events-none" />
                  <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-amber-600/30 rounded-bl-sm pointer-events-none" />
                  <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-amber-600/30 rounded-br-sm pointer-events-none" />

                  {/* Top floral border */}
                  <div className="absolute top-0 left-0 w-full h-12 sm:h-16 opacity-50 pointer-events-none overflow-hidden">
                    <img src={baseFlower} alt="" className="w-full h-full object-cover object-bottom" />
                  </div>

                  {/* Inner golden filigree border */}
                  <div className="absolute inset-3.5 border border-dashed rounded-lg border-amber-500/25 pointer-events-none" />

                  {/* Envelope Flap 3D triangle */}
                  <motion.div
                    className="absolute top-0 left-0 w-full origin-top z-20 pointer-events-none"
                    animate={sealCracked ? { rotateX: -160 } : { rotateX: 0 }}
                    transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                    style={{
                      perspective: 1000,
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <div
                      className="w-full h-0 border-l-[180px] sm:border-l-[256px] border-r-[180px] sm:border-r-[256px] border-t-[110px] sm:border-t-[150px] border-transparent"
                      style={{
                        borderTopColor: "hsl(38 45% 82%)",
                        filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.12))",
                      }}
                    />
                  </motion.div>

                  {/* Center Content on the envelope face */}
                  <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-6 text-center">
                    {/* Wax Seal with W & Z */}
                    <div className="relative mb-3 sm:mb-4">
                      {/* Wax Seal Ribbon Tail */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-20 bg-gradient-to-b from-amber-700/60 to-amber-900/40 rotate-12 -z-10 rounded-sm" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-20 bg-gradient-to-b from-amber-700/60 to-amber-900/40 -rotate-12 -z-10 rounded-sm" />

                      {/* Main Wax Seal Button */}
                      <motion.div
                        className="wax-seal w-20 h-20 sm:w-24 sm:h-24 rounded-full flex flex-col items-center justify-center cursor-pointer relative"
                        animate={sealCracked ? { scale: 1.3, opacity: 0 } : { scale: [1, 1.03, 1] }}
                        transition={
                          sealCracked
                            ? { duration: 0.4 }
                            : { repeat: Infinity, duration: 2.5, ease: "easeInOut" }
                        }
                        whileHover={{ scale: 1.08 }}
                      >
                        {/* Embossed concentric gold ring */}
                        <div className="absolute inset-1.5 rounded-full border border-amber-300/40 pointer-events-none" />
                        <div className="absolute inset-2.5 rounded-full border border-dashed border-amber-300/30 pointer-events-none" />

                        {/* Monogram initials */}
                        <span className="font-serif text-amber-100 text-lg sm:text-2xl font-bold tracking-widest drop-shadow-md">
                          W ♡ Z
                        </span>
                        <span className="font-cinzel text-[9px] uppercase tracking-widest text-amber-200/90 font-medium">
                          Royal Seal
                        </span>
                      </motion.div>

                      {/* Sparkle explosion on click */}
                      {sealCracked && (
                        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                          {burstParticles.map((p) => {
                            const rad = (p.angle * Math.PI) / 180;
                            const targetX = Math.cos(rad) * p.distance;
                            const targetY = Math.sin(rad) * p.distance;
                            return (
                              <motion.div
                                key={p.id}
                                className="absolute rounded-full bg-amber-300"
                                style={{ width: p.size, height: p.size }}
                                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                                animate={{ x: targetX, y: targetY, opacity: 0, scale: 0 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                              />
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Invitation Text Box */}
                    <motion.div
                      className="px-4 py-3 rounded-xl bg-white/60 backdrop-blur-sm border border-amber-500/20 shadow-sm max-w-sm"
                      animate={sealCracked ? { opacity: 0, y: 15 } : { opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <p className="font-cinzel text-[10px] sm:text-xs tracking-[0.25em] uppercase text-amber-900/70 font-semibold mb-1">
                        Royal Wedding Invitation
                      </p>
                      <h1 className="font-serif text-2xl sm:text-3xl font-bold gold-foil leading-tight">
                        Wahab & Zarbab
                      </h1>
                      <div className="flex items-center justify-center gap-2 my-1">
                        <div className="h-px w-8 bg-amber-400/50" />
                        <span className="text-amber-600 text-xs font-serif italic">January 2027 • Lahore</span>
                        <div className="h-px w-8 bg-amber-400/50" />
                      </div>
                      <p className="text-[11px] font-sans text-muted-foreground">
                        {COUPLE.hosts}
                      </p>
                    </motion.div>
                  </div>
                </div>

                {/* Rising Letter Card (revealed when flap opens) */}
                {sealCracked && (
                  <motion.div
                    className="absolute inset-x-4 inset-y-2 rounded-xl p-6 glass-card text-center flex flex-col items-center justify-center shadow-2xl z-30"
                    initial={{ y: 0, opacity: 0, scale: 0.95 }}
                    animate={{ y: -80, opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      background: "linear-gradient(180deg, #fffcf5 0%, #faf3e3 100%)",
                      borderColor: "rgba(212, 175, 55, 0.5)",
                    }}
                  >
                    <p className="font-arabic text-xl text-amber-800 mb-1">{COUPLE.arabicBismillah}</p>
                    <p className="font-cinzel text-xs tracking-widest uppercase text-amber-900/80 mb-2">
                      Cordial Invitation
                    </p>
                    <h2 className="font-serif text-3xl font-bold gold-foil mb-2">
                      Wahab Ahmad & Zarbab Mubeen
                    </h2>
                    <p className="text-xs text-muted-foreground font-serif italic">
                      Opening the Chronicle of Celebrations...
                    </p>
                  </motion.div>
                )}
              </motion.div>

              {/* Tap to Open Prompt */}
              <motion.div
                className="mt-8 flex flex-col items-center gap-1.5 cursor-pointer"
                animate={sealCracked ? { opacity: 0 } : { y: [0, -6, 0], opacity: 1 }}
                transition={sealCracked ? { duration: 0.2 } : { repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <div className="w-10 h-10 rounded-full bg-white/80 border border-amber-400/40 shadow-md flex items-center justify-center text-amber-700">
                  <Sparkles size={18} className="animate-pulse text-amber-600" />
                </div>
                <span className="font-cinzel text-xs tracking-[0.2em] uppercase text-amber-900/80 font-semibold">
                  Tap Wax Seal to Open
                </span>
                <span className="font-sans text-[11px] text-muted-foreground/75">
                  Includes background music & animations
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Audio Controller for when open */}
      <motion.button
        className="fixed top-6 right-6 p-2.5 rounded-full glass-card hover:bg-white transition-all z-50 shadow-lg border border-amber-400/40 text-amber-800"
        onClick={toggleAudio}
        animate={isOpen ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.4 }}
        type="button"
        title={isPlaying ? "Mute Royal Music" : "Play Royal Music"}
      >
        {isPlaying ? (
          <div className="flex items-center gap-1.5 px-2">
            <Volume2 size={18} className="text-amber-700 animate-pulse" />
            <span className="text-[11px] font-sans font-medium text-amber-900 hidden sm:inline">Music Playing</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 px-2">
            <VolumeX size={18} className="text-muted-foreground" />
            <span className="text-[11px] font-sans font-medium text-muted-foreground hidden sm:inline">Music Muted</span>
          </div>
        )}
      </motion.button>
    </>
  );
};

export default EnvelopeAnimation;
