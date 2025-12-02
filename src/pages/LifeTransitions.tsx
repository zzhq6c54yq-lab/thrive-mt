import { useUser } from "@/contexts/UserContext";
import { useLifeTransitions } from "@/hooks/useLifeTransitions";
import TransitionProgramCard from "@/components/transitions/TransitionProgramCard";
import { Button } from "@/components/ui/button";
import { Heart, Users, Book, Briefcase, Baby, Home, Stethoscope, Sun, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const iconMap: Record<string, any> = {
  "navigating-divorce": Heart,
  "job-loss-recovery": Briefcase,
  "new-parent-journey": Baby,
  "empty-nest-transition": Home,
  "grief-and-loss": Heart,
  "retirement-preparation": Sun,
  "major-relocation": Home,
  "health-diagnosis": Stethoscope,
};

const LifeTransitions = () => {
  const { user } = useUser();
  const { programs, enrollments, isLoading } = useLifeTransitions(user?.id);
  const navigate = useNavigate();

  const enrolledProgramIds = enrollments?.map(e => e.program_id) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground">Loading life transition programs...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/app/dashboard')}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold gradient-heading">
            Life Transition Guides
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Structured multi-week programs for major life changes. Week-by-week support when you need it most.
          </p>
        </div>

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

        {/* All Programs */}
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
