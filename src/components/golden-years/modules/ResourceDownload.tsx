import React from "react";
import { Button } from "@/components/ui/button";
import { Download, FileText, Image, FileSpreadsheet } from "lucide-react";

interface Resource {
  title: string;
  type: string;
  url?: string;
}

interface ResourceDownloadProps {
  resource: Resource;
}

const ResourceDownload: React.FC<ResourceDownloadProps> = ({ resource }) => {
  const getIcon = () => {
    switch (resource.type.toLowerCase()) {
      case "pdf":
        return <FileText className="h-5 w-5" />;
      case "image":
        return <Image className="h-5 w-5" />;
      case "spreadsheet":
        return <FileSpreadsheet className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const handleDownload = () => {
    // In a real implementation, this would download the actual resource
    // For now, we'll just show a placeholder action
    console.log(`Downloading: ${resource.title}`);
  };

  return (
    <div className="flex items-center justify-between p-3 bg-[#2A2420]/40 rounded-lg border border-[#D4AF37]/20 hover:border-[#D4AF37]/40 transition-all">
      <div className="flex items-center gap-3">
        <div className="text-[#D4AF37]">{getIcon()}</div>
        <div>
          <p className="text-sm font-medium text-[#F5DEB3]">{resource.title}</p>
          <p className="text-xs text-[#F5DEB3]/60 uppercase">{resource.type}</p>
        </div>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={handleDownload}
        className="border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37]/10"
      >
        <Download className="h-4 w-4 mr-1" />
        Download
      </Button>
    </div>
  );
};

export default ResourceDownload;
