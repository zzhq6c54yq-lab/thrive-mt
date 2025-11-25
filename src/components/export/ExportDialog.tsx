import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Download, FileText, File, Calendar } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { useToast } from '@/hooks/use-toast';

interface ExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  exportType: 'progress' | 'journal' | 'goals' | 'mood';
  data: any;
  title: string;
}

export const ExportDialog: React.FC<ExportDialogProps> = ({
  open,
  onOpenChange,
  exportType,
  data,
  title
}) => {
  const { toast } = useToast();
  const [exporting, setExporting] = useState(false);

  const exportPDF = () => {
    setExporting(true);
    try {
      const doc = new jsPDF();
      
      // Add ThriveMT branding
      doc.setFontSize(24);
      doc.setTextColor(212, 175, 55); // Bronze
      doc.text('ThriveMT', 20, 20);
      
      doc.setFontSize(16);
      doc.setTextColor(0, 0, 0);
      doc.text(title, 20, 35);
      
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(`Generated on ${new Date().toLocaleDateString()}`, 20, 45);
      
      // Add content based on export type
      let yPosition = 60;
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);

      if (exportType === 'journal' && Array.isArray(data)) {
        data.forEach((entry: any) => {
          if (yPosition > 270) {
            doc.addPage();
            yPosition = 20;
          }
          
          doc.setFontSize(14);
          doc.text(entry.title || 'Journal Entry', 20, yPosition);
          yPosition += 7;
          
          doc.setFontSize(10);
          doc.setTextColor(100, 100, 100);
          doc.text(new Date(entry.created_at).toLocaleDateString(), 20, yPosition);
          yPosition += 10;
          
          doc.setFontSize(11);
          doc.setTextColor(0, 0, 0);
          const lines = doc.splitTextToSize(entry.content, 170);
          doc.text(lines, 20, yPosition);
          yPosition += (lines.length * 7) + 15;
        });
      }

      // Save PDF
      doc.save(`${title.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`);
      
      toast({
        title: "Export Successful",
        description: "Your PDF has been downloaded.",
      });
    } catch (error) {
      console.error('Export failed:', error);
      toast({
        title: "Export Failed",
        description: "Unable to generate PDF. Please try again.",
        variant: "destructive"
      });
    } finally {
      setExporting(false);
    }
  };

  const exportCSV = () => {
    setExporting(true);
    try {
      let csvContent = '';
      
      if (exportType === 'mood' && Array.isArray(data)) {
        csvContent = 'Date,Mood Score,Tags\n';
        data.forEach((entry: any) => {
          csvContent += `${new Date(entry.created_at).toLocaleDateString()},${entry.mood_score},"${entry.tags?.join('; ') || ''}"\n`;
        });
      } else if (exportType === 'goals' && Array.isArray(data)) {
        csvContent = 'Title,Type,Current,Target,Status,Due Date\n';
        data.forEach((goal: any) => {
          csvContent += `"${goal.title}",${goal.type},${goal.current},${goal.target},${goal.status},${goal.due_date || ''}\n`;
        });
      }

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${title.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
      
      toast({
        title: "Export Successful",
        description: "Your CSV has been downloaded.",
      });
    } catch (error) {
      console.error('Export failed:', error);
      toast({
        title: "Export Failed",
        description: "Unable to generate CSV. Please try again.",
        variant: "destructive"
      });
    } finally {
      setExporting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-gradient-to-br from-gray-900 to-gray-800 border-bronze-500/50">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white flex items-center gap-3">
            <Download className="w-6 h-6 text-bronze-500" />
            Export {title}
          </DialogTitle>
          <DialogDescription className="text-gray-300">
            Choose your preferred export format
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 mt-4">
          <Card 
            className="bg-gradient-to-r from-bronze-500/20 to-bronze-600/10 border-bronze-500/50 p-4 hover:shadow-lg transition-all cursor-pointer"
            onClick={exportPDF}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-bronze-400" />
                <div>
                  <h3 className="text-white font-semibold">PDF Report</h3>
                  <p className="text-gray-400 text-sm">Professional format with branding</p>
                </div>
              </div>
              <Button 
                disabled={exporting}
                className="bg-bronze-500 hover:bg-bronze-600 text-black"
              >
                Export PDF
              </Button>
            </div>
          </Card>

          {(exportType === 'mood' || exportType === 'goals') && (
            <Card 
              className="bg-gradient-to-r from-blue-500/20 to-blue-600/10 border-blue-500/50 p-4 hover:shadow-lg transition-all cursor-pointer"
              onClick={exportCSV}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <File className="w-8 h-8 text-blue-400" />
                  <div>
                    <h3 className="text-white font-semibold">CSV Spreadsheet</h3>
                    <p className="text-gray-400 text-sm">For external analysis</p>
                  </div>
                </div>
                <Button 
                  disabled={exporting}
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Export CSV
                </Button>
              </div>
            </Card>
          )}

          <div className="mt-4 p-3 bg-bronze-500/10 rounded-lg border border-bronze-500/30">
            <p className="text-gray-300 text-sm">
              <Calendar className="w-4 h-4 inline mr-1" />
              Date range: Last 30 days
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};