import React, { useState, useEffect } from 'react';
import { FiMenu, FiX, FiMail, FiPhone } from 'react-icons/fi';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import Logo from './Logo';

export default function Navbar({ activeSection, setActiveSection }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'products', label: 'Products' },
    { id: 'about', label: 'About Us' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (id) => {
    setActiveSection(id);
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of sticky navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* Top Banner Contact Info */}
      <div className="bg-primary-900 text-white/90 py-1.5 px-4 text-xs sm:text-sm border-b border-white/5 transition-all">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1.5">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <FiPhone className="text-amber-400" /> +91 94937 09757
            </span>
            <span className="hidden md:flex items-center gap-1">
              <FiMail className="text-amber-400" /> info@pvpinternational.co.in
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href="https://www.indiamart.com/pvp-international-visakhapatnam/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-semibold px-2 py-0.5 rounded text-[11px] border border-amber-500/30 transition-colors"
            >
              IndiaMART Verified Wholesaler
            </a>
            <div className="flex items-center gap-2 border-l border-white/15 pl-3">
              <a 
                href="https://www.facebook.com/pvpinternational" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white/60 hover:text-blue-400 transition-colors"
                title="Facebook"
              >
                <FaFacebook className="text-sm" />
              </a>
              <a 
                href="https://www.instagram.com/pvpinternational" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white/60 hover:text-pink-400 transition-colors"
                title="Instagram"
              >
                <FaInstagram className="text-sm" />
              </a>
              <a 
                href="https://wa.me/919493709757" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white/60 hover:text-emerald-400 transition-colors"
                title="WhatsApp"
              >
                <FaWhatsapp className="text-sm" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Glassmorphic Navbar */}
      <nav
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'glass-navbar shadow-md py-3'
            : 'bg-white/90 backdrop-blur-sm py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => handleNavClick('home')}
            >
              <Logo className="w-10 h-10 group-hover:rotate-12" variant="color" />
              <div>
                <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary-800 to-primary-600 bg-clip-text text-transparent">
                  PVP
                </span>
                <span className="text-xl font-semibold text-primary-600 ml-1">
                  International
                </span>
                <p className="text-[10px] text-primary-600 font-medium tracking-widest uppercase -mt-1">
                  Trust & Sourcing
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-sm font-semibold tracking-wide transition-all relative py-1 ${
                    activeSection === item.id
                      ? 'text-primary-600 font-bold'
                      : 'text-gray-600 hover:text-primary-600'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-amber-500 rounded-full" />
                  )}
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <button
                onClick={() => handleNavClick('inquiry')}
                className="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-md shadow-primary-600/10 hover:shadow-lg active:scale-95 transition-all"
              >
                Request Quote
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-gray-600 hover:text-primary-600 hover:bg-primary-50 focus:outline-none"
              >
                {isMobileMenuOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-xl py-4 px-4 flex flex-col gap-3 z-50 animate-fadeIn">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  activeSection === item.id
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('inquiry')}
              className="w-full text-center bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-xl font-semibold text-sm mt-2 transition-all shadow-md"
            >
              Request Quote
            </button>
          </div>
        )}
      </nav>
    </>
  );
}
