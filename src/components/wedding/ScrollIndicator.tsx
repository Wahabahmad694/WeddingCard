import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const ScrollIndicator = () => {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      initial={{ opacity: 1, y: 0 }}
      animate={{ y: [0, 8, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <span className="text-xs text-muted-foreground uppercase tracking-widest">Scroll</span>
      <motion.div
        className="inline-flex"
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-5 h-5" style={{ color: "var(--gradient-gold-color, #d4af37)" }} />
      </motion.div>
    </motion.div>
  );
};

export default ScrollIndicator;
