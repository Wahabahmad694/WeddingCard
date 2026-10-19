import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { COUPLE, EVENTS } from "@/data/weddingData";
import GoldFoilText from "./GoldFoilText";
import ScrollIndicator from "./ScrollIndicator";
import { Calendar, Share2, Sparkles, MapPin } from "lucide-react";
import { toast } from "sonner";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const HeroSection = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date(COUPLE.weddingTargetDate).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

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
        // user cancelled share
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Invitation link copied to clipboard!");
    }
  };

  const handleDownloadCalendar = () => {
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Wahab and Zarbab Wedding//EN",
      "BEGIN:VEVENT",
      "SUMMARY:Wahab Ahmad & Zarbab Mubeen Wedding Celebrations",
      "DESCRIPTION:Wedding celebrations of Wahab Ahmad & Zarbab Mubeen (Mehndi Jan 1, Barat Jan 2, Walima Jan 3) in Lahore.",
      "LOCATION:Lahore, Pakistan",
      "DTSTART:20270101T140000Z",
      "DTEND:20270103T190000Z",
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Wahab-Zarbab-Wedding.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Wedding event downloaded to your calendar!");
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full min-h-[100svh] snap-start snap-always flex flex-col items-center justify-center flex-shrink-0 px-4 pt-24 pb-16 sm:py-16 overflow-x-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 silk-texture" style={{ background: "var(--gradient-warm)" }} />
      <div className="absolute inset-0 pattern-islamic opacity-10 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "var(--gradient-spotlight)" }} />

      <motion.div
        className="text-center relative z-10 max-w-2xl mx-auto w-full my-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        {/* Arabic Inscription */}
        <motion.div
          className="space-y-1 mb-4"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <p className="font-arabic text-2xl sm:text-3xl text-amber-800 drop-shadow-sm">
            {COUPLE.arabicBismillah}
          </p>
          <p className="text-[11px] sm:text-xs tracking-[0.25em] uppercase text-muted-foreground font-sans">
            {COUPLE.quranicVerse}
          </p>
        </motion.div>

        {/* Hosts invitation message */}
        <motion.div
          className="my-3 px-4 py-2 rounded-full inline-block bg-amber-50/70 border border-amber-300/40 shadow-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <p className="font-serif italic text-sm sm:text-base text-amber-950 font-medium">
            {COUPLE.hosts} cordially invite you to celebrate the marriage of their beloved son
          </p>
        </motion.div>

        {/* Couple Names */}
        <div className="my-2">
          <GoldFoilText
            as="h1"
            className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold leading-tight"
            delay={0.3}
          >
            {COUPLE.groom}
          </GoldFoilText>

          <motion.div
            className="flex items-center justify-center gap-3 my-2"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45 }}
          >
            <div className="h-px w-10 sm:w-16 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
            <span className="font-script text-2xl sm:text-3xl text-amber-700 italic">
              with
            </span>
            <div className="h-px w-10 sm:w-16 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
          </motion.div>

          <GoldFoilText
            as="h1"
            className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold leading-tight"
            delay={0.6}
          >
            {COUPLE.bride}
          </GoldFoilText>
        </div>

        {/* Date & Location Badges */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mt-4 text-xs sm:text-sm font-sans text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/60 text-amber-900 border border-amber-300/40 font-medium">
            <Calendar size={14} className="text-amber-700" />
            1st — 3rd January 2027
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/60 text-amber-900 border border-amber-300/40 font-medium">
            <MapPin size={14} className="text-amber-700" />
            Lahore, Pakistan
          </span>
        </motion.div>

        {/* Live Countdown Timer */}
        <motion.div
          className="my-6 p-4 rounded-2xl glass-card max-w-md mx-auto shadow-md border border-amber-300/50"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9 }}
        >
          <p className="font-cinzel text-[10px] sm:text-xs uppercase tracking-[0.25em] text-amber-800 font-semibold mb-3 flex items-center justify-center gap-1.5">
            <Sparkles size={12} className="text-amber-600" />
            <span>Celebration Countdown</span>
            <Sparkles size={12} className="text-amber-600" />
          </p>

          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="p-2 sm:p-3 rounded-xl bg-white/80 border border-amber-200/60 shadow-sm">
              <span className="block font-serif text-2xl sm:text-3xl font-bold text-amber-900 leading-tight">
                {timeLeft.days}
              </span>
              <span className="text-[10px] uppercase font-sans tracking-wider text-muted-foreground">
                Days
              </span>
            </div>
            <div className="p-2 sm:p-3 rounded-xl bg-white/80 border border-amber-200/60 shadow-sm">
              <span className="block font-serif text-2xl sm:text-3xl font-bold text-amber-900 leading-tight">
                {timeLeft.hours}
              </span>
              <span className="text-[10px] uppercase font-sans tracking-wider text-muted-foreground">
                Hours
              </span>
            </div>
            <div className="p-2 sm:p-3 rounded-xl bg-white/80 border border-amber-200/60 shadow-sm">
              <span className="block font-serif text-2xl sm:text-3xl font-bold text-amber-900 leading-tight">
                {timeLeft.minutes}
              </span>
              <span className="text-[10px] uppercase font-sans tracking-wider text-muted-foreground">
                Mins
              </span>
            </div>
            <div className="p-2 sm:p-3 rounded-xl bg-white/80 border border-amber-200/60 shadow-sm">
              <span className="block font-serif text-2xl sm:text-3xl font-bold text-amber-900 leading-tight">
                {timeLeft.seconds}
              </span>
              <span className="text-[10px] uppercase font-sans tracking-wider text-muted-foreground">
                Secs
              </span>
            </div>
          </div>
        </motion.div>

        {/* Quick Action Buttons */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 mt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
        >
          <button
            type="button"
            onClick={handleDownloadCalendar}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-600 hover:bg-amber-700 text-white font-sans text-xs sm:text-sm font-medium shadow-md transition-transform hover:scale-105"
          >
            <Calendar size={15} />
            <span>Save to Calendar</span>
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 rounded-full glass-card hover:bg-white text-amber-900 font-sans text-xs sm:text-sm font-medium border border-amber-300/50 shadow-sm transition-transform hover:scale-105"
          >
            <Share2 size={15} className="text-amber-700" />
            <span>Share Invitation</span>
          </button>
        </motion.div>

        {/* Quick Jump Event Navigation Tabs */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-2 mt-6 pt-4 border-t border-amber-300/30"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.1 }}
        >
          {EVENTS.map((event) => (
            <button
              key={event.id}
              type="button"
              onClick={() => scrollToSection(event.id)}
              className="px-3 py-1.5 rounded-full text-xs font-sans font-medium bg-white/70 hover:bg-white text-amber-900 border border-amber-200 shadow-sm transition-colors cursor-pointer"
            >
              {event.title} • {event.day}
            </button>
          ))}
          <button
            type="button"
            onClick={() => scrollToSection("contacts")}
            className="px-3 py-1.5 rounded-full text-xs font-sans font-medium bg-white/70 hover:bg-white text-amber-900 border border-amber-200 shadow-sm transition-colors cursor-pointer"
          >
            Contacts & RSVP
          </button>
        </motion.div>
      </motion.div>

      <ScrollIndicator />
    </section>
  );
};

export default HeroSection;
