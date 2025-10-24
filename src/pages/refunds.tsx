import { RefreshCw, CheckCircle, XCircle, Clock } from "lucide-react";

export function RefundsPage() {
  return (
    <main className="flex-1 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#9E0B61]/20 mb-4">
            <RefreshCw className="w-8 h-8 text-[#9E0B61]" />
          </div>
          <h1>Refunds</h1>
          <p className="text-[#DADBE1] text-lg max-w-2xl mx-auto">
            Your satisfaction matters. Here's our refund policy for custom orders and instant buy content.
          </p>
        </div>

        {/* Eligible for Refund */}
        <div className="glass-card rounded-2xl p-8 space-y-6">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-[#19E28C] shrink-0 mt-1" />
            <div>
              <h2 className="mb-3">Eligible for refund</h2>
              <ul className="space-y-3 text-[#DADBE1]">
                <li className="flex items-start gap-2">
                  <span className="text-[#19E28C] shrink-0">•</span>
                  <span>Creator fails to deliver within the agreed timeframe (plus 48-hour grace period)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#19E28C] shrink-0">•</span>
                  <span>Delivered content does not match the custom request specifications</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#19E28C] shrink-0">•</span>
                  <span>Technical issues prevent you from accessing the content</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#19E28C] shrink-0">•</span>
                  <span>Content violates platform policies or is inappropriate</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#19E28C] shrink-0">•</span>
                  <span>Creator cancels the order before starting work</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Not Eligible for Refund */}
        <div className="glass-card rounded-2xl p-8 space-y-6 border border-[#FF4D6D]/30">
          <div className="flex items-start gap-3">
            <XCircle className="w-6 h-6 text-[#FF4D6D] shrink-0 mt-1" />
            <div>
              <h2 className="mb-3">Not eligible for refund</h2>
              <ul className="space-y-3 text-[#DADBE1]">
                <li className="flex items-start gap-2">
                  <span className="text-[#FF4D6D] shrink-0">•</span>
                  <span>You change your mind after the creator has started work</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF4D6D] shrink-0">•</span>
                  <span>Minor subjective differences in tone or style (within requested parameters)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF4D6D] shrink-0">•</span>
                  <span>You provided incorrect or unclear instructions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF4D6D] shrink-0">•</span>
                  <span>Instant buy content has already been downloaded or accessed</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF4D6D] shrink-0">•</span>
                  <span>More than 14 days have passed since delivery</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Refund Process */}
        <div className="glass-card rounded-2xl p-8 space-y-6">
          <div className="flex items-start gap-3">
            <Clock className="w-6 h-6 text-[#9E0B61] shrink-0 mt-1" />
            <div>
              <h2 className="mb-3">Refund process</h2>
              <div className="space-y-4 text-[#DADBE1]">
                <div>
                  <p className="text-white mb-2">1. Request a refund</p>
                  <p>Use the "Request refund" button on your order page within 14 days of delivery.</p>
                </div>
                <div>
                  <p className="text-white mb-2">2. Review period</p>
                  <p>Our team reviews your request within 2–3 business days.</p>
                </div>
                <div>
                  <p className="text-white mb-2">3. Decision notification</p>
                  <p>You'll receive an email with the outcome and next steps.</p>
                </div>
                <div>
                  <p className="text-white mb-2">4. Refund issued</p>
                  <p>Approved refunds are processed within 5–7 business days to your original payment method.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Revisions */}
        <div className="glass-card rounded-2xl p-8 space-y-4">
          <h2>Revisions before refunds</h2>
          <p className="text-[#DADBE1]">
            If content doesn't meet your expectations but the creator followed your brief, we encourage using your included revisions first. Most issues can be resolved through communication.
          </p>
        </div>

        {/* Contact */}
        <div className="glass-card rounded-2xl p-8 space-y-4">
          <h2>Need help?</h2>
          <p className="text-[#DADBE1]">
            Contact our support team at <a href="mailto:support@whispr.com" className="text-[#9E0B61] hover:underline">support@whispr.com</a> if you have questions about refunds or need assistance with an order.
          </p>
        </div>

        {/* Last Updated */}
        <div className="text-center text-sm text-[#DADBE1] pt-6">
          Last updated: October 2025
        </div>
      </div>
    </main>
  );
}
