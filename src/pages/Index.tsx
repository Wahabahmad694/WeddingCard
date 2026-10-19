import { useState, useEffect, useCallback, useRef } from "react";
import { useScroll, motion } from "framer-motion";
import EnvelopeAnimation from "@/components/wedding/EnvelopeAnimation";
import NameReveal from "@/components/wedding/NameReveal";
import HeroSection from "@/components/wedding/HeroSection";
import StoryScene from "@/components/wedding/StoryScene";
import ContactFamilySection from "@/components/wedding/ContactFamilySection";
import ClosingSection from "@/components/wedding/ClosingSection";
import RosePetalsOverlay from "@/components/wedding/RosePetalsOverlay";
import ScrollProgress from "@/components/wedding/ScrollProgress";
import { EVENTS, COUPLE } from "@/data/weddingData";

const Index = () => {
  const [doorsOpen, setDoorsOpen] = useState(false);
  const [nameRevealDone, setNameRevealDone] = useState(false);
  const { scrollYProgress } = useScroll();
  const [progress, setProgress] = useState(0);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => setProgress(v));
    return unsubscribe;
  }, [scrollYProgress]);

  const handleOpen = useCallback(() => {
    setDoorsOpen(true);
  }, []);

  const handleNameRevealComplete = useCallback(() => {
    setNameRevealDone(true);
  }, []);

  const handleReplayEnvelope = useCallback(() => {
    setNameRevealDone(false);
    setDoorsOpen(false);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.code === "Space" || e.code === "Enter") && !doorsOpen) {
        handleOpen();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [doorsOpen, handleOpen]);

  return (
    <main
      className="relative bg-background overflow-y-auto min-h-screen select-none"
      style={{ scrollBehavior: "smooth" }}
      ref={mainRef}
    >
      {/* Royal 3D Envelope Opening */}
      <EnvelopeAnimation isOpen={doorsOpen} onOpen={handleOpen} />

      {/* Cinematic Golden Name Reveal */}
      {doorsOpen && !nameRevealDone && (
        <NameReveal onComplete={handleNameRevealComplete} />
      )}

      {/* Main Wedding Experience */}
      {doorsOpen && nameRevealDone && (
        <>
          {/* Top Floating Luxury Header Navigation */}
          <motion.header
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full glass-card border border-amber-300/40 shadow-lg flex items-center gap-2 sm:gap-4 max-w-[95vw] overflow-x-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <span className="font-serif font-bold text-amber-900 text-xs sm:text-sm tracking-wide hidden sm:inline px-1">
              {COUPLE.initials}
            </span>
            <div className="h-3 w-px bg-amber-300/60 hidden sm:inline" />

            <button
              type="button"
              onClick={() => scrollTo("hero")}
              className="text-[11px] sm:text-xs font-cinzel uppercase tracking-wider font-semibold text-amber-950/80 hover:text-amber-700 whitespace-nowrap cursor-pointer transition-colors"
            >
              Invitation
            </button>
            <button
              type="button"
              onClick={() => scrollTo("mehndi")}
              className="text-[11px] sm:text-xs font-cinzel uppercase tracking-wider font-semibold text-amber-950/80 hover:text-amber-700 whitespace-nowrap cursor-pointer transition-colors"
            >
              Mehndi
            </button>
            <button
              type="button"
              onClick={() => scrollTo("barat")}
              className="text-[11px] sm:text-xs font-cinzel uppercase tracking-wider font-semibold text-amber-950/80 hover:text-amber-700 whitespace-nowrap cursor-pointer transition-colors"
            >
              Barat
            </button>
            <button
              type="button"
              onClick={() => scrollTo("walima")}
              className="text-[11px] sm:text-xs font-cinzel uppercase tracking-wider font-semibold text-amber-950/80 hover:text-amber-700 whitespace-nowrap cursor-pointer transition-colors"
            >
              Walima
            </button>
            <button
              type="button"
              onClick={() => scrollTo("contacts")}
              className="text-[11px] sm:text-xs font-cinzel uppercase tracking-wider font-semibold text-amber-950/80 hover:text-amber-700 whitespace-nowrap cursor-pointer transition-colors"
            >
              RSVP & Contacts
            </button>
          </motion.header>

          {/* Falling Rose Petals & Golden Embers Overlay */}
          <RosePetalsOverlay />

          {/* Vertical Progress Bar */}
          <ScrollProgress progress={progress} />

          {/* Hero Section */}
          <div id="hero">
            <HeroSection />
          </div>

          {/* Event Story Scenes (Mehndi, Barat, Walima) */}
          {EVENTS.map((event, index) => (
            <StoryScene key={`${event.id}-${index}`} event={event} />
          ))}

          {/* Family Contact & RSVP Section */}
          <ContactFamilySection />

          {/* Closing Gratitude & Replay Section */}
          <ClosingSection onReopenEnvelope={handleReplayEnvelope} />
        </>
      )}
    </main>
  );
};

export default Index;
