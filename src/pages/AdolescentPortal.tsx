
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import ThriveButton from "@/components/navigation/ThriveButton";
import PortalBackButton from "@/components/navigation/PortalBackButton";

// Early Childhood Portal (Ages 2-7)
const EarlyChildhoodPortal: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#ff85a2] via-[#ffa9c6] to-[#ffd6e6] py-8 px-4 relative overflow-hidden">
      {/* Fun background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Clouds */}
        <div className="absolute top-[10%] left-[5%] w-24 h-12 bg-white rounded-full"></div>
        <div className="absolute top-[10%] left-[10%] w-36 h-16 bg-white rounded-full"></div>
        <div className="absolute top-[12%] left-[7%] w-28 h-14 bg-white rounded-full"></div>
        
        <div className="absolute top-[15%] right-[15%] w-32 h-14 bg-white rounded-full"></div>
        <div className="absolute top-[15%] right-[20%] w-20 h-12 bg-white rounded-full"></div>
        
        {/* Animated characters */}
        <div className="absolute bottom-10 left-10 text-6xl animate-bounce">🦄</div>
        <div className="absolute bottom-20 right-20 text-5xl animate-[bounce_3s_infinite]">🌈</div>
        <div className="absolute top-[30%] left-[20%] text-4xl animate-[bounce_5s_infinite]">🎈</div>
        <div className="absolute top-[40%] right-[25%] text-4xl animate-[bounce_4s_infinite]">🎁</div>
      </div>
      
      {/* Navigation buttons */}
      <div className="absolute top-4 left-4 z-20">
        <PortalBackButton returnPath="/adolescent-selection" />
      </div>
      <div className="absolute top-4 right-4 z-20">
        <ThriveButton size="sm" />
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="text-6xl mb-2">🧸</div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-purple-800">
            Feelings & Friends
          </h1>
          <p className="text-xl text-purple-700 max-w-lg mx-auto">
            A special place for young ones to learn about feelings and make new friends!
          </p>
        </div>
        
        {/* Main content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Story time card */}
          <div className="bg-yellow-100 border-4 border-yellow-400 rounded-3xl p-6 shadow-lg transform transition-transform hover:scale-105">
            <div className="flex justify-center mb-4">
              <div className="text-5xl">📚</div>
            </div>
            <h3 className="text-2xl font-bold text-center text-yellow-800 mb-2">Story Time</h3>
            <p className="text-yellow-700 mb-4 text-center">
              Listen to fun stories about feelings and adventures!
            </p>
            <Button 
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-xl border-2 border-yellow-600 text-lg py-6 h-auto"
            >
              Read Stories
            </Button>
          </div>
          
          {/* Feeling games card */}
          <div className="bg-blue-100 border-4 border-blue-400 rounded-3xl p-6 shadow-lg transform transition-transform hover:scale-105">
            <div className="flex justify-center mb-4">
              <div className="text-5xl">🎮</div>
            </div>
            <h3 className="text-2xl font-bold text-center text-blue-800 mb-2">Feeling Games</h3>
            <p className="text-blue-700 mb-4 text-center">
              Play games to learn about different feelings!
            </p>
            <Button 
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl border-2 border-blue-600 text-lg py-6 h-auto"
            >
              Play Now
            </Button>
          </div>
          
          {/* Coloring fun card */}
          <div className="bg-green-100 border-4 border-green-400 rounded-3xl p-6 shadow-lg transform transition-transform hover:scale-105">
            <div className="flex justify-center mb-4">
              <div className="text-5xl">🎨</div>
            </div>
            <h3 className="text-2xl font-bold text-center text-green-800 mb-2">Coloring Fun</h3>
            <p className="text-green-700 mb-4 text-center">
              Color pictures to show how you feel today!
            </p>
            <Button 
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl border-2 border-green-600 text-lg py-6 h-auto"
            >
              Start Coloring
            </Button>
          </div>
          
          {/* Calm corner card */}
          <div className="bg-purple-100 border-4 border-purple-400 rounded-3xl p-6 shadow-lg transform transition-transform hover:scale-105">
            <div className="flex justify-center mb-4">
              <div className="text-5xl">🧘‍♀️</div>
            </div>
            <h3 className="text-2xl font-bold text-center text-purple-800 mb-2">Calm Corner</h3>
            <p className="text-purple-700 mb-4 text-center">
              Quiet activities to help when you feel big feelings!
            </p>
            <Button 
              className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-xl border-2 border-purple-600 text-lg py-6 h-auto"
            >
              Feel Calm
            </Button>
          </div>
          
          {/* Family fun card */}
          <div className="bg-orange-100 border-4 border-orange-400 rounded-3xl p-6 shadow-lg transform transition-transform hover:scale-105">
            <div className="flex justify-center mb-4">
              <div className="text-5xl">👨‍👩‍👧‍👦</div>
            </div>
            <h3 className="text-2xl font-bold text-center text-orange-800 mb-2">Family Fun</h3>
            <p className="text-orange-700 mb-4 text-center">
              Activities to do with your family!
            </p>
            <Button 
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl border-2 border-orange-600 text-lg py-6 h-auto"
            >
              Play Together
            </Button>
          </div>
          
          {/* Parent zone card */}
          <div className="bg-teal-100 border-4 border-teal-400 rounded-3xl p-6 shadow-lg transform transition-transform hover:scale-105">
            <div className="flex justify-center mb-4">
              <div className="text-5xl">🤗</div>
            </div>
            <h3 className="text-2xl font-bold text-center text-teal-800 mb-2">Parent Zone</h3>
            <p className="text-teal-700 mb-4 text-center">
              Resources for grown-ups to help little ones!
            </p>
            <Button 
              className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-xl border-2 border-teal-600 text-lg py-6 h-auto"
            >
              For Parents
            </Button>
          </div>
        </div>
        
        {/* Help button for kids */}
        <div className="mt-12 flex justify-center">
          <Button className="bg-red-400 hover:bg-red-500 text-white rounded-full px-8 py-6 h-auto text-xl font-bold border-4 border-red-500 shadow-lg">
            <div className="text-2xl mr-2">🆘</div> Need Help?
          </Button>
        </div>
      </div>
    </div>
  );
};

// Middle Childhood Portal (Ages 8-13)
const MiddleChildhoodPortal: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#9333ea] via-[#a855f7] to-[#c084fc] text-white py-8 px-4">
      {/* Navigation buttons */}
      <div className="absolute top-4 left-4 z-20">
        <PortalBackButton returnPath="/adolescent-selection" />
      </div>
      <div className="absolute top-4 right-4 z-20">
        <ThriveButton size="sm" />
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Growing Up Strong
            </h1>
            <p className="text-lg text-purple-100">
              Cool resources for school-age explorers!
            </p>
          </div>
          <div className="text-4xl mt-4 md:mt-0">🌟 🚀 🛸</div>
        </div>
        
        {/* Content grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Game card */}
          <div className="bg-indigo-900/40 backdrop-blur-md border border-indigo-300/30 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold">Adventure Games</h3>
              <span className="text-3xl">🎮</span>
            </div>
            <p className="text-purple-100 mb-6">
              Exciting games that teach important life skills while having fun!
            </p>
            <Button className="w-full bg-indigo-500 hover:bg-indigo-600">
              Play Games
            </Button>
          </div>
          
          {/* Challenges card */}
          <div className="bg-indigo-900/40 backdrop-blur-md border border-indigo-300/30 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold">Brain Challenges</h3>
              <span className="text-3xl">🧠</span>
            </div>
            <p className="text-purple-100 mb-6">
              Test your problem-solving skills with fun puzzles and quests!
            </p>
            <Button className="w-full bg-indigo-500 hover:bg-indigo-600">
              Start Challenge
            </Button>
          </div>
          
          {/* Friendship card */}
          <div className="bg-indigo-900/40 backdrop-blur-md border border-indigo-300/30 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold">Friendship Zone</h3>
              <span className="text-3xl">👥</span>
            </div>
            <p className="text-purple-100 mb-6">
              Learn about making and keeping friends, solving conflicts, and teamwork!
            </p>
            <Button className="w-full bg-indigo-500 hover:bg-indigo-600">
              Explore
            </Button>
          </div>
          
          {/* Achievement badges card */}
          <div className="bg-indigo-900/40 backdrop-blur-md border border-indigo-300/30 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold">Achievement Badges</h3>
              <span className="text-3xl">🏆</span>
            </div>
            <p className="text-purple-100 mb-6">
              Collect badges as you complete activities and learn new skills!
            </p>
            <Button className="w-full bg-indigo-500 hover:bg-indigo-600">
              See Badges
            </Button>
          </div>
          
          {/* Parent resources card */}
          <div className="bg-indigo-900/40 backdrop-blur-md border border-indigo-300/30 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold">Parent Resources</h3>
              <span className="text-3xl">📋</span>
            </div>
            <p className="text-purple-100 mb-6">
              Helpful information for parents to support kids during this important stage!
            </p>
            <Button className="w-full bg-indigo-500 hover:bg-indigo-600">
              For Parents
            </Button>
          </div>
          
          {/* Help & support card */}
          <div className="bg-indigo-900/40 backdrop-blur-md border border-indigo-300/30 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold">Help & Support</h3>
              <span className="text-3xl">🆘</span>
            </div>
            <p className="text-purple-100 mb-6">
              Need someone to talk to? Find resources and support here!
            </p>
            <Button className="w-full bg-indigo-500 hover:bg-indigo-600">
              Get Help
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Teen Portal (Ages 14+)
const TeenPortal: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#3b82f6] via-[#6366f1] to-[#8b5cf6] text-white py-8 px-4">
      {/* Navigation buttons */}
      <div className="absolute top-4 left-4 z-20">
        <PortalBackButton returnPath="/adolescent-selection" />
      </div>
      <div className="absolute top-4 right-4 z-20">
        <ThriveButton size="sm" />
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Your Space, Your Journey
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl">
            Tools and resources designed specifically for teens navigating the challenges and opportunities of adolescence.
          </p>
        </div>
        
        {/* Featured content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          <div className="lg:col-span-2 bg-blue-900/30 backdrop-blur-md border border-blue-300/30 rounded-xl overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">Identity & Self-Discovery</h2>
              <p className="mb-4">
                Explore who you are, what matters to you, and where you want to go in life with our interactive tools and resources.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Start Your Journey
              </Button>
            </div>
          </div>
          
          <div className="bg-blue-900/30 backdrop-blur-md border border-blue-300/30 rounded-xl p-6">
            <h3 className="text-xl font-bold flex items-center mb-4">
              <span className="text-2xl mr-2">🎧</span> Stress Relief
            </h3>
            <p className="mb-4">
              Quick tools and techniques to manage stress, anxiety, and overwhelming emotions.
            </p>
            <Button variant="outline" className="w-full border-blue-400 text-blue-100 hover:bg-blue-800/50">
              Feel Better Now
            </Button>
          </div>
        </div>
        
        {/* Main content grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Mental fitness card */}
          <div className="bg-blue-900/30 backdrop-blur-md border border-blue-300/30 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">Mental Fitness</h3>
            <p className="text-blue-100 mb-6">
              Exercises and challenges to build resilience, mindfulness, and emotional intelligence.
            </p>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Train Your Mind
            </Button>
          </div>
          
          {/* Relationships card */}
          <div className="bg-blue-900/30 backdrop-blur-md border border-blue-300/30 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">Relationships</h3>
            <p className="text-blue-100 mb-6">
              Navigate friendships, family dynamics, romance, and setting healthy boundaries.
            </p>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Learn More
            </Button>
          </div>
          
          {/* Future planning card */}
          <div className="bg-blue-900/30 backdrop-blur-md border border-blue-300/30 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">Future Planning</h3>
            <p className="text-blue-100 mb-6">
              Tools to explore career options, educational paths, and life after high school.
            </p>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Plan Ahead
            </Button>
          </div>
          
          {/* Safe space card */}
          <div className="bg-blue-900/30 backdrop-blur-md border border-blue-300/30 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">Safe Space</h3>
            <p className="text-blue-100 mb-6">
              A confidential area to express yourself and connect with peers who understand.
            </p>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Enter Safe Space
            </Button>
          </div>
          
          {/* Resources card */}
          <div className="bg-blue-900/30 backdrop-blur-md border border-blue-300/30 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">Resources</h3>
            <p className="text-blue-100 mb-6">
              Articles, videos, and guides on topics that matter to teens.
            </p>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Browse Resources
            </Button>
          </div>
          
          {/* Help & support card */}
          <div className="bg-blue-900/30 backdrop-blur-md border border-blue-300/30 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">Get Support</h3>
            <p className="text-blue-100 mb-6">
              Connect with trained counselors and support services when you need help.
            </p>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Find Support
            </Button>
          </div>
        </div>
        
        {/* Crisis support */}
        <div className="mt-12 bg-red-500/20 border border-red-300/40 p-4 rounded-lg flex items-center justify-between">
          <div>
            <h3 className="font-bold">Need immediate help?</h3>
            <p className="text-sm">If you're in crisis, help is available 24/7</p>
          </div>
          <Button className="bg-white text-red-600 hover:bg-red-100">
            Crisis Support
          </Button>
        </div>
      </div>
    </div>
  );
};

// Main component that determines which portal to display based on selected age group
const AdolescentPortal: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [ageGroup, setAgeGroup] = useState<string>('adolescence'); // Default to teen portal
  
  useEffect(() => {
    // Set the age group based on location state if available
    if (location.state?.ageGroup) {
      setAgeGroup(location.state.ageGroup);
    }
  }, [location.state]);
  
  // Render appropriate portal based on age group
  if (ageGroup === 'early-childhood') {
    return <EarlyChildhoodPortal />;
  } else if (ageGroup === 'middle-childhood') {
    return <MiddleChildhoodPortal />;
  } else {
    // Default to teen portal
    return <TeenPortal />;
  }
};

export default AdolescentPortal;
