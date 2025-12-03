import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SafetyStrip() {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-red-500/10 border-t border-red-500/30 backdrop-blur-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-sm font-medium">
              Need urgent help?
            </p>
          </div>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => navigate('/app/crisis-support')}
            className="flex-shrink-0"
          >
            Crisis Resources
          </Button>
        </div>
      </div>
    </div>
  );
}
