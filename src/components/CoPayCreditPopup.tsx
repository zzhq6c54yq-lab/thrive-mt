
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BadgePercent, Wallet, GiftIcon, ShoppingBag } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";

interface CoPayCreditPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CoPayCreditPopup = ({ open, onOpenChange }: CoPayCreditPopupProps) => {
  const isMobile = useIsMobile();
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="bg-gradient-to-b from-white to-amber-50 border border-[#B87333]/30 shadow-xl max-w-md max-h-[90vh]"
        size={isMobile ? "small" : "default"}
      >
        <DialogHeader className="mb-2">
          <DialogTitle className="text-xl md:text-2xl font-bold text-[#B87333] flex items-center gap-2">
            <BadgePercent className="h-5 w-5 md:h-6 md:w-6" />
            New to Thrive MT
          </DialogTitle>
          <DialogDescription>
            <p className="text-sm md:text-base text-gray-700 mt-1">Discover our rewards system designed to support your mental health journey</p>
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="pr-4 max-h-[50vh]">
          <div className="space-y-4">
            <div className="flex items-start gap-3 bg-amber-50/80 p-3 rounded-lg border border-amber-100">
              <div className="bg-[#B87333] p-2 rounded-full flex-shrink-0">
                <Wallet className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm md:text-base">Co-pay Credits</h3>
                <p className="text-gray-600 text-xs md:text-sm mt-1">
                  10% of every co-pay comes back as Co-pay credits (in dollar value) to use for future appointments, 
                  updating your subscription plan, or redeeming at thrive-apparel.com
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 bg-amber-50/80 p-3 rounded-lg border border-amber-100">
              <div className="bg-[#B87333] p-2 rounded-full flex-shrink-0">
                <GiftIcon className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm md:text-base">Meet Henry</h3>
                <p className="text-gray-600 text-xs md:text-sm mt-1">
                  Introducing Henry, our AI sponsor for N.A. or A.A. recovery support, available to guide you through your journey
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 bg-amber-50/80 p-3 rounded-lg border border-amber-100">
              <div className="bg-[#B87333] p-2 rounded-full flex-shrink-0">
                <ShoppingBag className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm md:text-base">Thrive Apparel</h3>
                <p className="text-gray-600 text-xs md:text-sm mt-1">
                  Use your earned co-pay credits at thrive-apparel.com for exclusive mental wellness merchandise and apparel
                </p>
                <a href="https://thrive-apparel.com" target="_blank" rel="noopener noreferrer">
                  <Button variant="gold-outline" size="sm" className="mt-2 text-xs">
                    Shop Now
                  </Button>
                </a>
              </div>
            </div>
            
            <div className="flex items-start gap-3 bg-amber-50/80 p-3 rounded-lg border border-amber-100">
              <div className="bg-[#B87333] p-2 rounded-full flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M12 6v12"></path>
                  <path d="M6 12h12"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm md:text-base">Barter System</h3>
                <p className="text-gray-600 text-xs md:text-sm mt-1">
                  Can't afford therapy? Pay what you can and balance the rest through community service
                </p>
              </div>
            </div>
          </div>
        </ScrollArea>
        
        <div className="flex justify-end mt-4">
          <Button 
            onClick={() => onOpenChange(false)}
            variant="gold"
            size={isMobile ? "sm" : "default"}
            className="font-medium px-4 py-1 text-black text-xs md:text-sm md:px-6 md:py-2"
          >
            Got It
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CoPayCreditPopup;
