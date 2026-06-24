import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Logo from "../common/Logo";
import { NAV_LINKS } from "../../constants/navigation";
import { useCart } from "../../context/CartContext";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems, toggleCart } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${scrolled
            ? "bg-white/95 backdrop-blur-md shadow-md"
            : "bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Logo */}
            <Link to="/" onClick={() => setMenuOpen(false)}>
              <Logo size="sm" light={!scrolled} />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === "/"}
                  className={({ isActive }) =>
                    `nav-link pb-1 ${isActive ? "active" : ""}
                     ${scrolled ? "text-gray-700" : "text-white hover:text-red-300"}`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Right — Cart + Mobile Hamburger */}
            <div className="flex items-center gap-3">
              {/* Cart Button */}
              <button
                onClick={toggleCart}
                className={`relative p-2 rounded-full transition-all duration-200
                  hover:bg-white/20 active:scale-95
                  ${scrolled ? "text-gray-700 hover:bg-gray-100" : "text-white"}`}
                aria-label="Open cart"
              >
                <ShoppingCartIcon fontSize="small" />
                {totalItems > 0 && (
                  <span
                    className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white
                               text-[10px] font-bold rounded-full flex items-center justify-center
                               animate-bounce-slow"
                  >
                    {totalItems > 9 ? "9+" : totalItems}
                  </span>
                )}
              </button>

              {/* Order Now — desktop only */}
              <Link
                to="/menu"
                className={`hidden md:inline-flex btn-primary text-sm px-5 py-2
                  ${!scrolled ? "bg-red-500" : ""}`}
              >
                Order Now
              </Link>

              {/* Hamburger — mobile */}
              <button
                className={`md:hidden p-2 rounded-lg transition-colors
                  ${scrolled ? "text-gray-700 hover:bg-gray-100" : "text-white hover:bg-white/20"}`}
                onClick={() => setMenuOpen((v) => !v)}
                aria-label="Toggle menu"
              >
                {menuOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300
          ${menuOpen ? "visible" : "invisible"}`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300
            ${menuOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setMenuOpen(false)}
        />

        {/* Panel */}
        <nav
          className={`absolute top-0 right-0 h-full w-72 bg-white shadow-2xl
                      flex flex-col pt-20 pb-8 px-6 transition-transform duration-300
                      ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/"}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl text-base font-semibold transition-all duration-150
                   ${isActive
                     ? "bg-red-50 text-red-500"
                     : "text-gray-700 hover:bg-gray-50 hover:text-red-500"
                   }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="mt-auto">
            <Link
              to="/menu"
              onClick={() => setMenuOpen(false)}
              className="btn-primary w-full justify-center"
            >
              Order Now
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
