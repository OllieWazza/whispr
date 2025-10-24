import { Lock, Eye, Shield, Database } from "lucide-react";

export function PrivacyPage() {
  return (
    <main className="flex-1 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#9E0B61]/20 mb-4">
            <Lock className="w-8 h-8 text-[#9E0B61]" />
          </div>
          <h1>Privacy</h1>
          <p className="text-[#DADBE1] text-lg max-w-2xl mx-auto">
            Your privacy is essential. Here's how we collect, use, and protect your data on WHISPR.
          </p>
        </div>

        {/* What We Collect */}
        <div className="glass-card rounded-2xl p-8 space-y-6">
          <div className="flex items-start gap-3">
            <Database className="w-6 h-6 text-[#9E0B61] shrink-0 mt-1" />
            <div>
              <h2 className="mb-3">What we collect</h2>
              <ul className="space-y-3 text-[#DADBE1]">
                <li className="flex items-start gap-2">
                  <span className="text-[#9E0B61] shrink-0">•</span>
                  <span><strong className="text-white">Account details:</strong> Name, email, username, and profile information</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#9E0B61] shrink-0">•</span>
                  <span><strong className="text-white">Payment information:</strong> Processed securely via Stripe (we don't store card details)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#9E0B61] shrink-0">•</span>
                  <span><strong className="text-white">Orders and messages:</strong> Custom request details, creator–buyer communication</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#9E0B61] shrink-0">•</span>
                  <span><strong className="text-white">Usage data:</strong> Pages viewed, search queries, and device information</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#9E0B61] shrink-0">•</span>
                  <span><strong className="text-white">Cookies:</strong> Essential for site functionality and analytics</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* How We Use It */}
        <div className="glass-card rounded-2xl p-8 space-y-6">
          <div className="flex items-start gap-3">
            <Eye className="w-6 h-6 text-[#9E0B61] shrink-0 mt-1" />
            <div>
              <h2 className="mb-3">How we use your data</h2>
              <ul className="space-y-3 text-[#DADBE1]">
                <li className="flex items-start gap-2">
                  <span className="text-[#9E0B61] shrink-0">•</span>
                  <span>Facilitate orders between buyers and creators</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#9E0B61] shrink-0">•</span>
                  <span>Process payments and send order notifications</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#9E0B61] shrink-0">•</span>
                  <span>Improve platform features and user experience</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#9E0B61] shrink-0">•</span>
                  <span>Enforce platform policies and prevent misuse</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#9E0B61] shrink-0">•</span>
                  <span>Send important updates (you can opt out of marketing emails)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Data Protection */}
        <div className="glass-card rounded-2xl p-8 space-y-6">
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-[#19E28C] shrink-0 mt-1" />
            <div>
              <h2 className="mb-3">How we protect your data</h2>
              <p className="text-[#DADBE1] mb-4">
                We use industry-standard security measures to keep your information safe:
              </p>
              <ul className="space-y-3 text-[#DADBE1]">
                <li className="flex items-start gap-2">
                  <span className="text-[#19E28C] shrink-0">•</span>
                  <span>Encrypted connections (HTTPS/TLS) for all data transfers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#19E28C] shrink-0">•</span>
                  <span>Secure payment processing via Stripe (PCI-DSS compliant)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#19E28C] shrink-0">•</span>
                  <span>Regular security audits and vulnerability testing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#19E28C] shrink-0">•</span>
                  <span>Limited staff access to personal data (need-to-know basis)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Sharing */}
        <div className="glass-card rounded-2xl p-8 space-y-4">
          <h2>Data sharing</h2>
          <p className="text-[#DADBE1]">
            We <strong className="text-white">do not sell</strong> your personal data. We only share information when necessary:
          </p>
          <ul className="space-y-2 text-[#DADBE1]">
            <li>• With creators to fulfill your orders</li>
            <li>• With payment processors (Stripe) for transactions</li>
            <li>• When required by law or to protect rights and safety</li>
          </ul>
        </div>

        {/* Your Rights */}
        <div className="glass-card rounded-2xl p-8 space-y-4">
          <h2>Your rights</h2>
          <p className="text-[#DADBE1] mb-4">
            Under GDPR and UK data protection law, you have the right to:
          </p>
          <ul className="space-y-2 text-[#DADBE1]">
            <li>• Access your personal data</li>
            <li>• Request corrections to inaccurate information</li>
            <li>• Delete your account and associated data</li>
            <li>• Object to data processing or withdraw consent</li>
            <li>• Export your data in a portable format</li>
          </ul>
          <p className="text-[#DADBE1] mt-4">
            Contact <a href="mailto:privacy@whispr.com" className="text-[#9E0B61] hover:underline">privacy@whispr.com</a> to exercise these rights.
          </p>
        </div>

        {/* Cookies */}
        <div className="glass-card rounded-2xl p-8 space-y-4">
          <h2>Cookies</h2>
          <p className="text-[#DADBE1]">
            We use essential cookies for site functionality and analytics cookies (with your consent) to improve user experience. Manage your cookie preferences in the banner at the bottom of the page.
          </p>
        </div>

        {/* Contact */}
        <div className="glass-card rounded-2xl p-8 space-y-4">
          <h2>Questions?</h2>
          <p className="text-[#DADBE1]">
            If you have any questions about how we handle your data, email us at <a href="mailto:privacy@whispr.com" className="text-[#9E0B61] hover:underline">privacy@whispr.com</a>.
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
