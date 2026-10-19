import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { WeddingEvent } from "@/data/weddingData";
import { Calendar, Clock, MapPin } from "lucide-react";

interface EventCardProps {
  event: WeddingEvent;
  index: number;
}

const themeStyles: Record<WeddingEvent["theme"], { accent: string; bg: string; pattern: string }> = {
  mehndi: {
    accent: "hsl(var(--mehndi))",
    bg: "hsl(var(--mehndi-light) / 0.1)",
    pattern: "pattern-floral",
  },
  barat: {
    accent: "hsl(var(--gold))",
    bg: "hsl(var(--gold-light) / 0.1)",
    pattern: "pattern-islamic",
  },
  walima: {
    accent: "hsl(var(--gold))",
    bg: "hsl(var(--spotlight) / 0.15)",
    pattern: "",
  },
};

const EventCard = ({ event, index }: EventCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.85, 1, 1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.3]);

  const style = themeStyles[event.theme];

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-center relative snap-section px-4 py-20"
    >
      {/* Background layers */}
      <div className={`absolute inset-0 ${style.pattern} opacity-20`} />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: style.bg }}
      />

      {/* Spotlight for walima */}
      {event.theme === "walima" && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--gradient-spotlight)" }}
        />
      )}

      <motion.div
        style={{ y, scale, opacity }}
        className="relative z-10 w-full max-w-md mx-auto"
      >
        <motion.div
          className="glass-card rounded-2xl p-8 sm:p-10 text-center"
          whileHover={{ rotateX: 2, rotateY: 2 }}
          transition={{ type: "spring", stiffness: 300 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Accent top border */}
          <div
            className="absolute top-0 left-6 right-6 h-0.5 rounded-full"
            style={{ background: `linear-gradient(90deg, transparent, ${style.accent}, transparent)` }}
          />

          {/* Event number */}
          <span
            className="font-serif text-6xl font-light absolute -top-4 -right-2 select-none"
            style={{ color: `${style.accent}`, opacity: 0.12 }}
          >
            0{index + 1}
          </span>

          <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-2 font-sans">
            {event.subtitle}
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold mb-6 gold-text">
            {event.title}
          </h2>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-10 bg-border" />
            <div
              className="w-2 h-2 rotate-45"
              style={{ backgroundColor: style.accent }}
            />
            <div className="h-px w-10 bg-border" />
          </div>

          {/* Info rows */}
          <div className="space-y-4 text-sm font-sans">
            <div className="flex items-center justify-center gap-3 text-muted-foreground">
              <Calendar size={16} style={{ color: style.accent }} />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-muted-foreground">
              <Clock size={16} style={{ color: style.accent }} />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-muted-foreground">
              <MapPin size={16} style={{ color: style.accent }} />
              <span>{event.venue}</span>
            </div>
          </div>

          {/* Bottom accent */}
          <div
            className="absolute bottom-0 left-6 right-6 h-0.5 rounded-full"
            style={{ background: `linear-gradient(90deg, transparent, ${style.accent}, transparent)` }}
          />
        </motion.div>

        {/* Scroll hint */}
        {index < 2 && (
          <motion.div
            className="flex flex-col items-center mt-8 text-muted-foreground"
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <div className="w-px h-6 bg-border" />
            <span className="text-[10px] tracking-widest uppercase mt-2 font-sans">
              Scroll
            </span>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default EventCard;
