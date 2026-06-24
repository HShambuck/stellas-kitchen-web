import { Helmet } from "react-helmet-async";
import PhoneIcon from "@mui/icons-material/Phone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ScrollReveal from "../components/common/ScrollReveal";
import { BRAND } from "../constants/branding";
import { CONTACT, HOURS } from "../constants/contact";

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact | {BRAND.name}</title>
        <meta
          name="description"
          content={`Contact Stella's Kitchen — call ${CONTACT.phoneDisplay} or WhatsApp us.`}
        />
      </Helmet>

      {/* Page header */}
      <div className="pt-32 pb-16 bg-cream border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="section-eyebrow">Get in Touch</span>
          <h1 className="section-heading mt-3 mb-4">We'd Love to Hear From You</h1>
          <p className="text-gray-500 max-w-xl mx-auto text-sm">
            Whether you want to place an order, make a reservation, or just say hello — we're always happy to chat.
          </p>
        </div>
      </div>

      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Left — contact info */}
            <div>
              <ScrollReveal>
                <h2 className="font-display font-bold text-2xl text-gray-900 mb-8">
                  Contact Details
                </h2>

                <div className="space-y-6">
                  {/* Phone */}
                  <div className="flex items-start gap-4 p-5 rounded-2xl border border-gray-100 hover:border-red-200 hover:bg-red-50/30 transition-colors">
                    <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <PhoneIcon className="text-red-500" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">Phone</p>
                      <a
                        href={CONTACT.telLink}
                        className="font-display font-bold text-xl text-gray-900 hover:text-red-500 transition-colors"
                      >
                        {CONTACT.phoneDisplay}
                      </a>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="flex items-start gap-4 p-5 rounded-2xl border border-gray-100 hover:border-green-200 hover:bg-green-50/30 transition-colors">
                    <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <WhatsAppIcon className="text-green-500" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">WhatsApp</p>
                      <a
                        href={CONTACT.whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-display font-bold text-xl text-gray-900 hover:text-green-500 transition-colors"
                      >
                        {CONTACT.phoneDisplay}
                      </a>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-4 p-5 rounded-2xl border border-gray-100">
                    <div className="w-12 h-12 bg-brown-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <LocationOnIcon className="text-brown-500" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">Location</p>
                      <p className="font-semibold text-gray-900">{CONTACT.address}</p>
                    </div>
                  </div>
                </div>

                {/* Call button */}
                <a
                  href={CONTACT.telLink}
                  className="btn-primary mt-8 inline-flex text-base px-8 py-4"
                >
                  <PhoneIcon fontSize="small" /> Call Now
                </a>
              </ScrollReveal>
            </div>

            {/* Right — hours + map */}
            <div>
              <ScrollReveal delay={100}>
                {/* Opening hours */}
                <div className="bg-cream rounded-3xl p-8 mb-8 border border-gray-100">
                  <div className="flex items-center gap-3 mb-6">
                    <AccessTimeIcon className="text-red-500" />
                    <h3 className="font-display font-bold text-xl text-gray-900">Opening Hours</h3>
                  </div>
                  <div className="space-y-3">
                    {HOURS.schedule.map(({ day, hours }) => (
                      <div key={day} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0">
                        <span className="text-sm font-medium text-gray-700">{day}</span>
                        <span className="text-sm text-green-600 font-semibold">{hours}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-xs text-red-500 font-semibold">{HOURS.note}</p>
                </div>

                {/* Map placeholder */}
                <div className="rounded-3xl overflow-hidden border border-gray-200 shadow-sm h-56 relative bg-gray-100 flex items-center justify-center">
                  <div className="text-center">
                    <LocationOnIcon className="text-red-500" style={{ fontSize: 40 }} />
                    <p className="text-sm font-semibold text-gray-700 mt-2">Doryumu-habitat</p>
                    <p className="text-xs text-gray-400">Shai Hills, Ghana</p>
                    <a
                      href="https://maps.google.com/?q=Shai+Hills+Ghana"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block text-xs text-red-500 underline hover:text-red-700"
                    >
                      Open in Google Maps
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
