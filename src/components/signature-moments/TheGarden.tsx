import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Flower2, Sprout, TreeDeciduous, Leaf } from "lucide-react";
import { getEmpatheticCopy } from "@/constants/empatheticCopy";
import { playSound } from "@/utils/soundSystem";

interface Plant {
  id: string;
  plant_type: string;
  activity_category: string;
  growth_stage: string;
  days_grown: number;
  last_watered_at: string;
}

const plantIcons = {
  seed: Leaf,
  sprout: Sprout,
  flower: Flower2,
  tree: TreeDeciduous
};

const plantColors = {
  meditation: "#9D8EC7", // Lavender
  gratitude: "#f5c14d", // Sunflower gold
  journaling: "#D4A5A5", // Rose
  exercise: "#2D5F4D" // Forest green
};

export const TheGarden = () => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    loadGarden();
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  };

  const loadGarden = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('garden_progress')
      .select('*')
      .eq('user_id', user.id)
      .order('planted_at', { ascending: true });

    if (data) {
      setPlants(data);
      setLoading(false);
    }
  };

  const plantActivity = async (category: string) => {
    if (!user) return;

    const plantType = {
      meditation: 'lavender',
      gratitude: 'sunflower',
      journaling: 'rose',
      exercise: 'oak_tree'
    }[category] || 'wildflower';

    const { data, error } = await supabase
      .from('garden_progress')
      .insert({
        user_id: user.id,
        plant_type: plantType,
        activity_category: category,
        growth_stage: 'seed',
        days_grown: 0
      })
      .select()
      .single();

    if (data) {
      setPlants(prev => [...prev, data]);
      playSound('plant_grow');
    }
  };

  const getGrowthStage = (daysGrown: number): string => {
    if (daysGrown < 3) return 'seed';
    if (daysGrown < 7) return 'sprout';
    if (daysGrown < 30) return 'flower';
    return 'tree';
  };

  const isEmpty = plants.length === 0;

  return (
    <Card className="bg-gray-800/40 backdrop-blur-sm border-bronze-400/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-white">
          <TreeDeciduous className="w-6 h-6 text-bronze-400" />
          {getEmpatheticCopy('garden', 'title')}
        </CardTitle>
        <p className="text-sm text-gray-400">
          Each activity you complete plants something beautiful
        </p>
      </CardHeader>
      <CardContent>
        {isEmpty ? (
          <div className="text-center py-12">
            <Leaf className="w-16 h-16 mx-auto mb-4 text-bronze-400/50" />
            <p className="text-gray-400 mb-2">
              {getEmpatheticCopy('garden', 'empty')}
            </p>
            <p className="text-sm text-gray-500">
              Your first activity will plant a seed
            </p>
          </div>
        ) : (
          <div className="relative h-96 bg-gradient-to-b from-gray-900/50 to-gray-800/80 rounded-lg p-6 overflow-hidden">
            {/* Sky background */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-transparent" />
            
            {/* Ground */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-green-900/30 to-transparent" />
            
            {/* Plants */}
            <div className="relative h-full flex items-end justify-center gap-8 flex-wrap">
              {plants.map((plant, index) => {
                const Icon = plantIcons[plant.growth_stage as keyof typeof plantIcons];
                const color = plantColors[plant.activity_category as keyof typeof plantColors] || plantColors.meditation;
                const size = {
                  seed: 'w-4 h-4',
                  sprout: 'w-8 h-8',
                  flower: 'w-12 h-12',
                  tree: 'w-16 h-16'
                }[plant.growth_stage];

                return (
                  <div
                    key={plant.id}
                    className="transition-all duration-500 hover:scale-110 cursor-pointer"
                    style={{
                      animation: `sway ${2 + index * 0.5}s ease-in-out infinite`
                    }}
                  >
                    <Icon 
                      className={`${size} mb-2`}
                      style={{ color }}
                    />
                    <div className="text-xs text-center text-gray-400">
                      {plant.days_grown} days
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Stats */}
            <div className="absolute top-4 right-4 text-right">
              <div className="text-sm text-gray-400">
                {plants.length} plants growing
              </div>
              <div className="text-xs text-gray-500">
                {plants.filter(p => p.growth_stage === 'tree').length} fully grown
              </div>
            </div>
          </div>
        )}

        <style>{`
          @keyframes sway {
            0%, 100% { transform: rotate(-2deg); }
            50% { transform: rotate(2deg); }
          }
        `}</style>
      </CardContent>
    </Card>
  );
};
