import { Shield, AlertCircle, CheckCircle } from "lucide-react";
import { ComplianceNotice } from "../components/compliance-notice";

export function ModerationPolicyPage() {
  return (
    <main className="flex-1 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#9E0B61]/20 mb-4">
            <Shield className="w-8 h-8 text-[#9E0B61]" />
          </div>
          <h1>Moderation policy</h1>
          <p className="text-[#DADBE1] text-lg max-w-2xl mx-auto">
            WHISPR is a brand-safe platform for personalised voice and video content. We maintain strict guidelines to ensure a safe, professional environment for all users.
          </p>
        </div>

        <ComplianceNotice />

        {/* Permitted Content */}
        <div className="glass-card rounded-2xl p-8 space-y-6">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-[#19E28C] shrink-0 mt-1" />
            <div>
              <h2 className="mb-3">Permitted content</h2>
              <ul className="space-y-3 text-[#DADBE1]">
                <li className="flex items-start gap-2">
                  <span className="text-[#19E28C] shrink-0">•</span>
                  <span>Voice notes, personalised messages, and greetings</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#19E28C] shrink-0">•</span>
                  <span>Custom videos for birthdays, celebrations, and professional use</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#19E28C] shrink-0">•</span>
                  <span>UGC and voiceover content for brands and businesses</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#19E28C] shrink-0">•</span>
                  <span>ASMR, relaxation audio, and soothing content</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#19E28C] shrink-0">•</span>
                  <span>Professional requests including commercial voiceovers</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Prohibited Content */}
        <div className="glass-card rounded-2xl p-8 space-y-6 border border-[#FF4D6D]/30">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-[#FF4D6D] shrink-0 mt-1" />
            <div>
              <h2 className="mb-3">Prohibited content</h2>
              <p className="text-[#DADBE1] mb-4">
                The following content is strictly forbidden and will result in immediate account suspension:
              </p>
              <ul className="space-y-3 text-[#DADBE1]">
                <li className="flex items-start gap-2">
                  <span className="text-[#FF4D6D] shrink-0">•</span>
                  <span>Explicit sexual content, nudity, or adult material</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF4D6D] shrink-0">•</span>
                  <span>Hate speech, harassment, or discriminatory language</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF4D6D] shrink-0">•</span>
                  <span>Violence, threats, or harmful behaviour</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF4D6D] shrink-0">•</span>
                  <span>Illegal activities or content promoting harm</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF4D6D] shrink-0">•</span>
                  <span>Misleading, fraudulent, or deceptive practices</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Enforcement */}
        <div className="glass-card rounded-2xl p-8 space-y-4">
          <h2>Enforcement</h2>
          <p className="text-[#DADBE1]">
            All content is subject to review. We use a combination of automated systems and human moderation to maintain platform safety.
          </p>
          <div className="space-y-3 text-[#DADBE1]">
            <p><strong className="text-white">First violation:</strong> Warning and content removal</p>
            <p><strong className="text-white">Second violation:</strong> Temporary suspension (7-30 days)</p>
            <p><strong className="text-white">Third violation or severe breach:</strong> Permanent account termination</p>
          </div>
        </div>

        {/* Reporting */}
        <div className="glass-card rounded-2xl p-8 space-y-4">
          <h2>Report a problem</h2>
          <p className="text-[#DADBE1]">
            If you encounter content that violates our policies, please report it immediately using the "Report" button on the creator's profile or order page. All reports are reviewed within 24 hours.
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
