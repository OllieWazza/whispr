import { useState } from "react";
import { StatusChip } from "../components/status-chip";
import { TierCard } from "../components/tier-card";
import { ComplianceNotice } from "../components/compliance-notice";
import { EmptyStateCard } from "../components/empty-state-card";
import { DropdownField, TextAreaField, CheckboxField } from "../components/request-form-field";
import { LiquidTabs } from "../components/liquid-tabs";
import { Button } from "../components/ui/button";
import { Package, Bell, CheckCircle, XCircle, Clock, Download, Heart } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { Toaster } from "../components/ui/sonner";

export function ComponentLibraryPage() {
  const [selectedTier, setSelectedTier] = useState<"basic" | "standard" | "premium" | null>(null);
  const [activeTab, setActiveTab] = useState("active");
  const [formValues, setFormValues] = useState({
    dropdown: "",
    textarea: "",
    checkbox: false,
  });

  return (
    <main className="flex-1 py-12 px-4">
      <Toaster />
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center">
          <h1 className="mb-2">WHISPR Component Library</h1>
          <p className="text-[#DADBE1]">
            Reusable components with variants and usage examples
          </p>
        </div>

        {/* Liquid Tabs */}
        <section className="space-y-6">
          <div>
            <h2 className="mb-2">Liquid Tabs</h2>
            <p className="text-[#DADBE1] mb-6">
              Animated tab navigation with smooth liquid glass sliding indicator
            </p>
          </div>

          <div className="glass-card rounded-2xl p-8">
            <h3 className="mb-6">Interactive Example</h3>
            <div className="flex justify-center">
              <LiquidTabs
                tabs={[
                  { id: "active", label: "Active", icon: Clock },
                  { id: "delivered", label: "Delivered", icon: Download },
                  { id: "favorites", label: "Favorites", icon: Heart },
                ]}
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />
            </div>
            <div className="mt-6 text-center text-[#DADBE1]">
              <p>Selected: <span className="text-[#E879F9]">{activeTab}</span></p>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-8 bg-[#0e0e0e]/40">
            <h4 className="mb-4 text-[#DADBE1]">Usage</h4>
            <pre className="bg-[#0e0e0e] p-4 rounded-xl overflow-x-auto text-sm">
              <code className="text-[#19E28C]">
{`import { LiquidTabs } from "./components/liquid-tabs";
import { Clock, Download, Heart } from "lucide-react";

<LiquidTabs
  tabs={[
    { id: "active", label: "Active", icon: Clock },
    { id: "delivered", label: "Delivered", icon: Download },
    { id: "favorites", label: "Favorites", icon: Heart },
  ]}
  activeTab={activeTab}
  onTabChange={setActiveTab}
/>`}
              </code>
            </pre>
          </div>
        </section>

        {/* Status Chips */}
        <section className="space-y-6">
          <div>
            <h2 className="mb-2">Status Chips</h2>
            <p className="text-[#DADBE1] mb-6">
              Visual indicators for order and request statuses
            </p>
          </div>

          <div className="glass-card rounded-2xl p-8">
            <h3 className="mb-6">All Variants</h3>
            <div className="flex flex-wrap gap-4">
              <StatusChip status="pending" />
              <StatusChip status="in-progress" />
              <StatusChip status="delivered" />
              <StatusChip status="cancelled" />
            </div>
          </div>

          <div className="glass-card rounded-2xl p-8 bg-[#0e0e0e]/40">
            <h4 className="mb-4 text-[#DADBE1]">Usage</h4>
            <pre className="bg-[#0e0e0e] p-4 rounded-xl overflow-x-auto text-sm">
              <code className="text-[#19E28C]">
{`import { StatusChip } from "./components/status-chip";

<StatusChip status="pending" />
<StatusChip status="in-progress" />
<StatusChip status="delivered" />
<StatusChip status="cancelled" />`}
              </code>
            </pre>
          </div>
        </section>

        {/* Tier Cards */}
        <section className="space-y-6">
          <div>
            <h2 className="mb-2">Tier Cards</h2>
            <p className="text-[#DADBE1] mb-6">
              Interactive pricing tier selection cards
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <TierCard
              tier="basic"
              price={15}
              deliveryTime="5 days"
              features={[
                "Up to 60 seconds",
                "Standard quality",
                "1 revision",
                "Basic support",
              ]}
              isSelected={selectedTier === "basic"}
              onSelect={() => setSelectedTier("basic")}
            />
            <TierCard
              tier="standard"
              price={30}
              deliveryTime="3 days"
              features={[
                "Up to 90 seconds",
                "High quality",
                "2 revisions",
                "Priority support",
              ]}
              isSelected={selectedTier === "standard"}
              onSelect={() => setSelectedTier("standard")}
            />
            <TierCard
              tier="premium"
              price={50}
              deliveryTime="24 hours"
              features={[
                "Up to 2 minutes",
                "Studio quality",
                "Unlimited revisions",
                "Express delivery",
              ]}
              isSelected={selectedTier === "premium"}
              onSelect={() => setSelectedTier("premium")}
            />
          </div>

          <div className="glass-card rounded-2xl p-8 bg-[#0e0e0e]/40">
            <h4 className="mb-4 text-[#DADBE1]">Usage</h4>
            <pre className="bg-[#0e0e0e] p-4 rounded-xl overflow-x-auto text-sm">
              <code className="text-[#19E28C]">
{`import { TierCard } from "./components/tier-card";

<TierCard
  tier="basic"
  price={15}
  deliveryTime="5 days"
  features={["Feature 1", "Feature 2"]}
  isSelected={selected === "basic"}
  onSelect={() => setSelected("basic")}
/>`}
              </code>
            </pre>
          </div>
        </section>

        {/* Compliance Notice */}
        <section className="space-y-6">
          <div>
            <h2 className="mb-2">Compliance Notice</h2>
            <p className="text-[#DADBE1] mb-6">
              Platform safety and compliance messaging
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="mb-4 text-[#DADBE1]">Default Variant</h4>
              <ComplianceNotice variant="default" />
            </div>

            <div>
              <h4 className="mb-4 text-[#DADBE1]">Compact Variant</h4>
              <div className="glass-card rounded-2xl p-6">
                <ComplianceNotice variant="compact" />
              </div>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-8 bg-[#0e0e0e]/40">
            <h4 className="mb-4 text-[#DADBE1]">Usage</h4>
            <pre className="bg-[#0e0e0e] p-4 rounded-xl overflow-x-auto text-sm">
              <code className="text-[#19E28C]">
{`import { ComplianceNotice } from "./components/compliance-notice";

<ComplianceNotice variant="default" />
<ComplianceNotice variant="compact" />`}
              </code>
            </pre>
          </div>
        </section>

        {/* Empty State Cards */}
        <section className="space-y-6">
          <div>
            <h2 className="mb-2">Empty State Cards</h2>
            <p className="text-[#DADBE1] mb-6">
              Friendly empty states with optional actions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-card rounded-2xl">
              <EmptyStateCard
                icon={Package}
                title="No orders yet"
                description="You haven't placed any orders yet. Browse our talented creators!"
                actionLabel="Explore Creators"
                onAction={() => toast.success("Action clicked!")}
              />
            </div>
            <div className="glass-card rounded-2xl">
              <EmptyStateCard
                icon={Bell}
                title="No notifications"
                description="You're all caught up! We'll notify you of any updates."
              />
            </div>
          </div>

          <div className="glass-card rounded-2xl p-8 bg-[#0e0e0e]/40">
            <h4 className="mb-4 text-[#DADBE1]">Usage</h4>
            <pre className="bg-[#0e0e0e] p-4 rounded-xl overflow-x-auto text-sm">
              <code className="text-[#19E28C]">
{`import { EmptyStateCard } from "./components/empty-state-card";
import { Package } from "lucide-react";

<EmptyStateCard
  icon={Package}
  title="No orders yet"
  description="Browse our creators..."
  actionLabel="Explore"
  onAction={() => {}}
/>`}
              </code>
            </pre>
          </div>
        </section>

        {/* Form Fields */}
        <section className="space-y-6">
          <div>
            <h2 className="mb-2">Request Form Fields</h2>
            <p className="text-[#DADBE1] mb-6">
              Form components for request flows
            </p>
          </div>

          <div className="glass-card rounded-2xl p-8 space-y-6 max-w-2xl">
            <DropdownField
              label="Occasion"
              options={[
                { value: "birthday", label: "Birthday" },
                { value: "anniversary", label: "Anniversary" },
                { value: "other", label: "Other" },
              ]}
              value={formValues.dropdown}
              onChange={(value) => setFormValues({ ...formValues, dropdown: value })}
              required
            />

            <TextAreaField
              label="Your Message"
              value={formValues.textarea}
              onChange={(value) => setFormValues({ ...formValues, textarea: value })}
              placeholder="Enter your message here..."
              maxLength={200}
              rows={4}
              required
            />

            <CheckboxField
              label="I agree to the terms and conditions"
              checked={formValues.checkbox}
              onChange={(checked) => setFormValues({ ...formValues, checkbox: checked })}
              required
            />
          </div>

          <div className="glass-card rounded-2xl p-8 bg-[#0e0e0e]/40">
            <h4 className="mb-4 text-[#DADBE1]">Usage</h4>
            <pre className="bg-[#0e0e0e] p-4 rounded-xl overflow-x-auto text-sm">
              <code className="text-[#19E28C]">
{`import { 
  DropdownField, 
  TextAreaField, 
  CheckboxField 
} from "./components/request-form-field";

<DropdownField
  label="Occasion"
  options={[...]}
  value={value}
  onChange={setValue}
  required
/>

<TextAreaField
  label="Message"
  value={value}
  onChange={setValue}
  maxLength={500}
  required
/>

<CheckboxField
  label="I agree"
  checked={checked}
  onChange={setChecked}
  required
/>`}
              </code>
            </pre>
          </div>
        </section>

        {/* Toast Notifications */}
        <section className="space-y-6">
          <div>
            <h2 className="mb-2">Toast Notifications</h2>
            <p className="text-[#DADBE1] mb-6">
              Real-time feedback messages using Sonner
            </p>
          </div>

          <div className="glass-card rounded-2xl p-8">
            <h3 className="mb-6">Try the toasts</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button
                onClick={() => toast.success("Order placed successfully!")}
                variant="outline"
                className="border-[#19E28C] text-[#19E28C] hover:bg-[#19E28C]/10"
              >
                <CheckCircle className="w-4 h-4" />
                Success
              </Button>
              <Button
                onClick={() => toast.error("Payment failed. Please try again.")}
                variant="outline"
                className="border-[#FF4D6D] text-[#FF4D6D] hover:bg-[#FF4D6D]/10"
              >
                <XCircle className="w-4 h-4" />
                Error
              </Button>
              <Button
                onClick={() => toast("New message from creator")}
                variant="outline"
              >
                <Bell className="w-4 h-4" />
                Default
              </Button>
              <Button
                onClick={() =>
                  toast("Creator is working on your order", {
                    description: "Expected delivery in 2 days",
                  })
                }
                variant="outline"
              >
                <Package className="w-4 h-4" />
                With Description
              </Button>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-8 bg-[#0e0e0e]/40">
            <h4 className="mb-4 text-[#DADBE1]">Usage</h4>
            <pre className="bg-[#0e0e0e] p-4 rounded-xl overflow-x-auto text-sm">
              <code className="text-[#19E28C]">
{`import { toast } from "sonner@2.0.3";
import { Toaster } from "./components/ui/sonner";

// Add to your app root
<Toaster />

// Use in components
toast.success("Success message");
toast.error("Error message");
toast("Default message");
toast("Message", { 
  description: "Additional info" 
});`}
              </code>
            </pre>
          </div>
        </section>

        {/* Design Tokens */}
        <section className="glass-card rounded-2xl p-8 space-y-6">
          <h2>Design Tokens Reference</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Colors */}
            <div className="space-y-3">
              <h4>Brand Colors</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#9E0B61]" />
                  <div>
                    <p className="text-sm">Primary</p>
                    <code className="text-xs text-[#DADBE1]">#9E0B61</code>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#74094A]" />
                  <div>
                    <p className="text-sm">Secondary</p>
                    <code className="text-xs text-[#DADBE1]">#74094A</code>
                  </div>
                </div>
              </div>
            </div>

            {/* Accent Colors */}
            <div className="space-y-3">
              <h4>Accent Colors</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#19E28C]" />
                  <div>
                    <p className="text-sm">Success</p>
                    <code className="text-xs text-[#DADBE1]">#19E28C</code>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#FFC34D]" />
                  <div>
                    <p className="text-sm">Warning</p>
                    <code className="text-xs text-[#DADBE1]">#FFC34D</code>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#FF4D6D]" />
                  <div>
                    <p className="text-sm">Error</p>
                    <code className="text-xs text-[#DADBE1]">#FF4D6D</code>
                  </div>
                </div>
              </div>
            </div>

            {/* Surfaces */}
            <div className="space-y-3">
              <h4>Surfaces</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#0e0e0e] border border-[#3A3C43]" />
                  <div>
                    <p className="text-sm">Background</p>
                    <code className="text-xs text-[#DADBE1]">#0e0e0e</code>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#3A3C43]" />
                  <div>
                    <p className="text-sm">Border</p>
                    <code className="text-xs text-[#DADBE1]">#3A3C43</code>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[#3A3C43] grid sm:grid-cols-2 gap-6">
            <div>
              <h4 className="mb-3">Typography</h4>
              <p className="text-[#DADBE1] text-sm">Font: Inter</p>
              <p className="text-[#DADBE1] text-sm">Base Size: 16px</p>
            </div>
            <div>
              <h4 className="mb-3">Border Radius</h4>
              <p className="text-[#DADBE1] text-sm">Cards: 16px</p>
              <p className="text-[#DADBE1] text-sm">Pills: 999px</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
