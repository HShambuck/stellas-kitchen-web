import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ScrollReveal from "../components/common/ScrollReveal";
import { BRAND } from "../constants/branding";
import { ABOUT_HERO, ABOUT_STORY, ABOUT_STATS } from "../constants/aboutText";

export default function About() {
  return (
    <>
      <Helmet>
        <title>About | {BRAND.name}</title>
        <meta
          name="description"
          content="The story of Stella's Kitchen — born in Doryumu-habitat, Shai Hills."
        />
      </Helmet>

      {/* Hero */}
      <section className="pt-40 pb-24 relative overflow-hidden bg-brown-950">
        {/* Background Image Layer */}
        <img 
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=80" 
          alt="Stella's Kitchen Kitchen View"
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
        />
        {/* Dark overlay mask - Protects white text contrast and layout readability */}
        <div className="absolute inset-0 bg-black/50 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-brown-950 via-transparent to-black/40" />
        
        {/* Header Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-red bg-white/10 backdrop-blur-xs px-3 py-1 rounded-full">
            {ABOUT_HERO.eyebrow}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mt-4 mb-6">
            {ABOUT_HERO.headline}
          </h1>
          <div className="w-16 h-1 bg-brand-red rounded-full mx-auto" />
        </div>
      </section>

      {/* Story sections */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Alternating image + text layout */}
          {ABOUT_STORY.map((section, i) => (
            <ScrollReveal key={i} delay={i * 80}>
              <div
                className={`flex flex-col ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}
                            gap-12 items-center mb-24 last:mb-0`}
              >
                {/* Image */}
                <div className="lg:w-1/2">
                  <img
                    src={[
                      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80",
                      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&q=80",
                      "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&q=80",
                      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
                    ][i]}
                    alt={section.heading}
                    className="w-full h-72 lg:h-96 object-cover rounded-3xl shadow-lg"
                  />
                </div>
                {/* Text */}
                <div className="lg:w-1/2">
                  <span className="section-eyebrow">0{i + 1}</span>
                  <h2 className="font-display font-bold text-3xl lg:text-4xl text-gray-900 mt-2 mb-5">
                    {section.heading}
                  </h2>
                  <p className="text-gray-600 leading-relaxed text-base">{section.body}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Stats bar */}
      <section className="py-16 bg-brown-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {ABOUT_STATS.map((stat, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div>
                  <p className="font-display font-black text-5xl text-red-300">{stat.value}</p>
                  <p className="text-white/70 text-sm mt-2 leading-snug">{stat.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-brand-cream text-center">
        <ScrollReveal>
          <h2 className="section-heading mb-4">Come eat with us.</h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto text-sm">
            We're open every day of the week. Drop by or order online — we're ready for you.
          </p>
          <Link to="/menu" className="btn-primary">
            See the Menu <ArrowForwardIcon fontSize="small" />
          </Link>
        </ScrollReveal>
      </section>
    </>
  );
}
