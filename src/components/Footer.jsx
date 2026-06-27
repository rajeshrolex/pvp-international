import React from 'react';
import { FiPhone, FiMail, FiMapPin, FiAward, FiFileText } from 'react-icons/fi';
import Logo from './Logo';

export default function Footer({ onNavClick }) {
  return (
    <footer className="bg-primary-900 text-white/90 pt-16 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-12 border-b border-white/5">
          {/* Brand Panel */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavClick('home')}>
              <Logo className="w-10 h-10" variant="color" />
              <div>
                <span className="text-xl font-bold tracking-tight text-white">PVP</span>
                <span className="text-xl font-semibold text-primary-300 ml-1">International</span>
                <p className="text-[10px] text-amber-400 font-medium tracking-widest uppercase -mt-1">
                  Trust & Sourcing
                </p>
              </div>
            </div>
            <p className="text-xs text-white/60 leading-relaxed">
              Wholesale distribution & sourcing of agro-commodities based in the major coastal hub of Visakhapatnam, serving domestic and international supply requirements.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-300 font-semibold bg-white/5 border border-white/10 px-3 py-2 rounded-xl w-max">
              <FiAward className="text-sm" /> IndiaMART Verified Wholesaler & Distributor
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Trading Desk Links</h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              {['home', 'products', 'about', 'contact', 'inquiry'].map((id) => (
                <li key={id}>
                  <button
                    onClick={() => onNavClick(id)}
                    className="hover:text-amber-400 transition-colors uppercase tracking-wider font-semibold text-[10px]"
                  >
                    {id === 'inquiry' ? 'Request RFQ' : `${id} section`}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact coordinates */}
          <div className="md:col-span-5 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Corporate Coordinates</h4>
            <ul className="space-y-3.5 text-xs text-white/75">
              <li className="flex items-start gap-3">
                <FiMapPin className="text-amber-400 text-lg mt-0.5 shrink-0" />
                <span>Madhurawada, Visakhapatnam, Andhra Pradesh, India - 530048</span>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="text-amber-400 text-base shrink-0" />
                <span>+91-8047515277 / +91-8044947008</span>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="text-amber-400 text-base shrink-0" />
                <span>info@pvpinternational.co.in</span>
              </li>
              <li className="flex items-center gap-3">
                <FiFileText className="text-amber-400 text-base shrink-0" />
                <span>CEO: P. Prasad | GSTIN Sourced Verified</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright banner */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>© {new Date().getFullYear()} PVP International. All rights reserved. Sourced via IndiaMART network.</p>
          <div className="flex items-center gap-4">
            <a href="#about" className="hover:text-white transition-colors">Quality Guidelines</a>
            <a href="#contact" className="hover:text-white transition-colors">Terms of Trade</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
