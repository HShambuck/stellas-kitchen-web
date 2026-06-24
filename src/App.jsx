import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { CartProvider } from "./context/CartContext";

// Layout
import Header      from "./components/layout/Header";
import Footer      from "./components/layout/Footer";
import WhatsAppFab from "./components/layout/WhatsAppFab";
import CartModal   from "./components/orders/CartModal";

// Pages
import Home         from "./pages/Home";
import Menu         from "./pages/Menu";
import Checkout     from "./pages/Checkout";
import OrderConfirm from "./pages/OrderConfirm";
import About        from "./pages/About";
import Contact      from "./pages/Contact";

function AppLayout() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/"              element={<Home />} />
          <Route path="/menu"          element={<Menu />} />
          <Route path="/checkout"      element={<Checkout />} />
          <Route path="/order-confirm" element={<OrderConfirm />} />
          <Route path="/about"         element={<About />} />
          <Route path="/contact"       element={<Contact />} />
          {/* 404 fallback */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <CartModal />
      <WhatsAppFab />
    </>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <CartProvider>
        <BrowserRouter>
          <AppLayout />
        </BrowserRouter>
      </CartProvider>
    </HelmetProvider>
  );
}
