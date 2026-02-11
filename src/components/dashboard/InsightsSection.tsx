import React, { useEffect, useState } from "react";
import { Brain, TrendingUp, TrendingDown, AlertCircle, Clock, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { startOfWeek, format, subDays } from "date-fns";

interface MoodRow {
  mood_score: number;
  mood_label: string | null;
  created_at: string | null;
  notes: string | null;
}

const InsightsSection = () => {
  const preferredLanguage = localStorage.getItem('preferredLanguage') || 'English';
  const isSpanish = preferredLanguage === 'Español';
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [moodData, setMoodData] = useState<{
    average: number;
    improvement: string;
    improvementPositive: boolean;
    triggers: string[];
    patterns: { day: string; value: number }[];
    timeOfDay: { time: string; mood: string }[];
  } | null>(null);

  const translations = {
    title: isSpanish ? "Análisis de Estado de Ánimo" : "Mood Insights",
    subtitle: isSpanish ? "Patrones y tendencias en tus registros" : "Patterns and trends in your mood entries",
    averageMood: isSpanish ? "Estado de Ánimo Promedio" : "Average Mood",
    weeklyTrend: isSpanish ? "Tendencia Semanal" : "Weekly Trend",
    timeOfDay: isSpanish ? "Impacto por Hora del Día" : "Time of Day Impact",
    potentialTriggers: isSpanish ? "Posibles Desencadenantes" : "Potential Triggers",
    viewDetailedReports: isSpanish ? "Ver Informes Detallados" : "View Detailed Reports",
    morning: isSpanish ? "Mañana" : "Morning",
    afternoon: isSpanish ? "Tarde" : "Afternoon",
    evening: isSpanish ? "Noche" : "Evening",
    noData: isSpanish ? "Aún no hay datos. Registra tu estado de ánimo para ver tendencias." : "No data yet. Log your mood to see trends.",
    days: isSpanish
      ? ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"]
      : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  };

  useEffect(() => {
    const fetchMoodData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setLoading(false); return; }

      const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
      const prevWeekStart = subDays(weekStart, 7);

      // Fetch this week + last week
      const { data: entries } = await supabase
        .from("mood_entries")
        .select("mood_score, mood_label, created_at, notes")
        .eq("user_id", user.id)
        .gte("created_at", prevWeekStart.toISOString())
        .order("created_at", { ascending: true });

      // Also check daily_check_ins
      const { data: checkIns } = await supabase
        .from("daily_check_ins")
        .select("mood_score, mood_label, created_at, note")
        .eq("user_id", user.id)
        .gte("created_at", prevWeekStart.toISOString())
        .order("created_at", { ascending: true });

      const allEntries: MoodRow[] = [
        ...(entries || []),
        ...(checkIns || []).map(c => ({ mood_score: c.mood_score, mood_label: c.mood_label, created_at: c.created_at, notes: c.note }))
      ];

      if (allEntries.length === 0) { setMoodData(null); setLoading(false); return; }

      const thisWeek = allEntries.filter(e => e.created_at && new Date(e.created_at) >= weekStart);
      const lastWeek = allEntries.filter(e => e.created_at && new Date(e.created_at) < weekStart);

      const avg = (arr: MoodRow[]) => arr.length ? arr.reduce((s, e) => s + e.mood_score, 0) / arr.length : 0;
      const thisAvg = avg(thisWeek);
      const lastAvg = avg(lastWeek);
      const change = lastAvg > 0 ? ((thisAvg - lastAvg) / lastAvg) * 100 : 0;

      // Daily pattern for current week
      const dayBuckets: Record<number, number[]> = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };
      thisWeek.forEach(e => {
        if (e.created_at) {
          const d = new Date(e.created_at);
          const day = (d.getDay() + 6) % 7; // Monday=0
          dayBuckets[day].push(e.mood_score);
        }
      });
      const patterns = translations.days.map((label, i) => ({
        day: label,
        value: dayBuckets[i].length ? Math.round((dayBuckets[i].reduce((a, b) => a + b, 0) / dayBuckets[i].length) * 10) : 0
      }));

      // Time of day
      const timeBuckets: Record<string, number[]> = { morning: [], afternoon: [], evening: [] };
      thisWeek.forEach(e => {
        if (e.created_at) {
          const h = new Date(e.created_at).getHours();
          if (h < 12) timeBuckets.morning.push(e.mood_score);
          else if (h < 17) timeBuckets.afternoon.push(e.mood_score);
          else timeBuckets.evening.push(e.mood_score);
        }
      });
      const timeOfDay = [
        { time: translations.morning, mood: timeBuckets.morning.length ? (timeBuckets.morning.reduce((a, b) => a + b, 0) / timeBuckets.morning.length).toFixed(1) : "-" },
        { time: translations.afternoon, mood: timeBuckets.afternoon.length ? (timeBuckets.afternoon.reduce((a, b) => a + b, 0) / timeBuckets.afternoon.length).toFixed(1) : "-" },
        { time: translations.evening, mood: timeBuckets.evening.length ? (timeBuckets.evening.reduce((a, b) => a + b, 0) / timeBuckets.evening.length).toFixed(1) : "-" },
      ];

      // Extract common tags/labels as "triggers"
      const labelCounts: Record<string, number> = {};
      allEntries.forEach(e => {
        if (e.mood_label && e.mood_score <= 5) {
          labelCounts[e.mood_label] = (labelCounts[e.mood_label] || 0) + 1;
        }
      });
      const triggers = Object.entries(labelCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([label]) => label);

      setMoodData({
        average: parseFloat((thisWeek.length ? thisAvg : avg(allEntries)).toFixed(1)),
        improvement: `${change >= 0 ? "+" : ""}${change.toFixed(0)}%`,
        improvementPositive: change >= 0,
        triggers: triggers.length ? triggers : (isSpanish ? ["Sin datos suficientes"] : ["Not enough data"]),
        patterns,
        timeOfDay,
      });
      setLoading(false);
    };
    fetchMoodData();
  }, []);

  return (
    <Card className="border-[#B87333]/20 hover:border-[#B87333]/40 transition-all duration-300 shadow-sm hover:shadow-md relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-[#fdfcfb]/30 to-[#e2d1c3]/30 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
      <div className="absolute top-0 right-0 w-40 h-40 bg-[#B87333]/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
      
      <CardHeader className="pb-2 relative z-10">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <div className="relative">
            <div className="absolute inset-0 bg-[#B87333]/20 rounded-full blur-sm"></div>
            <Brain className="h-5 w-5 text-[#B87333] relative" />
          </div>
          {translations.title}
        </CardTitle>
        <CardDescription>{translations.subtitle}</CardDescription>
      </CardHeader>
      <CardContent className="relative z-10">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-[#B87333]" />
          </div>
        ) : !moodData ? (
          <div className="text-center py-6 text-muted-foreground text-sm">{translations.noData}</div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm text-muted-foreground">{translations.averageMood}</span>
                <div className="text-2xl font-bold">{moodData.average}/10</div>
              </div>
              <div className={`flex items-center gap-1 ${moodData.improvementPositive ? 'text-emerald-600 bg-emerald-50' : 'text-red-600 bg-red-50'} px-2 py-1 rounded-full text-xs`}>
                {moodData.improvementPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {moodData.improvement}
              </div>
            </div>

            <div>
              <span className="text-sm text-muted-foreground">{translations.weeklyTrend}</span>
              <div className="mt-2 flex items-end space-x-1">
                {moodData.patterns.map((day) => (
                  <div key={day.day} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-gradient-to-t from-[#B87333]/30 to-[#B87333]/10 rounded-t-sm"
                      style={{ height: `${Math.max(day.value, 4)}px` }}
                    />
                    <span className="text-xs mt-1">{day.day}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <span className="text-sm text-muted-foreground">{translations.timeOfDay}</span>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {moodData.timeOfDay.map((time, index) => (
                  <div key={index} className="text-center p-1.5 bg-[#B87333]/5 rounded-md">
                    <div className="flex items-center justify-center gap-1 text-xs text-[#B87333]">
                      <Clock className="h-3 w-3" />
                      {time.time}
                    </div>
                    <div className="font-medium mt-1">{time.mood}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <span className="text-sm text-muted-foreground">{translations.potentialTriggers}</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {moodData.triggers.map((trigger, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-[#B87333]/10 text-[#B87333] rounded-full text-xs flex items-center gap-1 hover:bg-[#B87333]/20 transition-colors"
                  >
                    <AlertCircle className="h-3 w-3" />
                    {trigger}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="mt-3 text-center">
          <button
            onClick={() => navigate("/app/progress-analytics")}
            className="text-sm text-[#B87333] hover:text-[#A56625] underline-offset-4 hover:underline"
          >
            {translations.viewDetailedReports}
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default InsightsSection;
