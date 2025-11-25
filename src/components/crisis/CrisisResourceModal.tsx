import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Phone, MessageSquare, AlertCircle, Heart } from 'lucide-react';

interface CrisisResourceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CrisisResourceModal: React.FC<CrisisResourceModalProps> = ({
  open,
  onOpenChange,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-gradient-to-br from-gray-900 to-gray-800 border-bronze-500/50">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-white flex items-center gap-3">
            <Heart className="w-8 h-8 text-red-500" />
            You're Not Alone
          </DialogTitle>
          <DialogDescription className="text-gray-300 text-lg">
            Help is available 24/7. You deserve support - you hold worth.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-6">
          {/* 988 Suicide & Crisis Lifeline */}
          <Card className="bg-gradient-to-r from-red-500/20 to-red-600/10 border-red-500/50 p-6 hover:shadow-lg transition-all">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-500/20 rounded-full">
                <Phone className="w-6 h-6 text-red-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">
                  988 Suicide & Crisis Lifeline
                </h3>
                <p className="text-gray-300 mb-3">
                  Call or text 988 for 24/7 confidential support
                </p>
                <Button 
                  className="bg-red-500 hover:bg-red-600 text-white"
                  onClick={() => window.location.href = 'tel:988'}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call 988 Now
                </Button>
              </div>
            </div>
          </Card>

          {/* Crisis Text Line */}
          <Card className="bg-gradient-to-r from-blue-500/20 to-blue-600/10 border-blue-500/50 p-6 hover:shadow-lg transition-all">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-500/20 rounded-full">
                <MessageSquare className="w-6 h-6 text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">
                  Crisis Text Line
                </h3>
                <p className="text-gray-300 mb-3">
                  Text HOME to 741741 to connect with a Crisis Counselor
                </p>
                <Button 
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                  onClick={() => window.location.href = 'sms:741741?body=HOME'}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Text HOME to 741741
                </Button>
              </div>
            </div>
          </Card>

          {/* Veterans Crisis Line */}
          <Card className="bg-gradient-to-r from-green-500/20 to-green-600/10 border-green-500/50 p-6 hover:shadow-lg transition-all">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-500/20 rounded-full">
                <AlertCircle className="w-6 h-6 text-green-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">
                  Veterans Crisis Line
                </h3>
                <p className="text-gray-300 mb-3">
                  Call 988, then press 1. Or text 838255
                </p>
                <Button 
                  className="bg-green-500 hover:bg-green-600 text-white"
                  onClick={() => window.location.href = 'tel:988'}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Veterans Line
                </Button>
              </div>
            </div>
          </Card>

          {/* Emergency */}
          <Card className="bg-gradient-to-r from-orange-500/20 to-orange-600/10 border-orange-500/50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">
                  Emergency?
                </h3>
                <p className="text-gray-300">
                  If you're in immediate danger, call 911
                </p>
              </div>
              <Button 
                className="bg-orange-500 hover:bg-orange-600 text-white"
                onClick={() => window.location.href = 'tel:911'}
              >
                <Phone className="w-4 h-4 mr-2" />
                Call 911
              </Button>
            </div>
          </Card>

          <div className="mt-6 p-4 bg-bronze-500/10 rounded-lg border border-bronze-500/30">
            <p className="text-gray-300 text-center leading-relaxed">
              Your life matters. These feelings are temporary. You deserve support and there are people who want to help - because you hold worth.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};