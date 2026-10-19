import { FC, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Copy,
  Calendar as CalendarIcon,
  MessageCircle,
  MapPin,
  Clock,
  Sparkles,
  FileText,
  X,
  Phone,
} from "lucide-react";
import { WeddingEvent, COUPLE, CONTACTS } from "@/data/weddingData";
import sceneMehndi from "@/assets/scene-mehndi.webp";
import sceneBarat from "@/assets/scene-barat.webp";
import sceneWalima from "@/assets/scene-walima.webp";
import { toast } from "sonner";

const sceneImages: Record<string, string> = {
  mehndi: sceneMehndi,
  barat: sceneBarat,
  walima: sceneWalima,
};

interface ChapterCardProps {
  event: WeddingEvent;
}

// Gold Floral Ornament for the Full Card Dialog
const FloralDivider = () => (
  <div className="flex items-center justify-center my-3 gap-2 text-amber-700/80">
    <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-transparent via-amber-700/50 to-amber-700/80" />
    <svg width="20" height="12" viewBox="0 0 24 14" fill="currentColor" className="text-amber-700 flex-shrink-0">
      <circle cx="12" cy="7" r="1.5" />
      <path d="M12 2C10.5 4 8 5 5 5C7 6.5 9 8 9 9.5C9 10.5 8 11.5 6 12C9 11.5 11 9.5 12 7C13 9.5 15 11.5 18 12C16 11.5 15 10.5 15 9.5C15 8 17 6.5 19 5C16 5 13.5 4 12 2Z" />
    </svg>
    <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-l from-transparent via-amber-700/50 to-amber-700/80" />
  </div>
);

const ChapterCard: FC<ChapterCardProps> = ({ event }) => {
  const [showFullCard, setShowFullCard] = useState(false);

  const handleCopyVenue = () => {
    navigator.clipboard.writeText(event.venue);
    toast.success(`Address copied: ${event.venueShort}`);
  };

  const handleAddCalendar = () => {
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Wahab & Zarbab Wedding//EN",
      "BEGIN:VEVENT",
      `SUMMARY:${event.title} - ${event.ceremony} | Wahab & Zarbab`,
      `DESCRIPTION:${event.subtitle}. Venue: ${event.venue}`,
      `LOCATION:${event.venue}`,
      `DTSTART:${event.isoDate.replace(/[-:]/g, "").split(".")[0]}Z`,
      `STATUS:CONFIRMED`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${event.id}-Wahab-Zarbab.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`${event.title} added to your calendar!`);
  };

  return (
    <div className="relative w-full min-h-[100svh] flex flex-col justify-between overflow-x-hidden">
      {/* 1. Full-bleed Animated Character Photo Background */}
      <motion.div
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      >
        <img
          src={sceneImages[event.theme]}
          alt={`${event.title} Ceremony`}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-top sm:object-center"
        />
      </motion.div>

      {/* 2. Cinematic Vignette Gradient Overlays */}
      {/* Top subtle vignette for header bar readability */}
      <div
        className="absolute top-0 inset-x-0 h-32 pointer-events-none z-10"
        style={{
          background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 0%, transparent 100%)",
        }}
      />

      {/* Center is left completely clear so the animated couple is 100% visible! */}

      {/* Bottom atmospheric vignette for event details and buttons */}
      <div
        className="absolute bottom-0 inset-x-0 h-[65%] sm:h-[55%] pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(to top, rgba(10, 6, 4, 0.96) 0%, rgba(10, 6, 4, 0.75) 45%, rgba(10, 6, 4, 0.3) 75%, transparent 100%)",
        }}
      />

      {/* 3. Floating Light Particles around the animated characters */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: (i % 3) * 2 + 3,
              height: (i % 3) * 2 + 3,
              backgroundColor: i % 2 === 0 ? "rgba(253, 224, 71, 0.6)" : "rgba(255, 255, 255, 0.5)",
              boxShadow: "0 0 8px rgba(253, 224, 71, 0.8)",
              left: `${(i * 23) % 100}%`,
              top: `${(i * 31) % 80}%`,
            }}
            animate={{
              y: [0, -35, 0],
              opacity: [0.3, 0.85, 0.3],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration: 4 + (i % 4),
              delay: i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* 4. Top Header Ceremony Pill */}
      <div className={`relative z-20 px-4 text-center ${event.id === "walima" ? "pt-8 sm:pt-6" : "pt-24 sm:pt-20"}`}>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-amber-300/40 text-amber-200 shadow-lg"
        >
          <Sparkles size={13} className="text-amber-400" />
          <span className="font-cinzel text-xs uppercase tracking-[0.2em] font-semibold">
            {event.ceremony}
          </span>
          <span className="text-amber-400/60">•</span>
          <span className="font-serif italic text-xs text-amber-100">
            {event.day}, {event.date}
          </span>
        </motion.div>
      </div>

      {/* 5. Bottom Overlay with Event Details and Quick Controls */}
      <motion.div
        className="relative z-20 w-full max-w-3xl mx-auto px-4 pb-20 sm:pb-12 pt-12 text-center text-white space-y-3"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Title & Couple Highlight */}
        <div>
          <h2 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight gold-foil-bright drop-shadow-lg">
            {event.title}
          </h2>

          <p className="font-serif italic text-sm sm:text-lg text-amber-100/90 drop-shadow mt-1">
            {event.id === "mehndi" ? (
              <span>Rasm-e-Hina of our beloved son <strong className="text-amber-300">{COUPLE.groom}</strong></span>
            ) : (
              <span>Celebrating <strong className="text-amber-300">{COUPLE.groom}</strong> with <strong className="text-amber-300">{COUPLE.bride}</strong></span>
            )}
          </p>
        </div>

        {/* Schedule & Venue Quick Info Card */}
        <div className="rounded-2xl bg-black/55 backdrop-blur-md border border-amber-400/30 p-3 sm:p-4 shadow-2xl max-w-xl mx-auto space-y-2">
          {/* Schedule */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-sans text-amber-100">
            {event.schedule.map((item, idx) => (
              <div key={idx} className="flex items-center gap-1.5">
                <Clock size={14} className="text-amber-400" />
                <span className="text-stone-300">{item.label}:</span>
                <span className="font-semibold text-amber-300">{item.time}</span>
              </div>
            ))}
          </div>

          {/* Venue Line */}
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-sans text-stone-200 pt-1 border-t border-white/10">
            <MapPin size={15} className="text-amber-400 flex-shrink-0" />
            <span className="font-medium truncate max-w-sm sm:max-w-md">
              {event.venue}
            </span>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1 max-w-xl mx-auto">
          <a
            href={event.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-600 text-stone-950 font-sans text-xs font-bold shadow-lg transition-transform hover:scale-105 cursor-pointer"
          >
            <ExternalLink size={13} />
            <span>Google Maps</span>
          </a>

          <button
            type="button"
            onClick={handleAddCalendar}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-black/60 hover:bg-black/80 text-white font-sans text-xs font-semibold border border-amber-300/50 shadow-md backdrop-blur-md transition-transform hover:scale-105 cursor-pointer"
          >
            <CalendarIcon size={13} className="text-amber-400" />
            <span>Save Date</span>
          </button>

          <button
            type="button"
            onClick={handleCopyVenue}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-black/60 hover:bg-black/80 text-white font-sans text-xs font-semibold border border-amber-300/50 shadow-md backdrop-blur-md transition-transform hover:scale-105 cursor-pointer"
          >
            <Copy size={13} className="text-amber-400" />
            <span>Copy Venue</span>
          </button>

          <button
            type="button"
            onClick={() => setShowFullCard(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-sans text-xs font-bold shadow-lg transition-transform hover:scale-105 cursor-pointer border border-amber-300/40"
          >
            <FileText size={13} className="text-amber-200" />
            <span>View Full Invitation</span>
          </button>
        </div>
      </motion.div>

      {/* 6. Full Invitation Modal Dialog (Available on-demand without blocking the animated characters) */}
      <AnimatePresence>
        {showFullCard && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md">
            <motion.div
              className="relative w-full max-w-lg rounded-xl shadow-2xl p-5 sm:p-8 text-stone-900 border-2 my-auto max-h-[90vh] overflow-y-auto"
              style={{
                background: "linear-gradient(180deg, #fffdf8 0%, #fbf7ee 50%, #f7f2e4 100%)",
                borderColor: "#b3882f",
                boxShadow: "0 25px 70px rgba(0, 0, 0, 0.6)",
              }}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setShowFullCard(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-stone-200 hover:bg-stone-300 text-stone-700 transition-colors cursor-pointer z-20"
                title="Close"
              >
                <X size={18} />
              </button>

              {/* Inner gold frame */}
              <div
                className="absolute inset-2 sm:inset-3 border rounded pointer-events-none"
                style={{ borderColor: "#c49a3a" }}
              />

              <div className="relative z-10 text-center">
                {/* Event Name */}
                <h3 className="font-serif italic text-3xl sm:text-4xl font-bold text-stone-900 pt-2">
                  {event.title}
                </h3>

                <FloralDivider />

                {/* Bismillah */}
                <div className="space-y-0.5 text-stone-800 mb-3">
                  <p className="font-serif italic text-xs sm:text-sm">In the Name of Allah,</p>
                  <p className="font-serif italic text-xs sm:text-sm">the Most Beneficent, the Most Merciful</p>
                </div>

                {/* Event text details */}
                {event.id === "mehndi" && (
                  <div className="space-y-2 text-xs sm:text-sm font-serif italic text-stone-800">
                    <p>Please join us to celebrate the</p>
                    <p className="text-xl sm:text-2xl font-bold text-stone-950 not-italic border-b border-stone-800 inline-block pb-0.5">
                      Rasm-e-Hina
                    </p>
                    <p>of our beloved son</p>
                    <h2 className="text-3xl sm:text-4xl font-bold text-stone-950 not-italic">
                      Wahab Ahmad
                    </h2>

                    <FloralDivider />

                    <div className="space-y-1">
                      <p className="font-bold text-stone-900 not-italic">Programme — In Sha Allah</p>
                      <p className="font-semibold text-stone-950">Friday, 1st January 2027</p>
                      <p>Reception of Guests: 7:00 PM</p>
                      <p>Dinner: 8:00 PM</p>
                    </div>

                    <FloralDivider />

                    <div className="space-y-1">
                      <p className="font-bold text-stone-900 not-italic">Venue</p>
                      <p>House #2, Block J, Sector II, DHA Rahbar Phase II, Lahore</p>
                    </div>

                    <FloralDivider />

                    <div className="space-y-1">
                      <p className="font-bold text-stone-900 not-italic">Eagerly Awaiting Your Presence</p>
                      <p className="text-xs text-stone-700 leading-relaxed max-w-sm mx-auto">
                        Binish, Ansa, Maryam, Aqsa, Javeria, Qudsia, Ramsha, Rijja, Nimra, Banafsha, Husna, Mushfira
                      </p>
                    </div>

                    <FloralDivider />

                    <div className="space-y-1">
                      <p className="font-bold text-stone-900 not-italic">Contact</p>
                      <p>Waqas Ahmad — 0313-4046343</p>
                      <p>Mozam Naseer — 0325-7630095</p>
                    </div>
                  </div>
                )}

                {event.id === "barat" && (
                  <div className="space-y-2 text-xs sm:text-sm font-serif italic text-stone-800">
                    <p className="text-xl sm:text-2xl font-bold text-stone-950 not-italic">
                      Mr. & Mrs. Kabeer Ahmad
                    </p>
                    <p>cordially invite you to the</p>
                    <p className="text-2xl sm:text-3xl font-bold text-stone-950 not-italic">
                      Wedding Ceremony
                    </p>
                    <p>of their beloved son</p>
                    <h2 className="text-3xl sm:text-4xl font-bold text-stone-950 not-italic">
                      Wahab Ahmad
                    </h2>
                    <p>with</p>
                    <h2 className="text-2xl sm:text-3xl font-bold text-stone-950 not-italic">
                      Zarbab Mubeen
                    </h2>

                    <FloralDivider />

                    <div className="space-y-1">
                      <p className="font-bold text-stone-900 not-italic">Programme — In Sha Allah</p>
                      <p className="font-semibold text-stone-950">Saturday, 2nd January 2027</p>
                      <p>Sehra Bandi — 5:00 PM</p>
                      <p>Departure of Barat — 6:00 PM</p>
                      <p className="text-xs text-stone-600">Departure From: House #2, Block J, Sector II, DHA Rahbar Phase II, Lahore</p>
                    </div>

                    <FloralDivider />

                    <div className="space-y-1">
                      <p className="font-bold text-stone-900 not-italic">Venue</p>
                      <p className="text-base font-semibold text-stone-950">Le Grand Chalet Royal</p>
                      <p className="text-xs">Plot 405 to 410, Block D2 Behind LDA Sports Complex, Johar Town, Lahore</p>
                    </div>

                    <FloralDivider />

                    <div className="grid grid-cols-2 gap-2 text-left pt-1">
                      <div>
                        <p className="font-bold underline text-stone-900 not-italic">RSVP</p>
                        <p className="text-xs">All Uncles, Aunts, Cousins, Friends and Their Families</p>
                      </div>
                      <div>
                        <p className="font-bold underline text-stone-900 not-italic">Contact</p>
                        <p className="text-xs">Waqas Ahmad — 0313-4046343</p>
                        <p className="text-xs">Mozam Naseer — 0325-7630095</p>
                      </div>
                    </div>
                  </div>
                )}

                {event.id === "walima" && (
                  <div className="space-y-2 text-xs sm:text-sm font-serif italic text-stone-800">
                    <p className="text-xl sm:text-2xl font-bold text-stone-950 not-italic">
                      Mr. & Mrs. Kabeer Ahmad
                    </p>
                    <p>cordially invite you to the</p>
                    <p className="text-2xl sm:text-3xl font-bold text-stone-950 not-italic">
                      Walima Ceremony
                    </p>
                    <p>celebrating the marriage of their beloved son</p>
                    <h2 className="text-3xl sm:text-4xl font-bold text-stone-950 not-italic">
                      Wahab Ahmad
                    </h2>
                    <p>with</p>
                    <h2 className="text-2xl sm:text-3xl font-bold text-stone-950 not-italic">
                      Zarbab Mubeen
                    </h2>

                    <FloralDivider />

                    <div className="space-y-1">
                      <p className="font-bold text-stone-900 not-italic">Programme — In Sha Allah</p>
                      <p className="font-semibold text-stone-950">Sunday, 3rd January 2027</p>
                      <p>Reception of Guests — 7:00 PM</p>
                      <p>Dinner — 8:00 PM</p>
                    </div>

                    <FloralDivider />

                    <div className="space-y-1">
                      <p className="font-bold text-stone-900 not-italic">Venue</p>
                      <p className="text-base font-semibold text-stone-950">Marquesina Hall</p>
                      <p className="text-xs">Garrison Golf & Country Club, Saddar Town, Lahore</p>
                    </div>

                    <FloralDivider />

                    <div className="grid grid-cols-2 gap-2 text-left pt-1">
                      <div>
                        <p className="font-bold underline text-stone-900 not-italic">RSVP</p>
                        <p className="text-xs">All Uncles, Aunts, Cousins, Friends and Their Families</p>
                      </div>
                      <div>
                        <p className="font-bold underline text-stone-900 not-italic">Contact</p>
                        <p className="text-xs">Waqas Ahmad — 0313-4046343</p>
                        <p className="text-xs">Mozam Naseer — 0325-7630095</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons in Modal */}
                <div className="mt-4 pt-3 border-t border-stone-300 flex items-center justify-center gap-2">
                  <a
                    href={event.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-600 hover:bg-amber-700 text-white font-sans text-xs font-semibold shadow"
                  >
                    <ExternalLink size={13} />
                    <span>Open Maps</span>
                  </a>
                  <a
                    href={CONTACTS[0].whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-sans text-xs font-semibold shadow"
                  >
                    <MessageCircle size={13} />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChapterCard;
