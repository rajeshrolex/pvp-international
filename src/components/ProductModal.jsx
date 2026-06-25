import React, { useState } from 'react';
import { FiX, FiCheck, FiMail, FiMessageSquare } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

export default function ProductModal({ product, onClose, onInquireSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    quantity: '10',
    unit: 'Metric Tons',
    message: `Hello, I am interested in bulk quantities of ${product?.prodname}. Please share price quote per ton and delivery schedules.`
  });
  const [submitted, setSubmitted] = useState(false);

  if (!product) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) {
      toast.error('Please fill in all contact details.');
      return;
    }
    setSubmitted(true);
    if (onInquireSubmit) {
      onInquireSubmit({
        ...formData,
        productName: product.prodname,
        productId: product.proddispid
      });
    }
    toast.success(`Inquiry for ${product.prodname} sent successfully!`);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl relative flex flex-col md:flex-row animate-scaleUp">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-gray-800 shadow-md hover:scale-105 transition-transform"
        >
          <FiX className="text-xl" />
        </button>

        {/* Product Image Panel */}
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
              IndiaMART Verified Trader Sourced - PVP International
            </p>
          </div>
        </div>

        {/* Specs & Inquiry Form Panel */}
        <div className="md:w-1/2 p-6 md:p-8 overflow-y-auto flex flex-col justify-between max-h-[90vh] md:max-h-[80vh]">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-10">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-4 border border-emerald-100">
                <FiCheck className="text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Inquiry Submitted!</h3>
              <p className="text-sm text-gray-500 mt-2">
                Thank you for contacting PVP International. Our sourcing team under P. Prasad will reach out within 24 hours with custom price matrices.
              </p>
            </div>
          ) : (
            <div>
              {/* Product Specifications Section */}
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

              {/* Inquiry Form Section */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <FiMail className="text-primary-500" /> Request Commercial Quote
                </h3>
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-gray-500 mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full border border-gray-200 rounded-xl text-xs p-2.5 focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-gray-500 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full border border-gray-200 rounded-xl text-xs p-2.5 focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="+91 9876543210"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-2">
                      <label className="block text-[11px] font-bold text-gray-500 mb-1">Business Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full border border-gray-200 rounded-xl text-xs p-2.5 focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="buyer@corporate.com"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-gray-500 mb-1">Quantity</label>
                      <input
                        type="number"
                        min="1"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        className="w-full border border-gray-200 rounded-xl text-xs p-2.5 focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 mb-1">Special Requirements</label>
                    <textarea
                      rows="2"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl text-xs p-2.5 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5"
                  >
                    <FiMessageSquare /> Submit Bulk Query
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
