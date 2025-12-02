import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLifeTransitions } from "@/hooks/useLifeTransitions";
import { useNavigate } from "react-router-dom";

interface TransitionProgramCardProps {
  program: any;
  icon: any;
  isEnrolled: boolean;
  currentWeek?: number;
  userId?: string;
}

// Default cover images for programs without one
const defaultCovers: Record<string, string> = {
  "navigating-divorce": "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&q=80",
  "job-loss-recovery": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
  "new-parent-journey": "https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?w=800&q=80",
  "empty-nest-transition": "https://images.unsplash.com/photo-1516627145497-ae6968895b40?w=800&q=80",
  "grief-and-loss": "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=800&q=80",
  "retirement-preparation": "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&q=80",
  "major-relocation": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  "health-diagnosis": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
};

const TransitionProgramCard = ({ program, icon: Icon, isEnrolled, currentWeek, userId }: TransitionProgramCardProps) => {
  const { enrollInProgram } = useLifeTransitions(userId);
  const navigate = useNavigate();

  const coverImage = program.cover_image_url || defaultCovers[program.slug] || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80";

  return (
    <Card className="overflow-hidden bg-gray-900/50 border-[#D4AF37]/30 hover:scale-[1.02] transition-all group">
      {/* Cover Image */}
      <div className="relative h-40 overflow-hidden">
        <img 
          src={coverImage} 
          alt={program.name || program.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
        
        {/* Icon overlay */}
        <div className="absolute bottom-3 left-3 p-2 rounded-lg bg-[#D4AF37]/20 backdrop-blur-sm border border-[#D4AF37]/30">
          <Icon className="w-6 h-6 text-[#D4AF37]" />
        </div>
        
        {/* Duration badge */}
        <div className="absolute top-3 right-3">
          <Badge className="bg-black/50 text-white border-0">{program.duration_weeks} weeks</Badge>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4 space-y-3">
        <h3 className="font-semibold text-lg text-white">{program.name || program.title}</h3>
        <p className="text-sm text-gray-400 line-clamp-2">{program.description}</p>
        
        <div className="flex items-center gap-2">
          {isEnrolled && (
            <Badge className="bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/30">
              Week {currentWeek}
            </Badge>
          )}
        </div>
        
        {isEnrolled ? (
          <Button 
            className="w-full bg-gradient-to-r from-[#B87333] to-[#D4AF37] hover:from-[#D4AF37] hover:to-[#B87333] text-black" 
            onClick={() => navigate(`/app/life-transitions/${program.slug}`)}
          >
            Continue Program
          </Button>
        ) : (
          <Button 
            className="w-full" 
            variant="outline"
            onClick={() => enrollInProgram.mutate(program.id)} 
            disabled={enrollInProgram.isPending}
          >
            {enrollInProgram.isPending ? "Enrolling..." : "Enroll Now"}
          </Button>
        )}
      </div>
    </Card>
  );
};

export default TransitionProgramCard;
