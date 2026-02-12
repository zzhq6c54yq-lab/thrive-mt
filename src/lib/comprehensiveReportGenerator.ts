import { jsPDF } from 'jspdf';

const BRAND = {
  bronze: '#B87333',
  lightBronze: '#D4A574',
  paleGold: '#E8D4C0',
  black: '#1a1a1a',
  darkGray: '#333333',
  medGray: '#666666',
  lightGray: '#999999',
  bgGray: '#F5F5F5',
  white: '#FFFFFF',
  green: '#2E7D32',
  red: '#C62828',
  blue: '#1565C0',
  amber: '#F57F17',
};

export interface ComprehensiveReportData {
  userName: string;
  reportDate: Date;
  dateRange: { start: Date; end: Date };

  // Mood
  moodScores: { date: string; score: number }[];
  avgMood: number;
  moodTrend: 'improving' | 'stable' | 'declining';
  moodHighDay: string;
  moodLowDay: string;

  // Activities
  totalActivities: number;
  totalWellnessMinutes: number;
  activitiesByType: { name: string; count: number; minutes: number }[];
  mostUsedTool: string;

  // Journal
  journalEntryCount: number;
  journalStreak: number;
  topJournalThemes: string[];

  // Assessments
  assessmentsCompleted: { type: string; score: number; severity: string; date: string }[];

  // Breathing & Binaural
  breathingSessions: number;
  breathingTotalMinutes: number;
  binauralSessions: number;
  binauralTotalMinutes: number;

  // Goals
  goalsSet: number;
  goalsCompleted: number;
  goalCompletionRate: number;

  // Achievements
  badgesEarned: { title: string; date: string }[];

  // AI Companion
  henryConversations: number;
  henryMessages: number;

  // Coaching / Therapy
  coachingSessions: number;
  therapyRequests: number;

  // Streak & Points
  currentStreak: number;
  longestStreak: number;
  totalPoints: number;

  // Risk flags (for clinician)
  riskFlags: string[];
  recommendations: string[];

  // SDOH / Stability Risk
  sdohFlags: { keyword: string; context: string; priority: 'high' | 'moderate' }[];

  // Suggested EHR entry
  suggestedEHRNote: string;

  // ─── NEW EXPANDED DATA ───

  // Henry AI Conversation Summaries
  henryConversationSummaries?: { content: string; keyTopics: string[]; riskFlags: string[]; moodTrend: string | null; date: string }[];
  henryTopThemes?: string[];
  aiRiskFlags?: string[];

  // Between-Session Companion (Mini Sessions)
  miniSessionCount?: number;
  avgMiniMood?: number | null;
  avgMiniAnxiety?: number | null;
  avgMiniEnergy?: number | null;
  miniFocusAreas?: { area: string; count: number }[];

  // Toolkit Interactions
  toolkitInteractions?: { name: string; count: number }[];

  // Meditation
  meditationSessions?: number;
  meditationTotalMinutes?: number;

  // Music Therapy
  musicTherapySessions?: number;
  musicTotalMinutes?: number;
  musicMoodChanges?: { before: string; after: string }[];

  // Workshop / Event Registrations
  workshopRegistrations?: { title: string; type: string; status: string }[];

  // Gratitude
  gratitudeEntryCount?: number;

  // Sleep
  sleepEntries?: { quality: number | null; hours: number | null; date: string }[];
  avgSleepQuality?: number | null;
  avgSleepHours?: number | null;

  // ─── VA/DoD CLINICAL ENHANCEMENTS ───

  // Validated MBC Outcome Measures (PHQ-9, GAD-7, PCL-5, AUDIT-C)
  mbcScores?: {
    phq9?: { score: number; severity: string; date: string }[];
    gad7?: { score: number; severity: string; date: string }[];
    pcl5?: { score: number; severity: string; date: string }[];
    auditC?: { score: number; severity: string; date: string }[];
  };
  latestMBC?: {
    phq9?: { score: number; severity: string; date: string } | null;
    gad7?: { score: number; severity: string; date: string } | null;
    pcl5?: { score: number; severity: string; date: string } | null;
    auditC?: { score: number; severity: string; date: string } | null;
  };

  // Longitudinal assessments (up to 12 months)
  longitudinalAssessments?: { type: string; score: number; date: string }[];

  // Resilience Index (0-100)
  resilienceIndex?: number;
  resilienceFactors?: { factor: string; score: number; max: number }[];

  // Sleep-Activity Correlation
  sleepActivityCorrelation?: string;
  performanceTriad?: {
    sleepScore: number;
    activityScore: number;
    engagementScore: number;
    overallReadiness: number;
  };
}

export function generateComprehensiveReport(data: ComprehensiveReportData, mode: 'download' | 'view' = 'download') {
  const doc = new jsPDF();
  const pw = 210; // page width
  const ml = 15; // margin left
  const mr = 15;
  const cw = pw - ml - mr; // content width
  let y = 0;

  const fmt = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  // ─── HELPER FUNCTIONS ───
  function checkPage(needed: number) {
    if (y + needed > 275) {
      doc.addPage();
      y = 20;
    }
  }

  function drawHeader(isClinicianPage = false) {
    doc.setFillColor(BRAND.bronze);
    doc.rect(0, 0, pw, 8, 'F');

    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(BRAND.bronze);
    doc.text('THRIVE', ml, 20);
    doc.setFontSize(10);
    doc.setTextColor(BRAND.lightBronze);
    doc.text('MT', ml + 40, 20);

    if (isClinicianPage) {
      doc.setFillColor(BRAND.bronze);
      doc.roundedRect(pw - mr - 55, 12, 55, 10, 2, 2, 'F');
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(BRAND.white);
      doc.text('CLINICIAN SUMMARY', pw - mr - 52, 19);
    }

    doc.setDrawColor(BRAND.bronze);
    doc.setLineWidth(0.5);
    doc.line(ml, 25, pw - mr, 25);
    y = 32;
  }

  function sectionTitle(title: string) {
    checkPage(15);
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(BRAND.bronze);
    doc.text(title, ml, y);
    y += 2;
    doc.setDrawColor(BRAND.paleGold);
    doc.setLineWidth(0.3);
    doc.line(ml, y, ml + cw, y);
    y += 6;
  }

  function statBox(label: string, value: string, x: number, yPos: number, w: number, color?: string) {
    doc.setFillColor(BRAND.bgGray);
    doc.roundedRect(x, yPos, w, 22, 2, 2, 'F');
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(color || BRAND.bronze);
    doc.text(value, x + w / 2, yPos + 10, { align: 'center' });
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(BRAND.medGray);
    doc.text(label, x + w / 2, yPos + 17, { align: 'center' });
  }

  function bullet(text: string, indent = 0) {
    checkPage(8);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(BRAND.darkGray);
    const lines = doc.splitTextToSize(`• ${text}`, cw - indent - 5);
    doc.text(lines, ml + indent + 3, y);
    y += lines.length * 5 + 1;
  }

  function bodyText(text: string) {
    checkPage(10);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(BRAND.darkGray);
    const lines = doc.splitTextToSize(text, cw);
    doc.text(lines, ml, y);
    y += lines.length * 5 + 3;
  }

  function trendArrow(trend: string) {
    if (trend === 'improving') return '↑';
    if (trend === 'declining') return '↓';
    return '→';
  }

  function trendColor(trend: string) {
    if (trend === 'improving') return BRAND.green;
    if (trend === 'declining') return BRAND.red;
    return BRAND.blue;
  }

  const halfW = (cw - 4) / 2;
  const box3W = (cw - 8) / 3;
  const box4W = (cw - 12) / 4;

  // ══════════════════════════════════════════════
  // PAGE 1: CLINICIAN QUICK SUMMARY
  // ══════════════════════════════════════════════
  drawHeader(true);

  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(BRAND.black);
  doc.text('Quick Clinician Summary', ml, y);
  y += 5;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(BRAND.medGray);
  doc.text(`${data.userName}  |  ${fmt(data.dateRange.start)} – ${fmt(data.dateRange.end)}  |  Generated ${fmt(data.reportDate)}`, ml, y);
  y += 10;

  // ─── KEY METRICS ROW ───
  const boxW = (cw - 12) / 4;
  statBox('Avg Mood', `${data.avgMood.toFixed(1)}/10`, ml, y, boxW, trendColor(data.moodTrend));
  statBox('Streak', `${data.currentStreak}d`, ml + boxW + 4, y, boxW);
  statBox('Activities', `${data.totalActivities}`, ml + (boxW + 4) * 2, y, boxW);
  statBox('Wellness Min', `${data.totalWellnessMinutes}`, ml + (boxW + 4) * 3, y, boxW);
  y += 28;

  // ─── MOOD AT A GLANCE ───
  doc.setFillColor(BRAND.bgGray);
  doc.roundedRect(ml, y, cw, 30, 2, 2, 'F');
  y += 6;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(BRAND.bronze);
  doc.text('Mood Overview', ml + 4, y);
  y += 6;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(BRAND.darkGray);
  doc.text(`Trend: ${trendArrow(data.moodTrend)} ${data.moodTrend.charAt(0).toUpperCase() + data.moodTrend.slice(1)}`, ml + 4, y);
  doc.text(`Best Day: ${data.moodHighDay}`, ml + 60, y);
  doc.text(`Low Day: ${data.moodLowDay}`, ml + 115, y);
  y += 6;

  if (data.moodScores.length > 0) {
    const last7 = data.moodScores.slice(-7);
    const sparkText = last7.map(m => m.score.toFixed(0)).join('  →  ');
    doc.setFontSize(8);
    doc.setTextColor(BRAND.lightGray);
    doc.text(`Recent: ${sparkText}`, ml + 4, y);
  }
  y += 14;

  // ─── ENGAGEMENT SNAPSHOT ───
  doc.setFillColor(BRAND.bgGray);
  doc.roundedRect(ml, y, halfW, 42, 2, 2, 'F');
  doc.roundedRect(ml + halfW + 4, y, halfW, 42, 2, 2, 'F');

  // Left box - Tools Used
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(BRAND.bronze);
  doc.text('Tool Engagement', ml + 4, y + 7);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(BRAND.darkGray);
  doc.text(`Journal Entries: ${data.journalEntryCount}`, ml + 4, y + 14);
  doc.text(`Breathing Sessions: ${data.breathingSessions}`, ml + 4, y + 20);
  doc.text(`AI Companion Chats: ${data.henryConversations}`, ml + 4, y + 26);
  doc.text(`Mini Sessions: ${data.miniSessionCount || 0}`, ml + 4, y + 32);
  doc.text(`Meditation: ${data.meditationSessions || 0}  |  Music: ${data.musicTherapySessions || 0}`, ml + 4, y + 38);

  // Right box - Goals & Progress
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(BRAND.bronze);
  doc.text('Goals & Participation', ml + halfW + 8, y + 7);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(BRAND.darkGray);
  doc.text(`Goals: ${data.goalsSet} set, ${data.goalsCompleted} done (${data.goalCompletionRate}%)`, ml + halfW + 8, y + 14);
  doc.text(`Assessments: ${data.assessmentsCompleted.length}`, ml + halfW + 8, y + 20);
  doc.text(`Workshops: ${(data.workshopRegistrations || []).length}`, ml + halfW + 8, y + 26);
  doc.text(`Gratitude Entries: ${data.gratitudeEntryCount || 0}`, ml + halfW + 8, y + 32);
  doc.text(`Sleep Tracked: ${(data.sleepEntries || []).length} nights`, ml + halfW + 8, y + 38);
  y += 47;

  // ─── HENRY CONVERSATION THEMES ───
  if ((data.henryTopThemes || []).length > 0) {
    checkPage(18);
    doc.setFillColor('#F3E5F5');
    const themesH = 8 + Math.min(data.henryTopThemes!.length, 3) * 5 + 2;
    doc.roundedRect(ml, y, cw, themesH, 2, 2, 'F');
    y += 6;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor('#7B1FA2');
    doc.text('🧠  HENRY AI — Key Conversation Themes', ml + 4, y);
    y += 5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(BRAND.darkGray);
    data.henryTopThemes!.slice(0, 3).forEach(theme => {
      doc.text(`• ${theme}`, ml + 6, y);
      y += 5;
    });
    y += 3;
  }

  // ─── RISK FLAGS ───
  const allRiskFlags = data.riskFlags;
  if (allRiskFlags.length > 0) {
    checkPage(20);
    doc.setFillColor('#FFF3E0');
    doc.roundedRect(ml, y, cw, 6 + allRiskFlags.length * 5 + 4, 2, 2, 'F');
    doc.setDrawColor(BRAND.amber);
    doc.setLineWidth(0.5);
    doc.roundedRect(ml, y, cw, 6 + allRiskFlags.length * 5 + 4, 2, 2, 'S');
    y += 6;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(BRAND.amber);
    doc.text('⚠  ATTENTION ITEMS', ml + 4, y);
    y += 5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(BRAND.darkGray);
    allRiskFlags.forEach(flag => {
      doc.text(`• ${flag}`, ml + 6, y);
      y += 5;
    });
    y += 4;
  } else {
    doc.setFillColor('#E8F5E9');
    doc.roundedRect(ml, y, cw, 14, 2, 2, 'F');
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(BRAND.green);
    doc.text('✓  No risk flags identified in this period', ml + 4, y + 9);
    y += 18;
  }

  // ─── STABILITY RISK (SDOH TRIAGE) ───
  if (data.sdohFlags.length > 0) {
    checkPage(30);
    const highPriority = data.sdohFlags.filter(f => f.priority === 'high');
    const moderate = data.sdohFlags.filter(f => f.priority === 'moderate');
    const sdohBoxH = 8 + (highPriority.length + moderate.length) * 6 + 6;

    doc.setFillColor('#FFEBEE');
    doc.roundedRect(ml, y, cw, sdohBoxH, 2, 2, 'F');
    doc.setDrawColor(BRAND.red);
    doc.setLineWidth(0.8);
    doc.roundedRect(ml, y, cw, sdohBoxH, 2, 2, 'S');
    y += 7;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(BRAND.red);
    doc.text('🚨  STABILITY RISK — Social Determinant Flags', ml + 4, y);
    y += 6;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);

    if (highPriority.length > 0) {
      doc.setTextColor(BRAND.red);
      doc.setFont('helvetica', 'bold');
      doc.text('HIGH PRIORITY TRIAGE:', ml + 6, y);
      y += 5;
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(BRAND.darkGray);
      highPriority.forEach(flag => {
        doc.text(`▸ ${flag.keyword}  —  "${flag.context}"`, ml + 8, y);
        y += 6;
      });
    }

    if (moderate.length > 0) {
      doc.setTextColor(BRAND.amber);
      doc.setFont('helvetica', 'bold');
      doc.text('MODERATE:', ml + 6, y);
      y += 5;
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(BRAND.darkGray);
      moderate.forEach(flag => {
        doc.text(`▸ ${flag.keyword}  —  "${flag.context}"`, ml + 8, y);
        y += 6;
      });
    }
    y += 4;
  }

  // ─── CLINICAL MBC SCORES ───
  const mbc = data.latestMBC;
  const hasMBC = mbc && (mbc.phq9 || mbc.gad7 || mbc.pcl5 || mbc.auditC);
  if (hasMBC) {
    checkPage(40);
    doc.setFillColor('#F3E8FD');
    doc.roundedRect(ml, y, cw, 38, 2, 2, 'F');
    doc.setDrawColor('#7B1FA2');
    doc.setLineWidth(0.5);
    doc.roundedRect(ml, y, cw, 38, 2, 2, 'S');
    y += 7;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor('#7B1FA2');
    doc.text('📊  MEASUREMENT-BASED CARE (MBC) SCORES', ml + 4, y);
    y += 7;

    const mbcItems = [
      { label: 'PHQ-9', data: mbc!.phq9, color: BRAND.blue },
      { label: 'GAD-7', data: mbc!.gad7, color: BRAND.amber },
      { label: 'PCL-5', data: mbc!.pcl5, color: BRAND.red },
      { label: 'AUDIT-C', data: mbc!.auditC, color: BRAND.bronze },
    ];
    const mbcBoxW = (cw - 16) / 4;
    let mx = ml + 2;
    mbcItems.forEach(item => {
      if (item.data) {
        doc.setFillColor(BRAND.bgGray);
        doc.roundedRect(mx, y, mbcBoxW, 20, 2, 2, 'F');
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(item.color);
        doc.text(`${item.data.score}`, mx + mbcBoxW / 2, y + 9, { align: 'center' });
        doc.setFontSize(6);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(BRAND.medGray);
        doc.text(`${item.label}`, mx + mbcBoxW / 2, y + 14, { align: 'center' });
        doc.text(`${item.data.severity}`, mx + mbcBoxW / 2, y + 18, { align: 'center' });
      } else {
        doc.setFillColor(BRAND.bgGray);
        doc.roundedRect(mx, y, mbcBoxW, 20, 2, 2, 'F');
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(BRAND.lightGray);
        doc.text('—', mx + mbcBoxW / 2, y + 10, { align: 'center' });
        doc.setFontSize(6);
        doc.text(item.label, mx + mbcBoxW / 2, y + 16, { align: 'center' });
      }
      mx += mbcBoxW + 4;
    });
    y += 26;
  }

  // ─── READINESS & PERFORMANCE TRIAD ───
  if (data.performanceTriad) {
    checkPage(35);
    doc.setFillColor('#E8F5E9');
    doc.roundedRect(ml, y, cw, 32, 2, 2, 'F');
    doc.setDrawColor(BRAND.green);
    doc.setLineWidth(0.5);
    doc.roundedRect(ml, y, cw, 32, 2, 2, 'S');
    y += 7;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(BRAND.green);
    doc.text('🎖  MISSION READINESS — Performance Triad', ml + 4, y);
    y += 7;

    const pt = data.performanceTriad;
    const triadBoxW = (cw - 20) / 4;
    let tx = ml + 2;
    const triadItems = [
      { label: 'Sleep', score: pt.sleepScore },
      { label: 'Activity', score: pt.activityScore },
      { label: 'Engagement', score: pt.engagementScore },
      { label: 'Readiness', score: pt.overallReadiness },
    ];
    triadItems.forEach((item, idx) => {
      doc.setFillColor(BRAND.white);
      doc.roundedRect(tx, y, triadBoxW, 16, 2, 2, 'F');
      const sc = item.score;
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(sc >= 70 ? BRAND.green : sc >= 40 ? BRAND.amber : BRAND.red);
      doc.text(`${sc}%`, tx + triadBoxW / 2, y + 7, { align: 'center' });
      doc.setFontSize(6);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(BRAND.medGray);
      doc.text(item.label, tx + triadBoxW / 2, y + 13, { align: 'center' });
      tx += triadBoxW + 5;
    });
    y += 22;
  }

  // ─── RESILIENCE INDEX ───
  if (data.resilienceIndex != null) {
    checkPage(18);
    doc.setFillColor(BRAND.bgGray);
    doc.roundedRect(ml, y, cw, 14, 2, 2, 'F');
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(BRAND.bronze);
    doc.text(`Resilience Index: ${data.resilienceIndex}/100`, ml + 4, y + 6);
    // Draw bar
    const barX = ml + 60;
    const barW = cw - 68;
    doc.setFillColor('#E0E0E0');
    doc.roundedRect(barX, y + 3, barW, 7, 2, 2, 'F');
    const fillW = (data.resilienceIndex / 100) * barW;
    const riColor = data.resilienceIndex >= 70 ? BRAND.green : data.resilienceIndex >= 40 ? BRAND.amber : BRAND.red;
    doc.setFillColor(riColor);
    doc.roundedRect(barX, y + 3, fillW, 7, 2, 2, 'F');
    y += 18;
  }

  // ─── TOP RECOMMENDATIONS ───
  checkPage(25);
  doc.setFillColor(BRAND.bgGray);
  doc.roundedRect(ml, y, cw, 6 + Math.min(data.recommendations.length, 4) * 5 + 4, 2, 2, 'F');
  y += 6;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(BRAND.bronze);
  doc.text('KEY RECOMMENDATIONS', ml + 4, y);
  y += 5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(BRAND.darkGray);
  data.recommendations.slice(0, 4).forEach(rec => {
    doc.text(`→ ${rec}`, ml + 6, y);
    y += 5;
  });
  y += 6;

  // ─── SUGGESTED EHR ENTRY ───
  checkPage(35);
  doc.setFillColor('#E3F2FD');
  doc.roundedRect(ml, y, cw, 35, 2, 2, 'F');
  doc.setDrawColor(BRAND.blue);
  doc.setLineWidth(0.5);
  doc.roundedRect(ml, y, cw, 35, 2, 2, 'S');
  y += 6;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(BRAND.blue);
  doc.text('📋  SUGGESTED EHR ENTRY  (Copy/Paste)', ml + 4, y);
  y += 5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(BRAND.darkGray);
  const ehrLines = doc.splitTextToSize(data.suggestedEHRNote, cw - 10);
  doc.text(ehrLines, ml + 5, y);
  y += ehrLines.length * 4 + 8;

  // ─── DISCLAIMER ───
  doc.setFontSize(7);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(BRAND.lightGray);
  const disclaimer = 'This summary is generated by ThriveMT for informational and wellness tracking purposes only. It does not constitute a clinical diagnosis. Please use clinical judgment in combination with this data.';
  const discLines = doc.splitTextToSize(disclaimer, cw);
  doc.text(discLines, ml, 272);

  // ══════════════════════════════════════════════
  // PAGE 2+: FULL COMPREHENSIVE REPORT
  // ══════════════════════════════════════════════
  doc.addPage();
  drawHeader(false);

  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(BRAND.black);
  doc.text('Comprehensive Wellness Report', ml, y);
  y += 5;
  doc.setFontSize(9);
  doc.setTextColor(BRAND.medGray);
  doc.text(`${data.userName}  |  ${fmt(data.dateRange.start)} – ${fmt(data.dateRange.end)}`, ml, y);
  y += 12;

  // ─── SECTION 1: MOOD ANALYSIS ───
  sectionTitle('1. Mood Analysis');
  statBox('Average', `${data.avgMood.toFixed(1)}/10`, ml, y, box3W, trendColor(data.moodTrend));
  statBox('Trend', `${trendArrow(data.moodTrend)} ${data.moodTrend}`, ml + box3W + 4, y, box3W, trendColor(data.moodTrend));
  statBox('Data Points', `${data.moodScores.length}`, ml + (box3W + 4) * 2, y, box3W);
  y += 28;

  bodyText(`Mood tracking data covers ${data.moodScores.length} check-ins over this reporting period. The overall trend is ${data.moodTrend}. Best mood recorded on ${data.moodHighDay}, lowest on ${data.moodLowDay}.`);

  if (data.moodScores.length > 0) {
    bodyText('Mood scores by entry (most recent first):');
    const recent = data.moodScores.slice(-14).reverse();
    recent.forEach(m => {
      bullet(`${m.date}: ${m.score}/10`, 3);
    });
    y += 3;
  }

  // ─── SECTION 2: ACTIVITY & ENGAGEMENT ───
  sectionTitle('2. Activity & Engagement');
  statBox('Total Activities', `${data.totalActivities}`, ml, y, box4W);
  statBox('Wellness Min', `${data.totalWellnessMinutes}`, ml + box4W + 4, y, box4W);
  statBox('Most Used', data.mostUsedTool || 'N/A', ml + (box4W + 4) * 2, y, box4W);
  statBox('Longest Streak', `${data.longestStreak}d`, ml + (box4W + 4) * 3, y, box4W);
  y += 28;

  if (data.activitiesByType.length > 0) {
    bodyText('Activity breakdown by type:');
    data.activitiesByType.forEach(a => {
      bullet(`${a.name}: ${a.count} sessions, ${a.minutes} minutes total`, 3);
    });
    y += 3;
  }

  // ─── SECTION 3: JOURNAL & REFLECTION ───
  sectionTitle('3. Journal & Reflection');
  statBox('Entries', `${data.journalEntryCount}`, ml, y, box3W);
  statBox('Streak', `${data.journalStreak}d`, ml + box3W + 4, y, box3W);
  statBox('Themes', `${data.topJournalThemes.length}`, ml + (box3W + 4) * 2, y, box3W);
  y += 28;

  if (data.topJournalThemes.length > 0) {
    bodyText('Top journaling themes identified:');
    data.topJournalThemes.forEach(theme => bullet(theme, 3));
    y += 3;
  } else {
    bodyText('No journal entries recorded in this period. Journaling is a powerful tool for emotional processing and self-awareness.');
  }

  // ─── SECTION 4: ASSESSMENTS ───
  sectionTitle('4. Wellness Assessments');
  if (data.assessmentsCompleted.length > 0) {
    bodyText(`${data.assessmentsCompleted.length} assessment(s) completed during this period:`);
    data.assessmentsCompleted.forEach(a => {
      bullet(`${a.type} — Score: ${a.score}, Severity: ${a.severity || 'N/A'}, Date: ${a.date}`, 3);
    });
    y += 3;
  } else {
    bodyText('No formal assessments completed. Periodic self-assessments can help track progress and identify areas for focused attention.');
  }

  // ─── SECTION 5: BREATHING & BINAURAL ───
  checkPage(40);
  sectionTitle('5. Mindfulness & Relaxation Tools');
  statBox('Breathing Sessions', `${data.breathingSessions}`, ml, y, halfW);
  statBox('Binaural Sessions', `${data.binauralSessions}`, ml + halfW + 4, y, halfW);
  y += 28;
  bodyText(`Total breathing practice: ${data.breathingTotalMinutes} minutes across ${data.breathingSessions} sessions.`);
  bodyText(`Total binaural beats practice: ${data.binauralTotalMinutes} minutes across ${data.binauralSessions} sessions.`);

  // ─── SECTION 6: GOALS ───
  checkPage(40);
  sectionTitle('6. Goals & Achievement');
  statBox('Goals Set', `${data.goalsSet}`, ml, y, box3W);
  statBox('Completed', `${data.goalsCompleted}`, ml + box3W + 4, y, box3W);
  statBox('Completion Rate', `${data.goalCompletionRate}%`, ml + (box3W + 4) * 2, y, box3W, data.goalCompletionRate >= 50 ? BRAND.green : BRAND.amber);
  y += 28;

  if (data.badgesEarned.length > 0) {
    bodyText('Badges and achievements earned:');
    data.badgesEarned.forEach(b => bullet(`${b.title} — Earned ${b.date}`, 3));
    y += 3;
  }

  // ─── SECTION 7: HENRY AI COMPANION (ENHANCED) ───
  checkPage(40);
  sectionTitle('7. Henry AI Companion');
  statBox('Conversations', `${data.henryConversations}`, ml, y, box3W);
  statBox('Summaries', `${(data.henryConversationSummaries || []).length}`, ml + box3W + 4, y, box3W);
  statBox('AI Risk Flags', `${(data.aiRiskFlags || []).length}`, ml + (box3W + 4) * 2, y, box3W, (data.aiRiskFlags || []).length > 0 ? BRAND.red : BRAND.green);
  y += 28;

  bodyText(`The user engaged in ${data.henryConversations} AI companion conversations with approximately ${data.henryMessages} total messages exchanged.`);

  if ((data.henryTopThemes || []).length > 0) {
    bodyText('Key topics discussed across conversations:');
    data.henryTopThemes!.forEach(theme => bullet(theme, 3));
    y += 3;
  }

  if ((data.henryConversationSummaries || []).length > 0) {
    bodyText('Conversation summaries:');
    data.henryConversationSummaries!.slice(0, 5).forEach(s => {
      const summary = s.content.length > 150 ? s.content.substring(0, 150) + '...' : s.content;
      bullet(`${s.date}: ${summary}`, 3);
      if (s.moodTrend) {
        bullet(`Mood trend: ${s.moodTrend}`, 8);
      }
    });
    y += 3;
  }

  if ((data.aiRiskFlags || []).length > 0) {
    bodyText('AI-detected risk flags from conversations:');
    data.aiRiskFlags!.forEach(flag => bullet(flag, 3));
    y += 3;
  }

  // ─── SECTION 8: BETWEEN-SESSION COMPANION ───
  checkPage(40);
  sectionTitle('8. Between-Session Companion (Mini Sessions)');
  const miniCount = data.miniSessionCount || 0;
  statBox('Sessions', `${miniCount}`, ml, y, box4W);
  statBox('Avg Mood', data.avgMiniMood != null ? `${data.avgMiniMood.toFixed(1)}` : 'N/A', ml + box4W + 4, y, box4W, data.avgMiniMood != null && data.avgMiniMood < 4 ? BRAND.red : BRAND.bronze);
  statBox('Avg Anxiety', data.avgMiniAnxiety != null ? `${data.avgMiniAnxiety.toFixed(1)}` : 'N/A', ml + (box4W + 4) * 2, y, box4W, data.avgMiniAnxiety != null && data.avgMiniAnxiety > 7 ? BRAND.red : BRAND.bronze);
  statBox('Avg Energy', data.avgMiniEnergy != null ? `${data.avgMiniEnergy.toFixed(1)}` : 'N/A', ml + (box4W + 4) * 3, y, box4W);
  y += 28;

  if (miniCount > 0) {
    bodyText(`${miniCount} between-session check-ins completed. These provide insight into the user's state between formal therapy sessions.`);
    if ((data.miniFocusAreas || []).length > 0) {
      bodyText('Focus areas addressed:');
      data.miniFocusAreas!.forEach(f => {
        const label = f.area.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
        bullet(`${label}: ${f.count} session(s)`, 3);
      });
      y += 3;
    }
  } else {
    bodyText('No between-session companion check-ins recorded. This tool helps users process emotions between therapy appointments.');
  }

  // ─── SECTION 9: TOOLKIT & WORKSHOP ENGAGEMENT ───
  checkPage(40);
  sectionTitle('9. Toolkit & Workshop Engagement');
  const tkCount = (data.toolkitInteractions || []).length;
  const wsCount = (data.workshopRegistrations || []).length;
  statBox('Toolkit Categories', `${tkCount}`, ml, y, halfW);
  statBox('Workshops Joined', `${wsCount}`, ml + halfW + 4, y, halfW);
  y += 28;

  if (tkCount > 0) {
    bodyText('Toolkit categories used:');
    data.toolkitInteractions!.forEach(t => bullet(`${t.name}: ${t.count} interaction(s)`, 3));
    y += 3;
  } else {
    bodyText('No toolkit interactions recorded. The wellness toolkit offers diverse coping strategies.');
  }

  if (wsCount > 0) {
    bodyText('Workshop/event registrations:');
    data.workshopRegistrations!.forEach(w => bullet(`${w.title} (${w.type}) — ${w.status}`, 3));
    y += 3;
  } else {
    bodyText('No workshop or event registrations. Group events provide valuable community support.');
  }

  // ─── SECTION 10: MEDITATION & MUSIC THERAPY ───
  checkPage(40);
  sectionTitle('10. Meditation & Music Therapy');
  statBox('Meditation Sessions', `${data.meditationSessions || 0}`, ml, y, box3W);
  statBox('Meditation Min', `${data.meditationTotalMinutes || 0}`, ml + box3W + 4, y, box3W);
  statBox('Music Sessions', `${data.musicTherapySessions || 0}`, ml + (box3W + 4) * 2, y, box3W);
  y += 28;

  if ((data.meditationSessions || 0) > 0) {
    bodyText(`${data.meditationSessions} meditation session(s) completed, totaling ${data.meditationTotalMinutes} minutes of practice.`);
  } else {
    bodyText('No meditation sessions recorded. Even brief daily meditation can significantly improve emotional regulation.');
  }

  if ((data.musicTherapySessions || 0) > 0) {
    bodyText(`${data.musicTherapySessions} music therapy recording(s) created, totaling ${data.musicTotalMinutes || 0} minutes.`);
    if ((data.musicMoodChanges || []).length > 0) {
      bodyText('Mood changes from music therapy:');
      data.musicMoodChanges!.slice(0, 5).forEach(m => bullet(`Before: ${m.before} → After: ${m.after}`, 3));
      y += 3;
    }
  }

  // ─── SECTION 11: HOLISTIC WELLNESS ───
  checkPage(40);
  sectionTitle('11. Holistic Wellness');
  statBox('Gratitude Entries', `${data.gratitudeEntryCount || 0}`, ml, y, box3W);
  statBox('Sleep Tracked', `${(data.sleepEntries || []).length}`, ml + box3W + 4, y, box3W);
  statBox('Avg Sleep Hrs', data.avgSleepHours != null ? `${data.avgSleepHours.toFixed(1)}` : 'N/A', ml + (box3W + 4) * 2, y, box3W, data.avgSleepHours != null && data.avgSleepHours < 6 ? BRAND.red : BRAND.green);
  y += 28;

  if ((data.gratitudeEntryCount || 0) > 0) {
    bodyText(`${data.gratitudeEntryCount} gratitude entries logged. Regular gratitude practice is linked to improved mood and life satisfaction.`);
  } else {
    bodyText('No gratitude entries recorded. Starting a daily gratitude practice can positively shift perspective over time.');
  }

  if ((data.sleepEntries || []).length > 0) {
    bodyText(`Sleep tracking: ${(data.sleepEntries || []).length} nights logged.`);
    if (data.avgSleepQuality != null) {
      bodyText(`Average sleep quality: ${data.avgSleepQuality.toFixed(1)}/10${data.avgSleepQuality < 5 ? ' — below optimal, may need intervention' : ''}.`);
    }
    if (data.avgSleepHours != null) {
      bodyText(`Average sleep duration: ${data.avgSleepHours.toFixed(1)} hours/night${data.avgSleepHours < 6 ? ' — significantly below recommended 7-9 hours' : ''}.`);
    }
  } else {
    bodyText('No sleep data recorded. Sleep tracking helps identify patterns that affect mood and daily functioning.');
  }

  // ─── SECTION 12: COACHING & SUPPORT ───
  checkPage(40);
  sectionTitle('12. Coaching & Support');
  statBox('Coaching Sessions', `${data.coachingSessions}`, ml, y, box3W);
  statBox('Therapy Requests', `${data.therapyRequests}`, ml + box3W + 4, y, box3W);
  statBox('Total Points', `${data.totalPoints}`, ml + (box3W + 4) * 2, y, box3W);
  y += 28;
  bodyText(`${data.coachingSessions} coaching sessions attended. ${data.therapyRequests} therapy-related requests were submitted.`);

  // ─── SECTION 13: RISK ASSESSMENT & RECOMMENDATIONS ───
  checkPage(40);
  sectionTitle('13. Risk Assessment & Recommendations');

  if (data.riskFlags.length > 0) {
    bodyText('Identified attention items:');
    data.riskFlags.forEach(flag => bullet(flag, 3));
    y += 3;
  } else {
    bodyText('No significant risk flags identified during this reporting period.');
  }

  // SDOH Stability Risk in detailed section
  if (data.sdohFlags.length > 0) {
    checkPage(20);
    bodyText('Social Determinant of Health (SDOH) flags detected in journal entries:');
    const highFlags = data.sdohFlags.filter(f => f.priority === 'high');
    const modFlags = data.sdohFlags.filter(f => f.priority === 'moderate');
    if (highFlags.length > 0) {
      bodyText('HIGH PRIORITY:');
      highFlags.forEach(f => bullet(`${f.keyword} — "${f.context}"`, 5));
    }
    if (modFlags.length > 0) {
      bodyText('MODERATE:');
      modFlags.forEach(f => bullet(`${f.keyword} — "${f.context}"`, 5));
    }
    y += 3;
  }

  bodyText('Personalized recommendations:');
  data.recommendations.forEach(rec => bullet(rec, 3));
  y += 5;

  // ─── SECTION 14: VALIDATED OUTCOME MEASURES (MBC) ───
  checkPage(40);
  sectionTitle('14. Validated Outcome Measures (MBC)');
  const mbcData = data.mbcScores;
  if (mbcData && (mbcData.phq9?.length || mbcData.gad7?.length || mbcData.pcl5?.length || mbcData.auditC?.length)) {
    bodyText('Measurement-Based Care (MBC) scores are the VA/DoD standard for tracking treatment effectiveness. The "Big Four" validated instruments are tracked below.');

    const mbcSections = [
      { label: 'PHQ-9 (Depression)', scores: mbcData.phq9 || [], benchmark: 'A drop of ≥5 points indicates clinically meaningful improvement.' },
      { label: 'GAD-7 (Anxiety)', scores: mbcData.gad7 || [], benchmark: 'A drop of ≥4 points indicates clinically meaningful improvement.' },
      { label: 'PCL-5 (PTSD)', scores: mbcData.pcl5 || [], benchmark: 'A drop of 10-15 points is the VA benchmark for clinically meaningful improvement.' },
      { label: 'AUDIT-C (Alcohol)', scores: mbcData.auditC || [], benchmark: 'Scores ≥4 (men) or ≥3 (women) indicate hazardous drinking.' },
    ];

    mbcSections.forEach(section => {
      if (section.scores.length > 0) {
        checkPage(25);
        bodyText(`${section.label}:`);
        // Show trend as text-based sparkline
        const trendLine = section.scores.map(s => `${s.date}: ${s.score} (${s.severity})`).join('  →  ');
        bullet(trendLine, 3);
        bullet(section.benchmark, 5);

        // Show change if multiple scores
        if (section.scores.length >= 2) {
          const first = section.scores[0].score;
          const last = section.scores[section.scores.length - 1].score;
          const change = last - first;
          const changeText = change < 0 ? `↓ ${Math.abs(change)} point improvement` : change > 0 ? `↑ ${change} point increase` : '→ No change';
          bullet(`Longitudinal change: ${changeText}`, 5);
        }
        y += 2;
      }
    });
  } else {
    bodyText('No validated MBC assessments (PHQ-9, GAD-7, PCL-5, AUDIT-C) completed during reporting period. These are the VA/DoD standard for Measurement-Based Care tracking.');
    bodyText('Recommendation: Integrate periodic PHQ-9 and GAD-7 screenings to establish clinical baselines.');
  }

  // ─── SECTION 15: MISSION READINESS & RESILIENCE ───
  checkPage(40);
  sectionTitle('15. Mission Readiness & Resilience');

  if (data.performanceTriad) {
    bodyText('The Performance Triad (Sleep, Activity, Engagement) assesses Total Force Fitness readiness:');
    const pt = data.performanceTriad;
    bullet(`Sleep Score: ${pt.sleepScore}% — ${pt.sleepScore >= 70 ? 'Mission Ready' : pt.sleepScore >= 40 ? 'Needs Attention' : 'Below Standard'}`, 3);
    bullet(`Activity Score: ${pt.activityScore}% — ${pt.activityScore >= 70 ? 'Mission Ready' : pt.activityScore >= 40 ? 'Needs Attention' : 'Below Standard'}`, 3);
    bullet(`Engagement Score: ${pt.engagementScore}% — ${pt.engagementScore >= 70 ? 'Mission Ready' : pt.engagementScore >= 40 ? 'Needs Attention' : 'Below Standard'}`, 3);
    bullet(`Overall Readiness: ${pt.overallReadiness}%`, 3);
    y += 3;
  }

  if (data.resilienceIndex != null) {
    bodyText(`Resilience Index: ${data.resilienceIndex}/100`);
    if (data.resilienceFactors && data.resilienceFactors.length > 0) {
      bodyText('Factor breakdown:');
      data.resilienceFactors.forEach(f => {
        bullet(`${f.factor}: ${f.score}/${f.max}`, 3);
      });
    }
    y += 3;
  }

  if (data.sleepActivityCorrelation) {
    bodyText(`Sleep-Activity Correlation: ${data.sleepActivityCorrelation}`);
  }

  // ─── CLOSING ───
  checkPage(30);
  doc.setFillColor(BRAND.paleGold);
  doc.roundedRect(ml, y, cw, 20, 3, 3, 'F');
  doc.setFontSize(10);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(BRAND.bronze);
  doc.text('Every step forward is meaningful. This report reflects real effort toward wellness.', pw / 2, y + 12, { align: 'center' });
  y += 28;

  // ─── FOOTER ON ALL PAGES ───
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(BRAND.lightGray);
    doc.text(
      `ThriveMT Comprehensive Report  |  ${data.userName}  |  Page ${i} of ${totalPages}`,
      pw / 2,
      290,
      { align: 'center' }
    );
    doc.text(
      'For personal wellness tracking only. Not a clinical diagnosis. Consult a healthcare professional for medical guidance.',
      pw / 2,
      294,
      { align: 'center' }
    );
  }

  // Output PDF based on mode
  const dateStr = data.reportDate.toISOString().split('T')[0];
  const filename = `ThriveMT_Comprehensive_Report_${data.userName.replace(/\s+/g, '_')}_${dateStr}.pdf`;

  // Both modes return blob — caller handles download vs view
  const blob = doc.output('blob');
  const blobUrl = URL.createObjectURL(blob);
  return { blobUrl, filename };
}
