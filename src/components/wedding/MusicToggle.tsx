import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

interface MusicToggleProps {
  autoPlay?: boolean;
  disableToggle?: boolean;
}

const MusicToggle = ({ autoPlay = false, disableToggle = false }: MusicToggleProps) => {
  const [playing, setPlaying] = useState(autoPlay);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.play().catch(() => {
        // Autoplay might be blocked by browser
        setPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [playing]);

  useEffect(() => {
    // Auto-start music if specified
    if (autoPlay && audioRef.current) {
      audioRef.current.play().catch(() => {
        setPlaying(false);
      });
    }
  }, [autoPlay]);

  const toggle = () => {
    if (!disableToggle) {
      setPlaying(!playing);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        loop
        crossOrigin="anonymous"
      >
        <source src="/wedding-music.mp3" type="audio/mpeg" />
        <source src="/wedding-music.wav" type="audio/wav" />
        Your browser does not support the audio element.
      </audio>

      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, type: "spring" }}
        onClick={toggle}
        className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full glass-card flex items-center justify-center text-primary transition-transform ${
          disableToggle ? 'cursor-default opacity-70' : 'hover:scale-110 cursor-pointer'
        }`}
        aria-label={playing ? "Mute music" : "Play music"}
        disabled={disableToggle}
      >
        {playing ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </motion.button>
    </>
  );
};

export default MusicToggle;
