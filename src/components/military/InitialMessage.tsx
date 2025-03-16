
import React from "react";

const InitialMessage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A1929]">
      <div className="fixed inset-0 flex items-center justify-center bg-[#0A1929] z-50">
        <div className="max-w-2xl mx-auto p-8 text-center">
          <div className="bg-gradient-to-r from-[#0A1929] via-[#1c2e4a] to-[#0A1929] p-10 rounded-lg border-2 border-[#B87333] shadow-lg">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
              <span className="text-[#B87333]">Your Service</span> Matters.<br />
              <span className="text-[#B87333]">Your Health</span> Matters Even More.
            </h1>
            
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              Behind every uniform is a person with unique experiences and challenges. 
              This space is dedicated to supporting your mental wellbeing with the same commitment 
              you've shown in your service to our nation.
            </p>
            
            <p className="text-lg text-gray-300 mb-4 italic">
              You are not alone on this journey.
            </p>
            
            <div className="mt-6 animate-pulse">
              <span className="text-[#B87333]">Loading your personalized resources...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InitialMessage;
