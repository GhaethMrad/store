import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-gray-100 py-8 mt-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center md:justify-between gap-6">
        
        <div className="flex items-center gap-2 text-2xl font-bold text-blue-400">
          <span className="bg-blue-600 text-white rounded px-2 py-1">Shop</span>
          <span>Genius</span>
        </div>
        
        <nav className="flex flex-wrap gap-6 text-base font-medium">
          <a href="/products" className="hover:text-blue-400 transition">
            Products
          </a>
          <a href="/cart" className="hover:text-blue-400 transition">
            Cart
          </a>
          <a href="#about" className="hover:text-blue-400 transition">
            About
          </a>
          <a href="#contact" className="hover:text-blue-400 transition">
            Contact
          </a>
        </nav>
        {/* Social Icons */}
        <div className="flex gap-4 text-xl">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition"
          >
            <FaGithub />
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition"
          >
            <FaTwitter />
          </a>
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
      <div className="mt-6 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} ShopGenius. All rights reserved.
      </div>
    </footer>
  );
}
