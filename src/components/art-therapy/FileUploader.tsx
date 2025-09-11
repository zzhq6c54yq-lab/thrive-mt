import React from "react";

interface Props {
  label: string;
  onFile: (text: string) => void;
  exampleName: string;
  exampleContent: string;
}

const btn = (primary = false) => `px-3 py-1.5 text-sm rounded-md border transition-all hover-scale ${
  primary
    ? "bg-white text-gray-800 border-gray-300 shadow-md"
    : "bg-white/80 text-gray-700 border-gray-200 hover:bg-white"
}`;

export const FileUploader: React.FC<Props> = ({ 
  label, 
  onFile, 
  exampleName, 
  exampleContent 
}) => {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      const text = await file.text();
      onFile(text);
    } catch (error) {
      console.error("Failed to read file:", error);
    }
  };

  const loadExample = () => {
    onFile(exampleContent);
  };

  return (
    <div className="rounded-lg border border-white/30 p-3 bg-white/80 backdrop-blur-sm shadow-lg flex flex-wrap items-center gap-2">
      <span className="text-sm text-gray-800">{label}</span>
      <input 
        type="file" 
        accept=".svg" 
        onChange={handleFileChange} 
        className="text-sm" 
      />
      <button 
        className={btn()} 
        onClick={loadExample}
      >
        Load Example ({exampleName})
      </button>
    </div>
  );
};