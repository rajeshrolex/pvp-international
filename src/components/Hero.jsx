import React, { useState, useEffect } from 'react';
import { FiArrowRight, FiCheckCircle, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaStar, FaBuilding, FaUserTie } from 'react-icons/fa';

const carouselImages = [
  {
    url: "/images/turmeric_export.jpeg",
    title: "Premium Turmeric Sourcing"
  },
  {
    url: "/images/coconuts_wholesale.jpeg",
    title: "Fresh Mature Coconuts Wholesale"
  },
  {
    url: "/images/cardamoms_spices.jpeg",
    title: "Premium Indian Spices & Cardamom"
  }
];

export default function Hero({ onExploreClick, onQuoteClick }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  return (
    <section id="home" className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gray-900 py-20 text-white">
      {/* Full-width Background Carousel */}
      <div className="absolute inset-0 z-0">
        {carouselImages.map((image, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        {/* Darkened Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
      </div>

      {/* Hero content overlaid on top */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Tagline */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary-600/35 border border-primary-500/30 text-primary-300 text-xs font-semibold backdrop-blur-md">
            <FiCheckCircle className="text-primary-400" /> Premium Agricultural Trading
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-white">
            Indian Agriculture for the World
          </h1>

          {/* Sub-headline */}
          <p className="text-base sm:text-lg text-gray-200 max-w-xl mx-auto leading-relaxed">
            Trusted exporter of premium Turmeric, Maize, Coconut, and Cardamom from Visakhapatnam.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={onExploreClick}
              className="w-full sm:w-auto bg-primary-600 hover:bg-primary-500 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-primary-600/25 transition-all flex items-center justify-center gap-2 group active:scale-95 text-base"
            >
              Explore Catalog
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={onQuoteClick}
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-8 py-4 rounded-xl backdrop-blur-sm transition-all active:scale-95 text-base"
            >
              Get Free Quote
            </button>
          </div>

          {/* Trust Badges & Details */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-10 border-t border-white/10 max-w-2xl mx-auto">
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-amber-400 mb-1">
                <FaStar /> <span className="font-bold text-white text-base">4.3</span>
                <span className="text-xs text-gray-300 ml-1">(34 reviews)</span>
              </div>
              <p className="text-xs text-gray-300">Overall Rating</p>
            </div>
            <div className="text-center sm:text-left border-l border-white/10 pl-0 sm:pl-6">
              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-primary-400 mb-1 font-bold text-white text-base">
                <FaUserTie className="text-primary-400 text-sm" /> P. Varaprasad
              </div>
              <p className="text-xs text-gray-300">Founder & CEO  </p>
            </div>
            <div className="text-center sm:text-left border-t sm:border-t-0 sm:border-l border-white/10 pt-4 sm:pt-0 pl-0 sm:pl-6 col-span-2 sm:col-span-1">
              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-primary-400 mb-1 font-bold text-white text-base">
                <FaBuilding className="text-primary-400 text-sm" /> Vizag, AP
              </div>
              <p className="text-xs text-gray-300">Headquarters</p>
            </div>
          </div>
        </div>
      </div>

      {/* Manual Slide Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/30 hover:bg-black/55 text-white backdrop-blur-sm transition-colors active:scale-95"
      >
        <FiChevronLeft className="text-xl" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/30 hover:bg-black/55 text-white backdrop-blur-sm transition-colors active:scale-95"
      >
        <FiChevronRight className="text-xl" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 z-20 flex gap-2">
        {carouselImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              idx === currentSlide ? 'bg-amber-400 w-5' : 'bg-white/40'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
