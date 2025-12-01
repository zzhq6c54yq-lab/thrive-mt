import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SiteHeroSectionProps {
  title: string;
  subtitle: string;
  children?: ReactNode;
  accentColor?: string;
}

const SiteHeroSection = ({ 
  title, 
  subtitle, 
  children,
  accentColor = "bronze"
}: SiteHeroSectionProps) => {
  const getGradientColors = () => {
    switch (accentColor) {
      case "lavender":
        return "from-purple-400 to-purple-600";
      case "teal":
        return "from-teal-400 to-teal-600";
      case "rose":
        return "from-rose-400 to-rose-600";
      default:
        return "from-[#E8D4C0] via-[#D4A574] to-[#B87333]";
    }
  };

  return (
    <section className="relative py-24 px-6 overflow-hidden bg-black">
      {/* Subtle bronze accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4A574] to-transparent opacity-40" />

      {/* Content */}
      <div className="container mx-auto relative z-10 text-center max-w-4xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r ${getGradientColors()} bg-clip-text text-transparent leading-tight`}
        >
          {title}
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-white/70 mb-8 leading-relaxed"
        >
          {subtitle}
        </motion.p>

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default SiteHeroSection;
