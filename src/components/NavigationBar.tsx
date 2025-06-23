import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Menu } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { useCartStore } from "../store/cart";
import { cn } from "@/lib/utils";
import { useState } from "react";
import CartDropdown from "./CartDropdown";


export default function NavigationBar() {
  const location = useLocation();
  const totalItems = useCartStore((state) => state.totalItems());
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { to: "/products", label: "Products" },
    { to: "/cart", label: "Cart" },
  ];

  return (
    <nav className="w-full sticky top-0 z-50 bg-white/70 backdrop-blur-md shadow-lg border-b border-gray-100">
      <div className="flex items-center justify-between w-full py-3 px-4 gap-2">
        {/* Logo/Brand */}
        <div className="flex items-center gap-2 text-2xl font-bold text-blue-400">
          <Link to="/" className="flex items-center gap-2 select-none">
            <span className="bg-blue-600 text-white rounded px-2 py-1">
              Shop
            </span>
            <span>Genius</span>
          </Link>
        </div>
        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "relative font-medium text-base px-2 py-1 transition-colors duration-200 hover:text-blue-400",
                location.pathname === link.to
                  ? "text-blue-400"
                  : "text-gray-100 hover:text-blue-400"
              )}
            >
              {link.label}
              <span
                className={cn(
                  "absolute left-0 -bottom-0.5 h-0.5 w-full rounded bg-blue-400 transition-all",
                  location.pathname === link.to
                    ? "opacity-100 scale-x-100"
                    : "opacity-0 scale-x-0"
                )}
                style={{
                  transitionProperty: "opacity, transform",
                  transitionDuration: "300ms",
                }}
              />
            </Link>
          ))}
        </div>
        {/* Cart icon */}
        <div className="relative flex items-center gap-2">
          <button
            className="relative p-2 rounded-full hover:bg-blue-50 transition group"
            aria-label="Open cart"
            onClick={() => setCartOpen((v) => !v)}
          >
            <ShoppingCart className="w-7 h-7 text-blue-600 group-hover:scale-110 transition-transform" />
            {totalItems > 0 && (
              <Badge className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs px-1.5 py-0.5 animate-bounce shadow">
                {totalItems}
              </Badge>
            )}
          </button>
          {/* CartDropdown with animation */}
          <div
            className={cn(
              "absolute right-0 mt-2 transition-all duration-300",
              cartOpen
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 -translate-y-4 pointer-events-none"
            )}
            style={{ minWidth: 320 }}
          >
            <CartDropdown />
          </div>
          {/* Hamburger for mobile */}
          <button
            className="md:hidden rounded-full hover:bg-blue-50 transition"
            aria-label="Open menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <Menu className="w-7 h-7 text-blue-600" />
          </button>
        </div>
      </div>
      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-all duration-300 md:hidden",
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        onClick={() => setMobileOpen(false)}
      >
        <div
          className={cn(
            "absolute top-0 right-0 w-64 h-full bg-gray-900 text-gray-100 shadow-lg flex flex-col gap-6 p-6 transition-transform duration-300",
            mobileOpen ? "translate-x-0" : "translate-x-full"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-2xl text-blue-400 mb-4"
          >
            <span className="bg-blue-600 text-white rounded px-2 py-1">
              Shop
            </span>
            <span>Genius</span>
          </Link>
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "font-medium text-base py-2 px-1 rounded transition-colors hover:text-blue-400",
                location.pathname === link.to
                  ? "text-blue-400 bg-blue-50"
                  : "text-gray-100 hover:text-blue-400"
              )}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
