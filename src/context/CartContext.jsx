import { createContext, useContext, useReducer, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
const CartContext = createContext(null);

// ─── Reducer ─────────────────────────────────────────────────────────────────
function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.payload.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.payload),
      };
    case "INCREMENT":
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.payload ? { ...i, quantity: i.quantity + 1 } : i
        ),
      };
    case "DECREMENT":
      return {
        ...state,
        items: state.items
          .map((i) =>
            i.id === action.payload ? { ...i, quantity: i.quantity - 1 } : i
          )
          .filter((i) => i.quantity > 0),
      };
    case "CLEAR_CART":
      return { ...state, items: [] };
    case "TOGGLE_CART":
      return { ...state, isOpen: !state.isOpen };
    case "OPEN_CART":
      return { ...state, isOpen: true };
    case "CLOSE_CART":
      return { ...state, isOpen: false };
    default:
      return state;
  }
}

// ─── Provider ─────────────────────────────────────────────────────────────────
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isOpen: false,
  });

  const addItem    = useCallback((item) => dispatch({ type: "ADD_ITEM",    payload: item }), []);
  const removeItem = useCallback((id)   => dispatch({ type: "REMOVE_ITEM", payload: id   }), []);
  const increment  = useCallback((id)   => dispatch({ type: "INCREMENT",   payload: id   }), []);
  const decrement  = useCallback((id)   => dispatch({ type: "DECREMENT",   payload: id   }), []);
  const clearCart  = useCallback(()     => dispatch({ type: "CLEAR_CART"                 }), []);
  const toggleCart = useCallback(()     => dispatch({ type: "TOGGLE_CART"                }), []);
  const openCart   = useCallback(()     => dispatch({ type: "OPEN_CART"                  }), []);
  const closeCart  = useCallback(()     => dispatch({ type: "CLOSE_CART"                 }), []);

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        isOpen: state.isOpen,
        totalItems,
        totalPrice,
        addItem,
        removeItem,
        increment,
        decrement,
        clearCart,
        toggleCart,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
