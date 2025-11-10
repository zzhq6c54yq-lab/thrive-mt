import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Image as ImageIcon, Upload, Heart } from "lucide-react";

const MediaGallery: React.FC = () => {
  const [media, setMedia] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadMedia();
  }, []);

  const loadMedia = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get user's connections
      const { data: connections } = await supabase
        .from('parent_connections')
        .select('id')
        .or(`requester_id.eq.${user.id},recipient_id.eq.${user.id}`)
        .eq('status', 'accepted');

      if (!connections || connections.length === 0) {
        setMedia([]);
        setIsLoading(false);
        return;
      }

      const connectionIds = connections.map(c => c.id);

      // Get media for these connections
      const { data, error } = await supabase
        .from('shared_media')
        .select('*')
        .in('connection_id', connectionIds)
        .order('created_at', { ascending: false })
        .limit(12);

      if (error) throw error;

      setMedia(data || []);
    } catch (error) {
      console.error('Error loading media:', error);
      toast({
        title: "Error",
        description: "Failed to load media gallery",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFavorite = async (mediaId: string, currentState: boolean) => {
    try {
      const { error } = await supabase
        .from('shared_media')
        .update({ is_favorite: !currentState })
        .eq('id', mediaId);

      if (error) throw error;

      setMedia(media.map(m => 
        m.id === mediaId ? { ...m, is_favorite: !currentState } : m
      ));
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  if (isLoading) {
    return <div className="text-center text-muted-foreground">Loading gallery...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <ImageIcon className="w-5 h-5" />
          Photo Gallery
        </h3>
        <Button size="sm">
          <Upload className="w-4 h-4 mr-2" />
          Upload
        </Button>
      </div>

      {media.length === 0 ? (
        <Card className="p-8 text-center">
          <ImageIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No photos yet. Upload your first memory!</p>
        </Card>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {media.map((item) => (
            <Card key={item.id} className="relative group overflow-hidden">
              <div className="aspect-square bg-muted flex items-center justify-center">
                {item.media_type === 'photo' ? (
                  <ImageIcon className="w-12 h-12 text-muted-foreground" />
                ) : (
                  <div className="text-muted-foreground text-xs">
                    {item.media_type}
                  </div>
                )}
              </div>
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <div className="flex-1">
                  {item.title && (
                    <p className="text-white text-sm font-medium mb-1">{item.title}</p>
                  )}
                  {item.child_name && (
                    <p className="text-white/80 text-xs">{item.child_name}</p>
                  )}
                </div>
                <Button
                  size="sm"
                  variant={item.is_favorite ? "default" : "ghost"}
                  className="w-8 h-8 p-0"
                  onClick={() => toggleFavorite(item.id, item.is_favorite)}
                >
                  <Heart className={`w-4 h-4 ${item.is_favorite ? 'fill-current' : ''}`} />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaGallery;
