import React from 'react';
import { FiEye, FiArrowRight, FiInfo } from 'react-icons/fi';

export default function ProductCard({ product, onQuickViewClick, onInquireClick }) {
  // Map category to styles
  const categoryStyles = {
    Spices: 'bg-rose-50 text-rose-700 border-rose-100',
    Coconuts: 'bg-amber-50 text-amber-800 border-amber-100',
    Grains: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    Fresh: 'bg-blue-50 text-blue-700 border-blue-100'
  };

  const currentStyle = categoryStyles[product.category] || 'bg-gray-50 text-gray-700 border-gray-100';

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full">
      {/* Product Image Frame */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.prodname}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
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
          <h3 className="text-base font-black text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-1 mb-1.5">
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
