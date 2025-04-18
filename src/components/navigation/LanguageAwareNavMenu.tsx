import React from "react";
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
import useTranslation from "@/hooks/useTranslation";

const LanguageAwareNavMenu: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { preferredLanguage, isSpanish, isPortuguese } = useTranslation();

  const handleNavigate = (path: string) => {
    const toastMessages = {
      'English': {
        title: "Navigating",
        description: "Changing page..."
      },
      'Español': {
        title: "Navegando",
        description: "Cambiando de página..."
      },
      'Português': {
        title: "Navegando",
        description: "Mudando de página..."
      }
    };
    
    const message = toastMessages[preferredLanguage as keyof typeof toastMessages] || toastMessages['English'];
    
    toast({
      title: message.title,
      description: message.description,
      duration: 1500,
    });
    
    navigate(path);
  };

  return (
    <NavigationMenu className="bg-white/10 backdrop-blur-md rounded-lg p-2 border border-white/10">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-white/90 hover:text-white hover:bg-white/10">
            {isSpanish ? "Programas Especializados" : 
             isPortuguese ? "Programas Especializados" : 
             "Specialized Programs"}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <li onClick={() => handleNavigate("/department-of-defense")} className="cursor-pointer">
                <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  <div className="text-sm font-medium leading-none">
                    {isSpanish ? "Departamento de Defensa" :
                     isPortuguese ? "Departamento de Defesa" :
                     "Department of Defense"}
                  </div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    {isSpanish ? "Recursos para personal militar y veteranos" :
                     isPortuguese ? "Recursos para militares e veteranos" :
                     "Resources for military personnel and veterans"}
                  </p>
                </div>
              </li>
              <li onClick={() => handleNavigate("/college-portal")} className="cursor-pointer">
                <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  <div className="text-sm font-medium leading-none">
                    {isSpanish ? "La Experiencia Universitaria" :
                     isPortuguese ? "A Experiência Universitária" :
                     "The College Experience"}
                  </div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    {isSpanish ? "Apoyo para estudiantes universitarios" :
                     isPortuguese ? "Apoio para estudantes universitários" :
                     "Support for college students"}
                  </p>
                </div>
              </li>
              <li onClick={() => handleNavigate("/small-business-selection")} className="cursor-pointer">
                <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  <div className="text-sm font-medium leading-none">
                    {isSpanish ? "Pequeñas Empresas" :
                     isPortuguese ? "Pequenas Empresas" :
                     "Small Business"}
                  </div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    {isSpanish ? "Recursos para emprendedores" :
                     isPortuguese ? "Recursos para empreendedores" :
                     "Resources for entrepreneurs"}
                  </p>
                </div>
              </li>
              <li onClick={() => handleNavigate("/adolescent-selection")} className="cursor-pointer">
                <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  <div className="text-sm font-medium leading-none">
                    {isSpanish ? "La Experiencia Adolescente" :
                     isPortuguese ? "A Experiência Adolescente" :
                     "Adolescent Experience"}
                  </div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    {isSpanish ? "Apoyo para niños y adolescentes" :
                     isPortuguese ? "Apoio para crianças e adolescentes" :
                     "Support for children and teens"}
                  </p>
                </div>
              </li>
              <li onClick={() => handleNavigate("/golden-years-welcome")} className="cursor-pointer">
                <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  <div className="text-sm font-medium leading-none">
                    {isSpanish ? "Los Años Dorados" :
                     isPortuguese ? "Anos Dourados" :
                     "The Golden Years"}
                  </div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    {isSpanish ? "Bienestar para adultos mayores" :
                     isPortuguese ? "Bem-estar para idosos" :
                     "Wellness for seniors"}
                  </p>
                </div>
              </li>
              <li onClick={() => handleNavigate("/employee-welcome")} className="cursor-pointer">
                <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  <div className="text-sm font-medium leading-none">
                    {isSpanish ? "Portal para Empleados" :
                     isPortuguese ? "Portal do Funcionário" :
                     "Employee Portal"}
                  </div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    {isSpanish ? "Bienestar y recursos para empleados" :
                     isPortuguese ? "Bem-estar e recursos para funcionários" :
                     "Wellness and resources for employees"}
                  </p>
                </div>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-white/90 hover:text-white hover:bg-white/10">
            {isSpanish ? "Recursos" : 
             isPortuguese ? "Recursos" : 
             "Resources"}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
              <li onClick={() => handleNavigate("/resource-library")} className="cursor-pointer">
                <NavigationMenuLink asChild>
                  <div
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">
                      {isSpanish ? "Biblioteca de Recursos" :
                       isPortuguese ? "Biblioteca de Recursos" :
                       "Resource Library"}
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      {isSpanish ? "Artículos, videos y guías" :
                       isPortuguese ? "Artigos, vídeos e guias" :
                       "Articles, videos, and guides"}
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
                      {isSpanish ? "Talleres" :
                       isPortuguese ? "Talleres" :
                       "Workshops"}
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      {isSpanish ? "Experiencias interactivas de aprendizaje" :
                       isPortuguese ? "Experiências interativas de aprendizagem" :
                       "Interactive learning experiences"}
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
                      {isSpanish ? "Autoayuda" :
                       isPortuguese ? "Autoajuda" :
                       "Self-Help"}
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      {isSpanish ? "Estrategias y herramientas de autoayuda" :
                       isPortuguese ? "Estratégias e ferramentas de autoajuda" :
                       "Self-help strategies and tools"}
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
                      {isSpanish ? "Apoyo Comunitario" :
                       isPortuguese ? "Apoyo Comunitário" :
                       "Community Support"}
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      {isSpanish ? "Conéctate con personas en viajes similares" :
                       isPortuguese ? "Conecte-se com pessoas em viagens semelhantes" :
                       "Connect with people on similar journeys"}
                    </p>
                  </div>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-white/90 hover:text-white hover:bg-white/10">
            {isSpanish ? "Herramientas" : 
             isPortuguese ? "Ferramentas" : 
             "Tools"}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] lg:grid-cols-3">
              <li onClick={() => handleNavigate("/mental-wellness-tools")} className="cursor-pointer">
                <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  <div className="text-sm font-medium leading-none">
                    {isSpanish ? "Herramientas de Bienestar" :
                     isPortuguese ? "Ferramentas de Bem-Estar" :
                     "Wellness Tools"}
                  </div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    {isSpanish ? "Seguimiento de bienestar" :
                     isPortuguese ? "Monitoramento de bem-estar" :
                     "Wellness tracking"}
                  </p>
                </div>
              </li>
              <li onClick={() => handleNavigate("/journaling")} className="cursor-pointer">
                <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  <div className="text-sm font-medium leading-none">
                    {isSpanish ? "Diario Personal" :
                     isPortuguese ? "Diário Pessoal" :
                     "Journaling"}
                  </div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    {isSpanish ? "Reflexiones y expresión emocional" :
                     isPortuguese ? "Reflexões e expressão emocional" :
                     "Reflections and emotional expression"}
                  </p>
                </div>
              </li>
              <li onClick={() => handleNavigate("/mindfulness")} className="cursor-pointer">
                <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  <div className="text-sm font-medium leading-none">
                    {isSpanish ? "Mindfulness y Sueño" :
                     isPortuguese ? "Mindfulness e Sono" :
                     "Mindfulness & Sleep"}
                  </div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    {isSpanish ? "Meditación y ayuda para dormir" :
                     isPortuguese ? "Meditação e ajuda para dormir" :
                     "Meditation and sleep aid"}
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
