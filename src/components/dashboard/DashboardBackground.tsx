
import React from "react";

const DashboardBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Extended array of affirmations to display in the background pattern
  const affirmations = [
    { text: "I AM ENOUGH", highlight: "ENOUGH" },
    { text: "I AM WORTHY", highlight: "WORTHY" },
    { text: "I'M ALLOWED TO HEAL", highlight: "HEAL" },
    { text: "LOVE MYSELF", highlight: "LOVE" },
    { text: "I MATTER", highlight: "" },
    { text: "I'M WORTH IT", highlight: "" },
    { text: "FORGIVE MYSELF", highlight: "FORGIVE" },
    { text: "BE THE LOVE", highlight: "LOVE" },
    { text: "NEVER GIVE UP", highlight: "NEVER" },
    { text: "BE MY BEST ME", highlight: "" }
  ];
  
  // Font styles to alternate between
  const fontStyles = ["font-serif italic", "font-sans"];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0a071a] to-[#0d0915] text-white pt-6 pb-20 px-0 relative overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Affirmations pattern background - diagonal repeated pattern with rotating styles */}
        <div className="absolute inset-0">
          {affirmations.map((affirmation, index) => {
            // Parse the affirmation text to highlight specific words
            const words = affirmation.text.split(' ');
            const highlightedText = words.map(word => {
              // Check if this word contains any of our highlight keywords
              if (word.includes("FORGIVE") || 
                  word.includes("LOVE") || 
                  word.includes("HEAL")) {
                return `<span class="text-[#E5C5A1]/80">${word}</span>`; // Increased opacity from 70 to 80
              }
              return word;
            }).join(' ');
            
            // Create many more copies of each affirmation to cover the entire background
            return Array.from({ length: 25 }).map((_, copyIndex) => (
              <div 
                key={`${index}-${copyIndex}`}
                className={`absolute text-white/20 whitespace-nowrap ${fontStyles[copyIndex % fontStyles.length]}`} // Increased opacity from 15 to 20
                style={{
                  top: `${(Math.random() * 130) - 15}%`,
                  left: `${(Math.random() * 130) - 15}%`,
                  transform: `rotate(${(Math.random() * 360)}deg)`,
                  fontSize: `${Math.max(0.6, Math.random() * 0.9)}rem`,
                  opacity: Math.max(0.1, Math.random() * 0.22) // Increased min opacity from 0.07 to 0.1 and max from 0.18 to 0.22
                }}
                dangerouslySetInnerHTML={{ __html: highlightedText }}
              />
            ));
          })}
        </div>

        {/* Enhanced deep texture with significantly more prominent silver, gold and white accents */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23ffffff%22 fill-opacity=%220.09%22/></svg>')] opacity-50"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22><circle cx=%225%22 cy=%225%22 r=%221.5%22 fill=%22%23c0c0c0%22 fill-opacity=%220.08%22/></svg>')] opacity-40"></div>
        
        {/* Enhanced glowing platinum and gold elements */}
        <div className="absolute top-[-15%] right-[-10%] w-[90%] h-[90%] rounded-full bg-gradient-to-br from-[#ffffff]/25 via-[#c0c0c0]/25 to-transparent blur-3xl"></div>
        <div className="absolute bottom-[-15%] left-[-10%] w-[90%] h-[90%] rounded-full bg-gradient-to-tr from-[#E5C5A1]/25 via-[#B87333]/20 to-transparent blur-3xl"></div>
        <div className="absolute top-[30%] left-[-5%] w-[60%] h-[60%] rounded-full bg-gradient-to-tr from-[#ffffff]/20 via-[#c0c0c0]/15 to-transparent blur-3xl"></div>
        
        {/* Brighter gold-silver-white gradient bands with improved flow */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-[#B87333]/20 via-[#ffffff]/25 to-[#c0c0c0]/20 transform -skew-y-6 rotate-3 animate-pulse" style={{animationDuration: '12s'}}></div>
        <div className="absolute top-10 left-0 right-0 h-40 bg-gradient-to-r from-[#c0c0c0]/20 via-[#E5C5A1]/20 to-[#ffffff]/20 transform skew-y-4 -rotate-2 animate-pulse" style={{animationDuration: '15s', animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-r from-[#ffffff]/20 via-[#B87333]/20 to-[#c0c0c0]/20 transform -skew-y-5 rotate-1 animate-pulse" style={{animationDuration: '18s'}}></div>
        
        {/* Additional silver and platinum highlights */}
        <div className="absolute h-full w-full opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#ffffff]/25 via-[#c0c0c0]/25 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#ffffff]/15 to-transparent opacity-35"></div>
        
        {/* Enhanced particle-like elements with brighter white, silver, and gold */}
        <div className="absolute inset-0">
          {[...Array(40)].map((_, i) => (
            <div 
              key={i} 
              className={`absolute rounded-full ${i % 3 === 0 ? 'bg-[#E5C5A1]/30' : i % 3 === 1 ? 'bg-[#c0c0c0]/35' : 'bg-[#ffffff]/30'} animate-pulse`}
              style={{
                width: `${Math.random() * 14 + 5}px`,
                height: `${Math.random() * 14 + 5}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 5 + 2}s`,
                animationDelay: `${Math.random() * 5}s`,
                filter: 'blur(1px)',
                transform: `rotate(${Math.random() * 360}deg)`
              }}
            ></div>
          ))}
        </div>
        
        {/* More elegant diagonal accents with silver and gold */}
        <div className="absolute top-1/4 w-full h-[1.5px] bg-gradient-to-r from-transparent via-[#c0c0c0]/50 to-transparent transform rotate-[30deg]"></div>
        <div className="absolute bottom-1/3 w-full h-[1.5px] bg-gradient-to-r from-transparent via-[#ffffff]/45 to-transparent transform -rotate-[25deg]"></div>
        <div className="absolute top-2/3 w-full h-[1.5px] bg-gradient-to-r from-transparent via-[#E5C5A1]/45 to-transparent transform rotate-[20deg]"></div>
        <div className="absolute top-1/2 w-full h-[1.5px] bg-gradient-to-r from-transparent via-[#B87333]/40 to-transparent transform -rotate-[15deg]"></div>

        {/* Additional floating lights */}
        <div className="absolute top-[20%] left-[30%] w-2 h-2 bg-[#ffffff]/70 rounded-full blur-md animate-pulse" style={{animationDuration: '4s'}}></div>
        <div className="absolute top-[70%] left-[70%] w-3 h-3 bg-[#E5C5A1]/60 rounded-full blur-md animate-pulse" style={{animationDuration: '6s'}}></div>
        <div className="absolute top-[40%] left-[80%] w-2 h-2 bg-[#c0c0c0]/60 rounded-full blur-md animate-pulse" style={{animationDuration: '5s'}}></div>
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default DashboardBackground;
