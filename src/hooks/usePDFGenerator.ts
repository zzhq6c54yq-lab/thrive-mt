import { useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import {
  generateCertificate,
  generateProgressReport,
  generateResourceGuide,
  downloadResourceTemplate,
  RESOURCE_TEMPLATES,
} from '@/lib/pdfGenerator';

export function usePDFGenerator() {
  const { toast } = useToast();

  const downloadCertificate = useCallback((options: {
    recipientName: string;
    achievementTitle: string;
    achievementDescription?: string;
    dateCompleted?: Date;
    certificateType?: 'workshop' | 'course' | 'achievement' | 'milestone';
  }) => {
    try {
      generateCertificate({
        recipientName: options.recipientName,
        achievementTitle: options.achievementTitle,
        achievementDescription: options.achievementDescription || '',
        dateCompleted: options.dateCompleted || new Date(),
        certificateType: options.certificateType || 'achievement',
      });
      toast({
        title: 'Certificate Downloaded',
        description: 'Your certificate has been saved successfully.',
      });
    } catch (error) {
      console.error('Certificate generation error:', error);
      toast({
        title: 'Download Failed',
        description: 'Unable to generate certificate. Please try again.',
        variant: 'destructive',
      });
    }
  }, [toast]);

  const downloadProgressReport = useCallback((options: {
    userName: string;
    dateRange?: { start: Date; end: Date };
    moodData?: { date: string; score: number; label: string }[];
    activitiesCompleted?: { name: string; count: number }[];
    streakDays?: number;
    totalPoints?: number;
    achievements?: string[];
    recommendations?: string[];
  }) => {
    try {
      const now = new Date();
      const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      
      generateProgressReport({
        userName: options.userName,
        dateRange: options.dateRange || { start: thirtyDaysAgo, end: now },
        moodData: options.moodData,
        activitiesCompleted: options.activitiesCompleted,
        streakDays: options.streakDays,
        totalPoints: options.totalPoints,
        achievements: options.achievements,
        recommendations: options.recommendations,
      });
      toast({
        title: 'Report Downloaded',
        description: 'Your progress report has been saved successfully.',
      });
    } catch (error) {
      console.error('Progress report generation error:', error);
      toast({
        title: 'Download Failed',
        description: 'Unable to generate report. Please try again.',
        variant: 'destructive',
      });
    }
  }, [toast]);

  const downloadGuide = useCallback((options: {
    title: string;
    description: string;
    sections: {
      title: string;
      content: string;
      tips?: string[];
    }[];
    includeWritingSpaces?: boolean;
  }) => {
    try {
      generateResourceGuide(options);
      toast({
        title: 'Guide Downloaded',
        description: `${options.title} has been saved successfully.`,
      });
    } catch (error) {
      console.error('Resource guide generation error:', error);
      toast({
        title: 'Download Failed',
        description: 'Unable to generate guide. Please try again.',
        variant: 'destructive',
      });
    }
  }, [toast]);

  const downloadTemplate = useCallback((templateKey: keyof typeof RESOURCE_TEMPLATES) => {
    try {
      downloadResourceTemplate(templateKey);
      const template = RESOURCE_TEMPLATES[templateKey];
      toast({
        title: 'Downloaded',
        description: `${template.title} has been saved successfully.`,
      });
    } catch (error) {
      console.error('Template download error:', error);
      toast({
        title: 'Download Failed',
        description: 'Unable to download template. Please try again.',
        variant: 'destructive',
      });
    }
  }, [toast]);

  // Quick download functions for common resources
  const downloadStressGuide = useCallback(() => downloadTemplate('stressManagement'), [downloadTemplate]);
  const downloadAnxietyToolkit = useCallback(() => downloadTemplate('anxietyToolkit'), [downloadTemplate]);
  const downloadSleepGuide = useCallback(() => downloadTemplate('sleepHygiene'), [downloadTemplate]);

  return {
    downloadCertificate,
    downloadProgressReport,
    downloadGuide,
    downloadTemplate,
    downloadStressGuide,
    downloadAnxietyToolkit,
    downloadSleepGuide,
    templates: RESOURCE_TEMPLATES,
  };
}
