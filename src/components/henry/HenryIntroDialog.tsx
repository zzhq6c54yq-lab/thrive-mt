
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Sparkles, ArrowRight, MessageCircle, HandHeart, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import useTranslation from "@/hooks/useTranslation";

interface HenryIntroDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onContinue: () => void;
}

const HenryIntroDialog: React.FC<HenryIntroDialogProps> = ({ open, onOpenChange, onContinue }) => {
  const { getTranslatedText } = useTranslation();

  const handleContinue = () => {
    onContinue();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white/5 backdrop-blur-md border border-[#B87333]/20 max-h-[85vh] overflow-hidden">
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4 text-white" />
          <span className="sr-only">{getTranslatedText('close')}</span>
        </DialogClose>
        
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-2">
            <Avatar className="h-24 w-24 border-4 border-[#B87333]/50">
              <AvatarImage src="/lovable-uploads/f3c84972-8f58-42d7-b86f-82ff2d823b30.png" alt="Henry" />
              <AvatarFallback className="bg-[#B87333]/20 text-[#B87333] text-2xl">
                H
              </AvatarFallback>
            </Avatar>
          </div>
          <DialogTitle className="text-2xl gradient-heading">{getTranslatedText('meetHenry')}</DialogTitle>
          <DialogDescription className="text-base text-white">
            {getTranslatedText('henryIntroSubtitle')}
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="pr-4 mt-4" style={{ maxHeight: 'calc(60vh - 100px)' }}>
          <div className="space-y-4 text-white">
            <p className="leading-relaxed">
              {getTranslatedText('henryGreeting')}
            </p>
            
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="font-medium text-lg text-[#B87333] mb-2">{getTranslatedText('aboutHenry')}:</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <HandHeart className="h-5 w-5 text-[#B87333]" />
                  <span><span className="font-bold text-[#B87333]">H</span>{getTranslatedText('henryH')}</span>
                </li>
                <li className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-[#B87333]" />
                  <span><span className="font-bold text-[#B87333]">E</span>{getTranslatedText('henryE')}</span>
                </li>
                <li className="flex items-center gap-2">
                  <HandHeart className="h-5 w-5 text-[#B87333]" />
                  <span><span className="font-bold text-[#B87333]">N</span>{getTranslatedText('henryN')}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-[#B87333]" />
                  <span><span className="font-bold text-[#B87333]">R</span>{getTranslatedText('henryR')}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-[#B87333]" />
                  <span><span className="font-bold text-[#B87333]">Y</span>{getTranslatedText('henryY')}</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-lg text-[#B87333] mb-2">{getTranslatedText('howHenryHelps')}:</h3>
              <p className="mb-3">
                {getTranslatedText('henryHelpsDescription')}
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>{getTranslatedText('henryHelp1')}</li>
                <li>{getTranslatedText('henryHelp2')}</li>
                <li>{getTranslatedText('henryHelp3')}</li>
                <li>{getTranslatedText('henryHelp4')}</li>
                <li>{getTranslatedText('henryHelp5')}</li>
              </ul>
            </div>
            
            <p className="italic border-l-2 border-[#B87333]/50 pl-3">
              {getTranslatedText('henryQuote')}
            </p>
          </div>
        </ScrollArea>
        
        <DialogFooter className="sm:justify-center mt-4">
          <Button 
            className="group hero-button bg-[#B87333] hover:bg-[#B87333]/80"
            onClick={handleContinue}
          >
            {getTranslatedText('chatWithHenry')}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default HenryIntroDialog;
