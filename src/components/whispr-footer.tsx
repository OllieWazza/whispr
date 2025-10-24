import { Facebook, Twitter, Instagram, Youtube, ChevronDown } from "lucide-react";
import whisprLogo from "figma:asset/b10b0041e74acd561a0e6d24f00ec15acfd7fa61.png";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";

export function WhisprFooter() {
  const [openSections, setOpenSections] = useState<string[]>([]);

  const toggleSection = (section: string) => {
    setOpenSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const footerSections = [
    {
      title: "For Buyers",
      links: [
        { label: "Browse Creators", href: "/marketplace" },
        { label: "Leaderboards", href: "/leaderboards" },
        { label: "Request Flow", href: "/request", badge: "NEW" },
        { label: "My Orders", href: "/buyer-dashboard", badge: "NEW" },
        { label: "How It Works", href: "#" },
        { label: "FAQs", href: "/help" },
      ]
    },
    {
      title: "For Creators",
      links: [
        { label: "Creator Dashboard", href: "/creator/dashboard" },
        { label: "Upload Content", href: "/creator/upload" },
        { label: "Become a Creator", href: "/become-creator" },
        { label: "Creator Guidelines", href: "#" },
        { label: "Support", href: "/help" },
      ]
    },
    {
      title: "Legal & Help",
      links: [
        { label: "Sign up", href: "/signup", badge: "NEW" },
        { label: "Sign in", href: "/signin" },
        { label: "Moderation Policy", href: "/moderation-policy" },
        { label: "Refunds", href: "/refunds" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Help Centre", href: "/help" },
        { label: "Terms of Service", href: "#" },
      ]
    }
  ];

  return (
    <footer className="bg-background mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Brand Section - Always Visible */}
        <div className="mb-8 flex flex-col items-center">
          <div className="mb-6 transition-transform duration-300 hover:scale-105">
            <img 
              src={whisprLogo} 
              alt="WHISPR" 
              className="h-12"
            />
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-white/60 hover:text-[#9E0B61] transition-colors duration-200">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="#" className="text-white/60 hover:text-[#9E0B61] transition-colors duration-200">
              <Twitter className="w-6 h-6" />
            </a>
            <a href="#" className="text-white/60 hover:text-[#9E0B61] transition-colors duration-200">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="#" className="text-white/60 hover:text-[#9E0B61] transition-colors duration-200">
              <Youtube className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Mobile: Collapsible Sections */}
        <div className="md:hidden space-y-3 mb-8">
          {footerSections.map((section) => (
            <div key={section.title} className="border border-white/10 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleSection(section.title)}
                className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 transition-colors"
              >
                <span style={{ fontWeight: 600 }}>{section.title}</span>
                <ChevronDown 
                  className={`w-5 h-5 transition-transform ${
                    openSections.includes(section.title) ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <AnimatePresence>
                {openSections.includes(section.title) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <ul className="p-4 pt-0 space-y-2 text-sm text-muted-foreground">
                      {section.links.map((link) => (
                        <li key={link.label}>
                          {link.href.startsWith('/') ? (
                            <Link 
                              to={link.href} 
                              className="hover:text-primary hover:translate-x-1 transition-all duration-300 inline-block py-1 flex items-center gap-2"
                            >
                              {link.label}
                              {link.badge && (
                                <span className="text-[10px] px-1.5 py-0.5 bg-[#9E0B61] text-white rounded">
                                  {link.badge}
                                </span>
                              )}
                            </Link>
                          ) : (
                            <a 
                              href={link.href} 
                              className="hover:text-primary hover:translate-x-1 transition-all duration-300 inline-block py-1"
                            >
                              {link.label}
                            </a>
                          )}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Desktop: Grid Layout */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 mb-8">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="mb-4" style={{ fontWeight: 600 }}>{section.title}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith('/') ? (
                      <Link 
                        to={link.href} 
                        className="hover:text-primary hover:translate-x-1 transition-all duration-300 inline-block flex items-center gap-2"
                      >
                        {link.label}
                        {link.badge && (
                          <span className="text-[10px] px-1.5 py-0.5 bg-[#9E0B61] text-white rounded">
                            {link.badge}
                          </span>
                        )}
                      </Link>
                    ) : (
                      <a 
                        href={link.href} 
                        className="hover:text-primary hover:translate-x-1 transition-all duration-300 inline-block"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
            © 2025 WHISPR. All rights reserved.
          </p>
          <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-all duration-300">Cookie Settings</a>
            <a href="#" className="hover:text-primary transition-all duration-300">Accessibility</a>
            <a href="#" className="hover:text-primary transition-all duration-300">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
