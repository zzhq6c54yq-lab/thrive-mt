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

// Default cover images keyed by actual DB slugs
const defaultCovers: Record<string, string> = {
  "divorce-recovery": "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&q=80",
  "job-loss": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
  "new-parent": "https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=800&q=80",
  "grief-healing": "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&q=80",
  "retirement": "https://images.unsplash.com/photo-1447069387593-a5de0862481e?w=800&q=80",
  "chronic-illness": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
};

const TransitionProgramCard = ({ program, icon: Icon, isEnrolled, currentWeek, userId }: TransitionProgramCardProps) => {
  const { enrollInProgram } = useLifeTransitions(userId);
  const navigate = useNavigate();

  const coverImage = program.cover_image_url || defaultCovers[program.slug] || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80";

  const handleNavigate = () => {
    navigate(`/app/life-transitions/${program.slug}`);
  };

  return (
    <Card 
      className="overflow-hidden bg-gray-900/50 border-[#D4AF37]/30 hover:scale-[1.02] transition-all group cursor-pointer"
      onClick={handleNavigate}
    >
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
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/app/life-transitions/${program.slug}`);
            }}
          >
            Continue Program
          </Button>
        ) : (
          <Button 
            className="w-full" 
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              enrollInProgram.mutate(program.id);
            }} 
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
