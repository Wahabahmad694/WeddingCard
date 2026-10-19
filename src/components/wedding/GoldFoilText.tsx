import { motion } from "framer-motion";

interface GoldFoilTextProps {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
}

const GoldFoilText = ({ children, className = "", as = "h2", delay = 0 }: GoldFoilTextProps) => {
  const Tag = motion[as];

  return (
    <Tag
      className={`gold-foil ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
    >
      {children}
    </Tag>
  );
};

export default GoldFoilText;
