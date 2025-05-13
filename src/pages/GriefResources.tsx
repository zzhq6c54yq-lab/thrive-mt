
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Page from "@/components/Page";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import useTranslation from "@/hooks/useTranslation";
import { BookOpen, Search, ChevronDown, Download, Link, Heart, ExternalLink, ArrowRight } from "lucide-react";

interface ResourceItem {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'book' | 'video' | 'support' | 'toolkit';
  url: string;
  tags: string[];
}

const griefResources: ResourceItem[] = [
  {
    id: "gr1",
    title: "Understanding the Grief Process",
    description: "A comprehensive guide to the different stages of grief and how they might manifest after losing someone to cancer.",
    type: "article",
    url: "#",
    tags: ["basics", "stages"]
  },
  {
    id: "gr2",
    title: "Coping with Anticipatory Grief",
    description: "Resources for handling grief that begins before a loved one passes, common among cancer caregivers.",
    type: "toolkit",
    url: "#",
    tags: ["caregivers", "coping"]
  },
  {
    id: "gr3",
    title: "Children and Grief: Age-Appropriate Support",
    description: "How to help children understand and process grief after losing a family member to cancer.",
    type: "article",
    url: "#",
    tags: ["children", "family"]
  },
  {
    id: "gr4",
    title: "Complicated Grief: When Healing Seems Impossible",
    description: "Information on recognizing and finding help for complicated grief reactions.",
    type: "article",
    url: "#",
    tags: ["complicated", "professional"]
  },
  {
    id: "gr5",
    title: "Finding Meaning After Loss",
    description: "Strategies for rebuilding meaning and purpose in life after the death of a loved one.",
    type: "book",
    url: "#",
    tags: ["meaning", "healing"]
  },
  {
    id: "gr6",
    title: "Guided Meditation for Grief",
    description: "A collection of meditation practices specifically designed to help with different aspects of the grieving process.",
    type: "video",
    url: "#",
    tags: ["meditation", "practice"]
  },
  {
    id: "gr7",
    title: "Connecting with Grief Support Groups",
    description: "Information on finding and joining both in-person and online grief support communities.",
    type: "support",
    url: "#",
    tags: ["community", "support"]
  },
  {
    id: "gr8",
    title: "Cultural Approaches to Grief and Mourning",
    description: "How different cultural traditions approach grief, mourning rituals, and remembrance.",
    type: "article",
    url: "#",
    tags: ["cultural", "traditions"]
  },
  {
    id: "gr9",
    title: "Self-Care During Bereavement",
    description: "Practical self-care strategies for taking care of your physical and emotional health while grieving.",
    type: "toolkit",
    url: "#",
    tags: ["self-care", "practical"]
  }
];

// FAQ items
const faqItems = [
  {
    question: "How long does grief typically last?",
    answer: "Grief has no timeline. While the acute pain may lessen over time, grief isn't something you 'get over.' Instead, you learn to integrate the loss into your life. Some people may feel significantly better in a year; for others, it may take longer. Anniversary dates, birthdays, and holidays might trigger grief even years later."
  },
  {
    question: "Is it normal to feel relief after someone with cancer dies?",
    answer: "Yes, feeling relief is entirely normal, especially after a prolonged illness where your loved one was suffering. This relief doesn't mean you didn't love the person or that you're glad they're gone. It often acknowledges that their suffering has ended, and the demanding caregiving journey has concluded. These feelings commonly coexist with profound sadness."
  },
  {
    question: "How can I support someone who is grieving?",
    answer: "Listen more than you speak. Avoid phrases like 'they're in a better place' or 'at least they're not suffering.' Instead, acknowledge their pain with statements like 'I'm so sorry' or 'I'm here for you.' Offer specific help rather than saying 'call me if you need anything.' Grief support is a marathon, not a sprint—be there weeks and months later when others have moved on."
  },
  {
    question: "When should I seek professional help for grief?",
    answer: "Consider professional help if: grief feels unbearable or isn't improving with time; you have persistent thoughts of guilt or self-harm; you're unable to perform daily activities for weeks or months; you're isolating yourself completely; you're using alcohol or substances to cope; or you had a complicated relationship with the deceased that's making grief particularly difficult."
  },
  {
    question: "How can I honor my loved one's memory?",
    answer: "Consider creating a memorial that reflects their personality and values—plant a garden, establish a scholarship, volunteer for their favorite cause, or continue traditions they loved. Many find comfort in creating a physical space for remembrance with photos and meaningful objects. Annual rituals on significant dates can provide structure to remembrance. Writing letters to your loved one or journaling about memories can also be healing."
  }
];

const GriefResources: React.FC = () => {
  const { isSpanish } = useTranslation();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  
  // Filter resources based on search and active tab
  const filteredResources = griefResources.filter(resource => {
    const matchesSearch = 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (activeTab === "all") return matchesSearch;
    return resource.type === activeTab && matchesSearch;
  });
  
  const handleResourceClick = (resource: ResourceItem) => {
    // In a real app, this would either navigate to a detail page or open the resource
    toast({
      title: isSpanish ? "Recurso seleccionado" : "Resource Selected",
      description: isSpanish 
        ? `Abriendo: ${resource.title}` 
        : `Opening: ${resource.title}`,
      duration: 2000,
    });
  };
  
  const handleDownload = (resourceId: string) => {
    // In a real app, this would trigger a download
    toast({
      title: isSpanish ? "Descargando recurso" : "Downloading Resource",
      description: isSpanish ? "Tu descarga comenzará en breve" : "Your download will begin shortly",
      duration: 2000,
    });
  };
  
  const toggleFaq = (id: string) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };
  
  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'article': return <BookOpen className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />;
      case 'book': return <BookOpen className="h-5 w-5 text-green-600 dark:text-green-400" />;
      case 'video': return <BookOpen className="h-5 w-5 text-rose-600 dark:text-rose-400" />;
      case 'support': return <Heart className="h-5 w-5 text-pink-600 dark:text-pink-400" />;
      case 'toolkit': return <BookOpen className="h-5 w-5 text-amber-600 dark:text-amber-400" />;
      default: return <BookOpen className="h-5 w-5" />;
    }
  };
  
  return (
    <Page title={isSpanish ? "Recursos para el Duelo" : "Grief Resources"} returnToMain>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 flex items-center">
              <BookOpen className="h-7 w-7 mr-2" />
              {isSpanish ? "Recursos para el Duelo" : "Grief Resources"}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {isSpanish 
                ? "Apoyo y guía para el proceso de duelo y pérdida" 
                : "Support and guidance for the grief and loss process"}
            </p>
          </div>
          
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              type="search"
              placeholder={isSpanish ? "Buscar recursos..." : "Search resources..."}
              className="pl-8 w-full md:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">{isSpanish ? "Todos" : "All"}</TabsTrigger>
            <TabsTrigger value="article">{isSpanish ? "Artículos" : "Articles"}</TabsTrigger>
            <TabsTrigger value="book">{isSpanish ? "Libros" : "Books"}</TabsTrigger>
            <TabsTrigger value="video">{isSpanish ? "Videos" : "Videos"}</TabsTrigger>
            <TabsTrigger value="support">{isSpanish ? "Apoyo" : "Support"}</TabsTrigger>
            <TabsTrigger value="toolkit">{isSpanish ? "Herramientas" : "Toolkits"}</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="space-y-6">
            {filteredResources.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 mx-auto text-indigo-300 dark:text-indigo-700" />
                <h3 className="mt-4 text-lg font-medium">
                  {isSpanish ? "No se encontraron recursos" : "No resources found"}
                </h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  {isSpanish 
                    ? "Intenta cambiar tu búsqueda o explorar otra categoría" 
                    : "Try changing your search or exploring another category"}
                </p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {filteredResources.map((resource) => (
                  <Card 
                    key={resource.id} 
                    className="border-indigo-100 hover:border-indigo-300 dark:border-indigo-900/30 dark:hover:border-indigo-700/50 transition-colors shadow-sm"
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          {getResourceIcon(resource.type)}
                          <CardTitle className="ml-2 text-lg">
                            {resource.title}
                          </CardTitle>
                        </div>
                      </div>
                      <CardDescription className="text-sm mt-1">
                        {resource.tags.map(tag => (
                          <span 
                            key={tag} 
                            className="inline-block bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs px-2 py-0.5 rounded mr-1 mb-1"
                          >
                            {tag}
                          </span>
                        ))}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        {resource.description}
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-0">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center"
                        onClick={() => handleResourceClick(resource)}
                      >
                        <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                        {isSpanish ? "Ver recurso" : "View resource"}
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownload(resource.id)}
                        className="text-indigo-600 dark:text-indigo-400"
                      >
                        <Download className="h-3.5 w-3.5 mr-1.5" />
                        {isSpanish ? "Descargar" : "Download"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        <Separator className="my-8" />
        
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            {isSpanish ? "Preguntas Frecuentes sobre el Duelo" : "Frequently Asked Questions about Grief"}
          </h2>
          
          <div className="space-y-3">
            {faqItems.map((item, index) => (
              <Collapsible
                key={index}
                open={expandedFaq === `faq-${index}`}
                onOpenChange={() => toggleFaq(`faq-${index}`)}
                className="border border-gray-200 dark:border-gray-800 rounded-lg"
              >
                <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left">
                  <span className="font-medium">{item.question}</span>
                  <ChevronDown 
                    className={`h-5 w-5 transition-transform ${
                      expandedFaq === `faq-${index}` ? "transform rotate-180" : ""
                    }`} 
                  />
                </CollapsibleTrigger>
                <CollapsibleContent className="px-4 pb-4 pt-0 text-gray-700 dark:text-gray-300">
                  <p>{item.answer}</p>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </section>
        
        <Separator className="my-8" />
        
        <section className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-6 border border-indigo-100 dark:border-indigo-800/30">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-indigo-700 dark:text-indigo-300">
                {isSpanish ? "¿Necesitas apoyo inmediato?" : "Need Immediate Support?"}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mt-1">
                {isSpanish 
                  ? "Conéctate con especialistas en duelo o grupos de apoyo" 
                  : "Connect with grief specialists or support groups"}
              </p>
            </div>
            
            <Button 
              onClick={() => navigate("/cancer-support/grief-groups")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              {isSpanish ? "Encontrar apoyo ahora" : "Find Support Now"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>
      </div>
    </Page>
  );
};

export default GriefResources;
