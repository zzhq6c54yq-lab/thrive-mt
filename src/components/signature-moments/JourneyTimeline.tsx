import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Clock, TrendingDown, Download, Star } from "lucide-react";
import { getEmpatheticCopy } from "@/constants/empatheticCopy";
import jsPDF from "jspdf";

interface Milestone {
  id: string;
  milestone_type: string;
  title: string;
  description: string | null;
  icon_name: string | null;
  achieved_at: string;
}

interface AssessmentResult {
  id: string;
  assessment_type: string;
  score: number;
  severity: string | null;
  created_at: string;
}

export const JourneyTimeline = () => {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [assessments, setAssessments] = useState<AssessmentResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTimelineData();
  }, []);

  const loadTimelineData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Load milestones
    const { data: milestonesData } = await supabase
      .from('journey_milestones')
      .select('*')
      .eq('user_id', user.id)
      .order('achieved_at', { ascending: false });

    // Load assessment history
    const { data: assessmentsData } = await supabase
      .from('assessment_results')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: true });

    if (milestonesData) setMilestones(milestonesData);
    if (assessmentsData) setAssessments(assessmentsData);
    setLoading(false);
  };

  const getBeforeAfterInsight = () => {
    if (assessments.length < 2) return null;

    const firstPhq9 = assessments.find(a => a.assessment_type === 'phq9');
    const latestPhq9 = assessments.filter(a => a.assessment_type === 'phq9').pop();

    if (!firstPhq9 || !latestPhq9 || firstPhq9.id === latestPhq9.id) return null;

    const scoreDiff = latestPhq9.score - firstPhq9.score;
    const weeksDiff = Math.floor(
      (new Date(latestPhq9.created_at).getTime() - new Date(firstPhq9.created_at).getTime()) /
      (1000 * 60 * 60 * 24 * 7)
    );

    return {
      type: 'phq9',
      before: firstPhq9,
      after: latestPhq9,
      change: scoreDiff,
      weeks: weeksDiff,
      direction: scoreDiff < 0 ? 'improved' : scoreDiff > 0 ? 'increased' : 'stable'
    };
  };

  const exportTimeline = () => {
    const pdf = new jsPDF();
    
    pdf.setFontSize(20);
    pdf.text("My Healing Story", 20, 20);
    
    pdf.setFontSize(12);
    pdf.text(`Timeline created: ${new Date().toLocaleDateString()}`, 20, 30);
    
    let y = 50;
    
    // Add milestones
    pdf.setFontSize(16);
    pdf.text("Milestones", 20, y);
    y += 10;
    
    pdf.setFontSize(10);
    milestones.forEach((milestone) => {
      if (y > 270) {
        pdf.addPage();
        y = 20;
      }
      
      pdf.text(`• ${milestone.title}`, 25, y);
      y += 5;
      if (milestone.description) {
        pdf.text(`  ${milestone.description}`, 30, y);
        y += 5;
      }
      pdf.text(`  ${new Date(milestone.achieved_at).toLocaleDateString()}`, 30, y);
      y += 10;
    });
    
    // Add before/after insights
    const insight = getBeforeAfterInsight();
    if (insight) {
      if (y > 250) {
        pdf.addPage();
        y = 20;
      }
      
      y += 10;
      pdf.setFontSize(16);
      pdf.text("Progress Insights", 20, y);
      y += 10;
      
      pdf.setFontSize(10);
      pdf.text(
        `Your depression score moved from ${insight.before.severity} (${insight.before.score}) to ${insight.after.severity} (${insight.after.score}) over ${insight.weeks} weeks.`,
        20,
        y
      );
      y += 5;
      pdf.text("That's a significant shift in your healing journey.", 20, y);
    }
    
    pdf.save(`my-healing-story-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const insight = getBeforeAfterInsight();

  return (
    <Card className="bg-gray-800/40 backdrop-blur-sm border-bronze-400/30">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3 text-white">
            <Clock className="w-6 h-6 text-bronze-400" />
            {getEmpatheticCopy('timeline', 'title')}
          </CardTitle>
          {milestones.length > 0 && (
            <Button
              onClick={exportTimeline}
              variant="outline"
              size="sm"
              className="border-bronze-400/30 hover:border-bronze-400/60"
            >
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
          )}
        </div>
        <p className="text-sm text-gray-400">
          {getEmpatheticCopy('timeline', 'reflect')}
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Before/After Insight */}
        {insight && (
          <div className="p-6 bg-gradient-to-br from-bronze-500/10 to-bronze-600/5 rounded-lg border border-bronze-400/30">
            <div className="flex items-start gap-4">
              <TrendingDown className="w-6 h-6 text-bronze-400 mt-1" />
              <div>
                <h3 className="text-white font-medium mb-2">Your Progress</h3>
                <p className="text-gray-300 mb-4">
                  Your depression score moved from <span className="font-bold text-bronze-300">{insight.before.severity}</span> ({insight.before.score}) to <span className="font-bold text-bronze-300">{insight.after.severity}</span> ({insight.after.score}) over {insight.weeks} weeks.
                </p>
                <p className="text-bronze-300 font-medium">
                  That's a big shift. Look at what you've built.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Timeline */}
        {milestones.length > 0 ? (
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 top-0 bottom-0 w-px bg-bronze-400/30" />
            
            <div className="space-y-6">
              {milestones.map((milestone, index) => (
                <div key={milestone.id} className="relative pl-12">
                  {/* Timeline dot */}
                  <div className="absolute left-0 w-8 h-8 bg-bronze-500 rounded-full flex items-center justify-center border-4 border-gray-800">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                  
                  {/* Content */}
                  <div className="bg-gray-900/50 rounded-lg p-4 border border-bronze-400/30 hover:border-bronze-400/60 transition-all">
                    <h4 className="text-white font-medium mb-1">{milestone.title}</h4>
                    {milestone.description && (
                      <p className="text-gray-400 text-sm mb-2">{milestone.description}</p>
                    )}
                    <p className="text-xs text-gray-500">
                      {new Date(milestone.achieved_at).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <Clock className="w-16 h-16 mx-auto mb-4 text-bronze-400/50" />
            <p className="text-gray-400 mb-2">
              {getEmpatheticCopy('timeline', 'empty')}
            </p>
            <p className="text-sm text-gray-500">
              Your first milestone will appear when you complete an activity
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
