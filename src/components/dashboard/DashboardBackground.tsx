
import React from "react";

const DashboardBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a2e] via-[#242452] to-[#1a1a2e] text-gray-700 pt-6 pb-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Enhanced deep purple/blue texture and gradient background */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%239b87f5%22 fill-opacity=%220.15%22/></svg>')] opacity-60"></div>
        
        {/* Top purple gradient - enhanced glow */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#482880]/80 to-transparent"></div>
        
        {/* Bottom purple gradient - enhanced glow */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#482880]/80 to-transparent"></div>
        
        {/* Middle deep purple area - more vibrant */}
        <div className="absolute top-32 bottom-32 left-0 right-0 bg-gradient-to-b from-[#242452]/95 via-[#2a2a5a] to-[#242452]/95"></div>

        {/* Enhanced decorative elements */}
        <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-r from-[#8B5CF6]/40 via-[#7E69AB]/30 to-[#8B5CF6]/40 transform -skew-y-3"></div>
        <div className="absolute top-10 left-0 right-0 h-40 bg-gradient-to-r from-[#D6BCFA]/30 via-[#9b87f5]/35 to-[#D6BCFA]/30 transform skew-y-2 animate-pulse" style={{animationDuration: '8s'}}></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-r from-[#8B5CF6]/40 via-[#7E69AB]/30 to-[#8B5CF6]/40 transform -skew-y-2"></div>
        
        {/* Enhanced shimmer effects */}
        <div className="absolute top-1/4 right-1/3 w-[50%] h-[40%] rounded-full bg-gradient-to-br from-[#9b87f5]/15 to-transparent blur-3xl animate-pulse" style={{animationDuration: '10s'}}></div>
        <div className="absolute bottom-1/4 left-1/3 w-[50%] h-[40%] rounded-full bg-gradient-to-tr from-[#9b87f5]/15 to-transparent blur-3xl animate-pulse" style={{animationDuration: '12s'}}></div>
      </div>
      {children}
    </div>
  );
};

export default DashboardBackground;
