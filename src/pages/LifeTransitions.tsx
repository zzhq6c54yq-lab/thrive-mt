import { useUser } from "@/contexts/UserContext";
import { useLifeTransitions } from "@/hooks/useLifeTransitions";
import TransitionProgramCard from "@/components/transitions/TransitionProgramCard";
import { Button } from "@/components/ui/button";
import { Heart, Book, Briefcase, Baby, Stethoscope, Sun, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useState } from "react";

// Slugs must match life_transition_programs.slug in the database
const iconMap: Record<string, any> = {
  "divorce-recovery": Heart,
  "job-loss": Briefcase,
  "new-parent": Baby,
  "grief-healing": Heart,
  "retirement": Sun,
  "chronic-illness": Stethoscope,
};

const LifeTransitions = () => {
  const { user } = useUser();
  const { programs, enrollments, isLoading } = useLifeTransitions(user?.id);
  const navigate = useNavigate();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const enrolledProgramIds = enrollments?.map(e => e.program_id) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground">Loading life transition programs...</div>
      </div>
    );
  }

  const allPrograms = programs || [];

  return (
    <div className="min-h-screen bg-background pb-12">
      <div className="max-w-7xl mx-auto px-4 space-y-8 pt-6">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/app/dashboard')}
          className="mb-2"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-5xl font-bold gradient-heading">
            Life Transition Guides
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Structured multi-week programs for major life changes. Week-by-week support when you need it most.
          </p>
        </div>

        {/* Hero Carousel */}
        {allPrograms.length > 0 && (
          <div className="relative">
            <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
              <div className="flex">
                {allPrograms.map((program) => {
                  const Icon = iconMap[program.slug] || Book;
                  const coverImage = program.cover_image_url || `https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&q=80`;
                  const isEnrolled = enrolledProgramIds.includes(program.id);
                  return (
                    <div
                      key={program.id}
                      className="relative flex-none w-full min-w-0 cursor-pointer group"
                      style={{ minWidth: "100%" }}
                      onClick={() => navigate(`/app/life-transitions/${program.slug}`)}
                    >
                      {/* Full-bleed image */}
                      <div className="relative h-72 md:h-96 overflow-hidden rounded-2xl">
                        <img
                          src={coverImage}
                          alt={program.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                        {/* Content overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                          <div className="flex items-end justify-between gap-4">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <div className="p-2 rounded-lg bg-[#D4AF37]/20 backdrop-blur-sm border border-[#D4AF37]/30">
                                  <Icon className="w-5 h-5 text-[#D4AF37]" />
                                </div>
                                {isEnrolled && (
                                  <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-[#D4AF37]/30 text-[#D4AF37] border border-[#D4AF37]/40 backdrop-blur-sm">
                                    Enrolled
                                  </span>
                                )}
                              </div>
                              <h2 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
                                {program.title}
                              </h2>
                              <p className="text-sm text-white/80 max-w-xl line-clamp-2">{program.description}</p>
                            </div>
                            <div className="flex-shrink-0 text-right space-y-2">
                              <div className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 text-white text-sm font-medium">
                                {program.duration_weeks} weeks
                              </div>
                              <Button
                                size="sm"
                                className="bg-gradient-to-r from-[#B87333] to-[#D4AF37] hover:from-[#D4AF37] hover:to-[#B87333] text-black font-semibold"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(`/app/life-transitions/${program.slug}`);
                                }}
                              >
                                Explore →
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Navigation arrows */}
            <button
              onClick={scrollPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 border border-white/20 text-white hover:bg-black/70 transition-colors backdrop-blur-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 border border-white/20 text-white hover:bg-black/70 transition-colors backdrop-blur-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Dot indicators */}
            <div className="flex justify-center gap-2 mt-3">
              {allPrograms.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => emblaApi?.scrollTo(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${idx === selectedIndex ? 'bg-[#D4AF37] w-4' : 'bg-white/30'}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Enrolled Programs */}
        {enrollments && enrollments.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">My Programs</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrollments.map((enrollment) => (
                <TransitionProgramCard
                  key={enrollment.id}
                  program={enrollment.program}
                  icon={iconMap[enrollment.program.slug] || Book}
                  isEnrolled={true}
                  currentWeek={enrollment.current_week}
                  userId={user?.id}
                />
              ))}
            </div>
          </div>
        )}

        {/* All Programs Grid */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">
            {enrollments && enrollments.length > 0 ? "Other Programs" : "All Programs"}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs
              ?.filter(p => !enrolledProgramIds.includes(p.id))
              .map((program) => (
                <TransitionProgramCard
                  key={program.id}
                  program={program}
                  icon={iconMap[program.slug] || Book}
                  isEnrolled={false}
                  userId={user?.id}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LifeTransitions;
