
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, Mail, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RegistrationScreenProps {
  userInfo: {
    name: string;
    email: string;
    password: string;
  };
  onUserInfoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onPrevious: () => void;
  onSkip: () => void;
}

const RegistrationScreen: React.FC<RegistrationScreenProps> = ({
  userInfo,
  onUserInfoChange,
  onSubmit,
  onPrevious,
  onSkip,
}) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F9FA] animate-fade-in">
      <div className="max-w-md w-full mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Create Your Account</h2>
          <p className="text-gray-600">Join Thrive MT to start your mental wellness journey</p>
        </div>
        <form onSubmit={onSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input 
                type="text"
                id="name"
                name="name"
                value={userInfo.name}
                onChange={onUserInfoChange}
                className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-[#B87333] focus:border-[#B87333] outline-none"
                placeholder="John Doe"
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input 
                type="email"
                id="email"
                name="email"
                value={userInfo.email}
                onChange={onUserInfoChange}
                className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-[#B87333] focus:border-[#B87333] outline-none"
                placeholder="john@example.com"
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input 
                type="password"
                id="password"
                name="password"
                value={userInfo.password}
                onChange={onUserInfoChange}
                className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-[#B87333] focus:border-[#B87333] outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>
          <div className="pt-2">
            <Button 
              type="submit"
              className="w-full bg-[#B87333] hover:bg-[#B87333]/90"
            >
              Register
            </Button>
          </div>
        </form>
        <div className="flex justify-between mt-6">
          <Button 
            variant="outline"
            className="flex items-center gap-2"
            onClick={onPrevious}
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </Button>
          <Button 
            variant="outline"
            onClick={onSkip}
          >
            Continue Without Registration
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationScreen;
