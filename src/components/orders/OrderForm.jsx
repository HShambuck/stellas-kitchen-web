import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CircularProgress from "@mui/material/CircularProgress";
import { useCart } from "../../context/CartContext";
import { submitWebOrder } from "../../services/api";
import { formatCurrencyCompact } from "../../utils/currency";

const FIELD_CLASSES =
  `w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 text-sm
   focus:outline-none focus:border-red-400 transition-colors duration-200
   placeholder:text-gray-400 bg-white`;

export default function OrderForm() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    customerName: "",
    phoneNumber: "",
    deliveryAddress: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.customerName.trim()) return setError("Please enter your name.");
    if (!form.phoneNumber.trim()) return setError("Please enter your phone number.");
    if (!form.deliveryAddress.trim()) return setError("Please enter your delivery address.");
    if (items.length === 0) return setError("Your cart is empty.");

    setLoading(true);
    try {
      await submitWebOrder({
        customerName: form.customerName.trim(),
        phoneNumber: form.phoneNumber.trim(),
        deliveryAddress: form.deliveryAddress.trim(),
        // Mapping 'name' to 'foodItemName' so MongoDB doesn't throw a validation error
        items: items.map(({ id, name, price, quantity }) => ({ 
          id, 
          foodItemName: name, 
          price, 
          quantity 
        })),
        // Changing 'totalPrice' key to 'totalAmount' for the backend payload
        totalAmount: totalPrice, 
      });

      clearCart();
      navigate("/order-confirm", {
        state: { customerName: form.customerName.trim(), totalPrice },
      });
    } catch (err) {
      setError(
        err.message ||
          "We couldn't place your order right now. Please call us directly on 0245041170."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Customer Name */}
      <div className="relative">
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          Full Name
        </label>
        <div className="relative">
          <PersonIcon
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            fontSize="small"
          />
          <input
            type="text"
            name="customerName"
            value={form.customerName}
            onChange={handleChange}
            placeholder="e.g. Ama Boateng"
            className={`${FIELD_CLASSES} pl-10`}
            autoComplete="name"
          />
        </div>
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          Phone Number
        </label>
        <div className="relative">
          <PhoneIcon
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            fontSize="small"
          />
          <input
            type="tel"
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            placeholder="e.g. 0244000000"
            className={`${FIELD_CLASSES} pl-10`}
            autoComplete="tel"
          />
        </div>
      </div>

      {/* Delivery Address */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          Delivery Address
        </label>
        <div className="relative">
          <LocationOnIcon
            className="absolute left-3 top-3.5 text-gray-400"
            fontSize="small"
          />
          <textarea
            name="deliveryAddress"
            value={form.deliveryAddress}
            onChange={handleChange}
            placeholder="House no., street, landmark..."
            rows={3}
            className={`${FIELD_CLASSES} pl-10 resize-none`}
          />
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-gray-50 rounded-2xl p-4 space-y-2 border border-gray-100">
        <p className="text-sm font-semibold text-gray-700 mb-3">Order Summary</p>
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between text-sm text-gray-600">
            <span>{item.name} × {item.quantity}</span>
            <span className="font-medium">{formatCurrencyCompact(item.price * item.quantity)}</span>
          </div>
        ))}
        <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between font-bold text-gray-900">
          <span>Total</span>
          <span className="text-red-500">{formatCurrencyCompact(totalPrice)}</span>
        </div>
      </div>

      {/* Error */}
      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          {error}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading || items.length === 0}
        className="btn-primary w-full justify-center text-base py-4 disabled:opacity-60
                   disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <CircularProgress size={18} color="inherit" />
            Placing Order…
          </>
        ) : (
          "Place Order"
        )}
      </button>
    </form>
  );
}
