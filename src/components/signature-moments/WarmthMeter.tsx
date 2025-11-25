import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Heart, MessageCircle, Bookmark, Quote } from "lucide-react";
import { getEmpatheticCopy } from "@/constants/empatheticCopy";

interface Impact {
  id: string;
  impact_type: string;
  anonymous_quote: string | null;
  created_at: string;
}

const impactIcons = {
  heart: Heart,
  reply: MessageCircle,
  save: Bookmark,
  quote: Quote
};

const impactColors = {
  heart: "#D4A5A5", // Rose gold
  reply: "#9D8EC7", // Lavender
  save: "#f5c14d", // Gold
  quote: "#2D5F4D"  // Forest green
};

export const WarmthMeter = () => {
  const [impacts, setImpacts] = useState<Impact[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadImpactData();
  }, []);

  const loadImpactData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('community_impact')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(10);

    if (data) {
      setImpacts(data);
      setTotalCount(data.length);
      setLoading(false);
    }
  };

  const impactByType = impacts.reduce((acc, impact) => {
    acc[impact.impact_type] = (acc[impact.impact_type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const quotes = impacts.filter(i => i.anonymous_quote).slice(0, 3);

  return (
    <Card className="bg-gray-800/40 backdrop-blur-sm border-bronze-400/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-white">
          <Heart className="w-6 h-6 text-bronze-400" />
          {getEmpatheticCopy('warmth', 'title')}
        </CardTitle>
        <p className="text-sm text-gray-400">
          See how your presence helps others heal
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Total Impact */}
        <div className="text-center p-8 bg-gradient-to-br from-bronze-500/10 to-bronze-600/5 rounded-lg border border-bronze-400/30">
          <div className="text-5xl font-bold text-white mb-2">
            {totalCount}
          </div>
          <p className="text-gray-300">
            {getEmpatheticCopy('warmth', 'impact', { count: totalCount })}
          </p>
        </div>

        {/* Impact Breakdown */}
        {totalCount > 0 && (
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(impactByType).map(([type, count]) => {
              const Icon = impactIcons[type as keyof typeof impactIcons];
              const color = impactColors[type as keyof typeof impactColors];

              return (
                <div
                  key={type}
                  className="p-4 bg-gray-900/50 rounded-lg border border-bronze-400/30 hover:border-bronze-400/60 transition-all"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Icon className="w-5 h-5" style={{ color }} />
                    <span className="text-white font-medium capitalize">{type}s</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{count}</div>
                </div>
              );
            })}
          </div>
        )}

        {/* Anonymous Quotes */}
        {quotes.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-white font-medium flex items-center gap-2">
              <Quote className="w-4 h-4 text-bronze-400" />
              What Others Saved
            </h3>
            {quotes.map((impact) => (
              <div
                key={impact.id}
                className="p-4 bg-gray-900/50 rounded-lg border-l-4 border-bronze-400"
              >
                <p className="text-gray-300 italic">
                  "{impact.anonymous_quote}"
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  {new Date(impact.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {totalCount === 0 && !loading && (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 mx-auto mb-4 text-bronze-400/50" />
            <p className="text-gray-400 mb-2">
              {getEmpatheticCopy('warmth', 'empty')}
            </p>
            <p className="text-sm text-gray-500">
              Share your story on the Support Wall
            </p>
          </div>
        )}

        {/* Heatmap (Monthly Impact) */}
        {totalCount > 0 && (
          <div className="space-y-2">
            <h3 className="text-white font-medium text-sm">This Month</h3>
            <div className="flex gap-1 h-24">
              {Array.from({ length: 30 }, (_, i) => {
                const dayImpacts = impacts.filter(impact => {
                  const impactDate = new Date(impact.created_at);
                  const dayStart = new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000);
                  return impactDate.toDateString() === dayStart.toDateString();
                });

                const intensity = Math.min(dayImpacts.length / 5, 1);
                
                return (
                  <div
                    key={i}
                    className="flex-1 rounded-sm transition-all hover:scale-110"
                    style={{
                      backgroundColor: `rgba(212, 175, 55, ${intensity * 0.8})`,
                      minHeight: intensity > 0 ? '20px' : '8px'
                    }}
                    title={`${dayImpacts.length} impacts`}
                  />
                );
              })}
            </div>
            <p className="text-xs text-gray-500 text-center">
              Your impact over the last 30 days
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
