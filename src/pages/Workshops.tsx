import React from "react";
import { useNavigate } from "react-router-dom";
import { workshopData } from "@/data/workshopData";
import Page from "@/components/Page";
import { Button } from "@/components/ui/button";
import { Play, Clock, ArrowRight, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const Workshops = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleBack = () => {
    navigate("/app/dashboard");
  };

  const handleJoinWorkshop = (workshopId: string, workshopTitle: string) => {
    toast({
      title: "Joining Workshop",
      description: workshopTitle,
      duration: 1500,
    });
    navigate(`/app/ai-workshop-studio?selected=${workshopId}`);
  };

  return (
    <Page title="Workshops" showBackButton={true} onBackClick={handleBack}>
      <div className="container mx-auto px-4 py-8 max-w-7xl space-y-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B87333]/10 border border-[#B87333]/20 mb-5">
            <BookOpen className="h-4 w-4 text-[#B87333]" />
            <span className="text-sm text-[#E5C5A1] tracking-wide uppercase">Guided Sessions</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-light text-foreground tracking-tight mb-3">
            Mental Health <span className="bg-gradient-to-r from-[#B87333] to-[#D4AF37] bg-clip-text text-transparent font-medium">Workshops</span>
          </h1>
          <p className="text-base text-muted-foreground max-w-xl mx-auto">
            AI-narrated sessions designed to build lasting mental wellness skills
          </p>
        </motion.div>

        {/* Workshop Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {workshopData.map((workshop, index) => {
            const Icon = workshop.icon;
            return (
              <motion.div
                key={workshop.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.45 }}
                className="group cursor-pointer rounded-2xl overflow-hidden border border-white/[0.06] bg-[#0f1419] hover:border-[#B87333]/30 transition-all duration-500 flex flex-col"
                onClick={() => handleJoinWorkshop(workshop.id, workshop.title)}
              >
                {/* Cover */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={workshop.coverImage}
                    alt={workshop.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f1419] via-[#0f1419]/30 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-xs text-white/80 border border-white/10">
                      <Clock className="h-3 w-3" />
                      {workshop.duration}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <div className="p-2.5 rounded-lg bg-[#B87333]/15 backdrop-blur-sm border border-[#B87333]/20">
                      <Icon className="h-5 w-5 text-[#D4AF37]" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-lg font-semibold text-foreground mb-1.5 group-hover:text-[#E5C5A1] transition-colors">
                    {workshop.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-5 flex-1">
                    {workshop.description}
                  </p>
                  <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-[#B87333]/15 to-[#D4AF37]/10 border border-[#B87333]/25 text-[#E5C5A1] text-sm font-medium hover:from-[#B87333]/25 hover:to-[#D4AF37]/20 transition-all">
                    <Play className="h-4 w-4" />
                    Start Workshop
                    <ArrowRight className="h-3.5 w-3.5 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Page>
  );
};

export default Workshops;
