
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface CoPayCreditPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CoPayCreditPopup = ({ open, onOpenChange }: CoPayCreditPopupProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="small" className="bg-white border-[#B87333]/20">
        <DialogHeader>
          <DialogTitle className="text-xl text-[#B87333]">New to Thrive MT</DialogTitle>
          <DialogDescription>
            <div className="mt-3">
              <ul className="space-y-3 text-left">
                <li className="flex items-start">
                  <span className="bg-[#B87333] h-2 w-2 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  <div>
                    <span className="font-medium">Co-pay Credits</span>
                    <p className="text-sm text-gray-600 mt-1">
                      10% of every co-pay comes back as Co-pay credits to use for future appointments, 
                      updating your subscription plan, or at thrive-apparel.com
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-[#B87333] h-2 w-2 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  <div>
                    <span className="font-medium">Meet Henry</span>
                    <p className="text-sm text-gray-600 mt-1">
                      Introducing Henry, our AI sponsor for N.A. or A.A. recovery support, available to guide you through your journey
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end mt-4">
          <Button 
            onClick={() => onOpenChange(false)}
            className="bg-[#B87333] hover:bg-[#B87333]/80"
          >
            Got it
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CoPayCreditPopup;
