import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Sparkles, Download } from "lucide-react";
import { getEmpatheticCopy } from "@/constants/empatheticCopy";
import { playSound } from "@/utils/soundSystem";

interface Star {
  id: string;
  star_name: string;
  activity_type: string;
  x_position: number;
  y_position: number;
  brightness: number;
  color: string;
  date_created: string;
}

export const ConstellationView = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stars, setStars] = useState<Star[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredStar, setHoveredStar] = useState<Star | null>(null);

  useEffect(() => {
    loadConstellation();
  }, []);

  useEffect(() => {
    if (stars.length > 0) {
      drawConstellation();
    }
  }, [stars, hoveredStar]);

  const loadConstellation = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('constellation_data')
      .select('*')
      .eq('user_id', user.id)
      .order('date_created', { ascending: true });

    if (data) {
      setStars(data);
      setLoading(false);
    }
  };

  const drawConstellation = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Clear canvas
    ctx.fillStyle = '#0a0a0f';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw connections between stars (constellation lines)
    if (stars.length > 1) {
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      
      stars.forEach((star, index) => {
        if (index === 0) {
          ctx.moveTo(star.x_position * canvas.width, star.y_position * canvas.height);
        } else {
          ctx.lineTo(star.x_position * canvas.width, star.y_position * canvas.height);
        }
      });
      
      ctx.stroke();
    }

    // Draw stars
    stars.forEach((star) => {
      const x = star.x_position * canvas.width;
      const y = star.y_position * canvas.height;
      const radius = star.brightness * 4;

      // Glow effect
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius * 2);
      gradient.addColorStop(0, star.color);
      gradient.addColorStop(0.5, star.color + '80');
      gradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, radius * 2, 0, Math.PI * 2);
      ctx.fill();

      // Core star
      ctx.fillStyle = star.color;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();

      // Highlight hovered star
      if (hoveredStar?.id === star.id) {
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(x, y, radius + 5, 0, Math.PI * 2);
        ctx.stroke();
      }
    });

    // Draw twinkle effect
    stars.forEach((star) => {
      if (Math.random() > 0.95) {
        const x = star.x_position * canvas.width;
        const y = star.y_position * canvas.height;
        
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x - 8, y);
        ctx.lineTo(x + 8, y);
        ctx.moveTo(x, y - 8);
        ctx.lineTo(x, y + 8);
        ctx.stroke();
      }
    });
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / canvas.width;
    const y = (e.clientY - rect.top) / canvas.height;

    // Find clicked star
    const clickedStar = stars.find(star => {
      const dx = star.x_position - x;
      const dy = star.y_position - y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance < 0.03; // Threshold
    });

    if (clickedStar) {
      setHoveredStar(clickedStar === hoveredStar ? null : clickedStar);
      playSound('star_appear');
    }
  };

  const exportConstellation = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `my-constellation-${new Date().toISOString().split('T')[0]}.png`;
    link.href = dataURL;
    link.click();

    playSound('complete');
  };

  const isEmpty = stars.length === 0;

  return (
    <Card className="bg-gray-800/40 backdrop-blur-sm border-bronze-400/30">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3 text-white">
            <Sparkles className="w-6 h-6 text-bronze-400" />
            {getEmpatheticCopy('constellation', 'title')}
          </CardTitle>
          {!isEmpty && (
            <Button
              onClick={exportConstellation}
              variant="outline"
              size="sm"
              className="border-bronze-400/30 hover:border-bronze-400/60"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          )}
        </div>
        <p className="text-sm text-gray-400">
          Every activity becomes a star in your night sky
        </p>
      </CardHeader>
      <CardContent>
        {isEmpty ? (
          <div className="text-center py-12">
            <Sparkles className="w-16 h-16 mx-auto mb-4 text-bronze-400/50" />
            <p className="text-gray-400 mb-2">
              {getEmpatheticCopy('constellation', 'empty')}
            </p>
            <p className="text-sm text-gray-500">
              Your first star will appear soon
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <canvas
              ref={canvasRef}
              onClick={handleCanvasClick}
              className="w-full h-96 rounded-lg cursor-pointer"
              style={{ background: 'linear-gradient(to bottom, #0a0a0f, #1a1a2e)' }}
            />

            {hoveredStar && (
              <div className="p-4 bg-gray-900/50 rounded-lg border border-bronze-400/30">
                <h4 className="text-white font-medium mb-2">{hoveredStar.star_name}</h4>
                <p className="text-sm text-gray-400">
                  Activity: {hoveredStar.activity_type}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Created: {new Date(hoveredStar.date_created).toLocaleDateString()}
                </p>
              </div>
            )}

            <div className="text-center text-sm text-gray-400">
              {stars.length} stars in your constellation
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
