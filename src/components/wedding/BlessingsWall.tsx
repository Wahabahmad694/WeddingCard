import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Send, MessageCircleHeart } from "lucide-react";
import { toast } from "sonner";
import { COUPLE } from "@/data/weddingData";

interface Blessing {
  id: string;
  sender: string;
  message: string;
  likes: number;
  time: string;
}

const DEFAULT_BLESSINGS: Blessing[] = [
  {
    id: "1",
    sender: "Family & Elders",
    message: "بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ — May Allah bless this sacred union with boundless joy, peace, and mutual love.",
    likes: 24,
    time: "Family Blessing",
  },
  {
    id: "2",
    sender: "Binish & Cousins",
    message: "Heartiest congratulations to our dearest Wahab Bhai and sweet Zarbab Bhabi! Counting down the moments to the Mehndi night!",
    likes: 19,
    time: "Cousins & Sisters",
  },
  {
    id: "3",
    sender: "Waqas Ahmad",
    message: "Praying for a lifetime of unconditional love, laughter, and prosperity for Wahab & Zarbab. Welcome to the family!",
    likes: 16,
    time: "Warm Wishes",
  },
];

const QUICK_DUAS = [
  "بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ",
  "May Allah bless your married life with immense joy, peace, and prosperity!",
  "Heartiest congratulations to Wahab & Zarbab! Wishing you both an eternal journey of love.",
  "May your home be blessed with tranquility, harmony, and barakah. Ameen!",
];

const BlessingsWall = () => {
  const [blessings, setBlessings] = useState<Blessing[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("wahab_zarbab_blessings");
    if (saved) {
      try {
        setBlessings(JSON.parse(saved));
      } catch {
        setBlessings(DEFAULT_BLESSINGS);
      }
    } else {
      setBlessings(DEFAULT_BLESSINGS);
    }
  }, []);

  const saveBlessings = (newList: Blessing[]) => {
    setBlessings(newList);
    localStorage.setItem("wahab_zarbab_blessings", JSON.stringify(newList));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      toast.error("Please enter a prayer or blessing!");
      return;
    }

    setIsSubmitting(true);
    const newBlessing: Blessing = {
      id: Date.now().toString(),
      sender: name.trim() || "Well-wisher",
      message: message.trim(),
      likes: 1,
      time: "Just now",
    };

    const updated = [newBlessing, ...blessings];
    saveBlessings(updated);

    // Trigger celebration effects
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 3000);

    setName("");
    setMessage("");
    setIsSubmitting(false);
    toast.success("Your blessing has been presented to the couple! JazakAllah Khair.");
  };

  const handleLike = (id: string) => {
    const updated = blessings.map((b) =>
      b.id === id ? { ...b, likes: b.likes + 1 } : b
    );
    saveBlessings(updated);
    toast.success("Blessing amplified! ❤️");
  };

  return (
    <section
      id="blessings"
      className="relative w-screen min-h-screen snap-start snap-always flex flex-col items-center justify-center px-4 py-16 overflow-hidden flex-shrink-0"
    >
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, hsl(38 35% 94%) 0%, hsl(40 40% 96%) 50%, hsl(35 30% 92%) 100%)",
        }}
      />
      <div className="absolute inset-0 pattern-islamic opacity-10 pointer-events-none" />

      {/* Celebration Confetti burst particles */}
      <AnimatePresence>
        {showCelebration && (
          <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
            {Array.from({ length: 40 }).map((_, i) => {
              const angle = (i / 40) * 360;
              const rad = (angle * Math.PI) / 180;
              const distance = Math.random() * 250 + 100;
              return (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: (i % 3) * 4 + 6,
                    height: (i % 3) * 4 + 6,
                    backgroundColor: i % 2 === 0 ? "#d4af37" : "#e11d48",
                  }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                  animate={{
                    x: Math.cos(rad) * distance,
                    y: Math.sin(rad) * distance,
                    opacity: 0,
                    scale: 1.5,
                  }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
              );
            })}
          </div>
        )}
      </AnimatePresence>

      <div className="relative z-10 w-full max-w-3xl mx-auto my-auto">
        {/* Section Header */}
        <div className="text-center space-y-2 mb-8">
          <div className="flex items-center justify-center gap-2">
            <Sparkles size={16} className="text-amber-600" />
            <span className="font-cinzel text-xs uppercase tracking-[0.25em] text-amber-800 font-semibold">
              Prayers & Du'as
            </span>
            <Sparkles size={16} className="text-amber-600" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold gold-foil">
            Send Your Blessings
          </h2>

          <p className="font-serif italic text-sm sm:text-base text-muted-foreground max-w-lg mx-auto">
            Leave a heartfelt prayer or dua for {COUPLE.groom} & {COUPLE.bride} as they embark on this sacred journey.
          </p>
        </div>

        {/* Input Form */}
        <motion.div
          className="rounded-3xl glass-card p-6 sm:p-8 shadow-xl border border-amber-300/40 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-cinzel uppercase tracking-wider text-amber-900/80 font-semibold mb-1">
                  Your Name / Relation
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Uncle Farooq / Cousin Maryam"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/80 border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans text-sm text-foreground"
                />
              </div>
              <div>
                <label className="block text-xs font-cinzel uppercase tracking-wider text-amber-900/80 font-semibold mb-1">
                  Quick Select a Du'a
                </label>
                <select
                  onChange={(e) => {
                    if (e.target.value) setMessage(e.target.value);
                  }}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/80 border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans text-xs sm:text-sm text-foreground"
                >
                  <option value="">-- Choose an authentic prayer --</option>
                  {QUICK_DUAS.map((d, i) => (
                    <option key={i} value={d}>
                      {d.slice(0, 45)}...
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-cinzel uppercase tracking-wider text-amber-900/80 font-semibold mb-1">
                Your Du'a / Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your prayers, blessings, and warm regards..."
                rows={3}
                className="w-full px-4 py-2.5 rounded-xl bg-white/80 border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans text-sm text-foreground resize-none"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-amber-600 hover:bg-amber-700 text-white font-sans text-sm font-semibold shadow-md transition-transform hover:scale-105 cursor-pointer disabled:opacity-50"
              >
                <Send size={15} />
                <span>Send Blessing</span>
              </button>
            </div>
          </form>
        </motion.div>

        {/* Existing Blessings Feed */}
        <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
          {blessings.map((b) => (
            <motion.div
              key={b.id}
              className="p-4 rounded-2xl bg-white/85 border border-amber-200/70 shadow-sm flex items-start justify-between gap-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-serif font-bold text-amber-950 text-base">
                    {b.sender}
                  </span>
                  <span className="text-[10px] font-sans text-muted-foreground bg-amber-100/60 px-2 py-0.5 rounded-full">
                    {b.time}
                  </span>
                </div>
                <p className="font-serif text-sm sm:text-base text-foreground/90 italic leading-relaxed">
                  "{b.message}"
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleLike(b.id)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 text-xs font-sans font-medium transition-transform hover:scale-110 cursor-pointer"
                title="Send Barakah"
              >
                <Heart size={14} className="fill-rose-500 text-rose-500" />
                <span>{b.likes}</span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlessingsWall;
