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
}

export function generateComprehensiveReport(data: ComprehensiveReportData) {
  const doc = new jsPDF();
  const pw = 210; // page width
  const ml = 15; // margin left
  const mr = 15;
  const cw = pw - ml - mr; // content width
  let y = 0;

  const fmt = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const fmtShort = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  // ─── HELPER FUNCTIONS ───
  function checkPage(needed: number) {
    if (y + needed > 275) {
      doc.addPage();
      y = 20;
    }
  }

  function drawHeader(isClinicianPage = false) {
    // Bronze top bar
    doc.setFillColor(BRAND.bronze);
    doc.rect(0, 0, pw, 8, 'F');

    // ThriveMT branding
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(BRAND.bronze);
    doc.text('THRIVE', ml, 20);
    doc.setFontSize(10);
    doc.setTextColor(BRAND.lightBronze);
    doc.text('MT', ml + 40, 20);

    // Classification label
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

  function keyValue(label: string, value: string, x: number, yPos: number) {
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(BRAND.lightGray);
    doc.text(label, x, yPos);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(BRAND.black);
    doc.text(value, x, yPos + 6);
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

  // ══════════════════════════════════════════════
  // PAGE 1: CLINICIAN QUICK SUMMARY (60-second read)
  // ══════════════════════════════════════════════
  drawHeader(true);

  // Title
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

  // Mini sparkline (text-based mood scores)
  if (data.moodScores.length > 0) {
    const last7 = data.moodScores.slice(-7);
    const sparkText = last7.map(m => m.score.toFixed(0)).join('  →  ');
    doc.setFontSize(8);
    doc.setTextColor(BRAND.lightGray);
    doc.text(`Recent: ${sparkText}`, ml + 4, y);
  }
  y += 14;

  // ─── ENGAGEMENT SNAPSHOT ───
  const halfW = (cw - 4) / 2;
  doc.setFillColor(BRAND.bgGray);
  doc.roundedRect(ml, y, halfW, 35, 2, 2, 'F');
  doc.roundedRect(ml + halfW + 4, y, halfW, 35, 2, 2, 'F');

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
  doc.text(`Binaural Sessions: ${data.binauralSessions}`, ml + 4, y + 26);
  doc.text(`AI Companion Chats: ${data.henryConversations}`, ml + 4, y + 32);

  // Right box - Goals & Progress
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(BRAND.bronze);
  doc.text('Goals & Assessments', ml + halfW + 8, y + 7);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(BRAND.darkGray);
  doc.text(`Goals Set: ${data.goalsSet}  |  Completed: ${data.goalsCompleted}  (${data.goalCompletionRate}%)`, ml + halfW + 8, y + 14);
  doc.text(`Assessments Taken: ${data.assessmentsCompleted.length}`, ml + halfW + 8, y + 20);
  doc.text(`Coaching Sessions: ${data.coachingSessions}`, ml + halfW + 8, y + 26);
  doc.text(`Therapy Requests: ${data.therapyRequests}`, ml + halfW + 8, y + 32);
  y += 40;

  // ─── RISK FLAGS ───
  if (data.riskFlags.length > 0) {
    doc.setFillColor('#FFF3E0');
    doc.roundedRect(ml, y, cw, 6 + data.riskFlags.length * 5 + 4, 2, 2, 'F');
    doc.setDrawColor(BRAND.amber);
    doc.setLineWidth(0.5);
    doc.roundedRect(ml, y, cw, 6 + data.riskFlags.length * 5 + 4, 2, 2, 'S');
    y += 6;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(BRAND.amber);
    doc.text('⚠  ATTENTION ITEMS', ml + 4, y);
    y += 5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(BRAND.darkGray);
    data.riskFlags.forEach(flag => {
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
  const box3W = (cw - 8) / 3;
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
  const box4W = (cw - 12) / 4;
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

  // ─── SECTION 7: AI COMPANION & COACHING ───
  checkPage(40);
  sectionTitle('7. Support & Coaching');
  statBox('AI Companion Chats', `${data.henryConversations}`, ml, y, box3W);
  statBox('Coaching Sessions', `${data.coachingSessions}`, ml + box3W + 4, y, box3W);
  statBox('Total Points', `${data.totalPoints}`, ml + (box3W + 4) * 2, y, box3W);
  y += 28;
  bodyText(`The user engaged in ${data.henryConversations} AI companion conversations with approximately ${data.henryMessages} total messages exchanged. ${data.coachingSessions} coaching sessions were attended. ${data.therapyRequests} therapy-related requests were submitted.`);

  // ─── SECTION 8: RISK FLAGS & RECOMMENDATIONS ───
  checkPage(40);
  sectionTitle('8. Risk Assessment & Recommendations');

  if (data.riskFlags.length > 0) {
    bodyText('Identified attention items:');
    data.riskFlags.forEach(flag => bullet(flag, 3));
    y += 3;
  } else {
    bodyText('No significant risk flags identified during this reporting period.');
  }

  bodyText('Personalized recommendations:');
  data.recommendations.forEach(rec => bullet(rec, 3));
  y += 5;

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

  // Save
  const dateStr = data.reportDate.toISOString().split('T')[0];
  doc.save(`ThriveMT_Comprehensive_Report_${data.userName.replace(/\s+/g, '_')}_${dateStr}.pdf`);
}
