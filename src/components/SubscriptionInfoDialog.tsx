
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Crown } from 'lucide-react';

const SubscriptionInfoDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline"
          className="group bg-transparent border border-[#B87333] text-[#B87333] hover:bg-[#B87333]/10"
        >
          <Crown className="mr-2 h-5 w-5 text-[#B87333]" />
          View Subscription Options
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl">Subscription Tiers</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 mt-4">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-[#B87333]">Free</h3>
            <p className="text-gray-300">Basic access to mental wellness tools.</p>
            <div className="flex items-center text-sm text-gray-300">
              <span className="font-semibold mr-2">Co-Pay Credit:</span> 0%
            </div>
            <ul className="list-disc list-inside text-sm text-gray-300 space-y-1 mt-2">
              <li>Access to community forums</li>
              <li>Basic mental wellness tools</li>
              <li>Daily mood tracking</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-[#B87333]">Gold ($5/month)</h3>
            <p className="text-gray-300">Enhanced mental wellness features.</p>
            <div className="flex items-center text-sm text-gray-300">
              <span className="font-semibold mr-2">Co-Pay Credit:</span> 5%
            </div>
            <ul className="list-disc list-inside text-sm text-gray-300 space-y-1 mt-2">
              <li>All Free features</li>
              <li>Advanced mental wellness tools</li>
              <li>Enhanced AI companion capabilities</li>
              <li>Guided meditation library</li>
              <li>Priority community support</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-[#B87333]">Platinum ($10/month)</h3>
            <p className="text-gray-300">Premium mental wellness experience.</p>
            <div className="flex items-center text-sm text-gray-300">
              <span className="font-semibold mr-2">Co-Pay Credit:</span> 10%
            </div>
            <ul className="list-disc list-inside text-sm text-gray-300 space-y-1 mt-2">
              <li>All Gold features</li>
              <li>Premium mental wellness tools</li>
              <li>Advanced emotional intelligence training</li>
              <li>Personalized wellness plan</li>
              <li>24/7 crisis support</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionInfoDialog;
