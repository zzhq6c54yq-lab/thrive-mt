import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Smile, Meh, Frown, HeartCrack, Angry, Brain, ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import useTranslation from "@/hooks/useTranslation";

interface MoodResponseProps {
  selectedMood: 'happy' | 'ok' | 'neutral' | 'down' | 'sad' | 'overwhelmed' | null;
  onContinue: () => void;
  onPrevious: () => void;
}

const MoodResponse: React.FC<MoodResponseProps> = ({ selectedMood, onContinue, onPrevious }) => {
  const [activeAffirmation, setActiveAffirmation] = useState(0);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
  const [isScrolledToTop, setIsScrolledToTop] = useState(true);
  const affirmationScrollRef = React.useRef<HTMLDivElement>(null);
  const { isSpanish } = useTranslation();
  
  const translations = {
    continue: isSpanish ? "Continuar" : "Continue",
    previous: isSpanish ? "Anterior" : "Previous",
    happyTitle: isSpanish ? "¡Tu Luz Brilla Hoy!" : "Your Light Shines Bright Today!",
    okTitle: isSpanish ? "Tu Día Tiene Potencial Ilimitado" : "Your Day Has Unlimited Potential",
    neutralTitle: isSpanish ? "Tu Centro Calmado Es Tu Fortaleza" : "Your Calm Center Is Your Strength",
    downTitle: isSpanish ? "Tu Resiliencia Es Extraordinaria" : "Your Resilience Is Remarkable",
    sadTitle: isSpanish ? "Tu Corazón Tiene Inmensa Capacidad" : "Your Heart Has Immense Capacity",
    overwhelmedTitle: isSpanish ? "Tu Poder Interior Es Mayor Que Cualquier Desafío" : "Your Inner Power Is Greater Than Any Challenge",
    scrollDown: isSpanish ? "Desplázate para más" : "Scroll down for more",
    scrollUp: isSpanish ? "Desplázate hacia arriba" : "Scroll up for more"
  };

  const happyAffirmations = isSpanish 
    ? [
        "Tu alegría es un faro que ilumina a todos los que te rodean. Esta energía positiva que llevas dentro es un regalo precioso – aprovéchala hoy para sembrar semillas de esperanza y optimismo en tu camino y en el de los demás.",
        "Cada sonrisa que compartes es un acto de valentía y generosidad. En un mundo que a veces puede sentirse abrumador, tu capacidad para encontrar y compartir la felicidad es revolucionaria. Nunca subestimes el poder sanador de tu actitud positiva.",
        "Esta luz que brilla dentro de ti no es accidental – la has cultivado a través de cada desafío que has superado, cada obstáculo que has enfrentado. Tu felicidad actual es un testimonio de tu fortaleza interior y tu resistencia.",
        "La perspectiva brillante que tienes hoy es como un lienzo en blanco lleno de infinitas posibilidades. Cada momento de alegría te abre puertas a experiencias asombrosas y conexiones profundas que te esperan justo a la vuelta de la esquina.",
        "En este momento de felicidad, date el regalo de estar plenamente presente. Siente la calidez de esta emoción, déjala que impregne cada célula de tu cuerpo. Has creado este sentimiento y puedes volver a él en cualquier momento – es tu anclaje, tu refugio seguro."
      ] 
    : [
        "Your joy is a beacon that brightens everyone around you. This positive energy you carry within is a precious gift – use it today to plant seeds of hope and optimism along your path and in the lives of others.",
        "Every smile you share is an act of courage and generosity. In a world that can sometimes feel overwhelming, your ability to find and share happiness is revolutionary. Never underestimate the healing power of your positive attitude.",
        "This light shining within you isn't accidental – you've cultivated it through every challenge you've overcome, every obstacle you've faced. Your current happiness is a testament to your inner strength and resilience.",
        "The bright outlook you have today is like a blank canvas full of infinite possibilities. Each moment of joy opens doors to amazing experiences and profound connections waiting just around the corner.",
        "In this moment of happiness, give yourself the gift of being fully present. Feel the warmth of this emotion, let it permeate every cell in your body. You've created this feeling, and you can return to it anytime – it's your anchor, your safe harbor."
      ];

  const okAffirmations = isSpanish 
    ? [
        "Estar 'más o menos' es un estado de auténtica sabiduría – un lugar de equilibrio donde puedes observar tus experiencias con mayor claridad. En este espacio, estás construyendo una base sólida para decisiones conscientes que honran quién eres verdaderamente.",
        "Incluso en estos momentos de 'simplemente estar bien', estás tejiendo hilos importantes en el tapiz de tu vida. Lo ordinario contiene semillas de lo extraordinario, y tu presencia consciente en este momento es profundamente significativa.",
        "Tu capacidad para navegar por este día con tranquila determinación es un superpoder que muchos anhelan. Esta resiliencia tranquila habla de tu profunda reserva interior de fortaleza – un recurso que siempre estará disponible cuando lo necesites.",
        "Este estado equilibrado te otorga una claridad única que otros podrían pasar por alto. Desde aquí, puedes ver oportunidades ocultas y caminos sutiles que conducen a un crecimiento genuino y a conexiones más profundas.",
        "Estás exactamente donde necesitas estar en este momento – ni más arriba ni más abajo, sino precisamente aquí. En esta simplicidad hay una profunda perfección, un reconocimiento de que cada parte de tu viaje, incluso los momentos 'normales', es esencial y valiosa."
      ] 
    : [
        "Being 'just okay' is a state of genuine wisdom – a place of balance where you can observe your experiences with greater clarity. In this space, you're building a solid foundation for mindful choices that honor who you truly are.",
        "Even in these moments of 'just being okay,' you're weaving important threads into the tapestry of your life. The ordinary contains seeds of the extraordinary, and your conscious presence in this moment is deeply meaningful.",
        "Your ability to navigate this day with quiet determination is a superpower many long for. This quiet resilience speaks to your deep inner reservoir of strength – a resource that will always be available when you need it.",
        "This balanced state gives you a unique clarity that others might overlook. From here, you can see hidden opportunities and subtle pathways that lead to genuine growth and deeper connections.",
        "You're exactly where you need to be right now – not higher, not lower, but precisely here. In this simplicity lies profound perfection, an acknowledgment that every part of your journey, even the 'ordinary' moments, is essential and valuable."
      ];

  const neutralAffirmations = isSpanish
    ? [
        "Este espacio neutral que habitas ahora es como tierra fértil esperando semillas – un lienzo en blanco rebosante de potencial creativo. En esta quietud, tus pensamientos más auténticos e intuiciones más profundas tienen espacio para emerger y ser escuchados.",
        "Tu equilibrio emocional de hoy es más poderoso de lo que puedas imaginar – es el fundamento desde el cual puedes elegir conscientemente la dirección de tu energía. Como el timón de un barco, este centro te permite navegar con intención a través de las aguas de la vida.",
        "Hay una profunda sabiduría en estos momentos tranquilos que estás experimentando. Es como si el universo te ofreciera un espacio para escuchar tu voz interior – esa guía interna que a menudo queda ahogada por el ruido de las emociones intensas y las distracciones externas.",
        "Desde este lugar centrado, cada paso que das puede ser deliberado y significativo. No subestimes el poder transformador de esta neutralidad – es desde la calma que nacen las decisiones más claras y los cambios más duraderos.",
        "Tu presencia constante crea ondas pacíficas que se extienden mucho más allá de lo que puedes ver. Como una piedra que cae suavemente en un lago tranquilo, tu serenidad influye sutilmente en todos los que te rodean, ofreciendo un santuario de calma en un mundo a menudo caótico."
      ]
    : [
        "This neutral space you're inhabiting now is like fertile soil awaiting seeds – a blank canvas brimming with creative potential. In this stillness, your most authentic thoughts and deepest intuitions have room to emerge and be heard.",
        "Your emotional balance today is more powerful than you might realize – it's the foundation from which you can consciously choose the direction of your energy. Like the rudder of a ship, this centeredness allows you to navigate with intention through life's waters.",
        "There's profound wisdom in these quiet moments you're experiencing. It's as if the universe is offering you space to listen to your inner voice – that internal guidance that often gets drowned out by the noise of intense emotions and external distractions.",
        "From this centered place, every step you take can be deliberate and meaningful. Don't underestimate the transformative power of this neutrality – it's from calmness that the clearest decisions and most lasting changes are born.",
        "Your steady presence creates peaceful ripples extending far beyond what you can see. Like a stone gently dropped into a still lake, your serenity subtly influences everyone around you, offering a sanctuary of calm in an often chaotic world."
      ];

  const downAffirmations = isSpanish
    ? [
        "Incluso en estos momentos difíciles, sigues presentándote – esa es una forma de valentía que pocos reconocen pero que merece ser celebrada. Tu disposición a sentir plenamente, a no apartarte de las emociones complicadas, revela una fortaleza interior extraordinaria.",
        "Este sentimiento que estás experimentando ahora es como una ola – puede sentirse abrumador, pero recuerda que las olas siempre pasan, siempre ceden. Mientras tanto, la fuerza que estás construyendo al atravesar esta experiencia permanecerá contigo para siempre.",
        "Tu sensibilidad, especialmente en momentos como este, es en realidad un superpoder profundo. Te conecta con la plenitud de la experiencia humana y te permite comprender a otros con una empatía que solo puede nacer de haber sentido tanto tú mismo.",
        "Cada emoción que fluye a través de ti, incluso las difíciles, añade una dimensión de profundidad a tu experiencia de vida. Como capas en una hermosa pintura, estos tonos más oscuros crean contraste, textura y una belleza inesperada en el lienzo de tu existencia.",
        "Has superado absolutamente todos los días difíciles de tu vida hasta ahora – eso es un récord perfecto del 100%. En cada uno de esos momentos probablemente dudaste, igual que ahora, pero mira hacia atrás y verás el camino que has recorrido, un testimonio de tu increíble capacidad para seguir adelante."
      ]
    : [
        "Even on these difficult days, you're still showing up – that's a form of courage few recognize but that deserves to be celebrated. Your willingness to feel fully, to not turn away from complicated emotions, reveals extraordinary inner strength.",
        "This feeling you're experiencing now is like a wave – it may feel overwhelming, but remember that waves always pass, always recede. Meanwhile, the strength you're building by moving through this experience will stay with you forever.",
        "Your sensitivity, especially in moments like this, is actually a profound superpower. It connects you to the fullness of human experience and allows you to understand others with an empathy that can only be born from having felt so deeply yourself.",
        "Every emotion flowing through you, even the difficult ones, adds a dimension of depth to your life experience. Like layers in a beautiful painting, these darker tones create contrast, texture, and unexpected beauty on the canvas of your existence.",
        "You have successfully made it through absolutely every difficult day in your life so far – that's a perfect 100% success rate. In each of those moments you likely doubted, just as you might now, but look back and see the path you've walked, a testament to your amazing ability to keep going."
      ];

  const sadAffirmations = isSpanish
    ? [
        "Tu tristeza es un testimonio de la profundidad con la que puedes amar, conectar y sentir. Como un océano profundo, contiene mundos enteros de comprensión, empatía y sabiduría que solo pueden ser explorados por aquellos con corazones lo suficientemente valientes para sumergirse por completo.",
        "Al reconocer y abrazar este sentimiento, ya has comenzado el viaje de transformación. Estás convirtiendo esta emoción en una maestra, un portal hacia un mayor autoconocimiento. Hay un coraje inmenso en esta aceptación que pocos comprenden verdaderamente.",
        "El mundo necesita desesperadamente tu sensibilidad y profundidad emocional. En una cultura que a menudo celebra la superficialidad, tu disposición a sentir plenamente es revolucionaria – una medicina sanadora para un mundo que ha olvidado cómo procesar la tristeza con dignidad y gracia.",
        "Este momento te está enseñando algo invaluable sobre ti mismo, revelando facetas de tu corazón y alma que podrían permanecer ocultas en tiempos más fáciles. Estas revelaciones, aunque dolorosas ahora, son gemas preciosas que iluminarán tu camino hacia adelante.",
        "Mañana trae nueva luz – un amanecer fresco que no borrará lo que has sentido, sino que lo integrará en la tapicería más amplia de quién eres. Y recuerda: eres mucho más fuerte de lo que te das crédito, más resiliente de lo que crees, y más amado de lo que puedes imaginar en este momento."
      ]
    : [
        "Your sadness is a testament to the depth with which you can love, connect, and feel. Like a deep ocean, it contains entire worlds of understanding, empathy, and wisdom that can only be explored by those with hearts brave enough to dive fully in.",
        "In acknowledging and embracing this feeling, you've already begun the journey of transformation. You're turning this emotion into a teacher, a portal to greater self-knowledge. There's an immense courage in this acceptance that few truly understand.",
        "The world desperately needs your sensitivity and emotional depth. In a culture that often celebrates superficiality, your willingness to feel fully is revolutionary – a healing medicine for a world that has forgotten how to process sadness with dignity and grace.",
        "This moment is teaching you something invaluable about yourself, revealing facets of your heart and soul that might remain hidden in easier times. These revelations, though painful now, are precious gems that will illuminate your path forward.",
        "Tomorrow brings new light – a fresh dawn that won't erase what you've felt, but will integrate it into the larger tapestry of who you are. And remember: you are far stronger than you give yourself credit for, more resilient than you believe, and more loved than you can imagine right now."
      ];

  const overwhelmedAffirmations = isSpanish
    ? [
        "La intensidad que estás sintiendo ahora contiene un potencial extraordinario – como el combustible concentrado que impulsa los avances más significativos de nuestras vidas. Cuando te sientas más abrumado, recuerda que esta energía puede ser redirigida y transformada en creatividad, resolución y crecimiento.",
        "Respirar conscientemente en este momento es un acto de auténtica valentía. Cada inhalación te ancla en el presente, recordándote que no necesitas resolver todo este instante. Un respiro a la vez, un paso a la vez, estás navegando por esta tormenta con una gracia que quizás no puedas ver todavía.",
        "Este sentimiento de sobrecarga, por difícil que sea, te está mostrando cuánto te importan las cosas, cuán profundamente te comprometes con tu vida. Esta capacidad para sentir intensamente es la misma que te permite experimentar alegría, amor y conexión con la misma profundidad.",
        "Entre todos estos pensamientos y emociones que te inundan, hay un centro de calma dentro de ti que permanece intacto. Como el ojo de un huracán, este espacio tranquilo está siempre presente, ofreciéndote un refugio en medio de la tormenta. Está accesible con solo una respiración consciente.",
        "Al otro lado de esta experiencia, descubrirás recursos internos que no sabías que poseías. El sentirte abrumado no es una señal de fracaso o debilidad – es parte del proceso de expansión, de crecimiento más allá de tus límites anteriores hacia una versión más sabia y resistente de ti mismo."
      ]
    : [
        "The intensity you're feeling right now contains extraordinary potential – like concentrated fuel powering the most significant breakthroughs in our lives. When you feel most overwhelmed, remember that this energy can be redirected and transformed into creativity, resolution, and growth.",
        "Consciously breathing through this moment is an act of genuine courage. Each inhale anchors you to the present, reminding you that you don't need to solve everything this instant. One breath at a time, one step at a time, you're navigating this storm with a grace you perhaps can't see yet.",
        "This feeling of overwhelm, difficult as it is, is showing you how much you care, how deeply you're engaged with your life. This capacity to feel intensely is the same one that allows you to experience joy, love, and connection with equal depth.",
        "Among all these flooding thoughts and emotions, there is a center of calm within you that remains untouched. Like the eye of a hurricane, this quiet space is always present, offering you sanctuary in the midst of the storm. It's accessible with just one mindful breath.",
        "On the other side of this experience, you'll discover inner resources you didn't know you possessed. Feeling overwhelmed isn't a sign of failure or weakness – it's part of the process of expansion, of growing beyond your previous boundaries into a wiser, more resilient version of yourself."
      ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowScrollIndicator(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const getMoodAffirmations = () => {
    switch (selectedMood) {
      case 'happy':
        return happyAffirmations;
      case 'ok':
        return okAffirmations;
      case 'neutral':
        return neutralAffirmations;
      case 'down':
        return downAffirmations;
      case 'sad':
        return sadAffirmations;
      case 'overwhelmed':
        return overwhelmedAffirmations;
      default:
        return happyAffirmations;
    }
  };

  const getMoodTitle = () => {
    switch (selectedMood) {
      case 'happy':
        return translations.happyTitle;
      case 'ok':
        return translations.okTitle;
      case 'neutral':
        return translations.neutralTitle;
      case 'down':
        return translations.downTitle;
      case 'sad':
        return translations.sadTitle;
      case 'overwhelmed':
        return translations.overwhelmedTitle;
      default:
        return translations.happyTitle;
    }
  };

  const getMoodIcon = () => {
    switch (selectedMood) {
      case 'happy':
        return <Smile className="w-12 h-12 text-white" />;
      case 'ok':
        return <Brain className="w-12 h-12 text-white" />;
      case 'neutral':
        return <Meh className="w-12 h-12 text-white" />;
      case 'down':
        return <HeartCrack className="w-12 h-12 text-white" />;
      case 'sad':
        return <Frown className="w-12 h-12 text-white" />;
      case 'overwhelmed':
        return <Angry className="w-12 h-12 text-white" />;
      default:
        return <Smile className="w-12 h-12 text-white" />;
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const isAtBottom = target.scrollHeight - target.scrollTop <= target.clientHeight + 20;
    const isAtTop = target.scrollTop <= 20;
    
    setIsScrolledToBottom(isAtBottom);
    setIsScrolledToTop(isAtTop);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#16213e] text-white overflow-hidden flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 relative">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl w-full mx-auto bg-gradient-to-br from-[#21213f]/90 to-[#2a294f]/90 backdrop-blur-lg rounded-2xl overflow-hidden shadow-xl border border-white/10"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#B87333]/20 via-transparent to-[#B87333]/20 opacity-50"></div>
            <div className="px-6 py-6 flex flex-col items-center relative z-10">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#B87333] to-[#E5C5A1] p-1 flex items-center justify-center mb-5">
                <div className="w-full h-full rounded-full bg-[#21213f]/90 flex items-center justify-center">
                  {getMoodIcon()}
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-light mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#B87333] to-[#E5C5A1]">
                {getMoodTitle()}
              </h1>
            </div>
          </div>
          
          <div className="bg-black/20 backdrop-blur-md border-t border-white/10 p-6 relative">
            <ScrollArea 
              className="h-[280px] pr-4 overflow-auto" 
              onScroll={handleScroll}
              ref={affirmationScrollRef}
            >
              <div className="space-y-6">
                {getMoodAffirmations().map((affirmation, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.7 }}
                    className="bg-gradient-to-br from-[#21213f]/80 to-[#2a294f]/80 backdrop-blur-sm p-5 rounded-xl border border-[#B87333]/30"
                  >
                    <p className="text-lg text-white/95 leading-relaxed font-light">
                      <span className="text-[#E5C5A1]">"</span>
                      <span className="text-white">{affirmation}</span>
                      <span className="text-[#E5C5A1]">"</span>
                    </p>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
            
            {!isScrolledToBottom && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/40 backdrop-blur-sm rounded-full py-1 px-3 flex items-center gap-1 text-xs text-white/70 shadow-lg border border-white/10 animate-bounce">
                <ChevronDown className="h-3 w-3" />
                {translations.scrollDown}
              </div>
            )}
            
            {!isScrolledToTop && isScrolledToBottom && (
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/40 backdrop-blur-sm rounded-full py-1 px-3 flex items-center gap-1 text-xs text-white/70 shadow-lg border border-white/10 animate-bounce">
                <ChevronUp className="h-3 w-3" />
                {translations.scrollUp}
              </div>
            )}
          </div>
          
          <div className="bg-[#1a1a2e]/80 backdrop-blur-md border-t border-white/5 px-6 py-4 flex justify-between">
            <Button
              variant="outline"
              className="bg-white/5 hover:bg-white/10 border-white/10 text-white"
              onClick={onPrevious}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {translations.previous}
            </Button>
            
            <Button
              className="bg-gradient-to-r from-[#B87333] to-[#E5C5A1] hover:from-[#A56625] hover:to-[#D4B48F] text-white group"
              onClick={onContinue}
            >
              {translations.continue}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MoodResponse;
