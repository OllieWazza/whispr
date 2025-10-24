import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

interface ReportProblemModalProps {
  trigger?: React.ReactNode;
  contentType?: "creator" | "order" | "general";
  contentId?: string;
}

export function ReportProblemModal({ 
  trigger, 
  contentType = "general",
  contentId 
}: ReportProblemModalProps) {
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const reasons = [
    { value: "inappropriate", label: "Inappropriate content" },
    { value: "harassment", label: "Harassment or bullying" },
    { value: "spam", label: "Spam or misleading" },
    { value: "copyright", label: "Copyright violation" },
    { value: "quality", label: "Poor quality / not as described" },
    { value: "other", label: "Other" },
  ];

  const handleSubmit = () => {
    // In a real app, this would send to an API
    console.log("Report submitted:", { reason, description, contentType, contentId });
    setIsSubmitted(true);
    
    // Reset after 2 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setReason("");
      setDescription("");
    }, 2000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="destructive" size="sm">
            <AlertTriangle className="w-4 h-4" />
            Report problem
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] glass-card border-[#3A3C43]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-[#FF4D6D]" />
            Report a problem
          </DialogTitle>
          <DialogDescription className="text-[#DADBE1]">
            Help us keep WHISPR safe by reporting issues. All reports are reviewed within 24 hours.
          </DialogDescription>
        </DialogHeader>

        {!isSubmitted ? (
          <div className="space-y-6 py-4">
            {/* Reason Selection */}
            <div className="space-y-3">
              <Label>What's the issue?</Label>
              <RadioGroup value={reason} onValueChange={setReason}>
                {reasons.map((r) => (
                  <div key={r.value} className="flex items-center space-x-3 glass-button rounded-xl p-3">
                    <RadioGroupItem value={r.value} id={r.value} />
                    <Label htmlFor={r.value} className="cursor-pointer flex-1">
                      {r.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <Label htmlFor="description">
                Additional details <span className="text-[#DADBE1]">(optional)</span>
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide more context to help us understand the issue..."
                rows={4}
                maxLength={500}
              />
              <p className="text-xs text-[#DADBE1]">
                {description.length}/500 characters
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <DialogTrigger asChild>
                <Button variant="outline" className="flex-1">
                  Cancel
                </Button>
              </DialogTrigger>
              <Button 
                variant="destructive" 
                onClick={handleSubmit}
                disabled={!reason}
                className="flex-1"
              >
                Submit report
              </Button>
            </div>
          </div>
        ) : (
          <div className="py-12 text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#19E28C]/20 mb-2">
              <div className="w-8 h-8 rounded-full bg-[#19E28C] flex items-center justify-center">
                <span className="text-white text-xl">✓</span>
              </div>
            </div>
            <h3>Report submitted</h3>
            <p className="text-[#DADBE1]">
              Thank you for helping keep WHISPR safe. We'll review this report within 24 hours.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
