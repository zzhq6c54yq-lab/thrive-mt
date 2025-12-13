import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, CheckCircle, Database, FileText } from 'lucide-react';

// List of all PHI tables with audit triggers
const PHI_TABLES_WITH_TRIGGERS = [
  // Original 18 tables
  { name: 'profiles', category: 'Identity', hasTrigger: true },
  { name: 'henry_conversations', category: 'Clinical', hasTrigger: true },
  { name: 'henry_messages', category: 'Clinical', hasTrigger: true },
  { name: 'journal_entries', category: 'Personal', hasTrigger: true },
  { name: 'mood_entries', category: 'Clinical', hasTrigger: true },
  { name: 'daily_check_ins', category: 'Behavioral', hasTrigger: true },
  { name: 'assessment_results', category: 'Clinical', hasTrigger: true },
  { name: 'crisis_escalations', category: 'Clinical', hasTrigger: true },
  { name: 'therapist_client_notes', category: 'Clinical', hasTrigger: true },
  { name: 'video_session_notes', category: 'Clinical', hasTrigger: true },
  { name: 'therapy_bookings', category: 'Administrative', hasTrigger: true },
  { name: 'ai_session_summaries', category: 'Clinical', hasTrigger: true },
  { name: 'therapist_requests', category: 'Communication', hasTrigger: true },
  { name: 'therapy_sessions', category: 'Clinical', hasTrigger: true },
  { name: 'mini_sessions', category: 'Clinical', hasTrigger: true },
  { name: 'video_session_chat', category: 'Communication', hasTrigger: true },
  { name: 'henry_risk_assessments', category: 'Clinical', hasTrigger: true },
  { name: 'data_access_logs', category: 'Audit', hasTrigger: true },
  
  // Additional 21 tables from expanded migration
  { name: 'chatbot_conversations', category: 'Clinical', hasTrigger: true },
  { name: 'coaching_sessions', category: 'Clinical', hasTrigger: true },
  { name: 'gratitude_entries', category: 'Personal', hasTrigger: true },
  { name: 'sleep_tracker_entries', category: 'Behavioral', hasTrigger: true },
  { name: 'sobriety_tracking', category: 'Clinical', hasTrigger: true },
  { name: 'user_health_connections', category: 'Identity', hasTrigger: true },
  { name: 'buddy_messages', category: 'Communication', hasTrigger: true },
  { name: 'community_group_messages', category: 'Communication', hasTrigger: true },
  { name: 'sms_check_ins', category: 'Communication', hasTrigger: true },
  { name: 'sms_checkin_responses', category: 'Behavioral', hasTrigger: true },
  { name: 'sponsor_connections', category: 'Clinical', hasTrigger: true },
  { name: 'homework_tasks', category: 'Clinical', hasTrigger: true },
  { name: 'support_circles', category: 'Social', hasTrigger: true },
  { name: 'support_circle_members', category: 'Social', hasTrigger: true },
  { name: 'buddy_matches', category: 'Social', hasTrigger: true },
  { name: 'binaural_sessions', category: 'Behavioral', hasTrigger: true },
  { name: 'breathing_sessions', category: 'Behavioral', hasTrigger: true },
  { name: 'art_therapy_gallery', category: 'Clinical', hasTrigger: true },
  { name: 'career_assessments', category: 'Personal', hasTrigger: true },
  { name: 'barter_applications', category: 'Administrative', hasTrigger: true },
  { name: 'auth_user_audit', category: 'Audit', hasTrigger: true },
];

const CATEGORY_COLORS: Record<string, string> = {
  'Identity': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'Clinical': 'bg-red-500/20 text-red-400 border-red-500/30',
  'Personal': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'Behavioral': 'bg-green-500/20 text-green-400 border-green-500/30',
  'Communication': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'Administrative': 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  'Social': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  'Audit': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
};

export default function PHICoverageTab() {
  const totalTables = PHI_TABLES_WITH_TRIGGERS.length;
  const coveredTables = PHI_TABLES_WITH_TRIGGERS.filter(t => t.hasTrigger).length;
  const coveragePercent = Math.round((coveredTables / totalTables) * 100);

  const tablesByCategory = PHI_TABLES_WITH_TRIGGERS.reduce((acc, table) => {
    if (!acc[table.category]) acc[table.category] = [];
    acc[table.category].push(table);
    return acc;
  }, {} as Record<string, typeof PHI_TABLES_WITH_TRIGGERS>);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Shield className="w-6 h-6 text-[#D4A574]" />
          PHI Audit Trigger Coverage
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          All tables containing Protected Health Information (PHI) with audit logging enabled
        </p>
      </div>

      {/* Coverage Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 bg-card/50 border-green-500/30">
          <div className="text-center">
            <div className="text-4xl font-bold text-green-400">{coveragePercent}%</div>
            <div className="text-sm text-muted-foreground mt-1">Audit Coverage</div>
          </div>
        </Card>
        <Card className="p-6 bg-card/50 border-[#B87333]/30">
          <div className="text-center">
            <div className="text-4xl font-bold text-[#D4A574]">{totalTables}</div>
            <div className="text-sm text-muted-foreground mt-1">PHI Tables</div>
          </div>
        </Card>
        <Card className="p-6 bg-card/50 border-border/50">
          <div className="text-center">
            <div className="text-4xl font-bold text-foreground">{Object.keys(tablesByCategory).length}</div>
            <div className="text-sm text-muted-foreground mt-1">Categories</div>
          </div>
        </Card>
      </div>

      {/* HIPAA Compliance Note */}
      <Card className="p-4 bg-gradient-to-r from-green-500/10 to-green-500/5 border-green-500/30">
        <div className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
          <div>
            <p className="font-medium text-foreground">HIPAA Audit Logging Active</p>
            <p className="text-sm text-muted-foreground">
              All INSERT, UPDATE, and DELETE operations on PHI tables are automatically logged to the audit_logs table with user ID, timestamp, action type, and data changes.
            </p>
          </div>
        </div>
      </Card>

      {/* Tables by Category */}
      <div className="space-y-4">
        {Object.entries(tablesByCategory).map(([category, tables]) => (
          <Card key={category} className="bg-card/50 border-border/50 overflow-hidden">
            <div className="p-4 border-b border-border/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-[#D4A574]" />
                <h3 className="font-medium text-foreground">{category}</h3>
              </div>
              <Badge className={CATEGORY_COLORS[category]}>
                {tables.length} tables
              </Badge>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {tables.map((table) => (
                  <div
                    key={table.name}
                    className="flex items-center gap-2 p-2 rounded-lg bg-muted/30 border border-border/30"
                  >
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <span className="text-sm text-foreground font-mono truncate">
                      {table.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Documentation Link */}
      <Card className="p-4 bg-card/50 border-border/50">
        <div className="flex items-center gap-3">
          <FileText className="w-5 h-5 text-[#D4A574]" />
          <div>
            <p className="font-medium text-foreground">BAA Documentation</p>
            <p className="text-sm text-muted-foreground">
              Full PHI data flow and vendor BAA tracking available at{' '}
              <code className="text-[#D4A574]">docs/compliance/BAA_STATUS.md</code>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
