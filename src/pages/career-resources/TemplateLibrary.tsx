import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import BackButton from "@/components/navigation/BackButton";
import { FileText, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TemplateLibrary = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const templates = [
    {
      id: 1,
      title: "Professional Resume Template",
      description: "Clean, modern resume layout for corporate positions",
      category: "Resume",
    },
    {
      id: 2,
      title: "Creative Resume Template",
      description: "Eye-catching design for creative industries",
      category: "Resume",
    },
    {
      id: 3,
      title: "Cover Letter Template",
      description: "Professional cover letter format with examples",
      category: "Cover Letter",
    },
    {
      id: 4,
      title: "Executive Resume Template",
      description: "Senior-level resume template with leadership focus",
      category: "Resume",
    },
  ];

  const handleDownload = (title: string) => {
    toast({
      title: "Download Started",
      description: `${title} is being downloaded`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <BackButton onCustomBack={() => navigate("/app/career-coaching")} />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-6 w-6" />
              Template Library
            </CardTitle>
            <CardDescription>
              Professional templates to help you create standout application materials
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {templates.map((template) => (
                <Card key={template.id} className="hover:border-primary/50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium mb-1">{template.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {template.description}
                        </p>
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                          {template.category}
                        </span>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleDownload(template.title)}
                        className="ml-4"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TemplateLibrary;
