import axios from "axios";

// ─── Axios Instance ──────────────────────────────────────────────────────────
// Points to .env.development (localhost) or .env.production (Railway) automatically.

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

// ─── Request Interceptor ─────────────────────────────────────────────────────
api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// ─── Response Interceptor ────────────────────────────────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      "An unexpected error occurred";
    return Promise.reject(new Error(message));
  }
);

// ─── API Methods ─────────────────────────────────────────────────────────────

/**
 * Fetch all available menu items from the backend.
 * Falls back to local MENU_ITEMS constant if backend is unavailable.
 */
export async function fetchMenuItems() {
  const res = await api.get("/api/menu");
  return res.data;
}

/**
 * POST a new web order to the backend.
 * Endpoint: POST /api/orders/web/link
 *
 * @param {Object} orderPayload
 * @param {string} orderPayload.customerName
 * @param {string} orderPayload.phoneNumber
 * @param {string} orderPayload.deliveryAddress
 * @param {Array}  orderPayload.items          — [{ id, name, price, quantity }]
 * @param {number} orderPayload.totalPrice
 */
export async function submitWebOrder(orderPayload) {
  const res = await api.post("/api/orders/web/link", orderPayload);
  return res.data;
}

export default api;
