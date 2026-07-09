import React from 'react';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

const reviews = [
  {
    id: 1,
    name: "Srinivasa Rao",
    company: "Coastal Trade Link, Vizag",
    text: "PVP International has been our go-to for wholesale agricultural products. Their delivery times from the Visakhapatnam port are incredibly reliable and fast.",
    rating: 5,
  },
  {
    id: 2,
    name: "K. Reddy",
    company: "Vizag Spices & Exports",
    text: "Top-notch quality turmeric and maize. The SGS inspection reports give us complete peace of mind. Highly recommended local Vizag partner.",
    rating: 5,
  },
  {
    id: 3,
    name: "Lakshmi Narayana",
    company: "Bay of Bengal Traders, Visakhapatnam",
    text: "Excellent coconut sourcing. Being based in Vizag allows them to maintain freshness and keep inland transport costs highly optimal.",
    rating: 4,
  }
];

export default function Reviews() {
  return (
    <section id="reviews" className="py-20 bg-white border-t border-gray-100 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-primary-600 uppercase tracking-widest bg-primary-50 px-3 py-1 rounded-full border border-primary-100">
            Client Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight mt-4 mb-4">
            Trusted by Vizag's Trading Community
          </h2>
          <p className="text-gray-500 text-sm">
            Hear from our local and regional partners who rely on PVP International for premium wholesale sourcing.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-gray-50 rounded-2xl p-8 border border-gray-100 relative shadow-sm hover:shadow-md transition-shadow">
              <FaQuoteLeft className="text-primary-100 text-4xl absolute top-6 right-6" />
              <div className="flex gap-1 text-amber-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={i < review.rating ? "text-amber-400" : "text-gray-300"} />
                ))}
              </div>
              <p className="text-gray-600 text-sm italic mb-6 relative z-10 leading-relaxed">
                "{review.text}"
              </p>
              <div>
                <h4 className="text-sm font-bold text-gray-900">{review.name}</h4>
                <p className="text-xs text-primary-600 font-medium">{review.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
