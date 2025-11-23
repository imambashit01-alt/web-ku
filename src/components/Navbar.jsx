// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, User, ShoppingBag, Sun, Moon, Globe, Home, ShoppingCart, Info, Phone } from "lucide-react";
import { useSearch } from "../contexts/SearchContext";
import { useTheme } from "../contexts/ThemeContext";
import { useTranslate } from "../context/TranslateContext";
import TranslateToggle from "./TranslateToggle";
import { products } from "../data/products";
import Dock from "./Dock";


const Navbar = ({ cartCount, onCartClick, onUserClick, currentUser }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { searchQuery, setSearchQuery } = useSearch();
  const { isDark, toggleTheme } = useTheme();
  const { translate } = useTranslate();
  const navigate = useNavigate();

  // Handle scroll for sticky shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Search handlers
  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim().length > 0) {
      const matches = products.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(matches.slice(0, 5));
    } else {
      setFilteredProducts([]);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setFilteredProducts([]);
      setIsSearchOpen(false);
    }
  };

  const dockItems = [
    { icon: <Home size={18} />, label: translate('Home'), onClick: () => navigate('/') },
    { icon: <ShoppingCart size={18} />, label: translate('Shop'), onClick: () => navigate('/shop') },
    { icon: <Info size={18} />, label: translate('About'), onClick: () => navigate('/about') },
    { icon: <Phone size={18} />, label: translate('Contact'), onClick: () => navigate('/contact') },
  ];

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 80 }}
      className={`${isDark ? 'bg-black text-white' : 'bg-white text-black'} sticky top-0 z-50 transition-shadow duration-300 ${
        isScrolled ? "shadow-lg" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex-shrink-0"
          >
            <Link
              to="/"
              className="bg-black text-white px-4 py-2 font-bold text-xl uppercase tracking-wide"
            >
              MAMZ
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex mt-8">
            <Dock
              items={dockItems}
              panelHeight={50}
              baseItemSize={50}
              magnification={35}
            />
          </div>

          {/* Right Section - Icons */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <TranslateToggle />

            {/* Theme Toggle Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className={`p-2 ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-lg transition-colors`}
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>

            {/* Search Icon */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={`p-2 ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-lg transition-colors`}
              title="Search"
            >
              <Search size={20} />
            </motion.button>

            {/* User Account Icon */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onUserClick}
              className={`p-2 ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-lg transition-colors`}
              title="My Account"
            >
              <User size={20} />
            </motion.button>

            {/* Shopping Bag Icon */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onCartClick}
              className={`relative p-2 ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-lg transition-colors`}
              title="Cart"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#e60023] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </motion.button>

            {/* Mobile Menu Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-lg transition-colors`}
              title="Menu"
            >
              <div className="w-5 h-5 flex flex-col justify-center">
                <span className={`block h-0.5 w-5 bg-current transform transition duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'
                }`}></span>
                <span className={`block h-0.5 w-5 bg-current transform transition duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}></span>
                <span className={`block h-0.5 w-5 bg-current transform transition duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'
                }`}></span>
              </div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className={`md:hidden border-t ${isDark ? 'border-gray-700 bg-black' : 'border-gray-200 bg-white'}`}
            >
              <div className="px-4 py-4 space-y-4">
                {dockItems.map((item) => (
                  <motion.div
                    key={item.label}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <button
                      onClick={() => {
                        item.onClick();
                        setIsMobileMenuOpen(false);
                      }}
                      className={`block text-sm font-medium hover:text-red-500 transition-colors duration-300 ${
                        isDark ? 'text-white' : 'text-black'
                      }`}
                    >
                      {item.label}
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search Bar Overlay */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className={`border-t ${isDark ? 'border-gray-700 bg-black' : 'border-gray-200 bg-white'}`}
            >
              <div className="px-4 py-4">
                <form onSubmit={handleSearchSubmit}>
                  <input
                    type="text"
                    placeholder={translate("Search products...")}
                    value={searchQuery}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 ${
                      isDark
                        ? 'border-gray-600 bg-gray-800 text-white placeholder-gray-400'
                        : 'border-gray-300 bg-white text-black placeholder-gray-500'
                    }`}
                  />
                </form>

                <AnimatePresence>
                  {filteredProducts.length > 0 && (
                    <motion.ul
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className={`mt-2 border rounded-lg shadow-lg overflow-hidden ${
                        isDark ? 'border-gray-600 bg-gray-800' : 'border-gray-200 bg-white'
                      }`}
                    >
                      {filteredProducts.map((product) => (
                        <li
                          key={product.id}
                          tabIndex={0}
                          onClick={() => {
                            navigate(`/product/${product.id}`);
                            setFilteredProducts([]);
                            setSearchQuery("");
                            setIsSearchOpen(false);
                          }}
                          className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                            isDark ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100 text-gray-800'
                          }`}
                        >
                          {product.name}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
