import React, { useState } from 'react';
import { FiSend, FiCheckCircle, FiTruck, FiShield, FiBriefcase } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

export default function InquiryForm({ products }) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    selectedProduct: '',
    quantity: '',
    unit: 'Metric Tons',
    destination: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email || !formData.selectedProduct) {
      toast.error('Please complete all required fields (*)');
      return;
    }
    setSubmitted(true);
    toast.success('Commercial RFQ Received! Checking inventory levels...');
  };

  return (
    <section id="inquiry" className="py-20 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* RFQ Callout Panel */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-primary-600 uppercase tracking-widest bg-primary-100/55 px-3 py-1 rounded-full border border-primary-200/50">
                Bulk Trading Desk
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight mt-4 mb-6">
                Submit a Bulk Request for Quotation (RFQ)
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-8">
                PVP International offers containerized logistics, customized export packaging, and rigorous quality inspection reports for global trading partners. Complete the trade ticket to begin pricing reviews.
              </p>
            </div>

            {/* Feature lists */}
            <div className="space-y-6 bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-amber-50 text-amber-600">
                  <FiBriefcase className="text-xl" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Custom Brokerage & Documentation</h4>
                  <p className="text-xs text-gray-500">We assist in Phyto-Sanitary Certificates, Certificate of Origin, and SGS/third-party lab reporting.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 border-t border-gray-50 pt-6">
                <div className="p-3 rounded-2xl bg-primary-50 text-primary-600">
                  <FiTruck className="text-xl" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Flexible Delivery Terms</h4>
                  <p className="text-xs text-gray-500">FOB Visakhapatnam Port, CIF target port coordinates, or domestic Wholesaling logistics.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 border-t border-gray-50 pt-6">
                <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600">
                  <FiShield className="text-xl" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Direct CEO Supervised Sourcing</h4>
                  <p className="text-xs text-gray-500">Managed directly under founder P. Varaprasad for pricing approvals and packaging integrity.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Inquiry Form Column */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-10 shadow-lg h-full flex flex-col justify-center">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-100 animate-bounce">
                    <FiCheckCircle className="text-4xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Trade Request Logged!</h3>
                  <p className="text-sm text-gray-500 mt-3 max-w-md mx-auto">
                    Your inquiry has been successfully dispatched to the PVP International trade desk in Visakhapatnam. P. Varaprasad and the sales representatives will establish connection shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        company: '',
                        email: '',
                        phone: '',
                        selectedProduct: '',
                        quantity: '',
                        unit: 'Metric Tons',
                        destination: '',
                        message: ''
                      });
                    }}
                    className="mt-8 text-xs font-bold text-primary-600 hover:text-primary-700 hover:underline"
                  >
                    Submit another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1.5">Contact Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full border border-gray-200 rounded-xl text-sm p-3 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1.5">Company Name</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full border border-gray-200 rounded-xl text-sm p-3 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all"
                        placeholder="Global Trading Corp"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1.5">Mobile / Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full border border-gray-200 rounded-xl text-sm p-3 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1.5">Corporate Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full border border-gray-200 rounded-xl text-sm p-3 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all"
                        placeholder="purchasing@globaltrade.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-gray-500 mb-1.5">Select Product *</label>
                      <select
                        required
                        value={formData.selectedProduct}
                        onChange={(e) => setFormData({ ...formData, selectedProduct: e.target.value })}
                        className="w-full border border-gray-200 rounded-xl text-sm p-3 bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all"
                      >
                        <option value="">-- Choose Agricultural Product --</option>
                        {products.map((p) => (
                          <option key={p.proddispid} value={p.prodname}>
                            {p.prodname}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1.5">Target Quantity</label>
                      <div className="flex rounded-xl overflow-hidden border border-gray-200 focus-within:ring-2 focus-within:ring-primary-500/20 focus-within:border-primary-500">
                        <input
                          type="number"
                          value={formData.quantity}
                          onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                          className="w-full text-sm p-3 outline-none border-none"
                          placeholder="e.g. 20"
                        />
                        <span className="bg-gray-50 text-gray-500 text-xs font-bold px-2.5 flex items-center border-l border-gray-200">
                          MT
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1.5">Preferred Port / Delivery Location</label>
                    <input
                      type="text"
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl text-sm p-3 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all"
                      placeholder="e.g. Port of Rotterdam, Hamburg, or Domestic AP"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1.5">Additional Specifications / Packaging Requirements</label>
                    <textarea
                      rows="4"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl text-sm p-3 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all resize-none"
                      placeholder="Specify packaging preferences (e.g. customized printed bags), target moisture percentage, required delivery timelines, etc."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm py-4 rounded-xl transition-all shadow-lg shadow-primary-600/10 active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    <FiSend /> Send Request for Quotation
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
