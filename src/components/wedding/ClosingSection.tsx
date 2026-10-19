import { motion } from "framer-motion";
import { COUPLE } from "@/data/weddingData";
import GoldFoilText from "./GoldFoilText";
import { Heart, RotateCcw, Share2, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface ClosingSectionProps {
  onReopenEnvelope?: () => void;
}

const ClosingSection = ({ onReopenEnvelope }: ClosingSectionProps) => {
  const handleShare = async () => {
    const shareData = {
      title: "Wahab Ahmad & Zarbab Mubeen — Wedding Invitation",
      text: "You are cordially invited to celebrate the wedding celebrations of Wahab Ahmad with Zarbab Mubeen in Lahore (Jan 1 - 3, 2027).",
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Invitation link copied to clipboard!");
    }
  };

  return (
    <section className="relative w-screen min-h-screen snap-start snap-always flex items-center justify-center flex-shrink-0 px-4 py-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 silk-texture" style={{ background: "var(--gradient-warm)" }} />
      <div className="absolute inset-0 pattern-islamic opacity-10 pointer-events-none" />

      <motion.div
        className="text-center relative z-10 max-w-lg mx-auto w-full my-auto space-y-6"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center justify-center gap-2">
          <Sparkles size={16} className="text-amber-600" />
          <p className="text-xs tracking-[0.25em] uppercase text-amber-900 font-cinzel font-semibold">
            With Love & Gratitude
          </p>
          <Sparkles size={16} className="text-amber-600" />
        </div>

        <div>
          <GoldFoilText as="h2" className="font-serif text-3xl sm:text-5xl font-bold mb-2">
            Shukran & Thank You
          </GoldFoilText>
          <p className="font-serif text-base sm:text-lg text-muted-foreground italic">
            For being an irreplaceable part of our story and celebrations.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3">
          <div className="h-px w-14 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
          <div className="w-2.5 h-2.5 rotate-45 bg-amber-500 shadow-sm" />
          <div className="h-px w-14 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
        </div>

        <div className="space-y-1">
          <h3 className="font-serif text-2xl sm:text-4xl font-bold text-amber-950">
            {COUPLE.groom}
          </h3>
          <p className="font-script text-2xl sm:text-3xl text-amber-600 italic">&</p>
          <h3 className="font-serif text-2xl sm:text-4xl font-bold text-amber-950">
            {COUPLE.bride}
          </h3>
        </div>

        <div className="rounded-2xl glass-card p-4 sm:p-5 border border-amber-300/40 shadow-sm max-w-md mx-auto">
          <p className="font-serif text-sm sm:text-base font-semibold text-amber-950 mb-1">
            {COUPLE.hosts}
          </p>
          <p className="text-xs font-sans text-muted-foreground">
            DHA Rahbar • Johar Town • Saddar Town, Lahore
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {onReopenEnvelope && (
            <button
              type="button"
              onClick={onReopenEnvelope}
              className="flex items-center gap-2 px-4 py-2 rounded-full glass-card hover:bg-white text-amber-900 font-sans text-xs sm:text-sm font-medium border border-amber-300/60 shadow-sm transition-transform hover:scale-105 cursor-pointer"
            >
              <RotateCcw size={14} className="text-amber-700" />
              <span>Replay Royal Envelope</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-amber-600 hover:bg-amber-700 text-white font-sans text-xs sm:text-sm font-semibold shadow-md transition-transform hover:scale-105 cursor-pointer"
          >
            <Share2 size={14} />
            <span>Share Invitation</span>
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default ClosingSection;
