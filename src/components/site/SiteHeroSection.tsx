import { motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";

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
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    // Generate 15 particles for hero sections
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);
  }, []);

  const getGradientColors = () => {
    switch (accentColor) {
      case "lavender":
        return "from-purple-400 to-purple-600";
      case "teal":
        return "from-teal-400 to-teal-600";
      case "rose":
        return "from-rose-400 to-rose-600";
      default:
        return "from-bronze-400 to-bronze-600";
    }
  };

  return (
    <section className="relative py-20 px-6 overflow-hidden bg-gradient-to-br from-[#0F1319] via-[#141921] to-[#1A1F2C]">
      {/* Animated Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-bronze-400/40 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Breathing Accent Glow */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-bronze-500/10 rounded-full blur-[120px]"
        animate={{
          opacity: [0.2, 0.4, 0.2],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Content */}
      <div className="container mx-auto relative z-10 text-center max-w-4xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r ${getGradientColors()} bg-clip-text text-transparent`}
          style={{
            textShadow: "0 0 30px rgba(184, 115, 51, 0.3)",
          }}
        >
          {title}
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-foreground/80 mb-8"
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
