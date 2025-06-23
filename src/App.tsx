import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";

import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import { Toaster } from "./components/ui/toaster";

const queryClient = new QueryClient();


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen overflow-hidden bg-background">
          <NavigationBar />
          <div className="container mx-auto py-6">
            <Routes>
              <Route path="/" element={<Navigate to="/products" replace />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </div>
          <Toaster />
          <Footer />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
