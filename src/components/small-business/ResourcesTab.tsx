
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Brain } from "lucide-react";
import useTranslation from "@/hooks/useTranslation";

interface ResourcesTabProps {
  onFeatureClick: (path: string) => void;
}

const ResourcesTab: React.FC<ResourcesTabProps> = ({ onFeatureClick }) => {
  const { isSpanish } = useTranslation();

  return (
    <div className="space-y-6 mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-[#1F1B15] border-amber-900/30 hover:border-amber-700/50 transition-colors shadow-lg">
          <CardContent className="p-0">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-amber-900/30 rounded-full">
                  <FileText className="h-5 w-5 text-amber-400" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  {isSpanish ? "Biblioteca de Recursos para Pequeñas Empresas" : "Small Business Resource Library"}
                </h3>
              </div>
              <p className="text-white/70 mb-4">
                {isSpanish 
                  ? "Accede a artículos, guías y herramientas creadas específicamente para el bienestar mental de pequeñas empresas."
                  : "Access articles, guides, and tools specifically created for small business mental wellness."}
              </p>
              <Button 
                className="w-full bg-amber-700 hover:bg-amber-800 text-white"
                onClick={() => onFeatureClick("resource-library")}
              >
                {isSpanish ? "Explorar Recursos" : "Browse Resources"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1F1B15] border-amber-900/30 hover:border-amber-700/50 transition-colors shadow-lg">
          <CardContent className="p-0">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-amber-900/30 rounded-full">
                  <Brain className="h-5 w-5 text-amber-400" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  {isSpanish ? "Kit de Herramientas de Salud Mental" : "Mental Health Toolkit"}
                </h3>
              </div>
              <p className="text-white/70 mb-4">
                {isSpanish 
                  ? "Herramientas y estrategias esenciales para promover el bienestar mental en entornos de pequeñas empresas."
                  : "Essential tools and strategies to promote mental wellness in small business environments."}
              </p>
              <Button 
                className="w-full bg-amber-700 hover:bg-amber-800 text-white"
                onClick={() => onFeatureClick("mental-wellness-tools")}
              >
                {isSpanish ? "Acceder al Kit" : "Access Toolkit"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResourcesTab;
