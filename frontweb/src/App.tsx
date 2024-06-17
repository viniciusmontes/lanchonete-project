import "./App.css";

import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Admin from "./routes/Admin";
import Form from "./routes/Admin/Form";
import List from "./routes/Admin/List";
import Orders from "./routes/Admin/Orders";
import Catalog from "./routes/Catalog";
import Cart from "./routes/Catalog/Cart";
import ProductDetails from "./routes/Catalog/ProductDetails";
import * as cartService from "./services/cart-service";
import { ContextCartCount } from "./utils/context-card";

export default function App() {
  
  const [contextCartCount, setContextCartCount] = useState<number>(0);

  useEffect(() => {
    setContextCartCount(cartService.getCart().items.length);
  }, []);

  return (
    <ContextCartCount.Provider
      value={{ contextCartCount, setContextCartCount }}
    >
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Catalog />} />
          <Route path="catalog" element={<Catalog />} />
          <Route path="cart" element={<Cart />} />
          <Route
            path="product-details/:productId"
            element={<ProductDetails />}
          />
          <Route path="/admin/" element={<Admin />}>
            <Route path="products" element={<List />} />
            <Route path="products/:productId" element={<Form />} />
            <Route path="orders" element={<Orders />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </ContextCartCount.Provider>
  );
}
