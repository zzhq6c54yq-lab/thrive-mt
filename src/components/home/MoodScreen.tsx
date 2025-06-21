
import React from "react";
import { Button } from "@/components/ui/button";
import { Smile, Meh, Frown, Heart, AlertTriangle, Cloud } from "lucide-react";
import useTranslation from "@/hooks/useTranslation";

interface MoodScreenProps {
  onMoodSelect: (mood: 'happy' | 'ok' | 'neutral' | 'down' | 'sad' | 'overwhelmed') => void;
}

const MoodScreen: React.FC<MoodScreenProps> = ({ onMoodSelect }) => {
  const { isSpanish, isPortuguese, isFilipino } = useTranslation();

  const moodOptions = [
    {
      id: 'happy' as const,
      icon: <Smile className="w-12 h-12 text-green-500" />,
      label: isSpanish ? "Feliz" : isPortuguese ? "Feliz" : isFilipino ? "Masaya" : "Happy",
      color: "bg-green-100 hover:bg-green-200 border-green-300"
    },
    {
      id: 'ok' as const,
      icon: <Heart className="w-12 h-12 text-blue-500" />,
      label: isSpanish ? "Bien" : isPortuguese ? "Bem" : isFilipino ? "Ayos" : "OK",
      color: "bg-blue-100 hover:bg-blue-200 border-blue-300"
    },
    {
      id: 'neutral' as const,
      icon: <Meh className="w-12 h-12 text-yellow-500" />,
      label: isSpanish ? "Neutral" : isPortuguese ? "Neutro" : isFilipino ? "Neutral" : "Neutral",
      color: "bg-yellow-100 hover:bg-yellow-200 border-yellow-300"
    },
    {
      id: 'down' as const,
      icon: <Cloud className="w-12 h-12 text-orange-500" />,
      label: isSpanish ? "Decaído" : isPortuguese ? "Para baixo" : isFilipino ? "Malungkot" : "Down",
      color: "bg-orange-100 hover:bg-orange-200 border-orange-300"
    },
    {
      id: 'sad' as const,
      icon: <Frown className="w-12 h-12 text-red-500" />,
      label: isSpanish ? "Triste" : isPortuguese ? "Triste" : isFilipino ? "Nalulungkot" : "Sad",
      color: "bg-red-100 hover:bg-red-200 border-red-300"
    },
    {
      id: 'overwhelmed' as const,
      icon: <AlertTriangle className="w-12 h-12 text-purple-500" />,
      label: isSpanish ? "Abrumado" : isPortuguese ? "Sobrecarregado" : isFilipino ? "Napapagod" : "Overwhelmed",
      color: "bg-purple-100 hover:bg-purple-200 border-purple-300"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1a1a1f] px-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {isSpanish ? "¿Cómo te sientes hoy?" : 
             isPortuguese ? "Como você está se sentindo hoje?" :
             isFilipino ? "Kumusta ang iyong pakiramdam ngayon?" :
             "How are you feeling today?"}
          </h1>
          <p className="text-xl text-gray-300">
            {isSpanish ? "Selecciona la emoción que mejor describe cómo te sientes" :
             isPortuguese ? "Selecione a emoção que melhor descreve como você está se sentindo" :
             isFilipino ? "Piliin ang emosyon na pinakamahusay na naglalarawan kung paano mo nararamdaman" :
             "Select the emotion that best describes how you're feeling"}
          </p>
        </div>

        <div className="bg-[#2a2a35] rounded-lg p-6 border border-gray-700">
          <p className="text-gray-400 italic mb-6">
            {isSpanish ? "Tómate un momento para reflexionar" :
             isPortuguese ? "Reserve um momento para refletir" :
             isFilipino ? "Maglaan ng sandali upang mag-isip" :
             "Take a moment to reflect"}
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {moodOptions.map((mood) => (
              <Button
                key={mood.id}
                onClick={() => onMoodSelect(mood.id)}
                className={`${mood.color} h-24 flex flex-col items-center justify-center space-y-2 border-2 hover:scale-105 transition-all duration-200`}
                variant="outline"
              >
                {mood.icon}
                <span className="font-medium text-gray-800">{mood.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodScreen;
