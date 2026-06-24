import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/Delete";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useCart } from "../../context/CartContext";
import { formatCurrencyCompact } from "../../utils/currency";

export default function CartModal() {
  const { items, isOpen, totalItems, totalPrice, closeCart, increment, decrement, removeItem } =
    useCart();
  const navigate = useNavigate();

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") closeCart(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [closeCart]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleCheckout = () => {
    closeCart();
    navigate("/checkout");
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300
          ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl
                    flex flex-col transition-transform duration-350 ease-out
                    ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ShoppingBagIcon className="text-red-500" />
            <h2 className="font-display font-bold text-xl">Your Order</h2>
            {totalItems > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close cart"
          >
            <CloseIcon fontSize="small" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center">
                <ShoppingBagIcon style={{ fontSize: 36 }} className="text-gray-300" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Your cart is empty</p>
                <p className="text-sm text-gray-500 mt-1">
                  Add delicious items from our menu!
                </p>
              </div>
              <button onClick={closeCart} className="btn-primary mt-2">
                Browse Menu
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-4 p-3 rounded-2xl border border-gray-100
                             hover:border-red-100 hover:bg-red-50/30 transition-colors duration-200"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                  />
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm truncate">{item.name}</p>
                    <p className="text-red-500 font-bold text-sm mt-0.5">
                      {formatCurrencyCompact(item.price)}
                    </p>
                  </div>
                  {/* Qty controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decrement(item.id)}
                      className="w-7 h-7 rounded-full border border-gray-200 flex items-center
                                 justify-center hover:bg-red-50 hover:border-red-300 transition-colors"
                    >
                      <RemoveIcon style={{ fontSize: 14 }} />
                    </button>
                    <span className="w-5 text-center font-bold text-sm">{item.quantity}</span>
                    <button
                      onClick={() => increment(item.id)}
                      className="w-7 h-7 rounded-full border border-gray-200 flex items-center
                                 justify-center hover:bg-red-50 hover:border-red-300 transition-colors"
                    >
                      <AddIcon style={{ fontSize: 14 }} />
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="w-7 h-7 rounded-full flex items-center justify-center
                                 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors ml-1"
                    >
                      <DeleteOutlineIcon style={{ fontSize: 16 }} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer — total + checkout */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 px-6 py-5 bg-gray-50/50">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600 font-medium">Total</span>
              <span className="font-display font-bold text-xl text-gray-900">
                {formatCurrencyCompact(totalPrice)}
              </span>
            </div>
            <button onClick={handleCheckout} className="btn-primary w-full justify-center text-base">
              Proceed to Checkout
            </button>
            <button
              onClick={closeCart}
              className="w-full mt-2 text-sm text-gray-500 hover:text-gray-800 transition-colors py-2"
            >
              Continue Browsing
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
