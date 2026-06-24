import { BRAND } from "../../constants/branding";

export default function Logo({ size = "md", light = false }) {
  const sizes = {
    sm: { wrapper: "w-8 h-8 text-sm",  text: "text-base" },
    md: { wrapper: "w-10 h-10 text-base", text: "text-xl"  },
    lg: { wrapper: "w-14 h-14 text-lg", text: "text-2xl"  },
  };
  const s = sizes[size] || sizes.md;

  return (
    <div className="flex items-center gap-2.5 select-none">
      {/* Icon mark */}
      <div
        className={`${s.wrapper} rounded-xl bg-red-500 flex items-center justify-center
                    font-display font-black text-white shadow-md flex-shrink-0`}
      >
        SK
      </div>
      {/* Name */}
      <div>
        <p className={`${s.text} font-display font-bold leading-none
                       ${light ? "text-white" : "text-gray-900"}`}>
          {BRAND.name}
        </p>
        <p className={`text-[10px] tracking-widest uppercase font-medium mt-0.5
                       ${light ? "text-white/70" : "text-red-500"}`}>
          {BRAND.motto}
        </p>
      </div>
    </div>
  );
}
