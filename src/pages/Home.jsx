import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ScrollReveal from "../components/common/ScrollReveal";
import { HOME_HERO, HOME_WELCOME, HOME_FEATURES, HOME_CTA_BANNER } from "../constants/homeText";
import { BRAND } from "../constants/branding";
import { MENU_ITEMS } from "../constants/menuData";

// Map icon name strings → MUI components
const ICON_MAP = {
  LocalFireDepartment: LocalFireDepartmentIcon,
  DeliveryDining: DeliveryDiningIcon,
  AccessTime: AccessTimeIcon,
};

// Featured items for the mini showcase
const FEATURED = MENU_ITEMS.filter((m) => m.popular).slice(0, 4);

export default function Home() {
  const year = new Date().getFullYear();

  return (
    <>
      <Helmet>
        <title>Home | {BRAND.name}</title>
        <meta name="description" content={`${BRAND.name} — ${BRAND.motto}. ${BRAND.tagline}`} />
      </Helmet>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax background */}
        <div
          className="absolute inset-0 hero-parallax"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1800&q=80')",
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-hero-gradient" />

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block section-eyebrow text-brand-red mb-4 animate-fade-in">
            {HOME_HERO.eyebrow}
          </span>

          <h1 className="font-display font-black text-white text-5xl sm:text-6xl md:text-7xl
                         lg:text-8xl leading-none mb-6 animate-fade-up">
            {HOME_HERO.headline.map((line, i) => (
              <span key={i} className={`block ${i === 1 ? "text-brand-red" : ""}`}>
                {line}
              </span>
            ))}
          </h1>

          <p className="text-white/80 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10
                        animate-fade-up" style={{ animationDelay: "0.15s" }}>
            {HOME_HERO.subheadline}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up"
            style={{ animationDelay: "0.3s" }}>
            <Link to="/menu" className="btn-primary text-base px-8 py-4">
              {HOME_HERO.ctaPrimary}
              <ArrowForwardIcon fontSize="small" />
            </Link>
            <Link to="/menu"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/60
                         text-white font-semibold rounded-full hover:bg-white/10
                         transition-all duration-200 active:scale-95 text-base">
              {HOME_HERO.ctaSecondary}
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center
                        gap-2 text-white/50 animate-bounce-slow">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-white/30" />
        </div>
      </section>

      {/* ── Welcome ──────────────────────────────────────────────────────── */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <ScrollReveal>
              <span className="section-eyebrow">{HOME_WELCOME.eyebrow}</span>
              <h2 className="section-heading mt-3 mb-6">{HOME_WELCOME.headline}</h2>
              <div className="space-y-4">
                {HOME_WELCOME.body.map((para, i) => (
                  <p key={i} className="text-gray-600 leading-relaxed">{para}</p>
                ))}
              </div>
              <Link to="/about" className="btn-secondary mt-8 inline-flex">
                Our Story
                <ArrowForwardIcon fontSize="small" />
              </Link>
            </ScrollReveal>

            {/* Image grid */}
            <ScrollReveal delay={150}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80",
                  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80",
                  "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=600&q=80",
                  "https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=600&q=80",
                ].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt="Stella's Kitchen food"
                    className={`rounded-2xl object-cover w-full shadow-md card-hover
                      ${i === 0 || i === 3 ? "h-48" : "h-36 mt-6"}`}
                  />
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Features strip ───────────────────────────────────────────────── */}
      <section className="py-20 bg-brown-500 border-y border-brown-600/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {HOME_FEATURES.map((feat, i) => {
              const Icon = ICON_MAP[feat.icon] || LocalFireDepartmentIcon;
              return (
                <ScrollReveal key={i} delay={i * 100}>
                  <div className="flex flex-col items-center text-center gap-4">
                    {/* Soft, warm cream background instead of harsh white */}
                    <div className="w-14 h-14 rounded-2xl bg-brand-cream/90 flex items-center justify-center shadow-inner">
                      <Icon className="text-brand-red" fontSize="medium" />
                    </div>
                    {/* Warm bone-white heading */}
                    <h3 className="font-display font-bold text-xl text-orange-50/95">{feat.title}</h3>
                    {/* Muted, warm almond/sand text that is easy to read but calm */}
                    <p className="text-orange-100/75 text-sm leading-relaxed max-w-sm">{feat.body}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Popular Items Showcase ────────────────────────────────────────── */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-12">
            <span className="section-eyebrow">Customer Favourites</span>
            <h2 className="section-heading mt-3">What People Love</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED.map((item, i) => (
              <ScrollReveal key={item.id} delay={i * 80}>
                <Link
                  to="/menu"
                  className="group block rounded-3xl overflow-hidden shadow-sm hover:shadow-xl
                             border border-gray-100 bg-white transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500
                                 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-card-gradient opacity-60 group-hover:opacity-40 transition-opacity" />
                    <span className="absolute bottom-3 left-3 text-white font-display font-bold text-base leading-tight">
                      {item.name}
                    </span>
                    {item.spicy && (
                      <span className="absolute top-3 right-3 bg-brand-red text-white text-xs
                                       px-2 py-0.5 rounded-full font-semibold">🌶 Spicy</span>
                    )}
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <span className="font-bold text-brand-red">GHS {item.price}</span>
                    <span className="text-xs text-gray-400 font-medium">{item.category}</span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/menu" className="btn-primary">
              View Full Menu <ArrowForwardIcon fontSize="small" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────────────────────────────── */}
      <section className="relative py-24 overflow-hidden">
        <div
          className="absolute inset-0 hero-parallax"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1800&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="font-display font-black text-white text-4xl sm:text-5xl mb-4">
              {HOME_CTA_BANNER.headline}
            </h2>
            <p className="text-white/70 text-lg mb-8">{HOME_CTA_BANNER.subheadline}</p>
            <Link to="/menu" className="btn-primary text-base px-10 py-4">
              {HOME_CTA_BANNER.cta} <ArrowForwardIcon fontSize="small" />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}