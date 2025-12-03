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
  const { preferredLanguage, isSpanish, isPortuguese, isFilipino } = useTranslation();

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
      },
      'Filipino': {
        title: "Nagna-navigate",
        description: "Nagpapalit ng pahina..."
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
             isFilipino ? "Mga Espesyal na Programa" :
             "Specialized Programs"}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <li onClick={() => handleNavigate("/app/department-of-defense")} className="cursor-pointer">
                <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  <div className="text-sm font-medium leading-none">
                    {isSpanish ? "Militares y Veteranos" :
                     isPortuguese ? "Militares e Veteranos" :
                     isFilipino ? "Militar at mga Beterano" :
                     "Military and Veterans"}
                  </div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    {isSpanish ? "Recursos para personal militar y veteranos" :
                     isPortuguese ? "Recursos para militares e veteranos" :
                     isFilipino ? "Mga resources para sa mga sundalo at beterano" :
                     "Resources for military personnel and veterans"}
                  </p>
                </div>
              </li>
              <li onClick={() => handleNavigate("/app/college-portal")} className="cursor-pointer">
                <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  <div className="text-sm font-medium leading-none">
                    {isSpanish ? "La Experiencia Universitaria" :
                     isPortuguese ? "A Experiência Universitária" :
                     isFilipino ? "Ang Karanasan sa Kolehiyo" :
                     "The College Experience"}
                  </div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    {isSpanish ? "Apoyo para estudiantes universitarios" :
                     isPortuguese ? "Apoio para estudantes universitários" :
                     isFilipino ? "Suporta para sa mga estudyante sa kolehiyo" :
                     "Support for college students"}
                  </p>
                </div>
              </li>
              <li onClick={() => handleNavigate("/app/small-business-selection")} className="cursor-pointer">
                <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  <div className="text-sm font-medium leading-none">
                    {isSpanish ? "Pequeñas Empresas" :
                     isPortuguese ? "Pequenas Empresas" :
                     isFilipino ? "Maliit na Negosyo" :
                     "Small Business"}
                  </div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    {isSpanish ? "Recursos para emprendedores" :
                     isPortuguese ? "Recursos para empreendedores" :
                     isFilipino ? "Mga resources para sa mga negosyante" :
                     "Resources for entrepreneurs"}
                  </p>
                </div>
              </li>
              <li onClick={() => handleNavigate("/app/adolescent-selection")} className="cursor-pointer">
                <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  <div className="text-sm font-medium leading-none">
                    {isSpanish ? "La Experiencia Adolescente" :
                     isPortuguese ? "A Experiência Adolescente" :
                     isFilipino ? "Karanasan ng Kabataan" :
                     "Adolescent Experience"}
                  </div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    {isSpanish ? "Apoyo para niños y adolescentes" :
                     isPortuguese ? "Apoio para crianças e adolescentes" :
                     isFilipino ? "Suporta para sa mga bata at kabataan" :
                     "Support for children and teens"}
                  </p>
                </div>
              </li>
              <li onClick={() => handleNavigate("/app/golden-years-welcome")} className="cursor-pointer">
                <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  <div className="text-sm font-medium leading-none">
                    {isSpanish ? "Los Años Dorados" :
                     isPortuguese ? "Anos Dourados" :
                     isFilipino ? "Ang Mga Gintong Taon" :
                     "The Golden Years"}
                  </div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    {isSpanish ? "Bienestar para adultos mayores" :
                     isPortuguese ? "Bem-estar para idosos" :
                     isFilipino ? "Kalusugan para sa mga nakatatanda" :
                     "Wellness for seniors"}
                  </p>
                </div>
              </li>
              <li onClick={() => handleNavigate("/app/employee-welcome")} className="cursor-pointer">
                <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  <div className="text-sm font-medium leading-none">
                    {isSpanish ? "Portal para Empleados" :
                     isPortuguese ? "Portal do Funcionário" :
                     isFilipino ? "Portal para sa mga Empleyado" :
                     "Employee Portal"}
                  </div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    {isSpanish ? "Bienestar y recursos para empleados" :
                     isPortuguese ? "Bem-estar e recursos para funcionários" :
                     isFilipino ? "Kalusugan at resources para sa mga empleyado" :
                     "Wellness and resources for employees"}
                  </p>
                </div>
              </li>
              <li onClick={() => handleNavigate("/app/police-officers-welcome")} className="cursor-pointer">
                <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  <div className="text-sm font-medium leading-none">
                    {isSpanish ? "Programa para Oficiales de Policía" :
                     isPortuguese ? "Programa para Policiais" :
                     isFilipino ? "Programa para sa mga Pulis" :
                     "Police Officers Program"}
                  </div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    {isSpanish ? "Recursos para oficiales de policía" :
                     isPortuguese ? "Recursos para policiais" :
                     isFilipino ? "Mga resources para sa mga pulis" :
                     "Resources for law enforcement"}
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
             isFilipino ? "Mga Resources" :
             "Resources"}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
              <li onClick={() => handleNavigate("/app/resource-library")} className="cursor-pointer">
                <NavigationMenuLink asChild>
                  <div
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">
                      {isSpanish ? "Biblioteca de Recursos" :
                       isPortuguese ? "Biblioteca de Recursos" :
                       isFilipino ? "Resource Library" :
                       "Resource Library"}
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      {isSpanish ? "Artículos, videos y guías" :
                       isPortuguese ? "Artigos, vídeos e guias" :
                       isFilipino ? "Mga artikulo, video, at gabay" :
                       "Articles, videos, and guides"}
                    </p>
                  </div>
                </NavigationMenuLink>
              </li>
              <li onClick={() => handleNavigate("/app/workshops")} className="cursor-pointer">
                <NavigationMenuLink asChild>
                  <div
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">
                      {isSpanish ? "Talleres" :
                       isPortuguese ? "Talleres" :
                       isFilipino ? "Mga Workshop" :
                       "Workshops"}
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      {isSpanish ? "Experiencias interactivas de aprendizaje" :
                       isPortuguese ? "Experiências interativas de aprendizagem" :
                       isFilipino ? "Mga interactive na karanasan sa pag-aaral" :
                       "Interactive learning experiences"}
                    </p>
                  </div>
                </NavigationMenuLink>
              </li>
              <li onClick={() => handleNavigate("/app/self-help-resources")} className="cursor-pointer">
                <NavigationMenuLink asChild>
                  <div
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">
                      {isSpanish ? "Autoayuda" :
                       isPortuguese ? "Autoajuda" :
                       isFilipino ? "Self-Help" :
                       "Self-Help"}
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      {isSpanish ? "Estrategias y herramientas de autoayuda" :
                       isPortuguese ? "Estratégias e ferramentas de autoajuda" :
                       isFilipino ? "Mga self-help na estratehiya at kagamitan" :
                       "Self-help strategies and tools"}
                    </p>
                  </div>
                </NavigationMenuLink>
              </li>
              <li onClick={() => handleNavigate("/app/community-support")} className="cursor-pointer">
                <NavigationMenuLink asChild>
                  <div
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">
                      {isSpanish ? "Apoyo Comunitario" :
                       isPortuguese ? "Apoyo Comunitário" :
                       isFilipino ? "Suporta sa Komunidad" :
                       "Community Support"}
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      {isSpanish ? "Conéctate con personas en viajes similares" :
                       isPortuguese ? "Conecte-se com pessoas em viagens semelhantes" :
                       isFilipino ? "Kumonekta sa mga taong nasa parehong paglalakbay" :
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
             isFilipino ? "Mga Kagamitan" :
             "Tools"}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] lg:grid-cols-3">
              <li onClick={() => handleNavigate("/app/mental-wellness-tools")} className="cursor-pointer">
                <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  <div className="text-sm font-medium leading-none">
                    {isSpanish ? "Herramientas de Bienestar" :
                     isPortuguese ? "Ferramentas de Bem-Estar" :
                     isFilipino ? "Mga Kagamitan sa Kalusugan" :
                     "Wellness Tools"}
                  </div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    {isSpanish ? "Seguimiento de bienestar" :
                     isPortuguese ? "Monitoramento de bem-estar" :
                     isFilipino ? "Pagsubaybay sa kalusugan" :
                     "Wellness tracking"}
                  </p>
                </div>
              </li>
              <li onClick={() => handleNavigate("/app/journaling")} className="cursor-pointer">
                <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  <div className="text-sm font-medium leading-none">
                    {isSpanish ? "Diario Personal" :
                     isPortuguese ? "Diário Pessoal" :
                     isFilipino ? "Pagdyadyornal" :
                     "Journaling"}
                  </div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    {isSpanish ? "Reflexiones y expresión emocional" :
                     isPortuguese ? "Reflexões e expressão emocional" :
                     isFilipino ? "Mga repleksyon at emosyonal na pagpapahayag" :
                     "Reflections and emotional expression"}
                  </p>
                </div>
              </li>
              <li onClick={() => handleNavigate("/app/mindfulness")} className="cursor-pointer">
                <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  <div className="text-sm font-medium leading-none">
                    {isSpanish ? "Mindfulness y Sueño" :
                     isPortuguese ? "Mindfulness e Sono" :
                     isFilipino ? "Mindfulness at Pagatulog" :
                     "Mindfulness & Sleep"}
                  </div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    {isSpanish ? "Meditación y ayuda para dormir" :
                     isPortuguese ? "Meditação e ajuda para dormir" :
                     isFilipino ? "Meditation at tulong para sa pagtulog" :
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
