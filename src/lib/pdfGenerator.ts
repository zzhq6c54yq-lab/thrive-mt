import { jsPDF } from 'jspdf';

// ThriveMT brand colors
const BRAND_COLORS = {
  bronze: '#D4A574',
  deepBronze: '#B87333',
  lightBronze: '#E8D4C0',
  black: '#000000',
  darkGray: '#1a1a1a',
  white: '#FFFFFF',
};

interface PDFGeneratorOptions {
  title?: string;
  subtitle?: string;
  userName?: string;
  date?: Date;
}

/**
 * Base PDF generator with ThriveMT branding
 */
export class ThrivePDFGenerator {
  protected doc: jsPDF;
  protected yPosition: number = 20;
  protected pageHeight: number = 280;
  protected marginTop: number = 20;
  protected pageWidth: number = 210;
  protected contentWidth: number = 170;
  protected marginLeft: number = 20;

  constructor() {
    this.doc = new jsPDF();
  }

  protected checkPageBreak(requiredSpace: number): void {
    if (this.yPosition + requiredSpace > this.pageHeight) {
      this.doc.addPage();
      this.yPosition = this.marginTop;
    }
  }

  protected addHeader(): void {
    // Add branded header
    this.doc.setFontSize(24);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setTextColor(BRAND_COLORS.deepBronze);
    this.doc.text('THRIVE', 105, this.yPosition, { align: 'center' });
    this.yPosition += 8;
    
    this.doc.setFontSize(12);
    this.doc.setTextColor(BRAND_COLORS.bronze);
    this.doc.text('Mental Wellness Platform', 105, this.yPosition, { align: 'center' });
    this.yPosition += 5;
    
    // Decorative line
    this.doc.setDrawColor(BRAND_COLORS.bronze);
    this.doc.setLineWidth(0.5);
    this.doc.line(40, this.yPosition, 170, this.yPosition);
    this.yPosition += 15;
  }

  protected addFooter(): void {
    const pageCount = this.doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      this.doc.setPage(i);
      this.doc.setFontSize(8);
      this.doc.setTextColor(150);
      this.doc.text(
        `© ${new Date().getFullYear()} ThriveMT - Mental Wellness Platform | Page ${i} of ${pageCount}`,
        105,
        290,
        { align: 'center' }
      );
    }
  }

  protected addTitle(title: string, subtitle?: string): void {
    this.doc.setFontSize(20);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setTextColor(BRAND_COLORS.black);
    this.doc.text(title, 105, this.yPosition, { align: 'center' });
    this.yPosition += 10;

    if (subtitle) {
      this.doc.setFontSize(12);
      this.doc.setFont('helvetica', 'italic');
      this.doc.setTextColor(100);
      this.doc.text(subtitle, 105, this.yPosition, { align: 'center' });
      this.yPosition += 15;
    }
  }

  protected addSection(title: string, content: string): void {
    this.checkPageBreak(40);
    
    this.doc.setFontSize(14);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setTextColor(BRAND_COLORS.deepBronze);
    this.doc.text(title, this.marginLeft, this.yPosition);
    this.yPosition += 8;
    
    this.doc.setFontSize(11);
    this.doc.setFont('helvetica', 'normal');
    this.doc.setTextColor(BRAND_COLORS.black);
    const lines = this.doc.splitTextToSize(content, this.contentWidth);
    this.checkPageBreak(lines.length * 6);
    this.doc.text(lines, this.marginLeft, this.yPosition);
    this.yPosition += lines.length * 6 + 10;
  }

  protected addBulletList(items: string[]): void {
    this.doc.setFontSize(11);
    this.doc.setFont('helvetica', 'normal');
    this.doc.setTextColor(BRAND_COLORS.black);
    
    items.forEach(item => {
      this.checkPageBreak(10);
      const lines = this.doc.splitTextToSize(`• ${item}`, this.contentWidth - 10);
      this.doc.text(lines, this.marginLeft + 5, this.yPosition);
      this.yPosition += lines.length * 6 + 2;
    });
    this.yPosition += 5;
  }

  protected addWritingSpace(label: string, lines: number = 3): void {
    this.checkPageBreak(lines * 10 + 15);
    
    this.doc.setFontSize(11);
    this.doc.setFont('helvetica', 'normal');
    this.doc.setTextColor(BRAND_COLORS.black);
    this.doc.text(label, this.marginLeft, this.yPosition);
    this.yPosition += 8;
    
    this.doc.setDrawColor(200);
    for (let i = 0; i < lines; i++) {
      this.doc.line(this.marginLeft, this.yPosition, 190, this.yPosition);
      this.yPosition += 10;
    }
    this.yPosition += 5;
  }

  protected download(fileName: string): void {
    this.addFooter();
    
    const blob = this.doc.output('blob');
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName}.pdf`;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

/**
 * Generate achievement/completion certificates
 */
export class CertificateGenerator extends ThrivePDFGenerator {
  constructor() {
    super();
    this.doc = new jsPDF('landscape');
    this.pageHeight = 200;
    this.pageWidth = 297;
  }

  generate(options: {
    recipientName: string;
    achievementTitle: string;
    achievementDescription: string;
    dateCompleted: Date;
    certificateType: 'workshop' | 'course' | 'achievement' | 'milestone';
  }): void {
    const { recipientName, achievementTitle, achievementDescription, dateCompleted, certificateType } = options;

    // Decorative border
    this.doc.setDrawColor(BRAND_COLORS.deepBronze);
    this.doc.setLineWidth(3);
    this.doc.rect(10, 10, 277, 190);
    this.doc.setLineWidth(1);
    this.doc.rect(15, 15, 267, 180);

    // Certificate header
    this.yPosition = 35;
    this.doc.setFontSize(16);
    this.doc.setFont('helvetica', 'normal');
    this.doc.setTextColor(BRAND_COLORS.bronze);
    this.doc.text('THRIVE MENTAL WELLNESS', 148.5, this.yPosition, { align: 'center' });
    this.yPosition += 15;

    // Certificate title
    this.doc.setFontSize(36);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setTextColor(BRAND_COLORS.deepBronze);
    this.doc.text('Certificate of Completion', 148.5, this.yPosition, { align: 'center' });
    this.yPosition += 20;

    // Decorative line
    this.doc.setDrawColor(BRAND_COLORS.bronze);
    this.doc.setLineWidth(0.5);
    this.doc.line(60, this.yPosition, 237, this.yPosition);
    this.yPosition += 15;

    // Recipient text
    this.doc.setFontSize(14);
    this.doc.setFont('helvetica', 'normal');
    this.doc.setTextColor(80);
    this.doc.text('This certificate is proudly presented to', 148.5, this.yPosition, { align: 'center' });
    this.yPosition += 15;

    // Recipient name
    this.doc.setFontSize(28);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setTextColor(BRAND_COLORS.black);
    this.doc.text(recipientName, 148.5, this.yPosition, { align: 'center' });
    this.yPosition += 15;

    // Achievement description
    this.doc.setFontSize(14);
    this.doc.setFont('helvetica', 'normal');
    this.doc.setTextColor(80);
    this.doc.text('for successfully completing', 148.5, this.yPosition, { align: 'center' });
    this.yPosition += 12;

    // Achievement title
    this.doc.setFontSize(20);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setTextColor(BRAND_COLORS.deepBronze);
    this.doc.text(achievementTitle, 148.5, this.yPosition, { align: 'center' });
    this.yPosition += 12;

    // Achievement details
    if (achievementDescription) {
      this.doc.setFontSize(12);
      this.doc.setFont('helvetica', 'italic');
      this.doc.setTextColor(100);
      const descLines = this.doc.splitTextToSize(achievementDescription, 200);
      this.doc.text(descLines, 148.5, this.yPosition, { align: 'center' });
      this.yPosition += descLines.length * 6 + 10;
    }

    // Date
    this.yPosition = 165;
    this.doc.setFontSize(12);
    this.doc.setFont('helvetica', 'normal');
    this.doc.setTextColor(80);
    this.doc.text(`Completed on ${dateCompleted.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })}`, 148.5, this.yPosition, { align: 'center' });

    // Signature line
    this.yPosition += 15;
    this.doc.setDrawColor(150);
    this.doc.line(100, this.yPosition, 197, this.yPosition);
    this.yPosition += 5;
    this.doc.setFontSize(10);
    this.doc.text('ThriveMT Team', 148.5, this.yPosition, { align: 'center' });

    this.download(`ThriveMT_Certificate_${achievementTitle.replace(/\s+/g, '_')}`);
  }
}

/**
 * Generate progress reports
 */
export class ProgressReportGenerator extends ThrivePDFGenerator {
  generate(options: {
    userName: string;
    dateRange: { start: Date; end: Date };
    moodData?: { date: string; score: number; label: string }[];
    activitiesCompleted?: { name: string; count: number }[];
    streakDays?: number;
    totalPoints?: number;
    achievements?: string[];
    recommendations?: string[];
  }): void {
    const { userName, dateRange, moodData, activitiesCompleted, streakDays, totalPoints, achievements, recommendations } = options;

    this.addHeader();
    this.addTitle('Wellness Progress Report', `${userName}'s Journey Summary`);

    // Date range
    this.doc.setFontSize(11);
    this.doc.setTextColor(100);
    this.doc.text(
      `Report Period: ${dateRange.start.toLocaleDateString()} - ${dateRange.end.toLocaleDateString()}`,
      105,
      this.yPosition,
      { align: 'center' }
    );
    this.yPosition += 15;

    // Summary stats box
    this.checkPageBreak(50);
    this.doc.setFillColor(245, 245, 245);
    this.doc.roundedRect(this.marginLeft, this.yPosition, this.contentWidth, 35, 3, 3, 'F');
    
    const statsY = this.yPosition + 12;
    const colWidth = this.contentWidth / 3;
    
    // Streak
    this.doc.setFontSize(18);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setTextColor(BRAND_COLORS.deepBronze);
    this.doc.text(`${streakDays || 0}`, this.marginLeft + colWidth * 0.5, statsY, { align: 'center' });
    this.doc.setFontSize(9);
    this.doc.setTextColor(100);
    this.doc.text('Day Streak', this.marginLeft + colWidth * 0.5, statsY + 10, { align: 'center' });
    
    // Activities
    const totalActivities = activitiesCompleted?.reduce((sum, a) => sum + a.count, 0) || 0;
    this.doc.setFontSize(18);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setTextColor(BRAND_COLORS.deepBronze);
    this.doc.text(`${totalActivities}`, this.marginLeft + colWidth * 1.5, statsY, { align: 'center' });
    this.doc.setFontSize(9);
    this.doc.setTextColor(100);
    this.doc.text('Activities', this.marginLeft + colWidth * 1.5, statsY + 10, { align: 'center' });
    
    // Points
    this.doc.setFontSize(18);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setTextColor(BRAND_COLORS.deepBronze);
    this.doc.text(`${totalPoints || 0}`, this.marginLeft + colWidth * 2.5, statsY, { align: 'center' });
    this.doc.setFontSize(9);
    this.doc.setTextColor(100);
    this.doc.text('Points Earned', this.marginLeft + colWidth * 2.5, statsY + 10, { align: 'center' });
    
    this.yPosition += 45;

    // Mood trends
    if (moodData && moodData.length > 0) {
      this.addSection('Mood Trends', 'Your emotional journey over this period:');
      
      const avgMood = moodData.reduce((sum, m) => sum + m.score, 0) / moodData.length;
      this.doc.setFontSize(11);
      this.doc.setTextColor(BRAND_COLORS.black);
      this.doc.text(`Average Mood Score: ${avgMood.toFixed(1)}/10`, this.marginLeft, this.yPosition);
      this.yPosition += 8;
      
      // Simple mood visualization
      const moodLabels = moodData.slice(-7).map(m => m.label);
      this.doc.text(`Recent moods: ${moodLabels.join(' → ')}`, this.marginLeft, this.yPosition);
      this.yPosition += 15;
    }

    // Activities breakdown
    if (activitiesCompleted && activitiesCompleted.length > 0) {
      this.addSection('Activities Completed', 'Your wellness activities this period:');
      activitiesCompleted.forEach(activity => {
        this.checkPageBreak(10);
        this.doc.setFontSize(11);
        this.doc.setTextColor(BRAND_COLORS.black);
        this.doc.text(`• ${activity.name}: ${activity.count} times`, this.marginLeft + 5, this.yPosition);
        this.yPosition += 7;
      });
      this.yPosition += 10;
    }

    // Achievements
    if (achievements && achievements.length > 0) {
      this.addSection('Achievements Unlocked', 'Congratulations on reaching these milestones:');
      this.addBulletList(achievements);
    }

    // Recommendations
    if (recommendations && recommendations.length > 0) {
      this.addSection('Personalized Recommendations', 'Based on your progress, we suggest:');
      this.addBulletList(recommendations);
    }

    // Closing message
    this.checkPageBreak(30);
    this.doc.setFillColor(BRAND_COLORS.lightBronze);
    this.doc.roundedRect(this.marginLeft, this.yPosition, this.contentWidth, 25, 3, 3, 'F');
    this.doc.setFontSize(11);
    this.doc.setFont('helvetica', 'italic');
    this.doc.setTextColor(BRAND_COLORS.deepBronze);
    this.doc.text(
      'Keep going! Every step forward is progress. We\'re proud of your journey.',
      105,
      this.yPosition + 15,
      { align: 'center' }
    );

    this.download(`ThriveMT_Progress_Report_${userName.replace(/\s+/g, '_')}`);
  }
}

/**
 * Generate resource guides and handouts
 */
export class ResourceGuideGenerator extends ThrivePDFGenerator {
  generate(options: {
    title: string;
    description: string;
    sections: {
      title: string;
      content: string;
      tips?: string[];
    }[];
    includeWritingSpaces?: boolean;
  }): void {
    const { title, description, sections, includeWritingSpaces } = options;

    this.addHeader();
    this.addTitle(title);
    
    // Description
    this.doc.setFontSize(11);
    this.doc.setFont('helvetica', 'normal');
    this.doc.setTextColor(80);
    const descLines = this.doc.splitTextToSize(description, this.contentWidth);
    this.doc.text(descLines, this.marginLeft, this.yPosition);
    this.yPosition += descLines.length * 6 + 15;

    // Sections
    sections.forEach((section, index) => {
      this.addSection(`${index + 1}. ${section.title}`, section.content);
      
      if (section.tips && section.tips.length > 0) {
        this.doc.setFontSize(11);
        this.doc.setFont('helvetica', 'bold');
        this.doc.setTextColor(BRAND_COLORS.bronze);
        this.doc.text('Key Tips:', this.marginLeft, this.yPosition);
        this.yPosition += 8;
        this.addBulletList(section.tips);
      }

      if (includeWritingSpaces) {
        this.addWritingSpace('Your thoughts and reflections:', 3);
      }
    });

    // Resources section
    this.checkPageBreak(40);
    this.doc.setFillColor(245, 245, 245);
    this.doc.roundedRect(this.marginLeft, this.yPosition, this.contentWidth, 30, 3, 3, 'F');
    this.yPosition += 10;
    this.doc.setFontSize(11);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setTextColor(BRAND_COLORS.deepBronze);
    this.doc.text('Need More Support?', this.marginLeft + 5, this.yPosition);
    this.yPosition += 8;
    this.doc.setFont('helvetica', 'normal');
    this.doc.setTextColor(80);
    this.doc.text('Visit thrive-mental.com or chat with Henry, your AI wellness companion.', this.marginLeft + 5, this.yPosition);

    this.download(`ThriveMT_${title.replace(/\s+/g, '_')}`);
  }
}

// Convenience functions for quick generation
export const generateCertificate = (options: Parameters<CertificateGenerator['generate']>[0]) => {
  const generator = new CertificateGenerator();
  generator.generate(options);
};

export const generateProgressReport = (options: Parameters<ProgressReportGenerator['generate']>[0]) => {
  const generator = new ProgressReportGenerator();
  generator.generate(options);
};

export const generateResourceGuide = (options: Parameters<ResourceGuideGenerator['generate']>[0]) => {
  const generator = new ResourceGuideGenerator();
  generator.generate(options);
};

// Pre-built resource guides
export const RESOURCE_TEMPLATES = {
  stressManagement: {
    title: 'Stress Management Quick Guide',
    description: 'Evidence-based techniques for managing stress in daily life. Use this guide as a reference when you need quick strategies to reduce tension and restore calm.',
    sections: [
      {
        title: 'Understanding Stress',
        content: 'Stress is your body\'s natural response to challenges. While some stress can be motivating, chronic stress affects your mental and physical health. Recognizing your stress signals is the first step toward managing them effectively.',
        tips: [
          'Notice physical signs: tension in shoulders, jaw clenching, rapid breathing',
          'Identify emotional signals: irritability, anxiety, feeling overwhelmed',
          'Track patterns: What situations or times trigger your stress?'
        ]
      },
      {
        title: 'Quick Relief Techniques',
        content: 'When stress hits, these techniques can help you regain calm within minutes.',
        tips: [
          '4-7-8 Breathing: Inhale 4 counts, hold 7, exhale 8',
          'Grounding: Name 5 things you see, 4 you hear, 3 you touch',
          'Progressive relaxation: Tense and release each muscle group',
          'Cold water on wrists: Activates your body\'s calming response'
        ]
      },
      {
        title: 'Long-term Resilience',
        content: 'Building stress resilience takes consistent practice. These habits help your nervous system stay balanced.',
        tips: [
          'Regular exercise (even 20 minutes helps)',
          'Consistent sleep schedule',
          'Limiting caffeine and alcohol',
          'Daily mindfulness practice',
          'Social connection and support'
        ]
      }
    ],
    includeWritingSpaces: true
  },
  anxietyToolkit: {
    title: 'Anxiety Management Toolkit',
    description: 'Practical tools and techniques for managing anxiety symptoms. Keep this guide handy for moments when anxiety feels overwhelming.',
    sections: [
      {
        title: 'Recognizing Anxiety',
        content: 'Anxiety can manifest as racing thoughts, physical tension, and avoidance behaviors. Understanding your unique anxiety patterns helps you respond more effectively.',
        tips: [
          'Common thoughts: "What if...", catastrophizing, mind-reading',
          'Physical symptoms: racing heart, sweating, stomach upset',
          'Behaviors: avoidance, seeking reassurance, checking'
        ]
      },
      {
        title: 'In-the-Moment Techniques',
        content: 'When anxiety spikes, these tools can help bring you back to the present moment.',
        tips: [
          'Box breathing: 4 counts in, 4 hold, 4 out, 4 hold',
          'STOP technique: Stop, Take a breath, Observe, Proceed mindfully',
          'Challenge the thought: "Is this definitely true?"',
          'Physical movement: shake it out, go for a walk'
        ]
      },
      {
        title: 'Building Anxiety Resilience',
        content: 'Long-term anxiety management involves gradually facing fears and building coping confidence.',
        tips: [
          'Gradual exposure to feared situations',
          'Regular relaxation practice',
          'Limiting "safety behaviors" that maintain anxiety',
          'Self-compassion when anxiety happens'
        ]
      }
    ],
    includeWritingSpaces: true
  },
  sleepHygiene: {
    title: 'Better Sleep Guide',
    description: 'Research-backed strategies for improving your sleep quality. Good sleep is foundational to mental wellness.',
    sections: [
      {
        title: 'Sleep Environment',
        content: 'Your bedroom should be optimized for rest. Small changes can make a big difference in sleep quality.',
        tips: [
          'Keep room cool (65-68°F ideal)',
          'Make it dark: blackout curtains, no LED lights',
          'Reduce noise or use white noise',
          'Reserve bed for sleep and intimacy only'
        ]
      },
      {
        title: 'Pre-Sleep Routine',
        content: 'A consistent wind-down routine signals to your brain that it\'s time for sleep.',
        tips: [
          'Start winding down 1 hour before bed',
          'Avoid screens (blue light disrupts melatonin)',
          'Try warm bath/shower, reading, gentle stretching',
          'Write tomorrow\'s to-do list to clear your mind'
        ]
      },
      {
        title: 'Daytime Habits for Better Sleep',
        content: 'What you do during the day significantly affects nighttime sleep quality.',
        tips: [
          'Get morning sunlight (helps set circadian rhythm)',
          'Limit caffeine after 2pm',
          'Exercise regularly (but not too close to bedtime)',
          'Avoid long naps (keep under 20 minutes if needed)'
        ]
      }
    ],
    includeWritingSpaces: false
  }
};

export const downloadResourceTemplate = (templateKey: keyof typeof RESOURCE_TEMPLATES) => {
  const template = RESOURCE_TEMPLATES[templateKey];
  if (template) {
    generateResourceGuide(template);
  }
};
