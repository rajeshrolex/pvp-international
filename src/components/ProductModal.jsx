import React from 'react';
import { FiX } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

export default function ProductModal({ product, onClose }) {
  if (!product) return null;

  const whatsappMessage = `Hello PVP International, I am interested in bulk quantities of ${product.prodname} (Catalog ID: #${product.proddispid.toString().slice(-4)}). Please share the price quote per ton and delivery schedules.`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl relative flex flex-col md:flex-row animate-scaleUp">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-gray-800 shadow-md hover:scale-105 transition-transform"
        >
          <FiX className="text-xl" />
        </button>

        <div className="md:w-1/2 bg-gray-50 flex flex-col relative">
          <div className="aspect-[4/3] md:aspect-auto md:h-full w-full overflow-hidden">
            <img
              src={product.image}
              alt={product.prodname}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              {product.category} Section
            </span>
            <h2 className="text-2xl font-black mt-1 leading-tight">{product.prodname}</h2>
            <p className="text-xs text-white/80 mt-2">
              <a
                href={`https://www.indiamart.com/pvp-international-visakhapatnam/search.html?ss=${encodeURIComponent(product.prodname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-amber-400 font-medium transition-colors"
              >
                IndiaMART Verified Trader Sourced
              </a>{' '}
              - PVP International
            </p>
          </div>
        </div>

        <div className="md:w-1/2 p-6 md:p-8 overflow-y-auto flex flex-col justify-between max-h-[90vh] md:max-h-[80vh]">
          <div>
            <div className="mb-6">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">
                Product Specifications
              </h3>
              <div className="border border-gray-100 rounded-xl overflow-hidden text-xs">
                <div className="grid grid-cols-2 border-b border-gray-100 bg-gray-50/50 p-3">
                  <span className="font-semibold text-gray-500">Quality Grade</span>
                  <span className="font-bold text-gray-800">{product.specs?.grade || 'Premium A-Grade / Export Quality'}</span>
                </div>
                <div className="grid grid-cols-2 border-b border-gray-100 p-3">
                  <span className="font-semibold text-gray-500">Packaging Type</span>
                  <span className="font-bold text-gray-800">{product.specs?.packaging || '25kg / 50kg PP bags, gunny sacks'}</span>
                </div>
                <div className="grid grid-cols-2 border-b border-gray-100 bg-gray-50/50 p-3">
                  <span className="font-semibold text-gray-500">Moisture Content</span>
                  <span className="font-bold text-gray-800">{product.specs?.moisture || 'Under 10% - 12% max'}</span>
                </div>
                <div className="grid grid-cols-2 p-3">
                  <span className="font-semibold text-gray-500">Cultivation & Origin</span>
                  <span className="font-bold text-gray-800">{product.specs?.origin || 'Andhra Pradesh & Southern Indian States'}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">
                Request Commercial Quote
              </h3>
              <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                Contact us directly on WhatsApp with your product and quantity details. We will share pricing and delivery schedules promptly.
              </p>
              <a
                href={`https://wa.me/919493709757?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-3.5 rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 hover:no-underline"
              >
                <FaWhatsapp className="text-lg shrink-0" /> WhatsApp Inquiry
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
