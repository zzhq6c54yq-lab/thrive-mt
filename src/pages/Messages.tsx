import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TherapistConversation from '@/components/client/TherapistConversation';

export default function Messages() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#1a1510] to-gray-900">
      <div className="container mx-auto max-w-5xl px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/dashboard')}
          className="mb-6 text-gray-400 hover:text-white"
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back to Dashboard
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-3 drop-shadow-[0_2px_10px_rgba(212,175,55,0.3)]">
            Therapist Messages
          </h1>
          <p className="text-gray-300 text-lg">Stay connected with your care team</p>
        </div>

        <TherapistConversation />
      </div>
    </div>
  );
}
