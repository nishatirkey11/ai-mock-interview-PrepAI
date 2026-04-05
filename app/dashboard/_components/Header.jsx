"use client";
import { SignInButton, UserButton, SignedOut, SignedIn, useUser } from "@clerk/nextjs";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Bot } from "lucide-react";

function Header() {
  const path = usePathname();
  const { user } = useUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress;
  const isAdmin = userEmail === "nishatirkey0311@gmail.com";
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = useCallback(() => {
    if (typeof window !== "undefined") {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    }
  }, [lastScrollY]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);
      return () => window.removeEventListener("scroll", controlNavbar);
    }
  }, [controlNavbar]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
    
    // Prevent body scrolling when menu is open
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'unset';
  };

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/how-it-works", label: "How it works" },
    { href: "/about-us", label: "About us" },
  ];

  if (isAdmin) {
    navItems.push({ href: "/dashboard/admin", label: "Admin Panel" });
  }

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 
          flex justify-between items-center 
          p-4 sm:p-5 
          bg-white/70 backdrop-blur-xl border-b border-indigo-100/50
          shadow-[0_4px_30px_rgba(0,0,0,0.05)] z-50 
          transition-all duration-500 ease-out
          ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}
        `}
      >
        {/* Logo */}
        <Link 
          href="/" 
          className="flex items-center gap-3 group"
          aria-label="MockMate AI Home"
          onClick={closeMobileMenu}
        >
          <div className="p-2 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-indigo-500/30">
            <Bot className="text-white" size={24} />
          </div>
          <span className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-indigo-700 to-purple-600 bg-clip-text text-transparent tracking-tight">PrepAI</span>
        </Link>

        {/* Desktop Navigation */}
        <nav 
          className="hidden md:flex gap-2 lg:gap-4 items-center bg-gray-50/50 px-2 py-1.5 rounded-full border border-gray-200/50"
          aria-label="Main Navigation"
        >
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              path={path}
              href={item.href}
              label={item.label}
              onClick={closeMobileMenu}
            />
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="focus:outline-none p-2 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors"
            aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Desktop Authentication */}
        <div className="hidden md:block">
          <SignedOut>
            <SignInButton mode="modal">
              <button 
                className="
                  px-6 py-2.5 
                  bg-gradient-to-r from-indigo-600 to-purple-600 text-white 
                  rounded-full font-medium shadow-md shadow-indigo-500/20
                  hover:shadow-lg hover:shadow-indigo-500/40 hover:-translate-y-0.5
                  transition-all duration-300
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                "
              >
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <div className="hover:scale-105 transition-transform duration-300">
              <UserButton 
                afterSignOutUrl="/" 
                appearance={{
                  elements: {
                    userButtonAvatarBox: "w-10 h-10 ring-2 ring-indigo-100 shadow-md",
                  },
                }} 
              />
            </div>
          </SignedIn>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="
            fixed inset-0 top-0 
            bg-white/95 backdrop-blur-2xl z-40 md:hidden 
            overflow-hidden
            pt-24
            animate-in fade-in zoom-in-95 duration-300
          "
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          <div className="h-full overflow-y-auto pb-16 px-6">
            <nav className="space-y-3">
              {navItems.map((item) => (
                <NavItem
                  key={item.href}
                  path={path}
                  href={item.href}
                  label={item.label}
                  mobile
                  onClick={closeMobileMenu}
                />
              ))}

              {/* Mobile Authentication */}
              <div className="pt-8 mt-8 border-t border-gray-100">
                <SignedOut>
                  <SignInButton mode="modal">
                    <button 
                      className="
                        w-full px-6 py-4 
                        bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg
                        rounded-2xl font-bold shadow-xl shadow-indigo-500/20
                        hover:scale-[1.02] active:scale-95
                        transition-all duration-300
                      "
                      onClick={closeMobileMenu}
                    >
                      Sign In to Continue
                    </button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <div className="flex justify-center p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <UserButton 
                      afterSignOutUrl="/" 
                      appearance={{
                        elements: {
                          userButtonAvatarBox: "w-14 h-14 mx-auto ring-4 ring-indigo-100 shadow-xl",
                        },
                      }} 
                    />
                  </div>
                </SignedIn>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

function NavItem({ path, href, label, mobile, onClick }) {
  const isActive = path === href;
  
  return (
    <Link 
      href={href} 
      onClick={onClick}
      className={`
        block 
        transition-all duration-300 ease-out
        cursor-pointer 
        focus:outline-none 
        focus:ring-2 
        focus:ring-indigo-300
        ${mobile
          ? `w-full text-lg py-4 px-6 rounded-2xl font-medium ${isActive ? "bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100/50 scale-[1.02]" : "text-gray-600 hover:bg-gray-50"}`
          : `px-4 py-2 rounded-full text-sm font-semibold relative overflow-hidden group ${isActive ? "text-indigo-700 bg-white shadow-sm border border-gray-200/50" : "text-gray-600 hover:text-gray-900"}`
        }
      `}
    >
      {!mobile && !isActive && (
        <span className="absolute inset-0 bg-gray-200/50 rounded-full scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 -z-10"></span>
      )}
      {label}
    </Link>
  );
}

export default Header;