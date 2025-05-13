
import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Page from "@/components/Page";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Flower, Heart, ArrowLeft, Calendar, MessageSquare, Share2, Send } from "lucide-react";
import useTranslation from "@/hooks/useTranslation";
import { Skeleton } from "@/components/ui/skeleton";
import PortalBackButton from "@/components/navigation/PortalBackButton";

interface Comment {
  id: string;
  name: string;
  date: string;
  text: string;
}

const sampleComments: Comment[] = [
  {
    id: "c1",
    name: "Sarah Thompson",
    date: "2023-04-15",
    text: "I'll always remember our road trips and your infectious laughter. You taught me to find joy in the small things."
  },
  {
    id: "c2",
    name: "Michael Rodriguez",
    date: "2023-04-12",
    text: "Your kindness changed my life. I'm forever grateful for your mentorship and friendship over the years."
  },
  {
    id: "c3",
    name: "Emily Chen",
    date: "2023-04-10",
    text: "I miss our long talks and the wisdom you always shared. You continue to inspire me every day."
  }
];

const MemorialTributeDetail: React.FC = () => {
  const { isSpanish } = useTranslation();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { tributeId } = useParams<{ tributeId: string }>();
  
  // Get the memorial data from location state or fetch it (in a real app)
  const memorial = location.state?.memorial;
  const returnPath = location.state?.returnPath || "/cancer-support/memorial-wall";
  
  const [comments, setComments] = useState<Comment[]>(sampleComments);
  const [newComment, setNewComment] = useState("");
  const [flowerCount, setFlowerCount] = useState(memorial?.flowers || 42);
  const [heartCount, setHeartCount] = useState(12);
  
  const handleAddFlower = () => {
    setFlowerCount(prev => prev + 1);
    toast({
      title: isSpanish ? "Flor añadida" : "Flower added",
      description: isSpanish ? "Has añadido una flor en memoria." : "You've added a flower in remembrance.",
      duration: 2000,
    });
  };
  
  const handleAddHeart = () => {
    setHeartCount(prev => prev + 1);
    toast({
      title: isSpanish ? "Corazón añadido" : "Heart added",
      description: isSpanish ? "Has expresado tu cariño." : "You've expressed your love.",
      duration: 2000,
    });
  };
  
  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    const comment: Comment = {
      id: `c${Date.now()}`,
      name: "You",
      date: new Date().toISOString().split('T')[0],
      text: newComment
    };
    
    setComments(prev => [comment, ...prev]);
    setNewComment("");
    
    toast({
      title: isSpanish ? "Comentario añadido" : "Comment added",
      description: isSpanish ? "Tu mensaje ha sido compartido." : "Your message has been shared.",
      duration: 2000,
    });
  };
  
  const handleShare = () => {
    // In a real app, this would open a share dialog
    toast({
      title: isSpanish ? "Compartir tributo" : "Share tribute",
      description: isSpanish 
        ? "Opciones para compartir estarán disponibles próximamente" 
        : "Sharing options will be available soon",
      duration: 2000,
    });
  };
  
  if (!memorial) {
    // In a real app, you would fetch the memorial data
    return (
      <Page title={isSpanish ? "Detalles del Tributo" : "Tribute Details"}>
        <div className="space-y-6">
          <PortalBackButton returnPath={returnPath} />
          
          <div className="space-y-4">
            <Skeleton className="h-[300px] w-full" />
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </Page>
    );
  }
  
  const formattedDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat(isSpanish ? 'es-ES' : 'en-US', {
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    }).format(date);
  };
  
  return (
    <Page title={memorial.name}>
      <div className="space-y-6">
        <PortalBackButton returnPath={returnPath} />
        
        <div className="relative rounded-lg overflow-hidden">
          <AspectRatio ratio={21/9}>
            <img 
              src={memorial.image} 
              alt={memorial.name} 
              className="object-cover w-full h-full"
            />
          </AspectRatio>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end">
            <div className="p-8 text-white">
              <h1 className="text-4xl font-bold">{memorial.name}</h1>
              <p className="text-xl opacity-90">{memorial.dates}</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-4 items-center">
            <Button 
              variant="outline" 
              className="flex items-center gap-2 border-indigo-200 hover:border-indigo-300 dark:border-indigo-800 dark:hover:border-indigo-700"
              onClick={handleAddFlower}
            >
              <Flower className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              <span>
                {isSpanish ? "Añadir Flor" : "Add Flower"}
                <span className="ml-1 text-indigo-600 dark:text-indigo-400">({flowerCount})</span>
              </span>
            </Button>
            
            <Button 
              variant="outline" 
              className="flex items-center gap-2 border-pink-200 hover:border-pink-300 dark:border-pink-800 dark:hover:border-pink-700"
              onClick={handleAddHeart}
            >
              <Heart className="h-5 w-5 text-pink-500 dark:text-pink-400" />
              <span>
                {isSpanish ? "Enviar Amor" : "Send Love"}
                <span className="ml-1 text-pink-500 dark:text-pink-400">({heartCount})</span>
              </span>
            </Button>
          </div>
          
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4" />
            <span>{isSpanish ? "Compartir" : "Share"}</span>
          </Button>
        </div>
        
        <Card className="border-indigo-100 dark:border-indigo-900/30">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">
              {isSpanish ? "En Memoria" : "In Memory"}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {memorial.message}
            </p>
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-indigo-700 dark:text-indigo-400 flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" />
            {isSpanish ? "Mensajes y Recuerdos" : "Messages & Memories"}
            <span className="ml-2 text-gray-500 dark:text-gray-400 text-sm">
              ({comments.length})
            </span>
          </h2>
          
          <Card className="border-indigo-100 dark:border-indigo-900/30">
            <CardContent className="p-6">
              <Textarea
                placeholder={isSpanish 
                  ? "Comparte un recuerdo o mensaje especial..." 
                  : "Share a special memory or message..."
                }
                className="min-h-[100px]"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <div className="flex justify-end mt-3">
                <Button 
                  onClick={handleAddComment}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  <Send className="h-4 w-4 mr-2" />
                  {isSpanish ? "Publicar Comentario" : "Post Comment"}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="space-y-4">
            {comments.map((comment) => (
              <Card key={comment.id} className="border-indigo-100 dark:border-indigo-900/30">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">{comment.name}</h3>
                    <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                      <Calendar className="h-3.5 w-3.5 mr-1" />
                      {formattedDate(comment.date)}
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{comment.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Page>
  );
};

export default MemorialTributeDetail;
