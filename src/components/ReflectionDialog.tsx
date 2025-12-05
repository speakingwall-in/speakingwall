import { useState } from "react";
import { useVisionBoard } from "@/hooks/useVisionBoard";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Sparkles, TrendingUp, Smile, Meh, Frown } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ReflectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ReflectionDialog({ open, onOpenChange }: ReflectionDialogProps) {
  const { addReflection } = useVisionBoard();
  const [step, setStep] = useState(1);
  const [gratitude, setGratitude] = useState("");
  const [wins, setWins] = useState("");
  const [improvements, setImprovements] = useState("");
  const [mood, setMood] = useState(3);

  const handleSubmit = () => {
    addReflection({
      date: new Date().toISOString(),
      gratitude: gratitude.split("\n").filter(Boolean),
      wins: wins.split("\n").filter(Boolean),
      improvements: improvements.split("\n").filter(Boolean),
      mood,
    });

    toast({
      title: "Reflection saved! 🌟",
      description: "Your daily reflection has been recorded.",
    });

    // Reset form
    setStep(1);
    setGratitude("");
    setWins("");
    setImprovements("");
    setMood(3);
    onOpenChange(false);
  };

  const moodOptions = [
    { value: 1, icon: Frown, label: "Rough", color: "text-dusty-rose" },
    { value: 2, icon: Meh, label: "Okay", color: "text-warm-gold" },
    { value: 3, icon: Smile, label: "Good", color: "text-sage" },
    { value: 4, icon: Heart, label: "Great", color: "text-soft-coral" },
    { value: 5, icon: Sparkles, label: "Amazing", color: "text-primary" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl flex items-center gap-2">
            {step === 1 && <Heart className="w-6 h-6 text-soft-coral" />}
            {step === 2 && <Sparkles className="w-6 h-6 text-warm-gold" />}
            {step === 3 && <TrendingUp className="w-6 h-6 text-sage" />}
            {step === 4 && "How are you feeling?"}
            {step === 1 && "Gratitude"}
            {step === 2 && "Today's Wins"}
            {step === 3 && "Growth Areas"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-4">
          {/* Progress Indicator */}
          <div className="flex gap-2 mb-6">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-1.5 flex-1 rounded-full transition-colors ${
                  s <= step ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>

          {step === 1 && (
            <div className="space-y-4 animate-fade-up">
              <p className="text-muted-foreground">
                What are you grateful for today? List as many things as you'd like.
              </p>
              <Textarea
                placeholder="I'm grateful for my family's health...&#10;A productive morning...&#10;Quality time with my child..."
                value={gratitude}
                onChange={(e) => setGratitude(e.target.value)}
                rows={5}
                className="resize-none"
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-fade-up">
              <p className="text-muted-foreground">
                What wins did you have today? Celebrate even small victories!
              </p>
              <Textarea
                placeholder="Completed my morning workout...&#10;Had a meaningful conversation...&#10;Made progress on a project..."
                value={wins}
                onChange={(e) => setWins(e.target.value)}
                rows={5}
                className="resize-none"
              />
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-fade-up">
              <p className="text-muted-foreground">
                What areas would you like to improve? Be kind to yourself.
              </p>
              <Textarea
                placeholder="Better time management...&#10;More patience with my child...&#10;Less screen time..."
                value={improvements}
                onChange={(e) => setImprovements(e.target.value)}
                rows={5}
                className="resize-none"
              />
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6 animate-fade-up">
              <p className="text-muted-foreground text-center">
                How would you rate your overall mood today?
              </p>
              <div className="flex justify-center gap-4">
                {moodOptions.map(({ value, icon: Icon, label, color }) => (
                  <button
                    key={value}
                    onClick={() => setMood(value)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all ${
                      mood === value 
                        ? "bg-primary/10 scale-110" 
                        : "hover:bg-muted"
                    }`}
                  >
                    <Icon className={`w-8 h-8 ${mood === value ? color : "text-muted-foreground"}`} />
                    <span className={`text-xs ${mood === value ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                      {label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-3 pt-4">
            {step > 1 && (
              <Button variant="soft" className="flex-1" onClick={() => setStep(step - 1)}>
                Back
              </Button>
            )}
            {step < 4 ? (
              <Button variant="warm" className="flex-1" onClick={() => setStep(step + 1)}>
                Continue
              </Button>
            ) : (
              <Button variant="warm" className="flex-1" onClick={handleSubmit}>
                Save Reflection
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
