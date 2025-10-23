/**
 * WHISPR Button System - Apple Liquid Glass Design
 * 
 * All buttons feature glassmorphism with backdrop blur for that premium Apple feel.
 * 
 * VARIANTS (with proper contrast):
 * 
 * FOR DARK/PURPLE BACKGROUNDS:
 * - default: White glass button (high contrast, primary CTA)
 * - glass: Purple-tinted glass (secondary actions)
 * - glass-white: White-tinted glass (tertiary actions)
 * - outline: Glass outline (minimal emphasis)
 * - secondary: Subtle glass fill (low emphasis)
 * - ghost: Minimal glass hover (text-like)
 * 
 * FOR WHITE/LIGHT BACKGROUNDS:
 * - gradient: Purple gradient (primary CTA)
 * - outline-light: Black outline (secondary)
 * - ghost-light: Black ghost (minimal)
 * - link-light: Purple text link
 * 
 * UNIVERSAL:
 * - destructive: Red glass (delete/cancel)
 * - success: Green glass (confirm)
 * - link: White text link (dark bg)
 * 
 * SIZES:
 * xs: 8px | sm: 9px | default: 11px | lg: 12px | xl: 14px
 * icon: 11px square | icon-sm: 9px square | icon-lg: 12px square
 * 
 * EXAMPLES:
 * <Button>White Glass CTA</Button> // On purple/dark bg
 * <Button variant="gradient">Purple CTA</Button> // On white bg
 * <Button variant="glass">Purple Glass</Button> // On dark bg
 * <Button size="icon" variant="glass-white"><Heart /></Button>
 */

import * as React from "react";
import { Slot } from "@radix-ui/react-slot@1.1.2";
import { cva, type VariantProps } from "class-variance-authority@0.7.1";

import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2.5 whitespace-nowrap font-medium disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 rounded-full transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
  {
    variants: {
      variant: {
        // Primary - White glass button (for dark/purple backgrounds)
        default: "bg-white/90 backdrop-blur-[20px] text-[#9E0B61] border border-white/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.7)] hover:bg-white/95 hover:scale-[1.03] active:scale-[0.97] transition-all duration-200",
        
        // Glass Purple - Liquid glass with purple tint (for dark backgrounds)
        glass: "bg-[#9E0B61]/10 backdrop-blur-[20px] text-white border border-white/15 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] hover:bg-[#9E0B61]/20 hover:border-white/25 hover:scale-[1.03] active:scale-[0.97] transition-all duration-200",
        
        // Glass White - Liquid glass with white tint (for dark backgrounds)
        "glass-white": "bg-white/10 backdrop-blur-[20px] text-white border border-white/20 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] hover:bg-white/20 hover:border-white/30 hover:scale-[1.03] active:scale-[0.97] transition-all duration-200",
        
        // Gradient - Purple gradient (for white backgrounds)
        gradient: "liquid-gradient text-white border border-[#9E0B61]/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)] hover:scale-[1.03] active:scale-[0.97] transition-all duration-200",
        
        // Outline - Glass outline (for dark backgrounds)
        outline: "bg-transparent backdrop-blur-[12px] border-2 border-white/25 text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] hover:bg-white/10 hover:border-white/35 hover:scale-[1.02] active:bg-white/15 active:scale-[0.98] transition-all duration-200",
        
        // Outline Light - For white/light backgrounds
        "outline-light": "bg-transparent backdrop-blur-[12px] border-2 border-black/25 text-black shadow-[inset_0_1px_0_0_rgba(0,0,0,0.05)] hover:bg-black/5 hover:border-black/35 hover:scale-[1.02] active:bg-black/10 active:scale-[0.98] transition-all duration-200",
        
        // Secondary - Subtle glass (for dark backgrounds)
        secondary: "bg-white/5 backdrop-blur-[16px] text-white border border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] hover:bg-white/10 hover:border-white/15 hover:scale-[1.02] active:bg-white/15 active:scale-[0.98] transition-all duration-200",
        
        // Ghost - Minimal glass hover (for dark backgrounds)
        ghost: "bg-transparent text-white hover:bg-white/10 hover:backdrop-blur-[12px] hover:scale-[1.02] active:bg-white/15 active:scale-[0.98] transition-all duration-200",
        
        // Ghost Light - For light backgrounds
        "ghost-light": "bg-transparent text-black hover:bg-black/5 hover:backdrop-blur-[12px] hover:scale-[1.02] active:bg-black/10 active:scale-[0.98] transition-all duration-200",
        
        // Destructive - Glass with red tint
        destructive: "bg-[#FF4D6D]/90 backdrop-blur-[20px] text-white border border-[#FF4D6D]/40 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)] hover:bg-[#FF4D6D] hover:scale-[1.03] active:scale-[0.97] transition-all duration-200",
        
        // Success - Glass with green tint
        success: "bg-[#19E28C]/90 backdrop-blur-[20px] text-black border border-[#19E28C]/40 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3)] hover:bg-[#19E28C] hover:scale-[1.03] active:scale-[0.97] transition-all duration-200",
        
        // Link - Text only
        link: "text-white/80 underline-offset-4 hover:underline hover:text-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-200",
        
        // Link Light - For light backgrounds
        "link-light": "text-[#9E0B61] underline-offset-4 hover:underline hover:text-[#9E0B61]/80 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200",
      },
      size: {
        // Extra small - For compact UIs
        xs: "h-8 px-3 text-sm gap-1.5 [&_svg]:size-3.5",
        
        // Small - Compact buttons
        sm: "h-9 px-4 text-sm gap-2 [&_svg]:size-4",
        
        // Default/Medium - Standard size
        default: "h-11 px-6 text-base gap-2.5 [&_svg]:size-4",
        
        // Large - Prominent CTAs
        lg: "h-12 px-8 text-base gap-2.5 [&_svg]:size-5",
        
        // Extra Large - Hero CTAs
        xl: "h-14 px-10 text-lg gap-3 [&_svg]:size-5",
        
        // Icon only - Circular buttons (pill style)
        icon: "size-11 [&_svg]:size-5",
        
        // Small icon
        "icon-sm": "size-9 [&_svg]:size-4",
        
        // Large icon
        "icon-lg": "size-12 [&_svg]:size-5",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      fullWidth: false,
    },
  },
);

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
      asChild?: boolean;
    }
>(({ className, variant, size, fullWidth, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      data-slot="button"
      className={cn(buttonVariants({ variant, size, fullWidth, className }))}
      {...props}
    />
  );
});

Button.displayName = "Button";

export { Button, buttonVariants };
