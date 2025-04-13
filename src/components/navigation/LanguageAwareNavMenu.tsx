import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const LanguageAwareNavMenu: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSpanish, setIsSpanish] = useState<boolean>(false);
  
  useEffect(() => {
    const checkLanguage = () => {
      const preferredLanguage = localStorage.getItem('preferredLanguage') || 'English';
      setIsSpanish(preferredLanguage === 'Español');
    };
    
    checkLanguage();
    
    window.addEventListener('languageChange', checkLanguage);
    
    return () => {
      window.removeEventListener('languageChange', checkLanguage);
    };
  }, []);

  const handleNavigate = (path: string) => {
    toast({
      title: isSpanish ? "Navegando" : "Navigating",
      description: isSpanish ? "Cambiando de página..." : "Changing page...",
      duration: 1500,
    });
    
    navigate(path);
  };

  return (
    <NavigationMenu className="bg-white/10 backdrop-blur-md rounded-lg p-2 border border-white/10">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-white/90 hover:text-white hover:bg-white/10">
            {isSpanish ? "Programas Especializados" : "Specialized Programs"}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <li onClick={() => handleNavigate("/department-of-defense")} className="cursor-pointer">
                <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  <div className="text-sm font-medium leading-none">
                    {isSpanish ? "Departamento de Defensa" : "Department of Defense"}
                  </div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    {isSpanish ? "Recursos para personal militar y veteranos" : "Resources for military personnel and veterans"}
                  </p>
                </div>
              </li>
              <li onClick={() => handleNavigate("/college-portal")} className="cursor-pointer">
                <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  <div className="text-sm font-medium leading-none">
                    {isSpanish ? "La Experiencia Universitaria" : "The College Experience"}
                  </div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    {isSpanish ? "Apoyo para estudiantes universitarios" : "Support for college students"}
                  </p>
                </div>
              </li>
              <li onClick={() => handleNavigate("/small-business-selection")} className="cursor-pointer">
                <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  <div className="text-sm font-medium leading-none">
                    {isSpanish ? "Pequeñas Empresas" : "Small Business"}
                  </div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    {isSpanish ? "Recursos para emprendedores" : "Resources for entrepreneurs"}
                  </p>
                </div>
              </li>
              <li onClick={() => handleNavigate("/adolescent-selection")} className="cursor-pointer">
                <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  <div className="text-sm font-medium leading-none">
                    {isSpanish ? "La Experiencia Adolescente" : "Adolescent Experience"}
                  </div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    {isSpanish ? "Apoyo para niños y adolescentes" : "Support for children and teens"}
                  </p>
                </div>
              </li>
              <li onClick={() => handleNavigate("/golden-years-welcome")} className="cursor-pointer">
                <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  <div className="text-sm font-medium leading-none">
                    {isSpanish ? "Los Años Dorados" : "The Golden Years"}
                  </div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    {isSpanish ? "Bienestar para adultos mayores" : "Wellness for seniors"}
                  </p>
                </div>
              </li>
              <li onClick={() => handleNavigate("/employee-welcome")} className="cursor-pointer">
                <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  <div className="text-sm font-medium leading-none">
                    {isSpanish ? "Portal para Empleados" : "Employee Portal"}
                  </div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    {isSpanish ? "Bienestar y recursos para empleados" : "Wellness and resources for employees"}
                  </p>
                </div>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-white/90 hover:text-white hover:bg-white/10">
            {isSpanish ? "Recursos" : "Resources"}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
              <li onClick={() => handleNavigate("/resource-library")} className="cursor-pointer">
                <NavigationMenuLink asChild>
                  <div
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">
                      {isSpanish ? "Biblioteca de Recursos" : "Resource Library"}
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      {isSpanish ? "Artículos, videos y guías" : "Articles, videos, and guides"}
                    </p>
                  </div>
                </NavigationMenuLink>
              </li>
              <li onClick={() => handleNavigate("/workshops")} className="cursor-pointer">
                <NavigationMenuLink asChild>
                  <div
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">
                      {isSpanish ? "Talleres" : "Workshops"}
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      {isSpanish ? "Experiencias interactivas de aprendizaje" : "Interactive learning experiences"}
                    </p>
                  </div>
                </NavigationMenuLink>
              </li>
              <li onClick={() => handleNavigate("/self-help-resources")} className="cursor-pointer">
                <NavigationMenuLink asChild>
                  <div
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">
                      {isSpanish ? "Autoayuda" : "Self-Help"}
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      {isSpanish ? "Estrategias y herramientas de autoayuda" : "Self-help strategies and tools"}
                    </p>
                  </div>
                </NavigationMenuLink>
              </li>
              <li onClick={() => handleNavigate("/community-support")} className="cursor-pointer">
                <NavigationMenuLink asChild>
                  <div
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">
                      {isSpanish ? "Apoyo Comunitario" : "Community Support"}
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      {isSpanish ? "Conéctate con personas en viajes similares" : "Connect with people on similar journeys"}
                    </p>
                  </div>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-white/90 hover:text-white hover:bg-white/10">
            {isSpanish ? "Herramientas" : "Tools"}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] lg:grid-cols-3">
              <li onClick={() => handleNavigate("/mental-wellness-tools")} className="cursor-pointer">
                <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  <div className="text-sm font-medium leading-none">
                    {isSpanish ? "Herramientas de Bienestar" : "Wellness Tools"}
                  </div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    {isSpanish ? "Seguimiento de bienestar" : "Wellness tracking"}
                  </p>
                </div>
              </li>
              <li onClick={() => handleNavigate("/journaling")} className="cursor-pointer">
                <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  <div className="text-sm font-medium leading-none">
                    {isSpanish ? "Diario Personal" : "Journaling"}
                  </div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    {isSpanish ? "Reflexiones y expresión emocional" : "Reflections and emotional expression"}
                  </p>
                </div>
              </li>
              <li onClick={() => handleNavigate("/mindfulness")} className="cursor-pointer">
                <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  <div className="text-sm font-medium leading-none">
                    {isSpanish ? "Mindfulness y Sueño" : "Mindfulness & Sleep"}
                  </div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    {isSpanish ? "Meditación y ayuda para dormir" : "Meditation and sleep aid"}
                  </p>
                </div>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default LanguageAwareNavMenu;
