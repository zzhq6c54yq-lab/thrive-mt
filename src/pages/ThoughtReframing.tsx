import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Lightbulb, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const ThoughtReframing = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [negativeThought, setNegativeThought] = useState("");
  const [evidence, setEvidence] = useState("");
  const [alternative, setAlternative] = useState("");

  const handleComplete = () => {
    toast({
      title: "Great work! 🎉",
      description: "You've completed a thought reframing exercise. Keep practicing!",
    });
    setStep(1);
    setNegativeThought("");
    setEvidence("");
    setAlternative("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate("/app/mental-wellness-tools")}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Wellness Tools
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Thought Reframing
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Transform negative thoughts into balanced, realistic perspectives using CBT techniques
            </p>
          </div>

          <Card className="p-8 bg-card/50 backdrop-blur-sm border-2">
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-6">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                        s <= step
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {s < step ? <Check className="h-5 w-5" /> : s}
                    </div>
                    {s < 3 && (
                      <div
                        className={`w-24 h-1 mx-2 ${
                          s < step ? "bg-primary" : "bg-muted"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <div className="flex items-start gap-3">
                    <Lightbulb className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        Step 1: Identify the Negative Thought
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Write down a negative or unhelpful thought you've been having
                      </p>
                    </div>
                  </div>
                  <Textarea
                    placeholder="Example: I'm going to fail this presentation..."
                    value={negativeThought}
                    onChange={(e) => setNegativeThought(e.target.value)}
                    className="min-h-32"
                  />
                  <Button
                    onClick={() => setStep(2)}
                    disabled={!negativeThought.trim()}
                    className="w-full"
                  >
                    Next Step
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <div className="flex items-start gap-3">
                    <Lightbulb className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        Step 2: Examine the Evidence
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        What evidence supports or contradicts this thought?
                      </p>
                    </div>
                  </div>
                  <Textarea
                    placeholder="Example: I've done presentations before and did well. I'm prepared..."
                    value={evidence}
                    onChange={(e) => setEvidence(e.target.value)}
                    className="min-h-32"
                  />
                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                      Back
                    </Button>
                    <Button
                      onClick={() => setStep(3)}
                      disabled={!evidence.trim()}
                      className="flex-1"
                    >
                      Next Step
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <div className="flex items-start gap-3">
                    <Lightbulb className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        Step 3: Create a Balanced Thought
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Reframe your original thought with a more balanced perspective
                      </p>
                    </div>
                  </div>
                  <Textarea
                    placeholder="Example: While I'm nervous, I've prepared well and have succeeded before..."
                    value={alternative}
                    onChange={(e) => setAlternative(e.target.value)}
                    className="min-h-32"
                  />
                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                      Back
                    </Button>
                    <Button
                      onClick={handleComplete}
                      disabled={!alternative.trim()}
                      className="flex-1"
                    >
                      Complete
                      <Check className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>
          </Card>

          <Card className="p-6 bg-muted/50">
            <h3 className="font-semibold mb-3">CBT Thought Reframing Tips:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Look for all-or-nothing thinking patterns</li>
              <li>• Question catastrophic predictions</li>
              <li>• Consider alternative explanations</li>
              <li>• Focus on facts, not feelings</li>
              <li>• Practice self-compassion</li>
            </ul>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ThoughtReframing;
