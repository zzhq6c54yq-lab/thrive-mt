
import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { feedbackSchema } from "@/lib/validations";

const FeedbackForm: React.FC<{ userId: string }> = ({ userId }) => {
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validate input
    const validation = feedbackSchema.safeParse({
      message: message.trim(),
      rating,
    });

    if (!validation.success) {
      toast({ 
        title: "Validation Error", 
        description: validation.error.errors[0].message,
        variant: "destructive" 
      });
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("feedback").insert([{
      user_id: userId,
      message: validation.data.message,
      rating: validation.data.rating
    }]);

    if (error) {
      toast({ title: "Failed to submit feedback.", description: error.message, variant: "destructive" });
    } else {
      setMessage("");
      setRating(5);
      toast({ title: "Thank you for your feedback!" });
    }
    setLoading(false);
  };

  return (
    <form className="space-y-3" onSubmit={submit}>
      <Input
        placeholder="Your feedback"
        value={message}
        onChange={e => setMessage(e.target.value)}
        required
      />
      <Input
        placeholder="Rating (1-10)"
        type="number"
        min={1}
        max={10}
        value={rating}
        onChange={e => setRating(Number(e.target.value))}
      />
      <Button type="submit" className="w-full" disabled={loading}>
        Submit Feedback
      </Button>
    </form>
  );
};

export default FeedbackForm;
