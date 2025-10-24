import { Link } from "react-router-dom";
import { 
  Home, 
  ShoppingBag, 
  Trophy, 
  User, 
  LayoutDashboard, 
  Upload, 
  CreditCard,
  ArrowRight,
  Component,
  Loader,
  Database,
  Palette,
  FileText,
  ShoppingCart,
  Sparkles
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

const pages = [
  {
    category: "Public Pages",
    pages: [
      {
        name: "Home / Explore",
        path: "/",
        icon: Home,
        description: "Landing page with hero, categories, and top creators",
      },
      {
        name: "Marketplace",
        path: "/marketplace",
        icon: ShoppingBag,
        description: "Browse all creators with filters and search",
      },
      {
        name: "Leaderboards",
        path: "/leaderboards",
        icon: Trophy,
        description: "Top earning creators by revenue and orders",
      },
      {
        name: "Creator Profile",
        path: "/profile/sophie-rose",
        icon: User,
        description: "Individual creator page with pricing tiers",
      },
      {
        name: "Become a Creator",
        path: "/become-creator",
        icon: Sparkles,
        description: "Landing page for creator onboarding",
        badge: "NEW",
      },
    ],
  },
  {
    category: "New User Flows",
    badge: "NEW",
    pages: [
      {
        name: "Request Flow v1",
        path: "/request",
        icon: FileText,
        description: "3-step checkout: Choose tier → Payment → Request form",
      },
      {
        name: "Buyer Dashboard",
        path: "/buyer/dashboard",
        icon: ShoppingCart,
        description: "Order tracking with status chips and file downloads",
      },
    ],
  },
  {
    category: "Creator Area",
    pages: [
      {
        name: "Creator Dashboard",
        path: "/creator/dashboard",
        icon: LayoutDashboard,
        description: "Full analytics, earnings, orders, and reviews",
      },
      {
        name: "Creator Upload",
        path: "/creator/upload",
        icon: Upload,
        description: "Upload new content and manage listings",
      },
    ],
  },
  {
    category: "Checkout & Payments",
    pages: [
      {
        name: "Checkout Page",
        path: "/checkout",
        icon: CreditCard,
        description: "Payment flow with Stripe integration",
      },
    ],
  },
  {
    category: "UI Library & Documentation",
    badge: "NEW",
    pages: [
      {
        name: "Component Library",
        path: "/ui/components",
        icon: Component,
        description: "All reusable components with code examples",
      },
      {
        name: "Loading States",
        path: "/ui/loading-states",
        icon: Loader,
        description: "Skeleton loaders and empty state templates",
      },
      {
        name: "Demo Content",
        path: "/ui/demo-content",
        icon: Database,
        description: "Sample creator profiles, reviews, and mock data",
      },
      {
        name: "Button Showcase",
        path: "/ui/buttons",
        icon: Palette,
        description: "All button styles and variants",
      },
    ],
  },
];

export function SiteIndexPage() {
  return (
    <main className="flex-1 py-12 px-4">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#9E0B61] to-[#74094A] mb-6">
            <span className="text-4xl">W</span>
          </div>
          <h1 className="text-4xl md:text-5xl">WHISPR Site Index</h1>
          <p className="text-[#DADBE1] text-lg max-w-2xl mx-auto">
            Complete navigation for all pages, flows, and components in the WHISPR platform
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-card rounded-2xl p-6 text-center">
            <p className="text-4xl mb-2">16</p>
            <p className="text-[#DADBE1]">Total Pages</p>
          </div>
          <div className="glass-card rounded-2xl p-6 text-center">
            <p className="text-4xl mb-2">7</p>
            <p className="text-[#DADBE1]">New Components</p>
          </div>
          <div className="glass-card rounded-2xl p-6 text-center">
            <p className="text-4xl mb-2">3</p>
            <p className="text-[#DADBE1]">User Flows</p>
          </div>
          <div className="glass-card rounded-2xl p-6 text-center">
            <p className="text-4xl mb-2">6</p>
            <p className="text-[#DADBE1]">Demo Creators</p>
          </div>
        </div>

        {/* Page Categories */}
        {pages.map((category, idx) => (
          <section key={idx} className="space-y-6">
            <div className="flex items-center gap-3">
              <h2>{category.category}</h2>
              {category.badge && (
                <Badge className="bg-gradient-to-r from-[#9E0B61] to-[#74094A]">
                  {category.badge}
                </Badge>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {category.pages.map((page, pageIdx) => {
                const Icon = page.icon;
                return (
                  <Link
                    key={pageIdx}
                    to={page.path}
                    className="group glass-card rounded-2xl p-6 hover:border-[#9E0B61]/50 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-[#9E0B61]/20 to-[#74094A]/20 group-hover:from-[#9E0B61]/30 group-hover:to-[#74094A]/30 transition-colors">
                        <Icon className="w-6 h-6 text-[#9E0B61]" />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4>{page.name}</h4>
                          {page.badge && (
                            <Badge 
                              variant="outline" 
                              className="bg-[#9E0B61]/10 text-[#9E0B61] border-[#9E0B61]/30 text-xs"
                            >
                              {page.badge}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-[#DADBE1] mb-3">{page.description}</p>
                        <div className="flex items-center gap-2 text-sm text-[#9E0B61] group-hover:gap-3 transition-all">
                          <span>View page</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}

        {/* New Features Summary */}
        <section className="glass-card rounded-2xl p-8 space-y-6">
          <h2>✨ What's New in This Build</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3>New Pages</h3>
              <ul className="space-y-2 text-[#DADBE1]">
                <li className="flex items-start gap-2">
                  <span className="text-[#19E28C] mt-1">•</span>
                  <span>Request Flow v1 - Complete 3-step checkout experience</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#19E28C] mt-1">•</span>
                  <span>Buyer Dashboard - Order tracking and management</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#19E28C] mt-1">•</span>
                  <span>Creator Dashboard Enhanced - Pricing & profile editor</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#19E28C] mt-1">•</span>
                  <span>Loading States - Skeleton loaders & empty states</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#19E28C] mt-1">•</span>
                  <span>Demo Content - 6 sample creator profiles</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#19E28C] mt-1">•</span>
                  <span>Component Library - Full documentation</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3>New Components</h3>
              <ul className="space-y-2 text-[#DADBE1]">
                <li className="flex items-start gap-2">
                  <span className="text-[#9E0B61] mt-1">•</span>
                  <span>StatusChip - Order status indicators</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#9E0B61] mt-1">•</span>
                  <span>TierCard - Interactive pricing cards</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#9E0B61] mt-1">•</span>
                  <span>ComplianceNotice - Safety messaging</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#9E0B61] mt-1">•</span>
                  <span>EmptyStateCard - Friendly empty states</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#9E0B61] mt-1">•</span>
                  <span>Form Fields - Dropdown, TextArea, Checkbox</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#9E0B61] mt-1">•</span>
                  <span>Toast Notifications - Success, error, info</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-[#3A3C43]">
            <h4 className="mb-3">Implementation Notes</h4>
            <p className="text-sm text-[#DADBE1]">
              All new components follow the WHISPR design system with liquid glass effects, 
              consistent spacing, and the purple brand gradient (#9E0B61 to #74094A). 
              Components are fully responsive and include proper accessibility attributes.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center glass-card rounded-2xl p-12 bg-gradient-to-br from-[#9E0B61]/10 to-[#74094A]/10 border-[#9E0B61]/20">
          <h2 className="mb-4">Ready to Explore?</h2>
          <p className="text-[#DADBE1] mb-8 max-w-2xl mx-auto">
            Check out the component library for code examples, or visit the demo content page 
            to see sample creator profiles in action.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="liquid-gradient">
              <Link to="/ui/components">
                <Component className="w-5 h-5" />
                View Component Library
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/ui/demo-content">
                <Database className="w-5 h-5" />
                View Demo Content
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
