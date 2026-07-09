import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import InquiryForm from './components/InquiryForm';
import Footer from './components/Footer';
import Reviews from './components/Reviews';
import { Toaster } from 'react-hot-toast';
import { FiSearch, FiPhone, FiMail, FiMapPin, FiClock, FiCheckSquare } from 'react-icons/fi';
import { FaAward, FaWarehouse, FaHandshake } from 'react-icons/fa';

// Synonym map to support searching local names, plurals, and equivalents
const SYNONYMS = {
  // Dry Fruits & Nuts
  "badam": "almond",
  "badamulu": "almond",
  "kaju": "cashew",
  "jeedipappu": "cashew",
  "pista": "pistachio",
  "pistachios": "pistachio",
  "akhrot": "walnut",
  "walnuts": "walnut",
  "kishmish": "raisins",
  "raisin": "raisins",
  "khajur": "dates",
  "date": "dates",
  "anjeer": "fig",
  "figs": "fig",
  "palli": "peanut",
  "groundnut": "peanut",
  "peanuts": "peanut",
  "hazelnuts": "hazelnut",
  "pecans": "pecan",
  "macadamias": "macadamia",
  // Vegetables
  "ullipaya": "onion",
  "ullipayalu": "onion",
  "pyaz": "onion",
  "onions": "onion",
  "tomato": "tomato",
  "tomatoes": "tomato",
  "tamatar": "tomato",
  "potato": "potato",
  "potatoes": "potato",
  "aloo": "potato",
  "bangaladumpa": "potato",
  "sweet potato": "sweet potato",
  "sweet potatoes": "sweet potato",
  "shakarkand": "sweet potato",
  "chilakada dumpa": "sweet potato",
  "mirchi": "chilli",
  "mirapakaya": "chilli",
  "green chilli": "green chilli",
  "green chillies": "green chilli",
  "red chilli": "red chilli",
  "red chillies": "red chilli",
  "hari mirch": "green chilli",
  "lal mirch": "red chilli",
  "garlic": "garlic",
  "lahsun": "garlic",
  "vellulli": "garlic",
  "ginger": "ginger",
  "adrak": "ginger",
  "allam": "ginger",
  "carrot": "carrot",
  "carrots": "carrot",
  "gajar": "carrot",
  "beetroot": "beetroot",
  "cabbage": "cabbage",
  "patta gobhi": "cabbage",
  "cauliflower": "cauliflower",
  "phool gobhi": "cauliflower",
  "spinach": "spinach",
  "palak": "spinach",
  "palakura": "spinach",
  "coriander": "coriander",
  "dhaniya": "coriander",
  "kothimera": "coriander",
  "mint": "mint",
  "pudina": "mint",
  "curry leaves": "curry leaves",
  "karivepaku": "curry leaves",
  "kadi patta": "curry leaves",
  "brinjal": "brinjal",
  "baingan": "brinjal",
  "vankaya": "brinjal",
  "eggplant": "brinjal",
  "okra": "okra",
  "bhindi": "okra",
  "bendakaya": "okra",
  "ladies finger": "okra",
  "capsicum": "capsicum",
  "shimla mirch": "capsicum",
  "bell pepper": "capsicum",
  "cucumber": "cucumber",
  "kheera": "cucumber",
  "dosakaya": "cucumber",
  "bottle gourd": "bottle gourd",
  "lauki": "bottle gourd",
  "anapakaya": "bottle gourd",
  "bitter gourd": "bitter gourd",
  "karela": "bitter gourd",
  "kakarakaya": "bitter gourd",
  "ridge gourd": "ridge gourd",
  "tori": "ridge gourd",
  "beerakaya": "ridge gourd",
  "pumpkin": "pumpkin",
  "kaddu": "pumpkin",
  "gummadikaya": "pumpkin",
  "radish": "radish",
  "mooli": "radish",
  "mullangi": "radish",
  "drumstick": "drumstick",
  "sahjan": "drumstick",
  "mulakkada": "drumstick",
  "green peas": "green peas",
  "matar": "green peas",
  "bataani": "green peas",
  "beans": "beans",
  "corn": "corn",
  "bhutta": "corn",
  "mokkajonna": "corn",
  "lemon": "lemon",
  "neembu": "lemon",
  "nimmakaya": "lemon",
  "raw banana": "raw banana",
  "kela": "raw banana",
  "aratikaya": "raw banana",
  "mushroom": "mushroom",
  // Spices & Others
  "cardamom": "cardamom",
  "elaichi": "cardamom",
  "elakulu": "cardamom",
  "coconut": "coconut",
  "kobbari": "coconut",
  "kobbarikaya": "coconut",
  "nariyal": "coconut",
  "coffee": "coffee",
  "coffee beans": "coffee",
  "sugar": "sugar",
  "panchadara": "sugar",
  "cheeni": "sugar",
  "maize": "maize",
  "corn seeds": "maize",
  "makka": "maize",
  "mustard": "mustard",
  "aavalu": "mustard",
  "sarso": "mustard",
  "fish": "fish",
  "seer fish": "fish",
  "chepa": "fish",
  "machli": "fish"
};

// Expanded Grocery Product List Sourced from IndiaMART Data & Sourcing Network
const productsData = [
  // --- DRY FRUITS & NUTS ---
  {
    prodname: "Premium Cashew Nuts",
    proddispid: 2856184690111,
    category: "Dry Fruits & Nuts",
    image: "/images/cashew_nuts.png",
    description: "High-quality whole cashew nuts (W240/W320 grade). Perfectly dried, uniform, creamy white texture, rich in healthy fats and proteins.",
    specs: { grade: "Export Quality W240 / W320 Whole", packaging: "10kg Tin / 22.68kg Vacuum Bags", moisture: "5% Maximum", origin: "Sourced from top processing units in Andhra Pradesh" }
  },
  {
    prodname: "Premium Almonds",
    proddispid: 2856184690222,
    category: "Dry Fruits & Nuts",
    image: "/images/almonds_premium.png",
    description: "Nutrient-dense raw almonds. High density, crispy texture, sorted to ensure zero shells or broken pieces.",
    specs: { grade: "A-Grade California / Independent Paper-shell", packaging: "10kg / 25kg PP bags or Cartons", moisture: "6% Maximum", origin: "Imported & Processed locally" }
  },
  {
    prodname: "Premium Pistachio",
    proddispid: 2856184692001,
    category: "Dry Fruits & Nuts",
    image: "/images/premium_pistachio.png",
    description: "Roasted salted or raw unshelled pistachios. Rich green kernel color, natural crack shells, delicious flavor.",
    specs: { grade: "Bold Grade A", packaging: "10kg / 15kg Corrugated Boxes", moisture: "5% Maximum", origin: "Direct Import & Sourced" }
  },
  {
    prodname: "Premium Walnut",
    proddispid: 2856184692002,
    category: "Dry Fruits & Nuts",
    image: "/images/premium_walnut.png",
    description: "Light half-cut premium walnut kernels. Loaded with omega-3 fatty acids, excellent dietary supplement.",
    specs: { grade: "Premium Light Halves", packaging: "10kg Vacuum bags in master carton", moisture: "5.5% Max", origin: "Kashmir, India" }
  },
  {
    prodname: "Sweet Raisins",
    proddispid: 2856184692003,
    category: "Dry Fruits & Nuts",
    image: "/images/sweet_raisins.png",
    description: "Sun-dried golden raisins. Sweet, uniform shape, free from stalks, processed cleanly for confectionery and snacks.",
    specs: { grade: "Golden / Green Long Raisins", packaging: "15kg PP Boxes", moisture: "13% Target", origin: "Nashik, Maharashtra" }
  },
  {
    prodname: "Premium Dates",
    proddispid: 2856184692004,
    category: "Dry Fruits & Nuts",
    image: "/images/premium_dates.png",
    description: "Rich, sweet, and sticky premium seedless or seeded dates. Naturally rich in energy and fibers.",
    specs: { grade: "Kimia / Medjool Sourced", packaging: "500g boxes / 10kg bulk", moisture: "15% Target", origin: "Imported / Sourced" }
  },
  {
    prodname: "Dried Fig",
    proddispid: 2856184692005,
    category: "Dry Fruits & Nuts",
    image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&q=80&w=400",
    description: "Disc-shaped sun-dried premium figs. Chewy texture with sweet crunch seeds, excellent for direct eating or dessert making.",
    specs: { grade: "A-Grade Disc Fig", packaging: "10kg Wooden Boxes", moisture: "12% Max", origin: "Direct imports & domestic sourcing" }
  },
  {
    prodname: "Groundnut Kernels Seeds",
    proddispid: 2856184691666,
    category: "Dry Fruits & Nuts",
    image: "/images/groundnut_kernels.png",
    description: "Premium-grade shelled peanut kernels. Sorted by size, rich in oil and nutrients, perfect for snack processing or direct sourcing.",
    specs: { grade: "Bold 70/80 Count", packaging: "50kg Jute bags", moisture: "7% Maximum", origin: "Anantapur, Andhra Pradesh" }
  },


  // --- VEGETABLES ---
  {
    prodname: "Wholesale Red Onions",
    proddispid: 2856184690555,
    category: "Vegetables",
    image: "/images/onions_wholesale.png",
    description: "Sorted, medium-to-large sized red onions. Dried skin for long storage capability, perfect for wholesale distribution.",
    specs: { grade: "Medium/Large (45mm - 55mm+)", packaging: "25kg / 50kg PP Net Sacks", moisture: "Natural Cured Skin", origin: "Kurnool, Andhra Pradesh / Maharashtra Farms" }
  },
  {
    prodname: "Fresh Red Tomato",
    proddispid: 2856184692101,
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=400",
    description: "Fresh, juicy, and glossy red tomatoes. Firm structure suitable for sorting, packaging, and shipping.",
    specs: { grade: "Grade A Table Sourced", packaging: "15kg / 25kg Plastic Crates", moisture: "Fresh Harvest", origin: "Madanapalle, AP" }
  },
  {
    prodname: "Fresh Potato",
    proddispid: 2856184692102,
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=400",
    description: "Premium wholesale potatoes. High starch, uniform size, free from soil mud and mechanical damage.",
    specs: { grade: "Standard Jyoti / Lokar", packaging: "50kg Jute Sacks", moisture: "Fresh Yield", origin: "UP & Bengal Belts" }
  },
  {
    prodname: "Organic Sweet Potato",
    proddispid: 2856184690666,
    category: "Vegetables",
    image: "/images/sweet_potato.png",
    description: "Starchy, sweet, and nutrient-dense organic sweet potatoes. Carefully washed and sorted for bulk wholesale.",
    specs: { grade: "Grade-A Organic", packaging: "20kg Wooden Crates / Jute Sacks", moisture: "Fresh Harvest", origin: "Coastal Andhra districts" }
  },
  {
    prodname: "Fresh Green Chillies",
    proddispid: 2856184690333,
    category: "Vegetables",
    image: "/images/green_chillies.png",
    description: "Highly pungent, fresh green chillies. Sourced fresh daily from local farms, sorted by size and uniformity.",
    specs: { grade: "Guntur Teja / Standard Fresh", packaging: "5kg / 10kg Corrugated Boxes or Net Sacks", moisture: "Fresh Crop (High Hydration)", origin: "Guntur District, Andhra Pradesh" }
  },
  {
    prodname: "Fresh Red Chillies",
    proddispid: 2856184690444,
    category: "Vegetables",
    image: "/images/red_chillies.png",
    description: "Bright red, fully mature fresh red chillies. Perfect for spice blending and paste production.",
    specs: { grade: "A-Grade Fresh Red", packaging: "10kg Jute bags / Air-circulated crates", moisture: "Fresh Crop", origin: "Kurnool & Guntur belts" }
  },
  {
    prodname: "Fresh Garlic",
    proddispid: 2856184692103,
    category: "Vegetables",
    image: "/images/fresh_garlic.png",
    description: "White, bold garlic bulbs with strong aroma. Perfectly sun-dried skins to prevent moisture build-up.",
    specs: { grade: "Standard Medium Bulbs", packaging: "25kg Net Sacks", moisture: "Dried Skin", origin: "Madhya Pradesh" }
  },
  {
    prodname: "Fresh Ginger",
    proddispid: 2856184692104,
    category: "Vegetables",
    image: "/images/fresh_ginger.png",
    description: "Spicy, fresh ginger roots. Cleaned of soil, minimal fiber content, intense flavor profile.",
    specs: { grade: "Bold Fresh Ginger", packaging: "30kg Gunny Sacks", moisture: "Fresh Root", origin: "Shimoga, Karnataka" }
  },
  {
    prodname: "Fresh Carrot",
    proddispid: 2856184692105,
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&q=80&w=400",
    description: "Sweet, crunchy, and bright orange fresh carrots. Perfect for salads and vegetable preparations.",
    specs: { grade: "Grade A Orange", packaging: "20kg Crates", moisture: "Fresh Crop", origin: "Ooty Cooperatives" }
  },
  {
    prodname: "Fresh Beetroot",
    proddispid: 2856184692106,
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1582515073490-39981397c445?auto=format&fit=crop&q=80&w=400",
    description: "Deep red Beetroots rich in minerals. Handpicked, washed, and trimmed of excess roots.",
    specs: { grade: "A-Grade Fresh Root", packaging: "25kg bags", moisture: "Fresh Harvest", origin: "South India Farms" }
  },
  {
    prodname: "Fresh Cabbage",
    proddispid: 2856184692107,
    category: "Vegetables",
    image: "/images/fresh_cabbage.png",
    description: "Crisp and fresh green cabbage heads. Firmly packed leaves, sorted to ensure zero worm damage.",
    specs: { grade: "Standard Medium Heads", packaging: "Crates / Loose load", moisture: "Fresh Crop", origin: "Local AP Fields" }
  },
  {
    prodname: "Fresh Cauliflower",
    proddispid: 2856184692108,
    category: "Vegetables",
    image: "/images/fresh_cauliflower.png",
    description: "Premium white cauliflower heads. Kept fresh in temperature-controlled transit, clean florets.",
    specs: { grade: "White Curd Bold", packaging: "Wooden Crates / Loose", moisture: "Fresh Crop", origin: "Agency Areas, Vizag" }
  },
  {
    prodname: "Fresh Broccoli",
    proddispid: 2856184692109,
    category: "Vegetables",
    image: "/images/fresh_broccoli.png",
    description: "Premium green broccoli florets. Rich in antioxidants and nutrients, kept chilled.",
    specs: { grade: "Export Quality Dark Green", packaging: "Thermocol boxes with ice", moisture: "Chilled Fresh", origin: "High-altitude plantations" }
  },
  {
    prodname: "Fresh Spinach",
    proddispid: 2856184692110,
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=400",
    description: "Vibrant green organic spinach bunches. Freshly cut, rich iron source, washed and sorted.",
    specs: { grade: "Organic Bunch", packaging: "Crates / Mesh Bags", moisture: "Fresh Leafy", origin: "Visakhapatnam Farms" }
  },
  {
    prodname: "Fresh Coriander Leaves",
    proddispid: 2856184692111,
    category: "Vegetables",
    image: "/images/fresh_coriander_leaves.png",
    description: "Aromatic coriander greens. Essential seasoning herb, fresh harvest daily.",
    specs: { grade: "Aromatic Fresh Greens", packaging: "Bundled in ventilated crates", moisture: "Fresh Herb", origin: "Vizag Suburbs" }
  },
  {
    prodname: "Fresh Mint Leaves",
    proddispid: 2856184692112,
    category: "Vegetables",
    image: "/images/fresh_mint_leaves.png",
    description: "Refreshing green mint leaves. Highly aromatic, ideal for culinary preparations and extracts.",
    specs: { grade: "Fresh Mint", packaging: "Bundles", moisture: "Fresh Leaf", origin: "Local Cooperatives" }
  },
  {
    prodname: "Fresh Curry Leaves",
    proddispid: 2856184692113,
    category: "Vegetables",
    image: "/images/fresh_curry_leaves.png",
    description: "Highly aromatic fresh green curry leaves. Used widely for spice tempering and seasoning.",
    specs: { grade: "Standard Clean Bunch", packaging: "Loose in mesh crates", moisture: "Fresh Crop", origin: "Andhra Pradesh fields" }
  },
  {
    prodname: "Fresh Brinjal",
    proddispid: 2856184692114,
    category: "Vegetables",
    image: "/images/fresh_brinjal.png",
    description: "Glossy purple brinjals (eggplants). Tender seeds, firm skin, perfect for stuffing or curry.",
    specs: { grade: "Medium Sized Glossy Purple", packaging: "Plastic Crates", moisture: "Fresh Crop", origin: "East Godavari Belt" }
  },
  {
    prodname: "Fresh Okra",
    proddispid: 2856184692115,
    category: "Vegetables",
    image: "/images/fresh_okra.png",
    description: "Tender, fresh green okra pods. Uniform length, free from insect holes, packed under optimal air ventilation.",
    specs: { grade: "Tender Export Grade", packaging: "Cartons / Net Sacks", moisture: "Fresh Crop", origin: "Nellore Farms" }
  },
  {
    prodname: "Fresh Capsicum",
    proddispid: 2856184692116,
    category: "Vegetables",
    image: "/images/fresh_capsicum.png",
    description: "Fleshy green capsicum (bell peppers). Sourced from greenhouse farms, crisp and glossy texture.",
    specs: { grade: "Grade A Greenhouse", packaging: "10kg Cardboard Cartons", moisture: "Fresh Crop", origin: "Chittoor Polyhouses" }
  },
  {
    prodname: "Fresh Cucumber",
    proddispid: 2856184692117,
    category: "Vegetables",
    image: "/images/fresh_cucumber.png",
    description: "Crisp, water-rich green cucumbers. Ideal for salads and pickling, fresh harvest.",
    specs: { grade: "Table Salad Grade", packaging: "Plastic Crates", moisture: "Fresh Harvest", origin: "Local Farms" }
  },
  {
    prodname: "Fresh Bottle Gourd",
    proddispid: 2856184692118,
    category: "Vegetables",
    image: "/images/fresh_bottle_gourd.png",
    description: "Fresh, long green bottle gourds. Tender skin and pulpy inside, highly cooling vegetable.",
    specs: { grade: "Tender Long Shape", packaging: "Ventilated boxes / loose load", moisture: "Fresh Yield", origin: "AP Farms" }
  },
  {
    prodname: "Fresh Bitter Gourd",
    proddispid: 2856184692119,
    category: "Vegetables",
    image: "/images/fresh_bitter_gourd.png",
    description: "Standard bitter gourd (Karela) with sharp ridges. Highly valued for health benefits.",
    specs: { grade: "Medium Green Ridged", packaging: "Crates", moisture: "Fresh Yield", origin: "Vizag Rural" }
  },

  {
    prodname: "Fresh Pumpkin",
    proddispid: 2856184692121,
    category: "Vegetables",
    image: "/images/fresh_pumpkin.png",
    description: "Mature yellow/orange pumpkins. Long shelf life, sweet flesh, perfect for curries and pies.",
    specs: { grade: "Mature Whole", packaging: "Bulk Truckload / Sacks", moisture: "Natural Hard Skin", origin: "Nellore Cooperatives" }
  },
  {
    prodname: "Fresh Radish",
    proddispid: 2856184692122,
    category: "Vegetables",
    image: "/images/fresh_radish.png",
    description: "Crunchy white radishes with fresh green leaves. Cleaned and trimmed.",
    specs: { grade: "White Long Grade A", packaging: "Crates", moisture: "Fresh Harvest", origin: "Ooty Cooperatives" }
  },
  {
    prodname: "Fresh Drumstick",
    proddispid: 2856184692123,
    category: "Vegetables",
    image: "/images/fresh_drumstick.png",
    description: "Thick and pulpy drumsticks (Moringa pods). Highly aromatic, essential for sambar and stews.",
    specs: { grade: "Pulpy Long Green", packaging: "Bundles / Gunny Bags", moisture: "Fresh Harvest", origin: "Guntur Region" }
  },
  {
    prodname: "Fresh Green Peas",
    proddispid: 2856184692124,
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?auto=format&fit=crop&q=80&w=400",
    description: "Sweet green peas in pod. Sourced from cold zones, highly sweet and tender.",
    specs: { grade: "Sweet Table Grade", packaging: "Net Bags / Chilled Crates", moisture: "Fresh Crop", origin: "Himachal / Ooty" }
  },
  {
    prodname: "Fresh Beans",
    proddispid: 2856184692125,
    category: "Vegetables",
    image: "/images/fresh_beans.png",
    description: "Tender green french beans. Crisp snap texture, sorted to eliminate fiber strings.",
    specs: { grade: "Tender Sliced Grade", packaging: "Crates", moisture: "Fresh Crop", origin: "South Hills" }
  },
  {
    prodname: "Sweet Corn Cob",
    proddispid: 2856184692126,
    category: "Vegetables",
    image: "/images/sweet_corn_cob.png",
    description: "Sweet yellow corn cobs with husk. Juicy kernels, high sugar conversion yield.",
    specs: { grade: "Sweet Yellow Corn", packaging: "PP Bags / Crates", moisture: "Fresh Harvest", origin: "Local Farmers" }
  },
  {
    prodname: "Fresh Yellow Lemon",
    proddispid: 2856184692127,
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1590502593747-42a996133562?auto=format&fit=crop&q=80&w=400",
    description: "Juicy yellow lemons with thin skins. Sourced from the famous lemon orchards of Tenali.",
    specs: { grade: "Grade A Juicy", packaging: "Mesh Sacks", moisture: "Fresh Fruit", origin: "Tenali, Andhra Pradesh" }
  },
  {
    prodname: "Fresh Raw Banana",
    proddispid: 2856184692128,
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1566393028639-d108a42c46a7?auto=format&fit=crop&q=80&w=400",
    description: "Firm green raw bananas. Perfect starch values for cooking, chips manufacturing, or local curries.",
    specs: { grade: "Grade-A Green cooking", packaging: "Loose loads / Crates", moisture: "Fresh Yield", origin: "East Godavari Districts" }
  },
  {
    prodname: "Fresh Mushroom",
    proddispid: 2856184692129,
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=400",
    description: "White button mushrooms grown in sterile conditions. High protein content, fresh yield.",
    specs: { grade: "White Button Grade-A", packaging: "200g Packs / 5kg Bulk Crates", moisture: "Fresh Harvest", origin: "Visakhapatnam Mushroom Farms" }
  },

  // --- OILS ---
  {
    prodname: "Groundnut Oil",
    proddispid: 2856184693002,
    category: "Oils",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=400",
    description: "Traditional cold-pressed groundnut oil. High smoke point, rich nutty aroma.",
    specs: { grade: "Cold Pressed (Kachi Ghani)", packaging: "1L Bottles / 5L Jerry Cans", moisture: "0.15% Max", origin: "Anantapur Processing Unit" }
  },
  {
    prodname: "Mustard Oil",
    proddispid: 2856184693003,
    category: "Oils",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=400",
    description: "Pure pungent mustard oil. Best for cooking traditional dishes, preserves food naturally.",
    specs: { grade: "Kachi Ghani Mustard Oil", packaging: "1L Bottles / 15kg Tins", moisture: "0.1% Max", origin: "Rajasthan Mills" }
  },
  {
    prodname: "Coconut Oil",
    proddispid: 2856184690777,
    category: "Oils",
    image: "/images/edible_oils.png",
    description: "100% pure cold-pressed edible coconut oil. Rich aroma, natural taste, zero chemical additives or preservatives.",
    specs: { grade: "Cold Pressed / Virgin Grade", packaging: "1L Bottles / 5L Cans / 15kg Tins", moisture: "0.2% Maximum", origin: "Konaseema Oil Mills, AP" }
  },
  {
    prodname: "Olive Oil",
    proddispid: 2856184693004,
    category: "Oils",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=400",
    description: "Extra virgin olive oil cold extracted from premium Mediterranean olives. Perfect for salads and light cooking.",
    specs: { grade: "Extra Virgin Cold Extracted", packaging: "250ml / 500ml / 1L Glass Bottles", moisture: "0.05% Max", origin: "Imported Sourced" }
  },
  {
    prodname: "Sesame Oil",
    proddispid: 2856184693005,
    category: "Oils",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=400",
    description: "Pure sesame (til) oil. Nutritious, rich color, highly traditional oil for South Indian cuisines.",
    specs: { grade: "Cold Pressed Til Oil", packaging: "1L Bottles / 5L Cans", moisture: "0.1% Max", origin: "AP Sourcing Mills" }
  },
  {
    prodname: "Rice Bran Oil",
    proddispid: 2856184693006,
    category: "Oils",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=400",
    description: "Healthy refined rice bran oil. High smoke point, rich in Oryzanol, perfect for heart health.",
    specs: { grade: "Refined Rice Bran Oil", packaging: "1L Pouches / 5L Cans", moisture: "0.1% Max", origin: "Godavari Rice Belt" }
  },
  {
    prodname: "Soybean Oil",
    proddispid: 2856184693007,
    category: "Oils",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=400",
    description: "Refined soybean oil. Light color, neutral taste, excellent for everyday cooking requirements.",
    specs: { grade: "Refined Soybean Oil", packaging: "1L Pouches / 15L Cans", moisture: "0.1% Max", origin: "Madhya Pradesh Mills" }
  },
  {
    prodname: "Palm Oil",
    proddispid: 2856184693008,
    category: "Oils",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=400",
    description: "Refined palm oil. Stable at high temperatures, suitable for bakery and commercial frying.",
    specs: { grade: "Refined Bleached Deodorized (RBD)", packaging: "15kg Tins / Flexibags", moisture: "0.1% Max", origin: "Imported" }
  },
  {
    prodname: "Pure Cow Ghee",
    proddispid: 2856184693009,
    category: "Oils",
    image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&q=80&w=400",
    description: "Traditional pure cow ghee. Aromatic, granular texture, rich flavor suitable for cooking and sweets.",
    specs: { grade: "Premium Granular Cow Ghee", packaging: "500ml / 1L Tins & Packs", moisture: "0.3% Max", origin: "Coastal AP Cooperatives" }
  },
  {
    prodname: "Premium Butter",
    proddispid: 2856184693010,
    category: "Oils",
    image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&q=80&w=400",
    description: "Salted or unsalted premium butter cream. Smooth texture, rich milk fat content.",
    specs: { grade: "Table Butter (80% Milk Fat)", packaging: "100g / 500g blocks", moisture: "16% Max", origin: "AP Dairy cooperatives" }
  },

  // --- OTHER STANDARD CATEGORIES ---
  // Fruits
  {
    prodname: "Fresh Alphonso Mango",
    proddispid: 2856184635997,
    category: "Fruits",
    image: "/images/fresh_alphonso_mango.png",
    description: "Exquisite Alphonso mangoes, handpicked for sweetness, color, and premium texture.",
    specs: { grade: "Premium Table Grade (A-Grade)", packaging: "Cushioned Corrugated Boxes", moisture: "Fresh Fruit", origin: "Ratnagiri, India" }
  },
  {
    prodname: "Organic Fresh Watermelon",
    proddispid: 2856184558797,
    category: "Fruits",
    image: "/images/organic_watermelon.png",
    description: "Sweet, juicy organic watermelons grown using sustainable biodiverse methods.",
    specs: { grade: "Premium Table Grade", packaging: "Bulk Crates", moisture: "Fresh Harvest", origin: "Nellore, Andhra Pradesh" }
  },
  // Dairy
  {
    prodname: "Fresh Toned Milk",
    proddispid: 2856184694001,
    category: "Dairy",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=400",
    description: "Fresh pasteurized toned milk. Creamy and rich in calcium, packed daily.",
    specs: { grade: "Toned Milk (3% Fat)", packaging: "500ml / 1L pouches", moisture: "Fresh Liquid", origin: "Vizag Cooperative Dairy" }
  },
  {
    prodname: "Fresh Curd (Yogurt)",
    proddispid: 2856184694002,
    category: "Dairy",
    image: "/images/fresh_curd_yogurt.png",
    description: "Thick and creamy fresh curd. Naturally fermented, perfect digestive aid.",
    specs: { grade: "Standard Yogurt", packaging: "500g Cups / Pouches", moisture: "Fresh Dairy", origin: "Vizag Dairy" }
  },
  // Bakery
  {
    prodname: "Sliced Sandwich Bread",
    proddispid: 2856184695001,
    category: "Bakery",
    image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&q=80&w=400",
    description: "Freshly baked sliced soft white sandwich bread. Perfect for daily breakfasts.",
    specs: { grade: "Soft White Bread", packaging: "400g pack", moisture: "Freshly Baked", origin: "Local PVP Bakery Partner" }
  },
  // Beverages
  // Snacks
  {
    prodname: "Spiced Potato Chips",
    proddispid: 2856184697001,
    category: "Snacks",
    image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&q=80&w=400",
    description: "Crispy fried potato chips seasoned with natural salt and traditional red chilli spices.",
    specs: { grade: "Crispy Salted/Masala", packaging: "150g packets", moisture: "Low moisture", origin: "PVP Food Processing Unit" }
  },
  // Rice & Grains
  {
    prodname: "Basmati Paddy Rice",
    proddispid: 2856184690888,
    category: "Rice & Grains",
    image: "/images/basmati_paddy_rice.png",
    description: "Premium-grade Basmati paddy rice grains. Excellent length expansion, delicious aroma, cured naturally.",
    specs: { grade: "Premium Traditional Basmati", packaging: "25kg / 50kg PP Bags", moisture: "12% Maximum", origin: "Indo-Gangetic plains" }
  },
  {
    prodname: "White Short Grain Rice",
    proddispid: 2856184691555,
    category: "Rice & Grains",
    image: "/images/short_grain_rice.png",
    description: "Premium white short grain rice. Soft and sticky texture, ideal for daily dining.",
    specs: { grade: "Sona Masoori / Raw Short Grain", packaging: "26kg / 50kg HDPE Bags", moisture: "12% Maximum", origin: "Krishna-Godavari delta, AP" }
  },
  // Pulses
  {
    prodname: "Yellow Toor Dal",
    proddispid: 2856184627873,
    category: "Pulses",
    image: "/images/yellow_toor_dal.png",
    description: "Premium bold yellow split pigeon peas (Toor Dal). Silky polished, uniform sortex quality.",
    specs: { grade: "Bold Sortex Cleaned", packaging: "25kg / 50kg PP Bags", moisture: "9.5% Maximum", origin: "Latur, Maharashtra" }
  },
  {
    prodname: "Whole Green Moong Dal",
    proddispid: 2856184691222,
    category: "Pulses",
    image: "/images/green_moong_dal.png",
    description: "Whole premium green gram (Moong Dal). Uniform size, cleaned using sortex machines.",
    specs: { grade: "Sortex Cleaned Bold", packaging: "25kg / 50kg PP Sacks", moisture: "9% Maximum", origin: "AP cooperative farms" }
  },
  // Spices
  {
    prodname: "Dried Turmeric Finger",
    proddispid: 2856184680048,
    category: "Spices",
    image: "/images/turmeric_export.png",
    description: "Premium double-polished dried turmeric finger roots. Highly valued for deep golden color and curcumin value.",
    specs: { grade: "Export Quality Double Polished", packaging: "25kg / 50kg Jute Bags", moisture: "9% Maximum", origin: "Kadapa, AP" }
  },
  {
    prodname: "Dry Red Chilli",
    proddispid: 2856184690999,
    category: "Spices",
    image: "/images/dry_red_chilli.png",
    description: "Premium dried red chillies. Uniform fiery red color, high heat values, ideal for exports.",
    specs: { grade: "Guntur Teja (S17) / Stemless", packaging: "10kg / 25kg Gunny Bags", moisture: "10% Maximum", origin: "Guntur Chilli Yard, AP" }
  },
  {
    prodname: "Organic Dry Cloves",
    proddispid: 2856184691333,
    category: "Spices",
    image: "/images/dry_cloves.png",
    description: "Fully dried, highly aromatic cloves (Laung). High oil content, deep brown hue.",
    specs: { grade: "Hand-picked Selected (HPS) Grade", packaging: "25kg Jute bags with inner lining", moisture: "11% Maximum", origin: "Kerala, India" }
  },
  // Household
  {
    prodname: "Premium Dishwash Liquid",
    proddispid: 2856184698001,
    category: "Household",
    image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&q=80&w=400",
    description: "High-concentration lemon active dishwashing liquid. Removes grease easily and leaves a fresh scent.",
    specs: { grade: "Concentrated Active", packaging: "500ml / 1L Bottles", moisture: "N/A", origin: "PVP Chemical Unit" }
  },
  // Personal Care
  // --- ADDED EXPORTS & SPECIFIC LOCAL AI IMAGES ---
  {
    prodname: "Premium Cardamom",
    proddispid: 2856184691444,
    category: "Spices",
    image: "/images/cardamoms_spices.png",
    description: "Export-grade green cardamom pods (Elaichi) with rich aroma, high oil content, and bold size (7mm - 8mm+).",
    specs: { grade: "Bold Green 7mm / 8mm+", packaging: "10kg / 25kg PP bags or Cartons", moisture: "10% Maximum", origin: "Directly sourced from top plantations in Kerala" }
  },
  {
    prodname: "Fresh Wholesale Coconuts",
    proddispid: 2856184636001,
    category: "Fruits",
    image: "/images/coconuts_wholesale.png",
    description: "Fully mature semi-dehusked fresh coconuts with rich water and kernel density. Perfect for bulk export and retail.",
    specs: { grade: "Semi-dehusked Grade A (Weight 550g - 650g+)", packaging: "25 nuts per PP bag", moisture: "Fresh Harvest", origin: "East Godavari, Andhra Pradesh" }
  },
  {
    prodname: "Fresh Tender Coconut",
    proddispid: 2856184636002,
    category: "Fruits",
    image: "/images/tender_coconut.png",
    description: "Naturally sweet and highly hydrating green tender coconuts. Freshly harvested and sorted.",
    specs: { grade: "Grade A Sweet Water", packaging: "Bulk loaded or crates", moisture: "Fresh Harvest", origin: "Coastal Andhra Districts" }
  },
  {
    prodname: "Half-Cut Dry Coconut (Copra)",
    proddispid: 2856184636003,
    category: "Fruits",
    image: "/images/half_cut_dry_coconut.png",
    description: "Sun-dried copra halves, rich in oil content. Cleanly processed for oil extraction and culinary use.",
    specs: { grade: "Milling / Edible Grade", packaging: "50kg Gunny Bags", moisture: "6% Maximum", origin: "Konaseema Region, AP" }
  },
  {
    prodname: "Premium Yellow Maize Seeds",
    proddispid: 2856184691777,
    category: "Rice & Grains",
    image: "/images/yellow_maize_seeds.png",
    description: "Export-quality yellow maize seeds, highly cleaned and sorted. Ideal for food processing, animal feed, and starch production.",
    specs: { grade: "Export Quality Grade A", packaging: "50kg Jute or PP Bags", moisture: "14% Maximum", origin: "Vizag, Andhra Pradesh" }
  },
  {
    prodname: "Premium Raw Coffee Beans",
    proddispid: 2856184696002,
    category: "Beverages",
    image: "/images/raw_coffee_beans.png",
    description: "High-quality green coffee beans sourced from the high-altitude fields of Araku Valley, sorted to ensure zero defects.",
    specs: { grade: "AAA Grade Araku Plantation", packaging: "50kg Jute bags", moisture: "12% Max", origin: "Araku Valley, AP" }
  },
  {
    prodname: "Premium Golden Broken Rice",
    proddispid: 2856184691566,
    category: "Rice & Grains",
    image: "/images/golden_broken_rice.png",
    description: "High-grade broken rice grains, double-polished and sortex-cleaned. Excellent texture, ideal for flour and food processing.",
    specs: { grade: "100% Broken Sortex Cleaned", packaging: "25kg / 50kg PP Bags", moisture: "13% Max", origin: "Coastal Andhra Rice Mills" }
  },
  {
    prodname: "Premium Refined Sugar",
    proddispid: 2856184691888,
    category: "Rice & Grains",
    image: "/images/refined_sugar.png",
    description: "Double refined white crystal sugar, highly pure and sweet, suitable for household and food industries.",
    specs: { grade: "ICUMSA 45 Export Quality", packaging: "50kg PP Bags", moisture: "0.04% Max", origin: "Uttar Pradesh / Maharashtra" }
  },
  {
    prodname: "Premium Mustard Seeds",
    proddispid: 2856184691455,
    category: "Spices",
    image: "/images/mustard_seeds.png",
    description: "Bold black/yellow mustard seeds with rich oil content and strong, natural aroma.",
    specs: { grade: "Bold Grade A", packaging: "25kg / 50kg Bags", moisture: "8% Maximum", origin: "Rajasthan, India" }
  },
  {
    prodname: "Fresh Seer Fish",
    proddispid: 2856184699555,
    category: "Seafood",
    image: "/images/fresh_seer_fish.png",
    description: "Premium fresh-caught Seer Fish (Vanjaram), hygienically cleaned, cold-chain preserved to guarantee freshness.",
    specs: { grade: "Export Grade Whole / Slices", packaging: "Thermocol boxes with dry ice", moisture: "Fresh Catch", origin: "Visakhapatnam Harbor / Bay of Bengal" }
  }
];

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sortBy, setSortBy] = useState('name-asc');

  // Filter Categories
  const categories = [
    'All', 'Fruits', 'Vegetables', 'Dry Fruits & Nuts', 'Oils', 
    'Dairy', 'Bakery', 'Beverages', 'Snacks', 'Rice & Grains', 
    'Pulses', 'Spices', 'Seafood', 'Household', 'Personal Care'
  ];

  // Handle advanced search with synonyms mapping
  const filteredProducts = productsData
    .filter((product) => {
      const cleanSearch = searchTerm.trim().toLowerCase();
      if (!cleanSearch) {
        return selectedCategory === 'All' || product.category === selectedCategory;
      }

      // Check direct matches
      const directMatch = product.prodname.toLowerCase().includes(cleanSearch) ||
                          product.description.toLowerCase().includes(cleanSearch) ||
                          product.category.toLowerCase().includes(cleanSearch);

      if (directMatch) {
        return selectedCategory === 'All' || product.category === selectedCategory;
      }

      // Check synonym maps
      const synonymTarget = SYNONYMS[cleanSearch];
      if (synonymTarget) {
        const synMatch = product.prodname.toLowerCase().includes(synonymTarget) ||
                         product.description.toLowerCase().includes(synonymTarget);
        if (synMatch) {
          return selectedCategory === 'All' || product.category === selectedCategory;
        }
      }

      // Check if the product name or category is a synonym to our search term
      for (const [key, value] of Object.entries(SYNONYMS)) {
        if (key.includes(cleanSearch) || cleanSearch.includes(key)) {
          if (product.prodname.toLowerCase().includes(value) || product.description.toLowerCase().includes(value)) {
            return selectedCategory === 'All' || product.category === selectedCategory;
          }
        }
      }

      return false;
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
                Explore Our Grocery & Commodity Catalog
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
                    placeholder="Search commodities (e.g. kaju, badam, aloo)..."
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
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-8">
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
                  PVP International has established itself as a reliable Wholesaler and Trader of agricultural yields. Under the leadership of <strong>CEO P. Varaprasad</strong>, we coordinate bulk sourcing directly from local farmers and agricultural hubs, maintaining deep quality supervision at every stage of the lifecycle.
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

        {/* Reviews Section */}
        <Reviews />

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
                    Madhurwada, Visakhapatnam, Andhra Pradesh, India - 530048
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex gap-4">
                <div className="p-3.5 rounded-xl bg-amber-100 text-amber-600 h-max">
                  <FiPhone className="text-xl" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-1">Call / WhatsApp</h4>
                  <p className="text-xs text-gray-500 font-bold mb-1">+91 94937 09757</p>
                  <p className="text-xs text-gray-500">+91 70134 90164</p>
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
