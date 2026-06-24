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
        <div className="flex items-center justify-between">
          <span className="font-bold text-red-500 text-lg">
            {formatCurrencyCompact(item.price)}
          </span>
          <button
            onClick={handleAdd}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold
                        transition-all duration-200 active:scale-90
                        opacity-0 group-hover:opacity-100
                        ${added
                          ? "bg-green-500 text-white"
                          : "bg-red-500 hover:bg-red-600 text-white"
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

      {/* Page header */}
      <div className="pt-32 pb-12 bg-cream border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="section-eyebrow">Shai Hills, Ghana</span>
          <h1 className="section-heading mt-2 mb-4">Our Menu</h1>
          <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
            Crafted fresh every day. From West African classics to global comfort food —
            there's something for everyone at Stella's.
          </p>
        </div>
      </div>

      {/* Category filter */}
      <div className="sticky top-16 md:top-20 z-30 bg-white/90 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide no-scrollbar">
            {MENU_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold
                             transition-all duration-200 whitespace-nowrap
                             ${activeCategory === cat
                               ? "bg-red-500 text-white shadow-md"
                               : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                             }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="py-16 bg-cream min-h-screen">
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
