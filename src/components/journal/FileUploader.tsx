
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface FileUploaderProps {
  onUpload: (imageUrls: string[]) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onUpload }) => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  // This function simulates uploading images by converting them to data URLs
  // In a production app, this would upload to a server or storage service
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setIsUploading(true);
    const filesList = Array.from(e.target.files);
    
    try {
      // Convert images to data URLs
      const imagePromises = filesList.map(file => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });
      
      const imageUrls = await Promise.all(imagePromises);
      onUpload(imageUrls);
      
      // Reset the input
      e.target.value = '';
    } catch (error) {
      console.error('Error uploading files:', error);
      toast({
        title: "Upload Failed",
        description: "There was a problem uploading your images.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-4">
        <Button
          type="button"
          variant="outline"
          className="border-teal-400 text-teal-100 hover:bg-teal-700/50"
          onClick={() => document.getElementById('image-upload')?.click()}
          disabled={isUploading}
        >
          {isUploading ? "Uploading..." : "Select Photos"}
        </Button>
        <input
          id="image-upload"
          type="file"
          className="hidden"
          accept="image/*"
          multiple
          onChange={handleFileChange}
        />
        <div className="text-sm text-teal-100">
          {isUploading ? "Processing..." : "Add photos from your device"}
        </div>
      </div>
      <p className="text-xs text-teal-200">
        Supported formats: JPG, PNG, GIF (max 5MB each)
      </p>
    </div>
  );
};

export default FileUploader;
