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
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div
          className="absolute inset-0 hero-parallax opacity-20"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1800&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-cream/90" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="section-eyebrow">{ABOUT_HERO.eyebrow}</span>
          <h1 className="section-heading mt-3 text-5xl md:text-6xl mb-6">{ABOUT_HERO.headline}</h1>
          <div className="w-16 h-1 bg-red-500 rounded-full mx-auto" />
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
      <section className="py-20 bg-cream text-center">
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
