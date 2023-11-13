import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import ProfilePage from "./pages/ProfilePage";
import ProductPage from "./pages/ProductPage";
import SearchResultPage from "./pages/SearchResultPage";
import "./App.css";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60 } },
});
function App() {
  return (
    <>
      {
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route path="/search" element={<SearchResultPage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/:category" element={<HomePage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/products/:productId" element={<ProductPage />} />
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      }
    </>
  );
}

export default App;
