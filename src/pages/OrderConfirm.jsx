import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import HomeIcon from "@mui/icons-material/Home";
import { BRAND } from "../constants/branding";
import { CONTACT } from "../constants/contact";
import { formatCurrencyCompact } from "../utils/currency";

export default function OrderConfirm() {
  const { state } = useLocation();
  const customerName = state?.customerName || "Friend";
  const totalPrice   = state?.totalPrice   || 0;

  // Scroll to top on mount
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <Helmet>
        <title>Order Confirmed | {BRAND.name}</title>
      </Helmet>

      <div className="min-h-screen bg-cream flex items-center justify-center px-4 py-20">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 text-center border border-gray-100">
          {/* Success icon */}
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-40" />
            <div className="relative w-24 h-24 bg-green-50 rounded-full flex items-center justify-center">
              <CheckCircleIcon className="text-green-500" style={{ fontSize: 52 }} />
            </div>
          </div>

          <h1 className="font-display font-bold text-3xl text-gray-900 mb-2">
            Order Placed! 🎉
          </h1>
          <p className="text-gray-600 text-base mb-1">
            Thank you, <span className="font-semibold text-red-500">{customerName}</span>!
          </p>
          <p className="text-gray-500 text-sm mb-6">
            We received your order for{" "}
            <span className="font-bold text-gray-800">{formatCurrencyCompact(totalPrice)}</span>.
            We'll get it ready and on the way to you soon.
          </p>

          {/* Divider */}
          <div className="border-t border-gray-100 my-6" />

          <p className="text-sm text-gray-500 mb-5">
            Questions? Reach us directly:
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={CONTACT.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-green-500
                         hover:bg-green-600 text-white font-semibold rounded-full
                         transition-colors duration-200 text-sm"
            >
              <WhatsAppIcon fontSize="small" /> WhatsApp Us
            </a>
            <Link
              to="/"
              className="flex items-center justify-center gap-2 px-6 py-3 border-2
                         border-gray-200 text-gray-700 font-semibold rounded-full
                         hover:border-gray-300 hover:bg-gray-50 transition-colors duration-200 text-sm"
            >
              <HomeIcon fontSize="small" /> Back Home
            </Link>
          </div>

          <p className="mt-8 text-xs text-red-400 font-display italic">"{BRAND.motto}"</p>
        </div>
      </div>
    </>
  );
}
