import { Card } from "@/components/ui/card";
import { Users } from "lucide-react";

const CreateCircle = ({ userId }: { userId?: string }) => {
  return (
    <Card className="p-8 glass-card max-w-md mx-auto">
      <div className="text-center space-y-4">
        <Users className="w-16 h-16 mx-auto text-primary" />
        <h2 className="text-2xl font-bold gradient-heading">Start Your Support Circle</h2>
        <p className="text-muted-foreground">
          Your support circle is ready! Invite family members and caregivers below to keep them connected to your journey.
        </p>
      </div>
    </Card>
  );
};

export default CreateCircle;
