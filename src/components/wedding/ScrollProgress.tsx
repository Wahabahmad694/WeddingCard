import { motion } from "framer-motion";

const ScrollProgress = ({ progress }: { progress: number }) => {
  return (
    <div className="fixed right-3 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-1">
      <div className="w-0.5 h-24 rounded-full bg-muted overflow-hidden">
        <motion.div
          className="w-full rounded-full"
          style={{
            height: `${progress * 100}%`,
            background: "var(--gradient-gold)",
          }}
        />
      </div>
    </div>
  );
};

export default ScrollProgress;
