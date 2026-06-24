import { useState } from "react";
import { Helmet } from "react-helmet-async";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useCart } from "../context/CartContext";
import { MENU_ITEMS, MENU_CATEGORIES } from "../constants/menuData";
import { BRAND } from "../constants/branding";
import { formatCurrencyCompact } from "../utils/currency";
import ScrollReveal from "../components/common/ScrollReveal";

function MenuCard({ item }) {
  const { addItem, openCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div
      className="group relative bg-white rounded-3xl overflow-hidden border-2 border-transparent
                 hover:border-red-400 shadow-sm hover:shadow-2xl transition-all duration-300
                 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-card-gradient opacity-50 group-hover:opacity-30 transition-opacity" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {item.popular && (
            <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
              Popular
            </span>
          )}
          {item.spicy && (
            <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              🌶 Spicy
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <h3 className="font-display font-bold text-gray-900 text-base leading-tight mb-1">
          {item.name}
        </h3>
        <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-4">
          {item.description}
        </p>
        <div className="flex items-center justify-between mt-4">
          <span className="font-bold text-red-500 text-lg flex-shrink-0">
            {formatCurrencyCompact(item.price)}
          </span>
          
          <button
            onClick={handleAdd}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold
                        transition-all duration-200 active:scale-95 z-10 flex-shrink-0
                        ${added
                          ? "bg-green-500 text-white opacity-100"
                          : "bg-red-500 hover:bg-red-600 text-white lg:opacity-0 lg:group-hover:opacity-100"
                        }`}
          >
            {added ? (
              <><CheckCircleIcon style={{ fontSize: 14 }} /> Added!</>
            ) : (
              <><AddShoppingCartIcon style={{ fontSize: 14 }} /> Add to Cart</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? MENU_ITEMS
      : MENU_ITEMS.filter((m) => m.category === activeCategory);

  return (
    <>
      <Helmet>
        <title>Menu | {BRAND.name} — Shai Hills Dining</title>
        <meta
          name="description"
          content="Explore Stella's Kitchen full menu — Jollof Rice, Burgers, Shawarma, Pizza, Banku, Coffee and more."
        />
      </Helmet>

      {/* Page header - Image background with dark overlay for maximum contrast */}
      <div className="pt-40 pb-20 relative overflow-hidden bg-brown-950">
        {/* Background Image Layer */}
        <img 
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80" 
          alt="Stella's Kitchen Banner"
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
        />
        {/* Dark overlay mask - This protects your white text and navbar links */}
        <div className="absolute inset-0 bg-black/75 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-brown-950 via-transparent to-black/40" />
        
        {/* Header Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-red bg-white/10 backdrop-blur-xs px-3 py-1 rounded-full">
            Shai Hills, Ghana
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mt-4 mb-4">
            Our Menu
          </h1>
          <p className="text-brown-100/80 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Crafted fresh every day. From West African classics to global comfort food — 
            there's something for everyone at Stella's.
          </p>
        </div>
      </div>

      {/* Category filter - Blur background sitting softly over your layout */}
      <div className="sticky top-16 md:top-20 z-30 bg-brand-cream/80 backdrop-blur-md border-b border-brown-100/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide no-scrollbar">
            {MENU_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-5 py-2.5 rounded-full text-xs font-bold
                             transition-all duration-200 whitespace-nowrap shadow-xs
                             ${activeCategory === cat
                               ? "bg-brand-red text-white shadow-md shadow-brand-red/20"
                               : "bg-white text-gray-600 hover:bg-brown-50 border border-brown-100/50"
                             }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid Canvas - Using the new rich brown-50 background so your white cards pop */}
      <div className="py-16 bg-brown-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-lg font-semibold">No items in this category yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((item, i) => (
                <ScrollReveal key={item.id} delay={i * 50}>
                  <MenuCard item={item} />
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}