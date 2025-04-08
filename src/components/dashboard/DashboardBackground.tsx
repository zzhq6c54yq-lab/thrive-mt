
import React from "react";

const DashboardBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a0d29] via-[#221530] to-[#2d1a46] text-white pt-6 pb-20 px-0 relative overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Deep purple texture and gradient background */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23a78bfa%22 fill-opacity=%220.03%22/></svg>')] opacity-30"></div>
        <div className="absolute top-[-20%] right-[-10%] w-[80%] h-[80%] rounded-full bg-gradient-to-br from-[#8b5cf6]/10 to-transparent blur-3xl"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[80%] h-[80%] rounded-full bg-gradient-to-tr from-[#7c3aed]/10 to-transparent blur-3xl"></div>
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-[#8b5cf6]/5 via-[#7c3aed]/8 to-[#8b5cf6]/5 transform -skew-y-3"></div>
        <div className="absolute top-10 left-0 right-0 h-32 bg-gradient-to-r from-[#a78bfa]/5 via-[#8b5cf6]/8 to-[#a78bfa]/5 transform skew-y-2" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-r from-[#8b5cf6]/5 via-[#7c3aed]/8 to-[#8b5cf6]/5 transform -skew-y-2"></div>
      </div>
      {children}
    </div>
  );
};

export default DashboardBackground;
