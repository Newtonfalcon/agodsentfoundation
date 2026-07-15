import React, { useState, useEffect } from "react";
import { navigation } from "../data/navigation";
import { Menu, X, Heart } from "lucide-react";

export default function Navbar({ activeSection, onNavigate, onOpenDonate }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuItemClick = (href) => {
    setIsMobileMenuOpen(false);
    if (href.startsWith("#")) {
      const sectionId = href.replace("#", "");
      onNavigate(sectionId);
    } else {
      onNavigate("home");
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-soft py-3 text-gray-900 border-b border-gray-100"
          : "bg-transparent py-5 text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Brand */}
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center gap-3 cursor-pointer group text-left focus:outline-none"
          >
            <div className="relative flex items-center justify-center w-12 h-12 sm:w-20 sm:h-20 rounded-full bg-white text-white font-bold text-base shadow-sm group-hover:scale-105 transition-all">
              <img src="/logo.png" alt="God Sent Foundation Logo" className="w-full h-auto object-contain" />
            </div>
            <div>
              <span
                className={`block font-extrabold text-base tracking-tight transition-colors ${
                  isScrolled ? "text-gray-900" : "text-white"
                }`}
              >
                AGODSENT
              </span>
              <span
                className={`block text-[9px] uppercase tracking-widest font-bold -mt-1 transition-colors ${
                  isScrolled ? "text-[#0B5ED7]" : "text-[#F4C542]"
                }`}
              >
                FOUNDATION
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navigation.menuItems.map((item) => {
              const sectionId = item.href.replace("#", "");
              const isCurrent = activeSection === sectionId || (sectionId === "" && activeSection === "home");
              return (
                <button
                  key={item.label}
                  onClick={() => handleMenuItemClick(item.href)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer focus:outline-none ${
                    isCurrent
                      ? isScrolled
                        ? "bg-[#0B5ED7]/10 text-[#0B5ED7]"
                        : "bg-white/25 text-[#F4C542]"
                      : isScrolled
                      ? "text-gray-600 hover:text-[#0B5ED7] hover:bg-gray-100/50"
                      : "text-gray-100 hover:text-[#F4C542] hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Call to Action Button */}
          <div className="hidden md:block">
            <button
              onClick={onOpenDonate}
              className="flex items-center gap-2 bg-[#0B5ED7] hover:bg-[#094cb0] text-white text-xs font-bold py-2.5 px-6 rounded-full shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer focus:outline-none"
            >
              <Heart className="w-3.5 h-3.5 text-[#F4C542] fill-[#F4C542]" />
              <span>{navigation.cta.label}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors focus:outline-none ${
                isScrolled ? "text-gray-900 hover:bg-gray-100" : "text-white hover:bg-white/10"
              }`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white text-gray-900 border-b border-gray-200 shadow-xl transition-all duration-300">
          <div className="px-4 pt-3 pb-6 space-y-2">
            {navigation.menuItems.map((item) => {
              const sectionId = item.href.replace("#", "");
              const isCurrent = activeSection === sectionId || (sectionId === "" && activeSection === "home");
              return (
                <button
                  key={item.label}
                  onClick={() => handleMenuItemClick(item.href)}
                  className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                    isCurrent
                      ? "bg-[#0B5ED7]/10 text-[#0B5ED7]"
                      : "text-gray-700 hover:bg-gray-50 hover:text-[#0B5ED7]"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            <div className="pt-4 border-t border-gray-100">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenDonate();
                }}
                className="flex items-center justify-center gap-2 w-full bg-[#0B5ED7] hover:bg-[#094cb0] text-white font-bold py-3 px-6 rounded-xl shadow-md"
              >
                <Heart className="w-5 h-5 text-[#F4C542] fill-[#F4C542]" />
                <span>{navigation.cta.label}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
