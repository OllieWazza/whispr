"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs@1.1.3";

import { cn } from "./utils";

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  const [activeRect, setActiveRect] = React.useState<DOMRect | null>(null);
  const [containerRect, setContainerRect] = React.useState<DOMRect | null>(null);
  const listRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const updateActiveRect = () => {
      if (!listRef.current) return;
      
      const container = listRef.current.getBoundingClientRect();
      setContainerRect(container);
      
      const activeTab = listRef.current.querySelector('[data-state="active"]');
      if (activeTab) {
        const rect = activeTab.getBoundingClientRect();
        setActiveRect(rect);
      }
    };

    updateActiveRect();
    
    // Use MutationObserver to watch for state changes
    const observer = new MutationObserver(updateActiveRect);
    if (listRef.current) {
      observer.observe(listRef.current, {
        attributes: true,
        subtree: true,
        attributeFilter: ['data-state'],
      });
    }

    window.addEventListener('resize', updateActiveRect);
    
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateActiveRect);
    };
  }, []);

  return (
    <TabsPrimitive.List
      ref={listRef}
      data-slot="tabs-list"
      className={cn(
        "relative inline-flex h-11 w-fit items-center justify-center rounded-2xl p-1 bg-[#0e0e0e]/80 backdrop-blur-xl border border-[#3A3C43]",
        className,
      )}
      {...props}
    >
      {/* Animated slider background */}
      {activeRect && containerRect && (
        <div
          className="absolute bg-gradient-to-br from-[#9E0B61]/90 to-[#74094A]/90 backdrop-blur-xl rounded-xl border border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] transition-all duration-300 ease-out"
          style={{
            left: activeRect.left - containerRect.left,
            top: activeRect.top - containerRect.top,
            width: activeRect.width,
            height: activeRect.height,
          }}
        />
      )}
      {props.children}
    </TabsPrimitive.List>
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "relative z-10 inline-flex h-9 flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm whitespace-nowrap transition-all duration-300",
        "text-[#DADBE1] hover:text-white",
        "data-[state=active]:text-white",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9E0B61]/50",
        "disabled:pointer-events-none disabled:opacity-50",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
