import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import InquiryForm from './components/InquiryForm';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';
import { FiSearch, FiPhone, FiMail, FiMapPin, FiClock, FiCheckSquare } from 'react-icons/fi';
import { FaAward, FaWarehouse, FaHandshake } from 'react-icons/fa';

// Rich Product List Sourced from IndiaMART Data
const productsData = [
  {
    prodname: "Dried Turmeric Finger",
    proddispid: 2856184680048,
    category: "Spices",
    image: "/images/turmeric_export.png",
    description: "Premium double-polished dried turmeric finger roots. Highly valued for deep golden color, rich curcumin value, and culinary use.",
    specs: {
      grade: "Export Quality Double Polished",
      packaging: "25kg / 50kg Jute Gunny Bags",
      moisture: "9% Maximum",
      origin: "Kadapa & Guntur, Andhra Pradesh"
    }
  },
  {
    prodname: "Half Cut Dry Coconut",
    proddispid: 2856184685573,
    category: "Coconuts",
    image: "/images/half_cut_dry_coconut.png",
    description: "Sun-dried split copra/dry coconuts. Rich oil content, suitable for food preparations, oil mills, and confectioneries.",
    specs: {
      grade: "A-Grade Copra / Dry Coconut",
      packaging: "20kg / 25kg PP Net Sacks",
      moisture: "5.5% Maximum",
      origin: "East Godavari Belt, Andhra Pradesh"
    }
  },
  {
    prodname: "Yellow Maize Seeds",
    proddispid: 2856184660897,
    category: "Grains",
    image: "/images/yellow_maize_seeds.png",
    description: "Premium animal feed grade and starch processing grade yellow maize seeds. Uniform size, machine-cleaned, free from weevils.",
    specs: {
      grade: "Premium Feed / Industrial Grade",
      packaging: "50kg HDPE/PP Bags",
      moisture: "12% - 13.5% Maximum",
      origin: "Kurnool & Warangal Districts"
    }
  },
  {
    prodname: "7mm Green Cardamom",
    proddispid: 2855364463488,
    category: "Spices",
    image: "/images/cardamoms_spices.png",
    description: "Aromatic green cardamom pods graded at 7mm size. Bright green color, full seed weight, sourced from high-altitude plantations.",
    specs: {
      grade: "Bold 7mm grade, export quality",
      packaging: "10kg Cardboard Cartons / Gunny Sacks",
      moisture: "11% Maximum",
      origin: "Idukki, Western Ghats"
    }
  },
  {
    prodname: "Fresh Alphonso Mango",
    proddispid: 2856184635997,
    category: "Fresh",
    image: "/images/fresh_alphonso_mango.png",
    description: "Exquisite Alphonso mangoes, handpicked for sweetness, color, and premium texture. Checked individually for internal spots.",
    specs: {
      grade: "Premium Table Grade (A-Grade)",
      packaging: "Cushioned Corrugated Boxes (12/24 units)",
      moisture: "N/A - Fresh Fruit",
      origin: "Ratnagiri & South India Cooperatives"
    }
  },
  {
    prodname: "Semi Husked Coconut",
    proddispid: 2856184610491,
    category: "Coconuts",
    image: "/images/coconuts_wholesale.png",
    description: "Fresh mature coconuts, partially de-husked, keeping the eye covered for longer storage shelf-life. Heavy weight, full water.",
    specs: {
      grade: "Grade A Mature (550g - 650g)",
      packaging: "25-unit PP Net Sacks",
      moisture: "Natural Fresh Crop",
      origin: "Konaseema Delta region, AP"
    }
  },
  {
    prodname: "Raw Coffee Beans",
    proddispid: 2856184664388,
    category: "Fresh",
    image: "/images/raw_coffee_beans.png",
    description: "Green Arabica coffee beans. High density, clean flavor profiles, processed via natural sun-drying in high-altitude zones.",
    specs: {
      grade: "Green Arabica parchment / Cherry",
      packaging: "50kg Jute Bags with liner",
      moisture: "11.5% Target",
      origin: "Araku Valley, Andhra Pradesh"
    }
  },
  {
    prodname: "Fresh Seer Fish",
    proddispid: 2856184641630,
    category: "Fresh",
    image: "/images/fresh_seer_fish.png",
    description: "Freshly harvested seer fish sourced from local Vizag harbor catches. Immediately chilled and packed in ice crates for transport.",
    specs: {
      grade: "Grade A Sea-catch",
      packaging: "Chilled Ice-packed Thermocol boxes",
      moisture: "Fresh Seafood",
      origin: "Bay of Bengal, Visakhapatnam Coast"
    }
  },
  {
    prodname: "Fresh Turmeric Finger",
    proddispid: 2855118210730,
    category: "Spices",
    image: "/images/fresh_turmeric_finger.png",
    description: "Raw, freshly harvested wet turmeric fingers. Rich in essential juices and organic curcumin compounds.",
    specs: {
      grade: "Raw / Unpolished wet rhizomes",
      packaging: "Mesh bags / Open crates",
      moisture: "High (Fresh Harvest)",
      origin: "Agency areas, Visakhapatnam district"
    }
  },
  {
    prodname: "Organic Fresh Watermelon",
    proddispid: 2856184558797,
    category: "Fresh",
    image: "/images/organic_watermelon.png",
    description: "Sweet, juicy organic watermelons grown using sustainable biodiverse methods. Thick rind ensuring robust shipment survival.",
    specs: {
      grade: "Premium Table Grade (3.5kg - 5.5kg)",
      packaging: "Bulk Crates with straw cushions",
      moisture: "N/A - Fresh Harvest",
      origin: "Nellore, Andhra Pradesh"
    }
  },
  {
    prodname: "Yellow Toor Dal",
    proddispid: 2856184627873,
    category: "Grains",
    image: "/images/yellow_toor_dal.png",
    description: "Premium bold yellow split pigeon peas (Toor Dal). Silky polished, uniform sortex quality, high nutritional value.",
    specs: {
      grade: "Bold Sortex Cleaned",
      packaging: "25kg / 50kg PP Bags",
      moisture: "9.5% Maximum",
      origin: "Latur & Guntur Agricultural yards"
    }
  },
  {
    prodname: "Golden Broken Rice",
    proddispid: 2855364462597,
    category: "Grains",
    image: "/images/golden_broken_rice.png",
    description: "Clean golden broken rice grains. High starch value, ideal for general dining, porridge preparations, and brewery processes.",
    specs: {
      grade: "Double Polished Clean Broken",
      packaging: "50kg Laminated PP Bags",
      moisture: "13% Maximum",
      origin: "Godavari Delta Mills, Andhra Pradesh"
    }
  }
];

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sortBy, setSortBy] = useState('name-asc');

  // Filter Categories
  const categories = ['All', 'Spices', 'Coconuts', 'Grains', 'Fresh'];

  // Handle filtering and sorting
  const filteredProducts = productsData
    .filter((product) => {
      const matchesSearch = product.prodname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'name-asc') {
        return a.prodname.localeCompare(b.prodname);
      } else if (sortBy === 'name-desc') {
        return b.prodname.localeCompare(a.prodname);
      } else if (sortBy === 'id-asc') {
        return a.proddispid - b.proddispid;
      }
      return 0;
    });

  const handleQuickView = (product) => {
    setSelectedProduct(product);
  };

  const handleInquireClick = (product) => {
    // Scroll to inquiry section
    const element = document.getElementById('inquiry');
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    // Optional: prefill product in RFQ form
    const selectEl = document.querySelector('select[name="selectedProduct"]');
    if (selectEl) {
      selectEl.value = product.prodname;
    }
  };

  const handleFooterNav = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
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
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Toaster position="top-right" />
      
      {/* Navbar */}
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreClick={() => handleFooterNav('products')}
          onQuoteClick={() => handleFooterNav('inquiry')}
        />

        {/* Products Section */}
        <section id="products" className="py-20 bg-white scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold text-primary-600 uppercase tracking-widest bg-primary-50 px-3 py-1 rounded-full border border-primary-100">
                Sourcing Inventory
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight mt-4 mb-4">
                Explore Our Agricultural Product Catalog
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                Wholesale bulk supplies sourced directly from optimal regional crop coordinates in Andhra Pradesh and nearby agricultural fields. Quality inspected and packaged for heavy transit.
              </p>
            </div>

            {/* Filter and Search Bar */}
            <div className="bg-gray-50 border border-gray-100 rounded-3xl p-6 mb-12 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-6">
              {/* Category Filters */}
              <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-3 lg:pb-0 scrollbar-thin">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-xs font-bold px-4 py-2.5 rounded-xl border transition-all shrink-0 ${
                      selectedCategory === cat
                        ? 'bg-primary-600 text-white border-primary-600 shadow-md shadow-primary-600/10'
                        : 'bg-white text-gray-600 border-gray-100 hover:border-primary-300'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search and Sort Inputs */}
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
                <div className="relative w-full sm:w-64">
                  <FiSearch className="absolute left-4.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search commodities..."
                    className="w-full pl-11 pr-4 py-2.5 text-xs border border-gray-200 rounded-xl focus:ring-1 focus:ring-primary-500 focus:border-primary-500 bg-white outline-none"
                  />
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full sm:w-44 py-2.5 px-4 text-xs border border-gray-200 rounded-xl bg-white focus:ring-1 focus:ring-primary-500 focus:border-primary-500 outline-none"
                >
                  <option value="name-asc">Sort: A to Z</option>
                  <option value="name-desc">Sort: Z to A</option>
                  <option value="id-asc">Sort: Catalog ID</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.proddispid}
                    product={product}
                    onQuickViewClick={handleQuickView}
                    onInquireClick={handleInquireClick}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                <p className="text-gray-500 font-medium">No agricultural products match your filters.</p>
                <button
                  onClick={() => { setSelectedCategory('All'); setSearchTerm(''); }}
                  className="mt-4 text-xs font-bold text-primary-600 hover:text-primary-700 hover:underline"
                >
                  Reset all filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-gray-50 border-t border-gray-100 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* About Text */}
              <div className="lg:col-span-6 space-y-6">
                <span className="text-xs font-bold text-primary-600 uppercase tracking-widest bg-primary-100/50 px-3 py-1 rounded-full border border-primary-200/50">
                  Who We Are
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight">
                  Premium Agricultural Wholesale Sourcing From Visakhapatnam
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  PVP International has established itself as a reliable Wholesaler and Trader of agricultural yields. Under the leadership of <strong>CEO P. Prasad</strong>, we coordinate bulk sourcing directly from local farmers and agricultural hubs, maintaining deep quality supervision at every stage of the lifecycle.
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Located in the major commercial and port zone of <strong>Visakhapatnam, Andhra Pradesh</strong>, we possess unique logistical advantages. This enables rapid rail and sea dispatch from the Port of Visakhapatnam, reducing lead times for international global buyers and keeping inland transport rates highly optimal.
                </p>

                {/* Grid stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
                  <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center gap-3">
                    <FaAward className="text-amber-500 text-2xl shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">4.3 / 5</h4>
                      <p className="text-[10px] text-gray-400 font-medium">IndiaMART Rating</p>
                    </div>
                  </div>
                  <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center gap-3">
                    <FaWarehouse className="text-primary-600 text-2xl shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">Vizag</h4>
                      <p className="text-[10px] text-gray-400 font-medium">Port-Linked Base</p>
                    </div>
                  </div>
                  <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center gap-3">
                    <FaHandshake className="text-emerald-600 text-2xl shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">Verified</h4>
                      <p className="text-[10px] text-gray-400 font-medium">GSTIN Registered</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Graphic Block */}
              <div className="lg:col-span-6 relative">
                <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-gray-100">
                  <img
                    src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&q=80&w=800"
                    alt="Agricultural Sourcing Fields"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Float box */}
                <div className="absolute -bottom-6 -left-6 bg-white border border-gray-100 rounded-2xl p-5 shadow-lg max-w-xs hidden sm:block">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold">✓</div>
                    <div>
                      <h5 className="text-xs font-bold text-gray-900">SGS Quality Inspected</h5>
                      <p className="text-[10px] text-gray-500">Every shipment undergoes certified physical purity reviews.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Inquiry Form Wrapper */}
        <InquiryForm products={productsData} />

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-white scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold text-primary-600 uppercase tracking-widest bg-primary-50 px-3 py-1 rounded-full border border-primary-100">
                Get In Touch
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight mt-4 mb-4">
                Corporate Coordinates & Trading Desk
              </h2>
              <p className="text-gray-500 text-sm">
                Have questions regarding custom shipping parameters, payment letters of credit, or minimum order requirements? Contact us directly.
              </p>
            </div>

            {/* Coordinates Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex gap-4">
                <div className="p-3.5 rounded-xl bg-primary-100 text-primary-600 h-max">
                  <FiMapPin className="text-xl" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-1">Corporate Address</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Madhurawada, Visakhapatnam, Andhra Pradesh, India - 530048
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex gap-4">
                <div className="p-3.5 rounded-xl bg-amber-100 text-amber-600 h-max">
                  <FiPhone className="text-xl" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-1">Call / WhatsApp</h4>
                  <p className="text-xs text-gray-500 font-bold mb-1">+91 80475 15277</p>
                  <p className="text-xs text-gray-500">+91 80449 47008</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex gap-4">
                <div className="p-3.5 rounded-xl bg-emerald-100 text-emerald-600 h-max">
                  <FiMail className="text-xl" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-1">Electronic Support</h4>
                  <p className="text-xs text-gray-500 mb-1">info@pvpinternational.co.in</p>
                  <p className="text-[10px] text-gray-400 font-medium flex items-center gap-1">
                    <FiClock /> Mon - Sat: 9:00 AM - 6:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer onNavClick={handleFooterNav} />

      {/* Specification Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}

export default App;
