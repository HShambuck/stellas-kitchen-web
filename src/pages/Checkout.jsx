import { Helmet } from "react-helmet-async";
import LockIcon from "@mui/icons-material/Lock";
import { useCart } from "../context/CartContext";
import { BRAND } from "../constants/branding";
import OrderForm from "../components/orders/OrderForm";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Checkout() {
  const { items, totalItems } = useCart();

  return (
    <>
      <Helmet>
        <title>Checkout | {BRAND.name}</title>
        <meta name="description" content="Place your order with Stella's Kitchen." />
      </Helmet>

      <div className="min-h-screen bg-cream pt-28 pb-20">
        <div className="max-w-lg mx-auto px-4 sm:px-6">
          {/* Back */}
          <Link
            to="/menu"
            className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800
                       transition-colors mb-6"
          >
            <ArrowBackIcon fontSize="small" /> Back to Menu
          </Link>

          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center">
                <LockIcon className="text-red-500" fontSize="small" />
              </div>
              <div>
                <h1 className="font-display font-bold text-2xl text-gray-900">Checkout</h1>
                <p className="text-sm text-gray-500">
                  {totalItems} item{totalItems !== 1 ? "s" : ""} in your order
                </p>
              </div>
            </div>

            {items.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">Your cart is empty.</p>
                <Link to="/menu" className="btn-primary">Browse Menu</Link>
              </div>
            ) : (
              <OrderForm />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
