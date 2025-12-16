import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, ChevronUp, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { InvestorSection } from "@/data/investorOverviewContent";
import { StrategicComparisonChart } from "./StrategicComparisonChart";
import { FeatureComparisonChart } from "./FeatureComparisonChart";

interface InvestorOverviewModalProps {
  section: InvestorSection | null;
  open: boolean;
  onClose: () => void;
}

export const InvestorOverviewModal = ({ section, open, onClose }: InvestorOverviewModalProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(false);

  const checkScroll = () => {
    if (contentRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
      setCanScrollUp(scrollTop > 10);
      setCanScrollDown(scrollTop < scrollHeight - clientHeight - 10);
    }
  };

  useEffect(() => {
    if (open) {
      setTimeout(checkScroll, 100);
    }
  }, [open, section]);

  const scrollTo = (direction: "up" | "down") => {
    if (contentRef.current) {
      const scrollAmount = direction === "up" ? -300 : 300;
      contentRef.current.scrollBy({ top: scrollAmount, behavior: "smooth" });
    }
  };

  if (!section) return null;

  const Icon = section.icon;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-4xl w-[95vw] p-0 bg-black border border-bronze-500/30 overflow-hidden">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-black border-b border-bronze-500/20 p-4 md:p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-bronze-500/10">
                    <Icon className="w-5 h-5 md:w-6 md:h-6 text-bronze-400" />
                  </div>
                  <div>
                    <h2 className="text-lg md:text-xl font-bold" style={{
                      background: 'linear-gradient(135deg, #E8D4C0 0%, #D4A574 50%, #B87333 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}>
                      {section.title}
                    </h2>
                    <p className="text-foreground/60 text-sm">{section.subtitle}</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-bronze-500/10 transition-colors group"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 text-foreground/60 group-hover:text-bronze-400 transition-colors" />
                </button>
              </div>
            </div>

            {/* Scroll up indicator */}
            {canScrollUp && (
              <button
                onClick={() => scrollTo("up")}
                className="absolute top-20 left-1/2 -translate-x-1/2 z-20 p-2 rounded-full bg-bronze-500/20 hover:bg-bronze-500/30 transition-colors animate-bounce"
              >
                <ChevronUp className="w-5 h-5 text-bronze-400" />
              </button>
            )}

            {/* Content */}
            <div
              ref={contentRef}
              onScroll={checkScroll}
              className="max-h-[70vh] overflow-y-auto p-4 md:p-6 scrollbar-thin scrollbar-thumb-bronze-500/30 scrollbar-track-transparent"
            >
              {section.hasCharts ? (
                <div className="space-y-8">
                  {/* Strategic Comparison */}
                  <div>
                    <h3 className="text-lg font-semibold text-bronze-400 mb-4">Strategic Comparison</h3>
                    <StrategicComparisonChart />
                  </div>

                  <div className="border-t border-bronze-500/20 pt-8">
                    <h3 className="text-lg font-semibold text-bronze-400 mb-4">Feature-by-Feature Comparison</h3>
                    <FeatureComparisonChart />
                  </div>

                  <div className="bg-bronze-500/10 rounded-lg p-4 text-center">
                    <p className="text-foreground/80">
                      Thrive covers nearly <span className="font-bold text-bronze-400">every category</span>, 
                      while competitors usually cover <span className="font-bold text-bronze-400">one or two</span>.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="prose prose-invert max-w-none">
                  {section.content.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-foreground/80 leading-relaxed mb-4 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}
            </div>

            {/* Scroll down indicator */}
            {canScrollDown && (
              <button
                onClick={() => scrollTo("down")}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 p-2 rounded-full bg-bronze-500/20 hover:bg-bronze-500/30 transition-colors animate-bounce"
              >
                <ChevronDown className="w-5 h-5 text-bronze-400" />
              </button>
            )}

            {/* Bottom gradient fade */}
            {canScrollDown && (
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent pointer-events-none" />
            )}
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};
