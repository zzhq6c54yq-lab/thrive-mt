
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import useTranslation from "@/hooks/useTranslation";
import { Sparkles, CreditCard, HandHeart } from "lucide-react";

const NewFeatures: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isSpanish } = useTranslation();

  const handleFeatureClick = (path: string, title: string) => {
    toast({
      title: isSpanish ? `Abriendo ${title}` : `Opening ${title}`,
      description: isSpanish ? "Cargando nueva función..." : "Loading new feature...",
      duration: 1400,
    });
    navigate(path);
  };

  return (
    <div className="w-full py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#B87333] mb-4">
            {isSpanish ? "Nuevas Funciones" : "New Features"}
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            {isSpanish 
              ? "Descubre nuestras últimas herramientas diseñadas para hacer que el bienestar mental sea más accesible para todos."
              : "Discover our latest tools designed to make mental wellness more accessible for everyone."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Upgrade Feature */}
          <Card className="bg-gradient-to-br from-[#B87333]/10 to-[#E5C5A1]/10 border-[#B87333]/20 hover:border-[#B87333]/40 transition-all duration-300 hover:scale-105">
            <div className="p-6 text-center">
              <div className="bg-gradient-to-br from-purple-600 to-indigo-800 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <Badge variant="secondary" className="mb-3 bg-purple-100 text-purple-800">
                {isSpanish ? "¡Nuevo!" : "New!"}
              </Badge>
              <h3 className="text-xl font-bold text-white mb-3">
                {isSpanish ? "Mejora" : "Upgrade"}
              </h3>
              <p className="text-white/70 mb-6 text-sm">
                {isSpanish 
                  ? "Desbloquea funciones premium y acceso completo a todas nuestras herramientas de bienestar."
                  : "Unlock premium features and full access to all our wellness tools."}
              </p>
              <Button 
                onClick={() => handleFeatureClick("/subscription-plans", isSpanish ? "Mejora" : "Upgrade")}
                className="w-full h-14 text-lg bg-gradient-to-r from-purple-600 to-indigo-800 text-white font-bold rounded-xl shadow-md hover:scale-105 transition duration-150"
                style={{ minWidth: "100%", minHeight: "3.5rem", fontSize: "1.125rem" }}
              >
                {isSpanish ? "Ver Planes" : "View Plans"}
              </Button>
            </div>
          </Card>

          {/* Co-Pay Credit Feature */}
          <Card className="bg-gradient-to-br from-[#B87333]/10 to-[#E5C5A1]/10 border-[#B87333]/20 hover:border-[#B87333]/40 transition-all duration-300 hover:scale-105">
            <div className="p-6 text-center">
              <div className="bg-gradient-to-br from-green-600 to-emerald-800 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <CreditCard className="h-8 w-8 text-white" />
              </div>
              <Badge variant="secondary" className="mb-3 bg-green-100 text-green-800">
                {isSpanish ? "¡Nuevo!" : "New!"}
              </Badge>
              <h3 className="text-xl font-bold text-white mb-3">
                {isSpanish ? "Crédito Co-Pay" : "Co-Pay Credit"}
              </h3>
              <p className="text-white/70 mb-6 text-sm">
                {isSpanish 
                  ? "Reduce los costos de atención médica mental con nuestro sistema de créditos co-pay."
                  : "Reduce mental healthcare costs with our co-pay credit system."}
              </p>
              <Button 
                onClick={() => handleFeatureClick("/copay-credits", isSpanish ? "Crédito Co-Pay" : "Co-Pay Credit")}
                className="w-full h-14 text-lg bg-gradient-to-r from-green-600 to-emerald-800 text-white font-bold rounded-xl shadow-md hover:scale-105 transition duration-150"
                style={{ minWidth: "100%", minHeight: "3.5rem", fontSize: "1.125rem" }}
              >
                {isSpanish ? "Saber Más" : "Learn More"}
              </Button>
            </div>
          </Card>

          {/* Barter System Feature */}
          <Card className="bg-gradient-to-br from-[#B87333]/10 to-[#E5C5A1]/10 border-[#B87333]/20 hover:border-[#B87333]/40 transition-all duration-300 hover:scale-105">
            <div className="p-6 text-center">
              <div className="bg-gradient-to-br from-amber-600 to-orange-800 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <HandHeart className="h-8 w-8 text-white" />
              </div>
              <Badge variant="secondary" className="mb-3 bg-amber-100 text-amber-800">
                {isSpanish ? "¡Nuevo!" : "New!"}
              </Badge>
              <h3 className="text-xl font-bold text-white mb-3">
                {isSpanish ? "Sistema de Trueque" : "Barter System"}
              </h3>
              <p className="text-white/70 mb-6 text-sm">
                {isSpanish 
                  ? "Intercambia servicios o habilidades por acceso a recursos de salud mental."
                  : "Exchange services or skills for access to mental health resources."}
              </p>
              <Button 
                onClick={() => handleFeatureClick("/barter-system", isSpanish ? "Sistema de Trueque" : "Barter System")}
                className="w-full h-14 text-lg bg-gradient-to-r from-amber-600 to-orange-800 text-white font-bold rounded-xl shadow-md hover:scale-105 transition duration-150"
                style={{ minWidth: "100%", minHeight: "3.5rem", fontSize: "1.125rem" }}
              >
                {isSpanish ? "Explorar" : "Explore"}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NewFeatures;
