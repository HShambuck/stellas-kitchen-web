import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SearchIcon from "@mui/icons-material/Search";
import CircularProgress from "@mui/material/CircularProgress";
import { trackOrder } from "../services/api";
import { BRAND } from "../constants/branding";
import { formatCurrencyCompact } from "../utils/currency";

const STEPS = [
  { key: "Pending", label: "Order Received" },
  { key: "Preparing", label: "Preparing" },
  { key: "Ready for Dispatch", label: "Ready for Dispatch" },
  { key: "Out for Delivery", label: "Out for Delivery" },
  { key: "Delivered", label: "Delivered" },
];

function StatusTimeline({ currentStatus }) {
  const currentIndex = STEPS.findIndex((s) => s.key === currentStatus);

  return (
    <div className="space-y-0">
      {STEPS.map((step, i) => {
        const isDone = i < currentIndex;
        const isActive = i === currentIndex;
        return (
          <div key={step.key} className="flex items-start">
            <div className="flex flex-col items-center w-8 mr-4">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold
                  ${isDone ? "bg-green-500 text-white"
                    : isActive ? "bg-red-500 text-white"
                    : "bg-gray-200 text-gray-400"}`}
              >
                {isDone ? "✓" : i + 1}
              </div>
              {i < STEPS.length - 1 && (
                <div className={`w-0.5 flex-1 min-h-[28px] my-1 ${isDone ? "bg-green-500" : "bg-gray-200"}`} />
              )}
            </div>
            <div className="pb-7">
              <p className={`text-sm font-semibold ${isActive ? "text-gray-900" : isDone ? "text-gray-700" : "text-gray-400"}`}>
                {step.label}
              </p>
              {isActive && (
                <p className="text-xs text-gray-500 mt-0.5">This is where your order is right now</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function TrackForm({ onSubmit }) {
  const [value, setValue] = useState("");
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); if (value.trim()) onSubmit(value.trim()); }}
      className="w-full"
    >
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
        Order ID
      </label>
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fontSize="small" />
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Paste the order ID from your confirmation"
          className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 text-sm
                     focus:outline-none focus:border-red-400 transition-colors duration-200
                     placeholder:text-gray-400 bg-white"
        />
      </div>
      <button type="submit" className="btn-primary w-full justify-center mt-4 py-3">
        Track Order
      </button>
    </form>
  );
}

export default function TrackOrder() {
  const { orderId: paramOrderId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(!!paramOrderId);
  const [error, setError] = useState("");

  const fetchOrder = useCallback(async (id) => {
    if (!id) return;
    setError("");
    try {
      const data = await trackOrder(id);
      setOrder(data);
    } catch (err) {
      setOrder(null);
      setError(err.message || "We couldn't find that order.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (paramOrderId) {
      setLoading(true);
      fetchOrder(paramOrderId);
    }
  }, [paramOrderId, fetchOrder]);

  // Poll for live status while an order is loaded
  useEffect(() => {
    if (!paramOrderId) return;
    const interval = setInterval(() => fetchOrder(paramOrderId), 15_000);
    return () => clearInterval(interval);
  }, [paramOrderId, fetchOrder]);

  const handleManualLookup = (id) => navigate(`/track/${id}`);

  return (
    <>
      <Helmet>
        <title>Track Order | {BRAND.name}</title>
      </Helmet>

      <div className="min-h-screen bg-cream flex items-center justify-center px-4 py-24">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 sm:p-10 border border-gray-100">
          <h1 className="font-display font-bold text-2xl text-gray-900 mb-1 text-center">
            Track Your Order
          </h1>

          {!paramOrderId && (
            <>
              <p className="text-sm text-gray-500 text-center mb-6">
                Enter the order ID from your confirmation page or WhatsApp message.
              </p>
              <TrackForm onSubmit={handleManualLookup} />
            </>
          )}

          {paramOrderId && loading && (
            <div className="flex justify-center py-12">
              <CircularProgress size={28} style={{ color: "#EF4444" }} />
            </div>
          )}

          {paramOrderId && !loading && error && (
            <div className="text-center py-8">
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-6">
                {error}
              </p>
              <p className="text-sm text-gray-500 mb-4">Try entering the order ID manually:</p>
              <TrackForm onSubmit={handleManualLookup} />
            </div>
          )}

          {paramOrderId && !loading && order && (
            <div className="mt-6">
              <p className="text-sm text-gray-500 text-center mb-1">
                Order for <span className="font-semibold text-gray-800">{order.customerName || "you"}</span>
              </p>
              <p className="text-center text-2xl font-bold text-red-500 mb-8">
                {formatCurrencyCompact(order.totalAmount)}
              </p>

              <StatusTimeline currentStatus={order.statusState} />

              {(order.items || []).length > 0 && (
                <div className="border-t border-gray-100 mt-2 pt-5">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Items</p>
                  {order.items.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm text-gray-600 py-1">
                      <span>{item.quantity}× {item.foodItemName}</span>
                      <span>{formatCurrencyCompact(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}