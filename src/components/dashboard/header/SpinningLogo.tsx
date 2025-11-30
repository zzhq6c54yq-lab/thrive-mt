
import React from "react";
import { THRIVE_LOGO } from "@/constants/branding";

const SpinningLogo = () => {
  return (
    <div className="relative group">
      <div className="absolute inset-[-35px] rounded-full bg-gradient-to-r from-[#B87333]/80 to-[#E5C5A1]/80 blur-xl animate-pulse" style={{animationDuration: '3s'}}></div>
      <div className="absolute inset-[-45px] rounded-full border-2 border-[#B87333]/60 animate-spin" style={{animationDuration: '15s'}}></div>
      <div className="absolute inset-[-25px] rounded-full border border-[#E5C5A1]/70 animate-spin" style={{animationDuration: '10s', animationDirection: 'reverse'}}></div>
      <div className="absolute inset-[-20px] rounded-full bg-gradient-to-br from-[#B87333]/90 to-[#E5C5A1]/60 blur-sm animate-pulse" style={{animationDuration: '4s'}}></div>
      
      <div className="absolute top-[-10px] left-[35px] w-4 h-4 bg-white rounded-full animate-ping" style={{animationDuration: '1.8s', animationDelay: '0.5s'}}></div>
      <div className="absolute bottom-[-2px] right-[45px] w-3.5 h-3.5 bg-white rounded-full animate-ping" style={{animationDuration: '1.5s', animationDelay: '1s'}}></div>
      <div className="absolute top-[45px] right-[-15px] w-4 h-4 bg-white rounded-full animate-ping" style={{animationDuration: '2.1s'}}></div>
      <div className="absolute bottom-[40px] left-[-5px] w-3 h-3 bg-white rounded-full animate-ping" style={{animationDuration: '2.4s', animationDelay: '0.7s'}}></div>
      
      <img 
        src={THRIVE_LOGO} 
        alt="ThriveMT Logo"
        className="relative h-[112px] w-[112px] object-contain filter drop-shadow-[0_0_35px_rgba(184,115,51,1)] transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_45px_rgba(184,115,51,1)]"
      />
      
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#B87333]/40 via-transparent to-[#B87333]/40 animate-pulse" style={{animationDuration: '5s'}}></div>
      
      <div className="absolute inset-[-10px] border-4 border-[#B87333]/30 rounded-full animate-ping" style={{animationDuration: '3.5s'}}></div>
      <div className="absolute inset-[-25px] border-2 border-[#E5C5A1]/30 rounded-full animate-ping" style={{animationDuration: '4.5s', animationDelay: '0.5s'}}></div>
    </div>
  );
};

export default SpinningLogo;
