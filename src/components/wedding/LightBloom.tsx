import { motion } from "framer-motion";

interface LightBloomProps {
  isActive: boolean;
}

const LightBloom = ({ isActive }: LightBloomProps) => {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
      initial={{ opacity: 0 }}
      animate={isActive ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      <motion.div
        className="rounded-full"
        style={{
          width: "120vmax",
          height: "120vmax",
          background: "radial-gradient(ellipse at center, hsl(var(--gold-glow) / 0.5) 0%, hsl(var(--gold-light) / 0.2) 30%, transparent 70%)",
        }}
        initial={{ scale: 0.3, opacity: 0 }}
        animate={isActive ? { scale: 1, opacity: 1 } : { scale: 0.3, opacity: 0 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.div>
  );
};

export default LightBloom;
