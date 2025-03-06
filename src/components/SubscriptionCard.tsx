
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SubscriptionFeature {
  text: string;
}

interface SubscriptionCardProps {
  title: string;
  price: string;
  features: SubscriptionFeature[];
  recommended?: boolean;
  buttonVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "copper" | "outline_copper" | "bronze" | "animated_bronze" | "animated_copper" | "neutral";
  buttonText?: string;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  title,
  price,
  features,
  recommended = false,
  buttonVariant = "outline_copper",
  buttonText = "Upgrade Now"
}) => {
  const { toast } = useToast();

  const handleUpgrade = () => {
    toast({
      title: `${title} Subscription`,
      description: "This feature will be available soon. We're working on our subscription services.",
    });
  };

  return (
    <Card className={`flex flex-col h-full ${
      recommended ? 'border-[#B87333] shadow-lg relative' : 'border-[#3a3a40]'
    } bg-[#2a2a30]`}>
      {recommended && (
        <div className="absolute -top-3 left-0 right-0 flex justify-center">
          <span className="bg-[#B87333] text-white text-xs px-3 py-1 rounded-full">
            Recommended
          </span>
        </div>
      )}
      
      <CardHeader>
        <CardTitle className="text-center text-xl text-white">
          {title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <div className="text-center mb-6">
          <span className="text-3xl font-bold text-white">{price}</span>
          <span className="text-gray-400 ml-1">/month</span>
        </div>
        
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="min-w-4 h-4 text-[#B87333] mt-1" />
              <span className="text-sm text-gray-300">{feature.text}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      
      <CardFooter>
        <Button 
          variant={buttonVariant} 
          className="w-full"
          onClick={handleUpgrade}
        >
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SubscriptionCard;
