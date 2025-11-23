import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sun, Moon } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useSearch } from "../contexts/SearchContext";

const HeaderBar = () => {
  const { isDark, toggleTheme } = useTheme();
  const { searchQuery, setSearchQuery } = useSearch();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-700 transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Brand Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-black dark:text-white">MAMZ</h1>
          </div>

          {/* Center: Optional Nav Links (placeholder) */}
          <nav className="hidden md:flex space-x-8">
            {/* Add nav links here if needed */}
          </nav>

          {/* Right: Search Bar + Theme Toggle */}
          <div className="flex items-center space-x-3">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300" size={18} />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-10 pr-4 py-2 rounded-xl bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all w-64"
              />
            </div>

            {/* Theme Toggle Button */}
            <motion.button
              onClick={toggleTheme}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1, rotate: 10 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              className="w-11 h-11 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 shadow-md hover:shadow-lg transition-shadow"
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            >
              <AnimatePresence mode="wait">
                {isDark ? (
                  <motion.div
                    key="moon"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Moon size={20} color="#38bdf8" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="sun"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Sun size={20} color="#facc15" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderBar;
