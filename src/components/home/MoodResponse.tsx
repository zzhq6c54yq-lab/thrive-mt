
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Heart } from "lucide-react";
import useTranslation from "@/hooks/useTranslation";

interface MoodResponseProps {
  selectedMood: 'happy' | 'ok' | 'neutral' | 'down' | 'sad' | 'overwhelmed' | null;
  onContinue: () => void;
  onPrevious: () => void;
}

const MoodResponse: React.FC<MoodResponseProps> = ({ selectedMood, onContinue, onPrevious }) => {
  const { isSpanish, isPortuguese, isFilipino } = useTranslation();

  const getMoodResponse = () => {
    switch (selectedMood) {
      case 'happy':
        return {
          title: isSpanish ? "Tu Alegría es Contagiosa" : 
                 isPortuguese ? "Sua Alegria é Contagiante" :
                 isFilipino ? "Ang Inyong Kasiyahan ay Nakakahawa" :
                 "Your Joy is Contagious",
          message: isSpanish ? "Es maravilloso ver que te sientes feliz hoy. Aprovechemos esta energía positiva para construir sobre tu bienestar y explorar formas de mantener este estado de ánimo." :
                   isPortuguese ? "É maravilhoso ver que você está se sentindo feliz hoje. Vamos usar essa energia positiva para construir seu bem-estar e explorar formas de manter esse estado de espírito." :
                   isFilipino ? "Napakaganda na nakikita na masaya ka ngayon. Gamitin natin ang positibong enerhiyang ito upang makabuo sa inyong kapakanan at tuklasin ang mga paraan upang mapanatili ang mood na ito." :
                   "It's wonderful to see you're feeling happy today. Let's harness this positive energy to build upon your wellbeing and explore ways to maintain this mood."
        };
      case 'ok':
        return {
          title: isSpanish ? "Estabilidad es Fortaleza" : 
                 isPortuguese ? "Estabilidade é Força" :
                 isFilipino ? "Ang Katatagan ay Lakas" :
                 "Stability is Strength",
          message: isSpanish ? "Sentirse 'bien' muestra un equilibrio saludable. Este es un gran lugar desde donde crecer y explorar nuevas formas de mejorar tu bienestar mental." :
                   isPortuguese ? "Sentir-se 'bem' mostra um equilíbrio saudável. Este é um ótimo lugar para crescer e explorar novas maneiras de melhorar seu bem-estar mental." :
                   isFilipino ? "Ang pakiramdam na 'ayos' ay nagpapakita ng malusog na balanse. Ito ay isang magandang lugar upang lumaki at tuklasin ang mga bagong paraan upang mapabuti ang inyong mental na kapakanan." :
                   "Feeling 'okay' shows a healthy balance. This is a great place from which to grow and explore new ways to enhance your mental wellbeing."
        };
      case 'neutral':
        return {
          title: isSpanish ? "La Neutralidad Tiene Potencial" : 
                 isPortuguese ? "A Neutralidade Tem Potencial" :
                 isFilipino ? "Ang Neutralidad ay May Potensyal" :
                 "Neutrality Has Potential",
          message: isSpanish ? "Los días neutrales son oportunidades. Pueden ser puntos de partida para algo mejor o momentos para la reflexión tranquila. Exploremos formas de agregar algo positivo a tu día." :
                   isPortuguese ? "Dias neutros são oportunidades. Eles podem ser pontos de partida para algo melhor ou momentos para reflexão tranquila. Vamos explorar maneiras de adicionar algo positivo ao seu dia." :
                   isFilipino ? "Ang mga neutral na araw ay mga pagkakataon. Maaari silang maging mga simula para sa mas maganda o mga sandali para sa tahimik na pag-iisip. Tuklasin natin ang mga paraan upang magdagdag ng positibo sa inyong araw." :
                   "Neutral days are opportunities. They can be starting points for something better or moments for quiet reflection. Let's explore ways to add something positive to your day."
        };
      case 'down':
        return {
          title: isSpanish ? "Tu Resistencia es Notable" : 
                 isPortuguese ? "Sua Resistência é Notável" :
                 isFilipino ? "Ang Inyong Pagtitis ay Kahanga-hanga" :
                 "Your Resilience is Remarkable",
          message: isSpanish ? "Incluso en estos días difíciles, sigues apareciendo, esa es una forma de valentía que pocos reconocen pero que merece ser celebrada. Tu disposición a sentir completamente, a ser vulnerable, es lo que te permite sanar de verdad." :
                   isPortuguese ? "Mesmo nesses dias difíceis, você continua aparecendo - essa é uma forma de coragem que poucos reconhecem, mas que merece ser celebrada. Sua disposição de sentir completamente, de ser vulnerável, é o que permite que você cure de verdade." :
                   isFilipino ? "Kahit sa mga mahirap na araw na ito, patuloy ka pa ring nagpapakita - iyan ay isang uri ng tapang na kaunti ang nakikilala ngunit karapat-dapat na ipagdiwang. Ang inyong pagkahandang maramdaman nang buo, maging mahina, ay kung ano ang nagbibigay-daan sa inyong tunay na paggaling." :
                   "Even on these difficult days, you're still showing up - that's a form of courage few recognize but that deserves to be celebrated. Your willingness to feel fully, to be vulnerable, is what allows you to heal truly."
        };
      case 'sad':
        return {
          title: isSpanish ? "La Tristeza Merece Compasión" : 
                 isPortuguese ? "A Tristeza Merece Compaixão" :
                 isFilipino ? "Ang Kalungkutan ay Karapat-dapat sa Awa" :
                 "Sadness Deserves Compassion",
          message: isSpanish ? "Tu tristeza es válida y merece ser honrada, no evitada. Es una respuesta natural a las experiencias de la vida, y reconocerla es el primer paso hacia el cuidado y la sanación." :
                   isPortuguese ? "Sua tristeza é válida e merece ser honrada, não evitada. É uma resposta natural às experiências da vida, e reconhecê-la é o primeiro passo em direção ao cuidado e à cura." :
                   isFilipino ? "Ang inyong kalungkutan ay wastong at karapat-dapat na parangalan, hindi iwasan. Ito ay natural na tugon sa mga karanasan sa buhay, at ang pagkilala dito ay ang unang hakbang tungo sa pag-aalaga at paggaling." :
                   "Your sadness is valid and deserves to be honored, not avoided. It's a natural response to life's experiences, and acknowledging it is the first step toward care and healing."
        };
      case 'overwhelmed':
        return {
          title: isSpanish ? "Sentirse Abrumado es Humano" : 
                 isPortuguese ? "Sentir-se Sobrecarregado é Humano" :
                 isFilipino ? "Ang Pagiging Napapagod ay Tao" :
                 "Feeling Overwhelmed is Human",
          message: isSpanish ? "Cuando todo se siente demasiado, recuerda que no tienes que llevar todo a la vez. Demos un paso atrás, respiremos y encontremos formas de dividir las cosas en partes manejables." :
                   isPortuguese ? "Quando tudo parece demais, lembre-se de que você não precisa carregar tudo de uma vez. Vamos dar um passo para trás, respirar e encontrar maneiras de dividir as coisas em partes gerenciáveis." :
                   isFilipino ? "Kapag lahat ay nagiging masyadong mabigat, tandaan na hindi mo kailangang dalhin ang lahat nang sabay-sabay. Magpa-atras tayo, huminga, at maghanap ng mga paraan upang hatiin ang mga bagay sa mga bahaging makakaya." :
                   "When everything feels like too much, remember that you don't have to carry it all at once. Let's take a step back, breathe, and find ways to break things down into manageable pieces."
        };
      default:
        return {
          title: isSpanish ? "Gracias por Compartir" : 
                 isPortuguese ? "Obrigado por Compartilhar" :
                 isFilipino ? "Salamat sa Pagbabahagi" :
                 "Thank You for Sharing",
          message: isSpanish ? "Compartir cómo te sientes es un acto valiente. Continuemos este viaje juntos." :
                   isPortuguese ? "Compartilhar como você se sente é um ato corajoso. Vamos continuar esta jornada juntos." :
                   isFilipino ? "Ang pagbabahagi kung paano mo nararamdaman ay isang matapang na gawa. Ipagpatuloy natin ang paglalakbay na ito nang sama-sama." :
                   "Sharing how you feel is a brave act. Let's continue this journey together."
        };
    }
  };

  const response = getMoodResponse();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1a1a1f] px-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="bg-gradient-to-br from-[#B87333]/20 to-purple-900/20 rounded-lg p-8 border border-[#B87333]/30">
          <div className="mb-6">
            <Heart className="w-16 h-16 text-[#B87333] mx-auto mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold text-[#B87333] mb-4">
              {response.title}
            </h1>
          </div>
          
          <div className="bg-black/30 p-6 rounded-lg border border-white/10 mb-8">
            <p className="text-white/90 text-lg leading-relaxed">
              {response.message}
            </p>
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <Button 
            onClick={onPrevious}
            variant="outline" 
            className="flex items-center gap-2 bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
          >
            <ArrowLeft className="h-4 w-4" />
            {isSpanish ? "Anterior" : isPortuguese ? "Anterior" : isFilipino ? "Nakaraan" : "Previous"}
          </Button>
          
          <Button 
            onClick={onContinue}
            className="flex items-center gap-2 bg-[#B87333] hover:bg-[#B87333]/80 text-white"
          >
            {isSpanish ? "Continuar" : isPortuguese ? "Continuar" : isFilipino ? "Magpatuloy" : "Continue"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MoodResponse;
