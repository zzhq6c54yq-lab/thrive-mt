import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CreditCard, Calendar as CalendarIcon, Clock, CheckCircle, Loader2 } from "lucide-react";
import { format, addDays, setHours, setMinutes } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { therapyBookingSchema } from "@/lib/validations";

interface BookingFlowProps {
  therapistId: string;
  therapistName: string;
  hourlyRate: number;
  onClose: () => void;
}

const timeSlots = [
  "09:00", "10:00", "11:00", "12:00", "13:00", 
  "14:00", "15:00", "16:00", "17:00", "18:00"
];

export function BookingFlow({ therapistId, therapistName, hourlyRate, onClose }: BookingFlowProps) {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [sessionType, setSessionType] = useState("video");
  const [duration, setDuration] = useState(60);
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);

  const calculateTotal = () => {
    return ((hourlyRate * duration) / 60).toFixed(2);
  };

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime) return;

    setIsProcessing(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Create appointment datetime
      const [hours, minutes] = selectedTime.split(":").map(Number);
      const appointmentDate = setMinutes(setHours(selectedDate, hours), minutes);

      // Validate booking data
      const validation = therapyBookingSchema.safeParse({
        therapist_id: therapistId,
        appointment_date: appointmentDate.toISOString(),
        duration_minutes: duration,
        session_type: sessionType,
      });

      if (!validation.success) {
        throw new Error(validation.error.errors[0].message);
      }

      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create booking
      const { error } = await supabase
        .from("therapy_bookings")
        .insert([{
          user_id: user.id,
          therapist_id: validation.data.therapist_id,
          appointment_date: validation.data.appointment_date,
          duration_minutes: validation.data.duration_minutes,
          session_type: validation.data.session_type,
          concerns: validation.data.concerns || null,
          notes: validation.data.notes || null,
          payment_status: "paid",
          payment_amount: parseFloat(calculateTotal()),
          payment_method: paymentMethod,
          status: "scheduled",
        }]);

      if (error) throw error;

      setBookingComplete(true);
      toast({ title: "Booking confirmed!", description: "Check your email for confirmation details." });
    } catch (error: any) {
      toast({ 
        title: "Booking failed", 
        description: error.message,
        variant: "destructive" 
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const renderStep = () => {
    if (bookingComplete) {
      return (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center py-8"
        >
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
          <p className="text-muted-foreground mb-6">
            Your session with {therapistName} is scheduled for<br />
            {selectedDate && format(selectedDate, "PPP")} at {selectedTime}
          </p>
          <Button onClick={onClose}>Done</Button>
        </motion.div>
      );
    }

    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Select Date & Time</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Choose a date</Label>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date() || date > addDays(new Date(), 90)}
                  className="rounded-md border"
                />
              </div>
              <div>
                <Label>Available times</Label>
                {!selectedDate ? (
                  <p className="text-sm text-muted-foreground mt-4">Please select a date first</p>
                ) : (
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        onClick={() => setSelectedTime(time)}
                        className="w-full"
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Session Details</h2>
            
            <div>
              <Label>Session Type</Label>
              <RadioGroup value={sessionType} onValueChange={setSessionType}>
                <div className="flex items-center space-x-2 mt-2">
                  <RadioGroupItem value="video" id="video" />
                  <Label htmlFor="video">Video Call</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="phone" id="phone" />
                  <Label htmlFor="phone">Phone Call</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="in-person" id="in-person" />
                  <Label htmlFor="in-person">In Person</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label>Duration</Label>
              <RadioGroup value={duration.toString()} onValueChange={(v) => setDuration(parseInt(v))}>
                <div className="flex items-center space-x-2 mt-2">
                  <RadioGroupItem value="30" id="30min" />
                  <Label htmlFor="30min">30 minutes (${((hourlyRate * 30) / 60).toFixed(2)})</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="60" id="60min" />
                  <Label htmlFor="60min">60 minutes (${hourlyRate})</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="90" id="90min" />
                  <Label htmlFor="90min">90 minutes (${((hourlyRate * 90) / 60).toFixed(2)})</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Payment (Simulated)</h2>
            
            <Card className="bg-muted/50">
              <CardContent className="p-4">
                <div className="flex justify-between mb-2">
                  <span>Session with {therapistName}</span>
                  <span>${hourlyRate}/hr</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Duration</span>
                  <span>{duration} minutes</span>
                </div>
                <div className="border-t pt-2 mt-2 flex justify-between font-bold">
                  <span>Total</span>
                  <span>${calculateTotal()}</span>
                </div>
              </CardContent>
            </Card>

            <div>
              <Label>Payment Method (Simulated)</Label>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="flex items-center space-x-2 mt-2">
                  <RadioGroupItem value="credit_card" id="credit_card" />
                  <Label htmlFor="credit_card">
                    <CreditCard className="inline h-4 w-4 mr-2" />
                    Credit Card
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="insurance" id="insurance" />
                  <Label htmlFor="insurance">Insurance</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-900 dark:text-blue-100">
                💳 This is a simulated payment. No actual charges will be made. In production, this would integrate with Stripe for real payments.
              </p>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">Booking Summary</h3>
              <div className="space-y-1 text-sm">
                <p><CalendarIcon className="inline h-4 w-4 mr-2" />
                  {selectedDate && format(selectedDate, "PPP")} at {selectedTime}
                </p>
                <p><Clock className="inline h-4 w-4 mr-2" />
                  {duration} minute {sessionType} session
                </p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Book Session with {therapistName}</DialogTitle>
        </DialogHeader>

        {!bookingComplete && (
          <div className="flex items-center gap-2 mb-4">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`flex-1 h-2 rounded-full transition-colors ${
                  s <= step ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>

        {!bookingComplete && (
          <div className="flex gap-2 justify-between mt-6">
            <Button
              variant="outline"
              onClick={() => step === 1 ? onClose() : setStep(step - 1)}
              disabled={isProcessing}
            >
              {step === 1 ? "Cancel" : "Back"}
            </Button>
            
            {step < 3 ? (
              <Button
                onClick={() => setStep(step + 1)}
                disabled={
                  (step === 1 && (!selectedDate || !selectedTime)) ||
                  isProcessing
                }
              >
                Continue
              </Button>
            ) : (
              <Button
                onClick={handleBooking}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  `Confirm & Pay $${calculateTotal()}`
                )}
              </Button>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
