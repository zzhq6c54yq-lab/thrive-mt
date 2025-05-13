
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Page from "@/components/Page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Flower, Search, Heart, Plus, Image, Edit, Calendar, MessageSquare } from "lucide-react";
import useTranslation from "@/hooks/useTranslation";

// Sample memorial entries
const sampleMemorials = [
  {
    id: "mem1",
    name: "Eleanor Johnson",
    dates: "1945-2023",
    image: "https://images.unsplash.com/photo-1601288496920-b6154fe3626a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    message: "A loving mother, grandmother, and friend who inspired everyone around her with her strength and kindness.",
    flowers: 24,
    messages: 12
  },
  {
    id: "mem2",
    name: "Robert Wilson",
    dates: "1938-2022",
    image: "https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    message: "A dedicated teacher who changed countless lives through his mentorship and wisdom.",
    flowers: 36,
    messages: 18
  },
  {
    id: "mem3",
    name: "Maria Rodriguez",
    dates: "1972-2023",
    image: "https://images.unsplash.com/photo-1557053815-9f79f70c7980?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    message: "Her laughter and spirit will forever echo in our hearts. A beacon of light in the darkest times.",
    flowers: 42,
    messages: 22
  }
];

interface Memorial {
  id: string;
  name: string;
  dates: string;
  image: string;
  message: string;
  flowers: number;
  messages: number;
}

const MemorialWall: React.FC = () => {
  const { isSpanish } = useTranslation();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState<string>("all");
  const [memorials, setMemorials] = useState<Memorial[]>(sampleMemorials);
  const [searchQuery, setSearchQuery] = useState("");
  
  // For tribute creation
  const [showNewTribute, setShowNewTribute] = useState(false);
  const [newTribute, setNewTribute] = useState({
    name: "",
    dates: "",
    image: "",
    message: ""
  });
  
  // Filter memorials based on search query
  const filteredMemorials = memorials.filter(memorial => 
    memorial.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    memorial.message.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleAddFlower = (memorialId: string) => {
    setMemorials(prev => 
      prev.map(memorial => 
        memorial.id === memorialId 
          ? {...memorial, flowers: memorial.flowers + 1} 
          : memorial
      )
    );
    
    toast({
      title: isSpanish ? "Flor añadida" : "Flower added",
      description: isSpanish ? "Has añadido una flor en memoria." : "You've added a flower in remembrance.",
      duration: 2000,
    });
  };
  
  const handleCreateTribute = () => {
    if (!newTribute.name || !newTribute.message) {
      toast({
        title: isSpanish ? "Información requerida" : "Required Information",
        description: isSpanish ? "Por favor añade un nombre y un mensaje." : "Please add a name and message.",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }
    
    const id = `mem${Date.now()}`;
    const defaultImage = "https://images.unsplash.com/photo-1496661415325-ef852f9e8e7c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
    
    const createdTribute: Memorial = {
      id,
      name: newTribute.name,
      dates: newTribute.dates,
      image: newTribute.image || defaultImage,
      message: newTribute.message,
      flowers: 0,
      messages: 0
    };
    
    setMemorials(prev => [createdTribute, ...prev]);
    setNewTribute({
      name: "",
      dates: "",
      image: "",
      message: ""
    });
    setShowNewTribute(false);
    
    toast({
      title: isSpanish ? "Tributo creado" : "Tribute Created",
      description: isSpanish 
        ? "Tu tributo ha sido añadido al Muro Conmemorativo." 
        : "Your tribute has been added to the Memorial Wall.",
      duration: 3000,
    });
  };
  
  const handleViewTribute = (id: string) => {
    // In a real application, this would navigate to a detailed view
    navigate(`/cancer-support/memorial-wall/${id}`, { 
      state: { 
        memorial: memorials.find(m => m.id === id),
        returnPath: "/cancer-support/memorial-wall"
      } 
    });
  };
  
  return (
    <Page title={isSpanish ? "Muro Conmemorativo" : "Memorial Wall"} returnToMain>
      <div className="space-y-6">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 flex items-center">
              <Flower className="h-7 w-7 mr-2 text-indigo-500" />
              {isSpanish ? "Muro Conmemorativo" : "Memorial Wall"}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {isSpanish
                ? "Un espacio para honrar y recordar a nuestros seres queridos"
                : "A place to honor and remember our loved ones"}
            </p>
          </div>
          
          <div className="flex space-x-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                type="search"
                placeholder={isSpanish ? "Buscar tributos..." : "Search tributes..."}
                className="pl-8 md:w-[200px] lg:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Button 
              onClick={() => setShowNewTribute(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              <Plus className="h-4 w-4 mr-1" />
              {isSpanish ? "Crear Tributo" : "Create Tribute"}
            </Button>
          </div>
        </div>
        
        <Separator className="my-4 bg-indigo-200 dark:bg-indigo-800/40" />
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">{isSpanish ? "Todos" : "All"}</TabsTrigger>
            <TabsTrigger value="recent">{isSpanish ? "Recientes" : "Recent"}</TabsTrigger>
            <TabsTrigger value="featured">{isSpanish ? "Destacados" : "Featured"}</TabsTrigger>
            <TabsTrigger value="my-tributes">{isSpanish ? "Mis Tributos" : "My Tributes"}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            {showNewTribute ? (
              <Card className="mb-8 border-indigo-200 dark:border-indigo-800/40 overflow-hidden">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">
                    {isSpanish ? "Crear Nuevo Tributo" : "Create New Tribute"}
                  </h2>
                  
                  <div className="grid gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        {isSpanish ? "Nombre" : "Name"} *
                      </label>
                      <Input 
                        value={newTribute.name}
                        onChange={(e) => setNewTribute({...newTribute, name: e.target.value})}
                        placeholder={isSpanish ? "Nombre completo" : "Full name"}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        {isSpanish ? "Fechas (opcional)" : "Dates (optional)"}
                      </label>
                      <Input 
                        value={newTribute.dates}
                        onChange={(e) => setNewTribute({...newTribute, dates: e.target.value})}
                        placeholder={isSpanish ? "Ej: 1950-2023" : "E.g., 1950-2023"}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        {isSpanish ? "URL de imagen (opcional)" : "Image URL (optional)"}
                      </label>
                      <Input 
                        value={newTribute.image}
                        onChange={(e) => setNewTribute({...newTribute, image: e.target.value})}
                        placeholder={isSpanish ? "URL de una fotografía" : "URL to a photograph"}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        {isSpanish ? "Mensaje o recuerdo" : "Message or memory"} *
                      </label>
                      <Textarea 
                        value={newTribute.message}
                        onChange={(e) => setNewTribute({...newTribute, message: e.target.value})}
                        placeholder={isSpanish 
                          ? "Comparte un recuerdo especial o un mensaje en su honor..." 
                          : "Share a special memory or message in their honor..."
                        }
                        rows={4}
                      />
                    </div>
                    
                    <div className="flex justify-end space-x-3 mt-2">
                      <Button 
                        variant="outline"
                        onClick={() => setShowNewTribute(false)}
                      >
                        {isSpanish ? "Cancelar" : "Cancel"}
                      </Button>
                      <Button 
                        className="bg-indigo-600 hover:bg-indigo-700 text-white"
                        onClick={handleCreateTribute}
                      >
                        {isSpanish ? "Crear Tributo" : "Create Tribute"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : null}
            
            {filteredMemorials.length === 0 ? (
              <div className="text-center py-12">
                <Flower className="h-12 w-12 mx-auto text-indigo-300 dark:text-indigo-700" />
                <h3 className="mt-4 text-lg font-medium">
                  {isSpanish ? "No se encontraron tributos" : "No tributes found"}
                </h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  {searchQuery 
                    ? (isSpanish 
                      ? "No hay resultados para tu búsqueda. Prueba con otros términos." 
                      : "No results match your search. Try different terms.")
                    : (isSpanish 
                      ? "Aún no hay tributos. ¿Por qué no creas el primero?" 
                      : "There are no tributes yet. Why not create the first one?")
                  }
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMemorials.map((memorial) => (
                  <Card 
                    key={memorial.id} 
                    className="overflow-hidden hover:shadow-md transition-shadow border-indigo-100 dark:border-indigo-900/30"
                  >
                    <div className="relative h-48">
                      <AspectRatio ratio={16/9}>
                        <img 
                          src={memorial.image} 
                          alt={memorial.name} 
                          className="object-cover w-full h-full"
                        />
                      </AspectRatio>
                      <div 
                        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end"
                      >
                        <div className="p-4 text-white">
                          <h3 className="font-semibold text-lg">{memorial.name}</h3>
                          <p className="text-sm opacity-90">{memorial.dates}</p>
                        </div>
                      </div>
                    </div>
                    
                    <CardContent className="p-4">
                      <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3 mb-4">
                        {memorial.message}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-4">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="flex items-center space-x-1 text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                            onClick={() => handleAddFlower(memorial.id)}
                          >
                            <Flower className="h-4 w-4" />
                            <span>{memorial.flowers}</span>
                          </Button>
                          
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="flex items-center space-x-1 text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                          >
                            <MessageSquare className="h-4 w-4" />
                            <span>{memorial.messages}</span>
                          </Button>
                        </div>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-indigo-600 border-indigo-200 hover:border-indigo-300 dark:border-indigo-800 dark:hover:border-indigo-700"
                          onClick={() => handleViewTribute(memorial.id)}
                        >
                          {isSpanish ? "Ver" : "View"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="recent">
            <div className="py-12 text-center text-gray-500 dark:text-gray-400">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-indigo-400" />
              <p>{isSpanish ? "Ver tributos recientes por fecha" : "View recent tributes by date"}</p>
              <Button variant="link" className="mt-2">
                {isSpanish ? "Implementar próximamente" : "Coming soon"}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="featured">
            <div className="py-12 text-center text-gray-500 dark:text-gray-400">
              <Heart className="h-12 w-12 mx-auto mb-4 text-indigo-400" />
              <p>{isSpanish ? "Tributos destacados por la comunidad" : "Tributes featured by the community"}</p>
              <Button variant="link" className="mt-2">
                {isSpanish ? "Implementar próximamente" : "Coming soon"}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="my-tributes">
            <div className="py-12 text-center text-gray-500 dark:text-gray-400">
              <Edit className="h-12 w-12 mx-auto mb-4 text-indigo-400" />
              <p>{isSpanish ? "Ver y gestionar tus tributos" : "View and manage your tributes"}</p>
              <Button variant="link" className="mt-2">
                {isSpanish ? "Implementar próximamente" : "Coming soon"}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Page>
  );
};

export default MemorialWall;
