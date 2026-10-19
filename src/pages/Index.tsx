import { useState, useEffect, useCallback, useRef } from "react";
import { useScroll } from "framer-motion";
import EnvelopeAnimation from "@/components/wedding/EnvelopeAnimation";
import NameReveal from "@/components/wedding/NameReveal";
import HeroSection from "@/components/wedding/HeroSection";
import StoryScene from "@/components/wedding/StoryScene";
import ContactFamilySection from "@/components/wedding/ContactFamilySection";
import ClosingSection from "@/components/wedding/ClosingSection";
import RosePetalsOverlay from "@/components/wedding/RosePetalsOverlay";
import ScrollProgress from "@/components/wedding/ScrollProgress";
import { EVENTS } from "@/data/weddingData";

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
