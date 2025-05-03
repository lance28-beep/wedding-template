'use client';

import type React from 'react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaHeart, FaChevronUp } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';
import { Button } from './button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "./sheet";

interface NavItem {
  label: string;
  href: string;
}

interface NavBarProps {
  navItems: NavItem[];
  logo?: string;
  coupleNameShort?: string;
}

const NavBar: React.FC<NavBarProps> = ({
  navItems,
  logo,
  coupleNameShort = "D & K"
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [mounted, setMounted] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle scroll events to update navbar appearance and visibility
  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      if (typeof window === 'undefined') return;
      
      const scrollPosition = window.scrollY;
      
      // Show/hide navbar based on scroll direction
      if (scrollPosition > lastScrollY && scrollPosition > 100) {
        setIsNavVisible(false);
      } else {
        setIsNavVisible(true);
      }
      setLastScrollY(scrollPosition);
      
      // Update scrolled state
      setIsScrolled(scrollPosition > 50);
      
      // Show scroll to top button
      setShowScrollTop(scrollPosition > 500);
      
      // Update active section based on scroll position
      updateActiveSection(scrollPosition);
    };

    const updateActiveSection = (scrollPosition: number) => {
      const sections = navItems.map(item => {
        const id = item.href.substring(1);
        const element = document.getElementById(id);
        return { id, element };
      }).filter(section => section.element);
      
      if (sections.length === 0) return;
      
      // Find the section that is currently in view
      let currentSection = sections[0].id;
      
      for (const section of sections) {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          const offset = navRef.current ? navRef.current.offsetHeight : 0;
          
          // If the section's top is above the middle of the viewport
          if (rect.top <= offset + 100) {
            currentSection = section.id;
          }
        }
      }
      
      setActiveSection(currentSection);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      // Initial call to set active section
      handleScroll();
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [navItems, lastScrollY, mounted]);

  // Scroll to section when clicking nav item
  const scrollToSection = (sectionId: string) => {
    if (!mounted || typeof window === 'undefined') return;
    
    const section = document.getElementById(sectionId);
    if (section) {
      const navHeight = navRef.current ? navRef.current.offsetHeight : 0;
      const targetPosition = section.offsetTop - navHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
      
      setActiveSection(sectionId);
      setIsMobileOpen(false);
    }
  };

  // Scroll to top function
  const scrollToTop = () => {
    if (!mounted || typeof window === 'undefined') return;
    
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* Desktop Navigation */}
      <motion.header
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg py-2' 
            : 'bg-transparent py-4'
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <nav className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo or Couple Initials */}
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {logo ? (
              <img src={logo} alt="Wedding Logo" className="h-12 w-auto" />
            ) : (
              <div 
                className={`text-3xl font-bold playfair flex items-center cursor-pointer ${
                  isScrolled
                    ? 'text-navy dark:text-white'
                    : 'text-white'
                }`}
                onClick={scrollToTop}
              >
                {coupleNameShort}
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                >
                  <FaHeart className="text-navy dark:text-white ml-2 text-base" />
                </motion.div>
              </div>
            )}
          </motion.div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-10">
            {navItems.map((item) => (
              <motion.button
                key={item.href}
                className={`text-sm uppercase tracking-wider figtree font-medium transition-colors relative ${
                  activeSection === item.href.substring(1)
                    ? 'text-navy dark:text-white'
                    : isScrolled
                    ? 'text-navy/80 dark:text-gray-300 hover:text-navy dark:hover:text-white'
                    : 'text-white/90 hover:text-white'
                }`}
                onClick={() => scrollToSection(item.href.substring(1))}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
                {activeSection === item.href.substring(1) && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-navy dark:bg-white"
                    layoutId="underline"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ 
                      duration: 0.5,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Theme Toggle - Desktop */}
          <div className="hidden md:block">
            <ThemeToggle />
          </div>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden">
            <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`${
                    isScrolled 
                      ? 'text-navy dark:text-gray-300 hover:text-navy dark:hover:text-white' 
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  <FaBars className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent 
                side="right" 
                className="w-[80%] sm:w-[350px] bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-l dark:border-gray-800"
              >
                <MobileNav
                  navItems={navItems}
                  activeSection={activeSection}
                  onNavItemClick={scrollToSection}
                />
                <div className="absolute bottom-8 left-0 right-0 flex justify-center">
                  <ThemeToggle />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </motion.header>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            className="fixed bottom-8 right-8 z-50 bg-navy/90 hover:bg-navy text-white p-3 rounded-full shadow-lg backdrop-blur-sm"
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaChevronUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

interface MobileNavProps {
  navItems: NavItem[];
  activeSection: string;
  onNavItemClick: (sectionId: string) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ navItems, activeSection, onNavItemClick }) => {
  return (
    <div className="flex flex-col h-full pt-12">
      <div className="text-3xl font-bold mb-12 playfair text-center text-navy dark:text-white">Menu</div>

      <div className="space-y-8 flex flex-col items-center">
        {navItems.map((item) => (
          <motion.button
            key={item.href}
            className={`text-xl uppercase tracking-wider figtree font-medium transition-colors relative ${
              activeSection === item.href.substring(1)
                ? 'text-navy dark:text-white'
                : 'text-navy/80 dark:text-gray-300 hover:text-navy dark:hover:text-white'
            }`}
            onClick={() => onNavItemClick(item.href.substring(1))}
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            {item.label}
            {activeSection === item.href.substring(1) && (
              <motion.div
                className="absolute -left-6 top-1/2 w-2 h-2 bg-navy dark:bg-white rounded-full"
                layoutId="mobileIndicator"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default NavBar;
