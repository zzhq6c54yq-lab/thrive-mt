import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { investorOverviewSections, InvestorSection } from "@/data/investorOverviewContent";
import { InvestorOverviewModal } from "./InvestorOverviewModal";

export const InvestorOverviewSection = () => {
  const [selectedSection, setSelectedSection] = useState<InvestorSection | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleCardClick = (section: InvestorSection) => {
    setSelectedSection(section);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setTimeout(() => setSelectedSection(null), 200);
  };

  return (
    <section className="mb-10 md:mb-16">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8" style={{
        background: 'linear-gradient(135deg, #E8D4C0 0%, #D4A574 50%, #B87333 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}>
        Investor Overview
      </h2>
      <p className="text-center text-foreground/60 mb-8 max-w-2xl mx-auto">
        Click any section below to explore our complete investment thesis
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {investorOverviewSections.map((section, index) => {
          const Icon = section.icon;
          return (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <Card
                onClick={() => handleCardClick(section)}
                className="bg-black border-bronze-500/20 hover:border-bronze-500/50 p-4 md:p-5 cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-bronze-500/10 group h-full"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="p-2 rounded-lg bg-bronze-500/10 group-hover:bg-bronze-500/20 transition-colors shrink-0">
                      <Icon className="w-5 h-5 text-bronze-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground group-hover:text-bronze-300 transition-colors line-clamp-2">
                        {section.title}
                      </h3>
                      <p className="text-sm text-foreground/60 mt-1">
                        {section.subtitle}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-foreground/40 group-hover:text-bronze-400 group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <InvestorOverviewModal
        section={selectedSection}
        open={modalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};
