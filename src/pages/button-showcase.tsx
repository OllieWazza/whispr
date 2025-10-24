import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Heart, Download, Settings, Trash2, Check, ArrowRight, Plus, X } from "lucide-react";

export function ButtonShowcasePage() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        <div>
          <h1 className="text-white mb-2">WHISPR Button System</h1>
          <p className="text-white/60">
            Apple-inspired liquid glass design with proper contrast for all backgrounds
          </p>
        </div>

        {/* Dark Background Variants */}
        <div className="space-y-6">
          <h2 className="text-white">Buttons for Dark/Purple Backgrounds</h2>
          
          <Card className="bg-[#0e0e0e] border-[#3A3C43]">
            <CardHeader>
              <CardTitle className="text-white">Primary Actions - High Contrast</CardTitle>
              <CardDescription className="text-white/60">
                White glass buttons for maximum visibility on dark backgrounds
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap items-center gap-4">
                <Button>White Glass Primary</Button>
                <Button>
                  <Heart className="w-4 h-4" />
                  With Icon
                </Button>
                <Button>
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#0e0e0e] border-[#3A3C43]">
            <CardHeader>
              <CardTitle className="text-white">Secondary & Tertiary Actions</CardTitle>
              <CardDescription className="text-white/60">
                Glass variants with different tints for visual hierarchy
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <p className="text-white/60 text-sm">Purple Glass (secondary)</p>
                <div className="flex flex-wrap items-center gap-4">
                  <Button variant="glass">Purple Glass</Button>
                  <Button variant="glass">
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                </div>
              </div>
              
              <div className="space-y-3">
                <p className="text-white/60 text-sm">White Glass (tertiary)</p>
                <div className="flex flex-wrap items-center gap-4">
                  <Button variant="glass-white">White Glass</Button>
                  <Button variant="glass-white">
                    <Settings className="w-4 h-4" />
                    Settings
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-white/60 text-sm">Subtle Glass (low emphasis)</p>
                <div className="flex flex-wrap items-center gap-4">
                  <Button variant="secondary">Subtle</Button>
                  <Button variant="secondary">
                    <Settings className="w-4 h-4" />
                    Options
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#0e0e0e] border-[#3A3C43]">
            <CardHeader>
              <CardTitle className="text-white">Outline & Ghost</CardTitle>
              <CardDescription className="text-white/60">
                Minimal emphasis buttons for dark backgrounds
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <p className="text-white/60 text-sm">Glass Outline</p>
                <div className="flex flex-wrap items-center gap-4">
                  <Button variant="outline">Outline</Button>
                  <Button variant="outline">
                    <X className="w-4 h-4" />
                    Cancel
                  </Button>
                </div>
              </div>
              
              <div className="space-y-3">
                <p className="text-white/60 text-sm">Ghost (minimal)</p>
                <div className="flex flex-wrap items-center gap-4">
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="ghost">
                    <X className="w-4 h-4" />
                    Dismiss
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Light Background Variants */}
        <div className="space-y-6">
          <h2 className="text-white">Buttons for White/Light Backgrounds</h2>
          
          <Card className="bg-white border-[4px] border-black">
            <CardHeader>
              <CardTitle className="text-black">Primary Actions - Purple Gradient</CardTitle>
              <CardDescription className="text-black/60">
                Liquid gradient for high-contrast CTAs on light backgrounds
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="gradient">Purple Gradient</Button>
                <Button variant="gradient">
                  <ArrowRight className="w-4 h-4" />
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-[4px] border-black">
            <CardHeader>
              <CardTitle className="text-black">Secondary & Minimal Actions</CardTitle>
              <CardDescription className="text-black/60">
                Outline and ghost variants for white cards
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <p className="text-black/60 text-sm">Outline Light</p>
                <div className="flex flex-wrap items-center gap-4">
                  <Button variant="outline-light">Outline</Button>
                  <Button variant="outline-light">
                    <Settings className="w-4 h-4" />
                    Settings
                  </Button>
                </div>
              </div>
              
              <div className="space-y-3">
                <p className="text-black/60 text-sm">Ghost Light</p>
                <div className="flex flex-wrap items-center gap-4">
                  <Button variant="ghost-light">Ghost</Button>
                  <Button variant="ghost-light">
                    <X className="w-4 h-4" />
                    Cancel
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-black/60 text-sm">Link Light</p>
                <div className="flex flex-wrap items-center gap-4">
                  <Button variant="link-light">Learn More</Button>
                  <Button variant="link-light">
                    View Details
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Universal Variants */}
        <div className="space-y-6">
          <h2 className="text-white">Universal Action Buttons</h2>
          
          <Card className="bg-[#0e0e0e] border-[#3A3C43]">
            <CardHeader>
              <CardTitle className="text-white">Status & Action Buttons</CardTitle>
              <CardDescription className="text-white/60">
                Works on any background with proper glass effects
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="destructive">
                  <Trash2 className="w-4 h-4" />
                  Delete
                </Button>
                <Button variant="success">
                  <Check className="w-4 h-4" />
                  Confirm
                </Button>
                <Button variant="link">Text Link</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sizes */}
        <div className="space-y-6">
          <h2 className="text-white">All Sizes</h2>
          
          <Card className="bg-[#0e0e0e] border-[#3A3C43]">
            <CardHeader>
              <CardTitle className="text-white">Size Variations</CardTitle>
              <CardDescription className="text-white/60">
                From extra-small to extra-large with perfect icon alignment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-wrap items-center gap-4">
                <Button size="xs">Extra Small</Button>
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
                <Button size="xl">Extra Large</Button>
              </div>
              
              <div className="flex flex-wrap items-center gap-4">
                <Button size="xs">
                  <Plus className="w-3.5 h-3.5" />
                  XS
                </Button>
                <Button size="sm">
                  <Plus className="w-4 h-4" />
                  SM
                </Button>
                <Button size="default">
                  <Plus className="w-4 h-4" />
                  Default
                </Button>
                <Button size="lg">
                  <Plus className="w-5 h-5" />
                  LG
                </Button>
                <Button size="xl">
                  <Plus className="w-5 h-5" />
                  XL
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#0e0e0e] border-[#3A3C43]">
            <CardHeader>
              <CardTitle className="text-white">Icon Buttons</CardTitle>
              <CardDescription className="text-white/60">
                Perfect squares for icon-only actions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap items-center gap-4">
                <Button size="icon-sm" variant="glass">
                  <Heart className="w-4 h-4" />
                </Button>
                <Button size="icon">
                  <Heart className="w-5 h-5" />
                </Button>
                <Button size="icon-lg">
                  <Heart className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="flex flex-wrap items-center gap-4">
                <Button size="icon" variant="glass">
                  <Download className="w-5 h-5" />
                </Button>
                <Button size="icon" variant="glass-white">
                  <Settings className="w-5 h-5" />
                </Button>
                <Button size="icon" variant="destructive">
                  <Trash2 className="w-5 h-5" />
                </Button>
                <Button size="icon" variant="success">
                  <Check className="w-5 h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Real Examples */}
        <div className="space-y-6">
          <h2 className="text-white">Real-world Examples</h2>
          
          <div className="liquid-gradient p-8 rounded-2xl">
            <p className="text-white mb-4 text-sm">Purple Background Context</p>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="xl">Primary White Glass</Button>
              <Button variant="glass" size="lg">Secondary Purple Glass</Button>
              <Button variant="glass-white" size="lg">Tertiary White Glass</Button>
              <Button variant="outline">Minimal Outline</Button>
            </div>
          </div>

          <Card className="bg-white border-[4px] border-black">
            <CardHeader>
              <CardTitle className="text-black">White Card Context</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="gradient" size="lg">Purple Gradient CTA</Button>
                <Button variant="outline-light">Secondary Action</Button>
                <Button variant="ghost-light">Minimal Action</Button>
              </div>
              
              <div className="flex items-center gap-3">
                <Button fullWidth variant="gradient">
                  Full Width Primary
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
