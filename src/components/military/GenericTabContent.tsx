
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface GenericTabContentProps {
  title: string;
  description: string;
  content?: string;
}

const GenericTabContent = ({ title, description, content = "Content will appear here." }: GenericTabContentProps) => {
  return (
    <Card className="bg-gradient-to-b from-[#1c2e4a] to-[#0A1929] border-[#B87333]/30 text-white shadow-md">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="text-gray-300">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-white">{content}</p>
      </CardContent>
    </Card>
  );
};

export default GenericTabContent;
