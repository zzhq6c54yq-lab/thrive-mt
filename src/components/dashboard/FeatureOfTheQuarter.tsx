
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import useTranslation from "@/hooks/useTranslation";
import { MoonStar, Sparkles, Award } from "lucide-react";

const QUARTER_FEATURES = [
  {
    id: "sleep-tracker",
    title: "Sleep Tracker",
    description: "Log your nightly rest and improve your sleep habits.",
    route: "/games/sleep-tracker",
    color: "from-cyan-100 to-sky-200",
    icon: <MoonStar className="w-8 h-8 text-sky-600 mb-2" />,
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "meditation-studio",
    title: "Meditation Studio",
    description: "Relax and meditate with guided sessions.",
    route: "/games/meditation-studio",
    color: "from-purple-100 to-indigo-100",
    icon: <Sparkles className="w-8 h-8 text-purple-500 mb-2" />,
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "career-coaching",
    title: "Career Coaching",
    description: "Boost your career with tips and quick quizzes.",
    route: "/games/career-coaching",
    color: "from-amber-100 to-yellow-50",
    icon: <Award className="w-8 h-8 text-amber-500 mb-2" />,
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=500&q=80"
  },
];

const FeatureOfTheQuarter: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isSpanish } = useTranslation();

  const handleNavigation = (route: string, title: string) => {
    toast({
      title: isSpanish ? `Abriendo ${title}` : `Opening ${title}`,
      description: isSpanish
        ? "Cargando la función especial de este trimestre..."
        : "Loading this quarter's feature...",
      duration: 1400,
    });
    navigate(route);
  };

  return (
    <section className="w-full mt-8 mb-4">
      <h3 className="text-2xl font-bold text-center text-[#B87333] mb-7">
        {isSpanish ? "Características del trimestre" : "Key Features of the Quarter"}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {QUARTER_FEATURES.map(feature => (
          <div
            key={feature.id}
            className={`flex flex-col justify-between items-center p-6 rounded-xl bg-gradient-to-br ${feature.color} shadow-lg`}
          >
            {feature.icon}
            <img src={feature.image} alt={feature.title} className="rounded-lg w-full h-28 object-cover mb-2" />
            <h4 className="text-lg font-bold text-zinc-700 mb-1 mt-2">{feature.title}</h4>
            <p className="text-sm text-zinc-600 mb-4 text-center">{feature.description}</p>
            <Button
              className="w-44 h-14 text-lg bg-gradient-to-r from-[#B87333] to-[#E5C5A1] text-black font-bold rounded-xl shadow-md hover:scale-105 transition duration-150"
              style={{ minWidth: "11rem", minHeight: "3.5rem", fontSize: "1.17rem" }}
              onClick={() => handleNavigation(feature.route, feature.title)}
            >
              {isSpanish ? "Explorar" : "Explore"}
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureOfTheQuarter;
