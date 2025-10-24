import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search, Menu, X, Home, Store, Upload, LayoutDashboard, User, Trophy, ShoppingCart, FileText, LogOut } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import whisprLogo from "figma:asset/b10b0041e74acd561a0e6d24f00ec15acfd7fa61.png";
import whisprFullLogo from "figma:asset/98f9a622b461f32dde6404ec27a9f42267c7713d.png";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "../contexts/AuthContext";

export function Header() {
  const { user, profile, signOut } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);
  const desktopMenuRef = useRef<HTMLDivElement>(null);
  
  const isCreator = profile?.user_type === 'creator';
  const isBuyer = profile?.user_type === 'buyer';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  // Close desktop menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (desktopMenuRef.current && !desktopMenuRef.current.contains(event.target as Node)) {
        setIsDesktopMenuOpen(false);
      }
    };

    if (isDesktopMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDesktopMenuOpen]);

  // Dynamic menu items based on user type
  const getMenuItems = () => {
    if (!user) {
      // Guest user menu
      return [
        { icon: Home, label: "Home", path: "/" },
        { icon: Store, label: "Marketplace", path: "/marketplace" },
        { icon: Trophy, label: "Leaderboards", path: "/leaderboards" },
        { icon: FileText, label: "Request Flow", path: "/request" },
      ];
    }

    if (isCreator) {
      // Creator menu
      return [
        { icon: Home, label: "Home", path: "/" },
        { icon: Store, label: "Marketplace", path: "/marketplace" },
        { icon: Trophy, label: "Leaderboards", path: "/leaderboards" },
        { icon: LayoutDashboard, label: "Dashboard", path: "/creator/dashboard" },
        { icon: Upload, label: "Upload Content", path: "/creator/upload" },
        { icon: User, label: "My Profile", path: `/profile/${user.id}` },
      ];
    }

    if (isBuyer) {
      // Buyer menu (no leaderboards)
      return [
        { icon: Home, label: "Home", path: "/" },
        { icon: Store, label: "Marketplace", path: "/marketplace" },
        { icon: ShoppingCart, label: "My Dashboard", path: "/buyer-dashboard" },
        { icon: User, label: "My Profile", path: "/buyer-dashboard" },
      ];
    }

    return [
      { icon: Home, label: "Home", path: "/" },
      { icon: Store, label: "Marketplace", path: "/marketplace" },
    ];
  };

  const menuItems = getMenuItems();

  return (
    <>
      <header 
        className={`sticky top-0 z-50 w-full transition-all duration-500 ease-out ${
          isScrolled 
            ? "bg-[#9E0B61]/80 backdrop-blur-2xl border-b border-white/10 shadow-2xl" 
            : "bg-[#9E0B61] border-b border-white/5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-3 sm:gap-6">
          {/* Left - Logo */}
          <div className="flex items-center shrink-0">
            <Link to="/" className="transition-transform duration-300 hover:scale-105">
              <img 
                src={whisprLogo} 
                alt="WHISPR" 
                className="h-8 sm:h-10"
              />
            </Link>
          </div>

          {/* Center - Search Bar (hidden on mobile, shown on md+) */}
          <div className="hidden md:flex flex-1 max-w-xl mx-4">
            <div className="relative group w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60 transition-all duration-300" />
              <Input 
                placeholder="Search for creators…" 
                className="pl-11 pr-4 h-11 rounded-full bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 focus:border-white/40 backdrop-blur-xl transition-all duration-300 w-full"
              />
            </div>
          </div>

          {/* Right - Actions */}
          <div className="flex items-center gap-2 sm:gap-3 justify-end">
            {/* Only show "Become a creator" if not logged in or if user is a buyer */}
            {(!user || isBuyer) && (
              <Link to="/become-creator">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="hidden lg:flex text-sm"
                >
                  Become a creator
                </Button>
              </Link>
            )}

            {/* Desktop Menu Button - Liquid Dropdown */}
            <div className="hidden lg:block relative" ref={desktopMenuRef}>
              <Button
                variant="ghost"
                className="shrink-0 h-10 px-3"
                onClick={() => setIsDesktopMenuOpen(!isDesktopMenuOpen)}
              >
                <div className="w-20 h-5 flex items-center justify-center overflow-hidden">
                  <AnimatePresence mode="wait" initial={false}>
                    {isDesktopMenuOpen ? (
                      <motion.img
                        key="logo"
                        src={whisprFullLogo}
                        alt="WHISPR"
                        initial={{ opacity: 0, rotate: -180, scale: 0.5 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        exit={{ opacity: 0, rotate: 180, scale: 0.5 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="h-5 w-auto object-contain"
                      />
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ opacity: 0, rotate: 180, scale: 0.5 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        exit={{ opacity: 0, rotate: -180, scale: 0.5 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <Menu className="w-5 h-5" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Button>

              <AnimatePresence>
                {isDesktopMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-3 w-96 rounded-2xl shadow-2xl overflow-hidden z-50"
                    style={{
                      background: 'rgba(14, 14, 14, 0.95)',
                      backdropFilter: 'blur(40px)',
                      WebkitBackdropFilter: 'blur(40px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    <div className="p-6 space-y-2">
                      {menuItems.map((item, index) => (
                        <motion.div
                          key={item.path}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05, duration: 0.2 }}
                        >
                          <Link
                            to={item.path}
                            onClick={() => setIsDesktopMenuOpen(false)}
                            className="flex items-center gap-4 px-5 py-4 rounded-full text-white/90 hover:text-white hover:bg-white/10 hover:scale-105 transition-all duration-200 group"
                          >
                            <item.icon className="w-5 h-5 text-white transition-transform" />
                            <span className="text-base">{item.label}</span>
                            {item.badge && (
                              <span className="ml-auto text-xs px-2 py-0.5 bg-[#9E0B61] rounded-full">
                                {item.badge}
                              </span>
                            )}
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.2 }}
                      className="p-6 pt-4 border-t border-white/10 bg-white/5"
                    >
                      {user ? (
                        <Button 
                          fullWidth 
                          size="lg"
                          variant="outline"
                          onClick={() => {
                            signOut();
                            setIsDesktopMenuOpen(false);
                          }}
                          className="gap-2"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign out
                        </Button>
                      ) : (
                        <Link to="/signin" onClick={() => setIsDesktopMenuOpen(false)}>
                          <Button 
                            fullWidth 
                            size="lg"
                          >
                            Sign in
                          </Button>
                        </Link>
                      )}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden shrink-0"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-0 z-50 bg-[#0e0e0e]"
          >
            {/* Header with Logo and Close */}
            <div className="bg-gradient-to-b from-[#9E0B61] to-[#9E0B61]/80 border-b border-white/10 px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                <img 
                  src={whisprLogo} 
                  alt="WHISPR" 
                  className="h-8 sm:h-10"
                />
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="w-6 h-6 text-white" />
              </Button>
            </div>

            {/* Menu Content */}
            <motion.div 
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.1 }}
              className="h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)] overflow-y-auto"
            >
              {/* Search Bar - Mobile Only */}
              <div className="p-6 md:hidden border-b border-border">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
                  <Input 
                    placeholder="Search for creators…" 
                    className="pl-11 pr-4 h-11 rounded-full bg-white/5 border-white/10 text-white placeholder:text-white/60 focus:bg-white/10 focus:border-white/20"
                  />
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="p-6 space-y-2">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-4 px-4 py-4 rounded-xl text-white/80 hover:text-white hover:bg-white/5 transition-all duration-200 group"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#9E0B61] flex items-center justify-center group-hover:scale-110 transition-transform">
                        <item.icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-lg">{item.label}</span>
                      {item.badge && (
                        <span className="ml-auto text-xs px-2 py-1 bg-[#9E0B61] rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Action Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="p-6 mt-auto border-t border-border space-y-3"
              >
                {user ? (
                  <Button 
                    fullWidth 
                    size="lg"
                    variant="outline"
                    onClick={() => {
                      signOut();
                      setIsMobileMenuOpen(false);
                    }}
                    className="gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign out
                  </Button>
                ) : (
                  <>
                    <Link to="/signin" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button 
                        fullWidth 
                        size="lg"
                      >
                        Sign in
                      </Button>
                    </Link>
                    <Link to="/become-creator" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button 
                        variant="outline" 
                        fullWidth 
                        size="lg"
                      >
                        Become a creator
                      </Button>
                    </Link>
                  </>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
