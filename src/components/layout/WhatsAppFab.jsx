import { useState } from "react";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CloseIcon from "@mui/icons-material/Close";
import { COLORS, BRAND } from "../../constants/branding";
import { CONTACT as CONTACT_INFO } from "../../constants/contact";

export default function WhatsAppFab() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-6 right-5 z-50 flex flex-col items-end gap-3">
      {/* Tooltip bubble */}
      {showTooltip && (
        <div className="bg-white rounded-2xl shadow-xl p-4 max-w-[200px] border border-gray-100
                        animate-fade-up text-sm text-gray-700 text-right">
          <p className="font-semibold text-gray-900 mb-0.5">Chat with us!</p>
          <p className="text-xs text-gray-500">We reply fast on WhatsApp</p>
          <button
            onClick={() => setShowTooltip(false)}
            className="mt-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <CloseIcon style={{ fontSize: 14 }} />
          </button>
        </div>
      )}

      {/* Main FAB */}
      <a
        href={CONTACT_INFO.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label="Chat with Stella's Kitchen on WhatsApp"
        className="w-14 h-14 bg-green-500 hover:bg-green-600 active:scale-90 text-white
                   rounded-full shadow-2xl flex items-center justify-center
                   transition-all duration-200 animate-float"
      >
        <WhatsAppIcon style={{ fontSize: 28 }} />
        {/* Ping animation */}
        <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-30 pointer-events-none" />
      </a>
    </div>
  );
}
