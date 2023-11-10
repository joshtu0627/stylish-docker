import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import ProfilePage from "./pages/ProfilePage";
import ProductPage from "./pages/ProductPage";
import "./App.css";

function App() {
  return (
    <>
      {
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/products/:productId" element={<ProductPage />} />
          </Routes>
        </BrowserRouter>
      }
    </>
  );
}

export default App;
