
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
    titleEs: "Seguimiento del Sueño",
    description: "Track and improve your sleep patterns.",
    descriptionEs: "Rastrea y mejora tus patrones de sueño.",
    route: "/app/sleep-tracker",
    color: "from-indigo-100 to-indigo-200",
    icon: <MoonStar className="w-8 h-8 text-indigo-600 mb-2" />,
    image: "https://images.unsplash.com/photo-1520206183501-b80df61043c2?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "meditation-studio",
    title: "Meditation Studio",
    titleEs: "Estudio de Meditación",
    description: "Comprehensive meditation studio with guided practices.",
    descriptionEs: "Estudio de meditación con prácticas guiadas.",
    route: "/app/meditation",
    color: "from-cyan-100 to-cyan-200",
    icon: <Sparkles className="w-8 h-8 text-cyan-600 mb-2" />,
    image: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "career-coaching",
    title: "Career Coaching",
    titleEs: "Orientación Profesional",
    description: "Professional guidance and career development.",
    descriptionEs: "Orientación profesional y desarrollo de carrera.",
    route: "/app/career-coaching",
    color: "from-slate-100 to-slate-200",
    icon: <Award className="w-8 h-8 text-slate-600 mb-2" />,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=500&q=80"
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
            className={`flex flex-col justify-between items-center p-6 rounded-xl bg-gradient-to-br ${feature.color} shadow-lg hover:shadow-xl transition-all duration-300`}
          >
            {feature.icon}
            <img 
              src={feature.image} 
              alt={isSpanish ? feature.titleEs : feature.title} 
              className="rounded-lg w-full h-40 object-cover mb-3 shadow-md" 
            />
            <h4 className="text-lg font-bold text-zinc-800 mb-2 mt-2 text-center">
              {isSpanish ? feature.titleEs : feature.title}
            </h4>
            <p className="text-sm text-zinc-600 mb-4 text-center flex-grow">
              {isSpanish ? feature.descriptionEs : feature.description}
            </p>
            <Button
              className="w-44 h-14 text-lg bg-gradient-to-r from-[#B87333] to-[#E5C5A1] text-white font-bold rounded-xl shadow-md hover:scale-105 transition duration-150"
              style={{ minWidth: "11rem", minHeight: "3.5rem", fontSize: "1.17rem" }}
              onClick={() => handleNavigation(feature.route, isSpanish ? feature.titleEs : feature.title)}
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
