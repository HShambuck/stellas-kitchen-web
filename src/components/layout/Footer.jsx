import { Link } from "react-router-dom";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Logo from "../common/Logo";
import { BRAND } from "../../constants/branding";
import { CONTACT, HOURS } from "../../constants/contact";
import { NAV_LINKS } from "../../constants/navigation";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brown-950 text-white">
      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <Logo light size="md" />
            <p className="mt-4 text-white/70 text-sm leading-relaxed">
              {BRAND.description}
            </p>
            <a
              href={CONTACT.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600
                         rounded-full text-sm font-semibold transition-colors duration-200"
            >
              <WhatsAppIcon fontSize="small" />
              Chat on WhatsApp
            </a>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-display font-bold text-base mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white/70 hover:text-red-300 text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-display font-bold text-base mb-4 text-white">Opening Hours</h3>
            <div className="flex items-start gap-2 text-white/70 text-sm">
              <AccessTimeIcon fontSize="small" className="mt-0.5 text-red-400 flex-shrink-0" />
              <div>
                <p className="font-semibold text-white">{HOURS.days}</p>
                <p>{HOURS.open} – {HOURS.close}</p>
                <p className="mt-1 text-xs text-red-300">{HOURS.note}</p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-bold text-base mb-4 text-white">Get in Touch</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={CONTACT.telLink}
                  className="flex items-center gap-2 text-white/70 hover:text-red-300
                             text-sm transition-colors duration-200"
                >
                  <PhoneIcon fontSize="small" className="text-red-400" />
                  {CONTACT.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/70 hover:text-red-300
                             text-sm transition-colors duration-200"
                >
                  <WhatsAppIcon fontSize="small" className="text-green-400" />
                  WhatsApp Us
                </a>
              </li>
              <li className="flex items-start gap-2 text-white/70 text-sm">
                <LocationOnIcon fontSize="small" className="text-red-400 mt-0.5 flex-shrink-0" />
                <span>{CONTACT.address}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row
                        items-center justify-between gap-3 text-white/50 text-xs">
          <p>© {year} {BRAND.name}. All rights reserved.</p>
          <p className="italic text-red-400 font-display">"{BRAND.motto}"</p>
        </div>
      </div>
    </footer>
  );
}
