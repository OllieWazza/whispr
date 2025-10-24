import { HelpCircle, MessageCircle, Mail, Search } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useState } from "react";

export function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const faqs = [
    {
      question: "How do I place an order?",
      answer: "Browse creators in the marketplace, select a creator you like, choose a tier (package), and fill in your custom request details. Payment is processed securely via Stripe before the creator starts work."
    },
    {
      question: "How long does delivery take?",
      answer: "Delivery times vary by tier: Basic (5 days), Standard (3 days), Premium (24 hours). Creators may deliver earlier. You'll receive email notifications when your order is ready."
    },
    {
      question: "Can I request a refund?",
      answer: "Yes, refunds are available if the creator fails to deliver on time, the content doesn't match your request, or there are technical issues. Requests must be made within 14 days of delivery. See our Refunds page for full details."
    },
    {
      question: "What content is allowed on WHISPR?",
      answer: "WHISPR permits voice notes, custom videos, UGC content, voiceovers, ASMR, and professional requests. Explicit sexual content, nudity, hate speech, and illegal material are strictly prohibited. All creators are 18+ verified."
    },
    {
      question: "How do I become a creator?",
      answer: "Click 'Become a creator' in the navigation, complete the sign-up form with your details and portfolio samples, and submit for review. We'll verify your identity and approve your profile within 2–3 business days."
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="flex-1 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#9E0B61]/20 mb-4">
            <HelpCircle className="w-8 h-8 text-[#9E0B61]" />
          </div>
          <h1>Help centre</h1>
          <p className="text-[#DADBE1] text-lg max-w-2xl mx-auto">
            Find answers to common questions or get in touch with our support team.
          </p>
        </div>

        {/* Search */}
        <div className="glass-card rounded-2xl p-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#DADBE1]" />
            <Input
              type="text"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14"
            />
          </div>
        </div>

        {/* FAQs */}
        <div className="glass-card rounded-2xl p-8 space-y-6">
          <h2>Frequently asked questions</h2>
          
          {filteredFaqs.length > 0 ? (
            <Accordion type="single" collapsible className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="glass-button rounded-xl px-6 py-2 border border-white/10"
                >
                  <AccordionTrigger className="text-left hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[#DADBE1] pt-2">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <p className="text-[#DADBE1] text-center py-8">
              No results found for "{searchQuery}". Try different keywords or contact support.
            </p>
          )}
        </div>

        {/* Quick Links */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="glass-card rounded-2xl p-6 space-y-3">
            <h3>For buyers</h3>
            <ul className="space-y-2 text-[#DADBE1] text-sm">
              <li><a href="/marketplace" className="hover:text-white transition-colors">• Browse creators</a></li>
              <li><a href="/buyer-dashboard" className="hover:text-white transition-colors">• View your orders</a></li>
              <li><a href="/refunds" className="hover:text-white transition-colors">• Refund policy</a></li>
            </ul>
          </div>
          <div className="glass-card rounded-2xl p-6 space-y-3">
            <h3>For creators</h3>
            <ul className="space-y-2 text-[#DADBE1] text-sm">
              <li><a href="/become-creator" className="hover:text-white transition-colors">• Apply to join</a></li>
              <li><a href="/creator-dashboard" className="hover:text-white transition-colors">• Creator dashboard</a></li>
              <li><a href="/moderation-policy" className="hover:text-white transition-colors">• Moderation policy</a></li>
            </ul>
          </div>
        </div>

        {/* Contact Support */}
        <div className="glass-card rounded-2xl p-8 space-y-6">
          <div className="flex items-center gap-3">
            <MessageCircle className="w-6 h-6 text-[#9E0B61]" />
            <h2>Still need help?</h2>
          </div>
          <p className="text-[#DADBE1]">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="group">
              <Mail className="w-5 h-5" />
              Email support
            </Button>
            <Button variant="glass-white" size="lg">
              <MessageCircle className="w-5 h-5" />
              Live chat
            </Button>
          </div>
          <p className="text-sm text-[#DADBE1]">
            Average response time: 2–4 hours
          </p>
        </div>

        {/* Additional Resources */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="mb-4">Legal & policies</h3>
          <div className="grid sm:grid-cols-3 gap-3 text-sm">
            <a href="/privacy" className="text-[#DADBE1] hover:text-white transition-colors">
              → Privacy policy
            </a>
            <a href="/moderation-policy" className="text-[#DADBE1] hover:text-white transition-colors">
              → Moderation policy
            </a>
            <a href="/refunds" className="text-[#DADBE1] hover:text-white transition-colors">
              → Refunds
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
