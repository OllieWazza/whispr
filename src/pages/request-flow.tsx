import { useState } from "react";
import { TierCard } from "../components/tier-card";
import { DropdownField, TextAreaField, CheckboxField } from "../components/request-form-field";
import { ComplianceNotice } from "../components/compliance-notice";
import { Button } from "../components/ui/button";
import { CreditCard, CheckCircle, ArrowLeft } from "lucide-react";

type Step = "tier" | "payment" | "form" | "success";

const occasionOptions = [
  { value: "birthday", label: "Birthday" },
  { value: "anniversary", label: "Anniversary" },
  { value: "congratulations", label: "Congratulations" },
  { value: "motivation", label: "Motivation" },
  { value: "just-because", label: "Just Because" },
  { value: "other", label: "Other" },
];

const toneOptions = [
  { value: "friendly", label: "Friendly" },
  { value: "professional", label: "Professional" },
  { value: "playful", label: "Playful" },
  { value: "romantic", label: "Romantic" },
  { value: "sincere", label: "Sincere" },
  { value: "humorous", label: "Humorous" },
];

const lengthOptions = [
  { value: "30s", label: "30 seconds" },
  { value: "60s", label: "60 seconds" },
  { value: "90s", label: "90 seconds" },
  { value: "2min", label: "2 minutes" },
];

export function RequestFlowPage() {
  const [step, setStep] = useState<Step>("tier");
  const [selectedTier, setSelectedTier] = useState<"basic" | "standard" | "premium" | null>(null);
  const [formData, setFormData] = useState({
    occasion: "",
    tone: "",
    length: "",
    script: "",
    includeMusic: false,
    includeName: false,
    confirmation: false,
  });

  const tierData = {
    basic: {
      price: 15,
      deliveryTime: "5 days",
      features: [
        "Up to 60 seconds",
        "Standard quality audio",
        "1 revision included",
        "Basic background music option",
      ],
    },
    standard: {
      price: 30,
      deliveryTime: "3 days",
      features: [
        "Up to 90 seconds",
        "High quality audio",
        "2 revisions included",
        "Custom background music",
        "Priority support",
      ],
    },
    premium: {
      price: 50,
      deliveryTime: "24 hours",
      features: [
        "Up to 2 minutes",
        "Studio quality audio",
        "Unlimited revisions",
        "Premium background music",
        "Priority support",
        "Express delivery",
      ],
    },
  };

  const renderStepIndicator = () => {
    const steps = [
      { id: "tier", label: "Pick a package" },
      { id: "payment", label: "Payment" },
      { id: "form", label: "Custom request" },
    ];

    const currentIndex = steps.findIndex((s) => s.id === step);

    return (
      <div className="flex items-center justify-center gap-2 mb-8">
        {steps.map((s, idx) => (
          <div key={s.id} className="flex items-center">
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  idx <= currentIndex
                    ? "bg-gradient-to-r from-[#9E0B61] to-[#74094A] text-white"
                    : "bg-[#3A3C43] text-[#DADBE1]"
                }`}
              >
                {idx < currentIndex ? <CheckCircle className="w-4 h-4" /> : idx + 1}
              </div>
              <span className={`hidden sm:inline ${idx <= currentIndex ? "text-white" : "text-[#DADBE1]"}`}>
                {s.label}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div
                className={`w-12 sm:w-16 h-0.5 mx-2 ${
                  idx < currentIndex ? "bg-[#9E0B61]" : "bg-[#3A3C43]"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderTierSelection = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="mb-2">Pick a package</h1>
        <p className="text-[#DADBE1]">Select the tier that best fits your needs</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <TierCard
          tier="basic"
          {...tierData.basic}
          isSelected={selectedTier === "basic"}
          onSelect={() => setSelectedTier("basic")}
        />
        <TierCard
          tier="standard"
          {...tierData.standard}
          isSelected={selectedTier === "standard"}
          onSelect={() => setSelectedTier("standard")}
        />
        <TierCard
          tier="premium"
          {...tierData.premium}
          isSelected={selectedTier === "premium"}
          onSelect={() => setSelectedTier("premium")}
        />
      </div>

      <div className="flex justify-center pt-6">
        <Button
          onClick={() => setStep("payment")}
          disabled={!selectedTier}
          size="lg"
          className="min-w-[200px]"
        >
          Continue to payment
        </Button>
      </div>
    </div>
  );

  const renderPayment = () => (
    <div className="max-w-2xl mx-auto space-y-6">
      <button
        onClick={() => setStep("tier")}
        className="flex items-center gap-2 text-[#DADBE1] hover:text-white transition-colors mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to tier selection
      </button>

      <div className="text-center mb-8">
        <h1 className="mb-2">Payment</h1>
        <p className="text-[#DADBE1]">Secure checkout via Stripe</p>
      </div>

      {/* Order Summary */}
      <div className="glass-card rounded-2xl p-6 space-y-4">
        <h3>Order Summary</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[#DADBE1]">
              {selectedTier?.charAt(0).toUpperCase()}{selectedTier?.slice(1)} Tier
            </span>
            <span>£{selectedTier ? tierData[selectedTier].price : 0}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#DADBE1]">Platform Fee</span>
            <span>£0</span>
          </div>
          <div className="border-t border-[#3A3C43] pt-3 flex justify-between items-center">
            <span>Total</span>
            <span className="text-2xl">£{selectedTier ? tierData[selectedTier].price : 0}</span>
          </div>
        </div>
      </div>

      {/* Stripe Checkout Placeholder */}
      <div className="glass-card rounded-2xl p-8 space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <CreditCard className="w-6 h-6 text-[#9E0B61]" />
          <h3>Payment Details</h3>
        </div>

        <div className="bg-[#3A3C43]/20 rounded-xl p-8 text-center space-y-4">
          <CreditCard className="w-16 h-16 mx-auto text-[#DADBE1]" />
          <div>
            <p className="mb-2">Stripe Checkout Integration</p>
            <p className="text-sm text-[#DADBE1]">
              In production, this would redirect to Stripe's secure checkout page.
            </p>
          </div>
        </div>

        <ComplianceNotice />

        <Button
          fullWidth
          size="lg"
          onClick={() => setStep("form")}
          className="liquid-gradient"
        >
          Proceed to Checkout (Demo)
        </Button>
      </div>
    </div>
  );

  const renderForm = () => (
    <div className="max-w-2xl mx-auto space-y-6">
      <button
        onClick={() => setStep("payment")}
        className="flex items-center gap-2 text-[#DADBE1] hover:text-white transition-colors mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to payment
      </button>

      <div className="text-center mb-8">
        <h1 className="mb-2">Custom request</h1>
        <p className="text-[#DADBE1]">Tell us what you'd like in your custom audio</p>
      </div>

      <div className="glass-card rounded-2xl p-6 space-y-6">
        <DropdownField
          label="Occasion"
          options={occasionOptions}
          value={formData.occasion}
          onChange={(value) => setFormData({ ...formData, occasion: value })}
          required
        />

        <DropdownField
          label="Tone"
          options={toneOptions}
          value={formData.tone}
          onChange={(value) => setFormData({ ...formData, tone: value })}
          required
        />

        <DropdownField
          label="Length"
          options={lengthOptions}
          value={formData.length}
          onChange={(value) => setFormData({ ...formData, length: value })}
          required
        />

        <TextAreaField
          label="Your Script / Instructions"
          value={formData.script}
          onChange={(value) => setFormData({ ...formData, script: value })}
          placeholder="Write what you'd like the creator to say... Be specific about names, pronunciations, and any special requests."
          maxLength={500}
          rows={6}
          required
        />

        <div className="space-y-3">
          <h4>Preferences</h4>
          <CheckboxField
            label="Include background music"
            checked={formData.includeMusic}
            onChange={(checked) => setFormData({ ...formData, includeMusic: checked })}
          />
          <CheckboxField
            label="Mention my name in the message"
            checked={formData.includeName}
            onChange={(checked) => setFormData({ ...formData, includeName: checked })}
          />
        </div>

        <div className="border-t border-[#3A3C43] pt-4">
          <CheckboxField
            label="I confirm this request follows the platform rules and contains no explicit content."
            checked={formData.confirmation}
            onChange={(checked) => setFormData({ ...formData, confirmation: checked })}
            required
          />
        </div>

        <Button
          fullWidth
          size="lg"
          onClick={() => setStep("success")}
          disabled={!formData.confirmation || !formData.occasion || !formData.tone || !formData.length || !formData.script}
          className="liquid-gradient"
        >
          Submit request
        </Button>
      </div>
    </div>
  );

  const renderSuccess = () => (
    <div className="max-w-2xl mx-auto text-center space-y-6 py-12">
      <div className="mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-[#19E28C]/20 to-[#19E28C]/10 mb-6">
          <CheckCircle className="w-10 h-10 text-[#19E28C]" />
        </div>
        <h1 className="mb-3">Your request is in.</h1>
        <p className="text-[#DADBE1] text-lg">
          Your request has been sent to the creator. You'll receive a notification when they start working on it.
        </p>
      </div>

      <div className="glass-card rounded-2xl p-6 space-y-4 text-left">
        <h3>What happens next?</h3>
        <ul className="space-y-3 text-[#DADBE1]">
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-[#19E28C] flex-shrink-0 mt-0.5" />
            <span>The creator will review your request within 24 hours</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-[#19E28C] flex-shrink-0 mt-0.5" />
            <span>You'll receive updates via email and in your dashboard</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-[#19E28C] flex-shrink-0 mt-0.5" />
            <span>Expected delivery: {selectedTier ? tierData[selectedTier].deliveryTime : "3-5 days"}</span>
          </li>
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Button variant="outline" fullWidth onClick={() => window.location.href = "/buyer-dashboard"}>
          View order
        </Button>
        <Button fullWidth className="liquid-gradient" onClick={() => window.location.href = "/marketplace"}>
          Explore more creators
        </Button>
      </div>
    </div>
  );

  return (
    <main className="flex-1 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {step !== "success" && renderStepIndicator()}
        
        {step === "tier" && renderTierSelection()}
        {step === "payment" && renderPayment()}
        {step === "form" && renderForm()}
        {step === "success" && renderSuccess()}
      </div>
    </main>
  );
}
