import React, { useState } from 'react';
import { FiEye, FiArrowRight, FiInfo } from 'react-icons/fi';
import { GiThreeLeaves, GiWaterDrop, GiGrain, GiCoconuts } from 'react-icons/gi';

export default function ProductCard({ product, onQuickViewClick, onInquireClick }) {
  const [imageError, setImageError] = useState(false);

  // Map category to styles
  const categoryStyles = {
    Spices: 'bg-rose-50 text-rose-700 border-rose-100',
    Coconuts: 'bg-amber-50 text-amber-800 border-amber-100',
    Grains: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    Fresh: 'bg-blue-50 text-blue-700 border-blue-100',
    'Dry Fruits & Nuts': 'bg-orange-50 text-orange-800 border-orange-100',
    Vegetables: 'bg-lime-50 text-lime-800 border-lime-100',
    Oils: 'bg-yellow-50 text-yellow-800 border-yellow-100'
  };

  const currentStyle = categoryStyles[product.category] || 'bg-gray-50 text-gray-700 border-gray-100';

  // Category fallback illustrations/icons when image fails to load
  const getFallbackIcon = () => {
    switch (product.category) {
      case 'Vegetables':
        return <GiThreeLeaves className="text-4xl text-lime-600 opacity-70 animate-pulse" />;
      case 'Oils':
        return <GiWaterDrop className="text-4xl text-amber-500 opacity-70 animate-pulse" />;
      case 'Dry Fruits & Nuts':
        return <GiGrain className="text-4xl text-orange-600 opacity-70 animate-pulse" />;
      case 'Spices':
        return <GiThreeLeaves className="text-4xl text-rose-600 opacity-70 animate-pulse" />;
      case 'Rice & Grains':
      case 'Pulses':
      case 'Grains':
        return <GiGrain className="text-4xl text-emerald-600 opacity-70 animate-pulse" />;
      case 'Coconuts':
        return <GiCoconuts className="text-4xl text-amber-800 opacity-70 animate-pulse" />;
      default:
        return <GiThreeLeaves className="text-4xl text-primary-600 opacity-70 animate-pulse" />;
    }
  };

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full">
      {/* Product Image Frame */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-50 flex items-center justify-center">
        {imageError ? (
          <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center gap-2 p-4">
            {getFallbackIcon()}
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">PVP Sourced</span>
          </div>
        ) : (
          <img
            src={product.image}
            alt={product.prodname}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        )}
        {/* Overlay buttons on hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 z-10">
          <button
            onClick={() => onQuickViewClick(product)}
            className="p-3 rounded-full bg-white text-gray-800 hover:bg-primary-600 hover:text-white transition-all shadow-md hover:scale-110 active:scale-95 duration-200"
            title="View Specifications"
          >
            <FiEye className="text-lg" />
          </button>
        </div>
        
        {/* Category Badge on Image */}
        <span className={`absolute top-3 left-3 z-20 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg border backdrop-blur-md shadow-sm ${currentStyle}`}>
          {product.category}
        </span>
      </div>

      {/* Card Info Section */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Catalog ID */}
          <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">
            CATALOG ID: #{product.proddispid.toString().slice(-4)}
          </div>

          {/* Title */}
          <h3 className="text-base font-black text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-1 mb-1.5" title={product.prodname}>
            {product.prodname}
          </h3>

          {/* Description */}
          <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-3.5 border-t border-gray-50">
          <button
            onClick={() => onQuickViewClick(product)}
            className="text-xs font-semibold text-gray-600 hover:text-primary-600 hover:bg-primary-50 py-2.5 rounded-xl border border-gray-100 transition-colors flex items-center justify-center gap-1.5"
          >
            <FiInfo /> Specs
          </button>
          <button
            onClick={() => onInquireClick(product)}
            className="text-xs font-bold bg-primary-600 hover:bg-primary-700 text-white py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 active:scale-95 shadow-sm hover:shadow"
          >
            Get Quote <FiArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}
