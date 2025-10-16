import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Heart, Sparkles } from 'lucide-react';

const HenryBio: React.FC = () => {
  return (
    <Card className="p-8 bg-gradient-to-br from-amber-100 via-white to-orange-100 dark:from-gray-800 dark:to-amber-900/20">
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <div className="flex-shrink-0">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-xl">
            <Heart className="w-16 h-16 text-white fill-white" />
          </div>
        </div>

        <div className="flex-1 text-center md:text-left">
          <h3 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2 justify-center md:justify-start">
            Meet Henry
            <Sparkles className="w-6 h-6 text-amber-600" />
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Henry is your compassionate mental health columnist with years of experience in 
            psychology and a heart for helping others find peace and clarity. Through "Dear Henry," 
            he provides thoughtful, trauma-informed guidance to help you navigate life's challenges 
            with hope and resilience.
          </p>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-amber-600 text-amber-700 hover:bg-amber-50 dark:border-amber-500 dark:text-amber-400 dark:hover:bg-amber-950/30">
                Learn More About Henry
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 dark:from-amber-950/20 dark:via-orange-950/20 dark:to-amber-950/20 -mx-6 -mt-6 px-6 pt-6 pb-4 rounded-t-lg">
                <DialogTitle className="text-4xl lg:text-5xl font-playfair font-bold text-amber-900 dark:text-amber-100 flex items-center gap-3">
                  About Henry
                  <Heart className="w-10 h-10 lg:w-12 lg:h-12 text-amber-600 dark:text-amber-500 fill-amber-600 dark:fill-amber-500 animate-pulse" />
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6 lg:space-y-8 py-6 lg:py-8">
                <p className="text-lg lg:text-xl leading-relaxed text-gray-800 dark:text-gray-200">
                  Henry represents <span className="font-semibold text-amber-700 dark:text-amber-400">Hope, Empathy, Nurturing, Resilience, and You</span> - the five pillars 
                  that guide every response in this column.
                </p>
                
                <div className="h-px bg-gradient-to-r from-transparent via-amber-300 dark:via-amber-700 to-transparent"></div>
                
                <p className="text-lg lg:text-xl leading-relaxed text-gray-800 dark:text-gray-200">
                  Drawing from evidence-based practices and trauma-informed care, Henry provides 
                  a safe space for anyone seeking guidance on mental health, relationships, 
                  personal growth, and life's challenges.
                </p>
                
                <p className="text-lg lg:text-xl leading-relaxed text-gray-800 dark:text-gray-200">
                  Every question submitted is treated with respect, compassion, and confidentiality. 
                  While Henry offers supportive guidance, remember that this column is not a 
                  substitute for professional therapy or medical advice.
                </p>
                
                <div className="pt-6 border-t-2 border-amber-200 dark:border-amber-800 mt-8">
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 p-6 rounded-lg border-l-4 border-amber-500">
                    <p className="text-base lg:text-lg text-gray-700 dark:text-gray-300 italic font-medium font-playfair">
                      "Your mental wellbeing matters. You deserve support, understanding, and hope." 
                      <span className="block mt-2 text-amber-700 dark:text-amber-400 not-italic font-semibold">
                        - Henry
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </Card>
  );
};

export default HenryBio;
