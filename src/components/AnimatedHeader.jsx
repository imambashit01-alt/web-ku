import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useSearch } from '../contexts/SearchContext';
import { useTranslate } from '../context/TranslateContext';

const AnimatedHeader = () => {
  const { isDark, toggleTheme } = useTheme();
  const { searchQuery, setSearchQuery } = useSearch();
  const { translate } = useTranslate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleToggle = () => {
    toggleTheme();
  };

  // Header background animation variants
  const headerVariants = {
    light: {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderColor: 'rgba(229, 231, 235, 0.5)',
    },
    dark: {
      backgroundColor: 'rgba(15, 23, 42, 0.9)',
      borderColor: 'rgba(51, 65, 85, 0.5)',
    },
  };

  // Theme switcher animation
  const switcherVariants = {
    hover: { scale: 1.1, boxShadow: isDark ? '0 0 20px rgba(56, 189, 248, 0.5)' : '0 0 20px rgba(250, 204, 21, 0.5)' },
    tap: { scale: 0.95 },
  };

  // Icon transition variants
  const iconVariants = {
    enter: (direction) => ({
      rotate: direction > 0 ? -90 : 90,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      rotate: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      rotate: direction < 0 ? -90 : 90,
      opacity: 0,
      scale: 0.8,
    }),
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-all duration-700"
      animate={isDark ? headerVariants.dark : headerVariants.light}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <motion.h1
              className="text-2xl font-bold text-gray-900 dark:text-white"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              MAMZ
            </motion.h1>
          </div>

          {/* Navigation Links - Desktop */}
          <nav className="hidden md:flex space-x-8">
            <motion.a
              href="/"
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {translate("Home")}
            </motion.a>
            <motion.a
              href="/story"
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {translate("Our Story")}
            </motion.a>
            <motion.a
              href="#products"
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {translate("Products")}
            </motion.a>
            <motion.a
              href="#contact"
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {translate("Contact")}
            </motion.a>
          </nav>

          {/* Right: Search + Theme Toggle + Mobile Menu */}
          <div className="flex items-center space-x-3">
            {/* Search Bar */}
            <motion.div
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400" size={18} />
              <motion.input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-10 pr-4 py-2 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 w-48 md:w-64"
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            </motion.div>

            {/* Theme Toggle Button */}
            <motion.button
              onClick={handleToggle}
              className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 shadow-md transition-all duration-300"
              variants={switcherVariants}
              whileHover="hover"
              whileTap="tap"
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            >
              <AnimatePresence mode="wait" custom={isDark ? 1 : -1}>
                {isDark ? (
                  <motion.div
                    key="moon"
                    custom={1}
                    variants={iconVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="w-5 h-5 md:w-6 md:h-6"
                  >
                    <Moon size={20} color="#38bdf8" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="sun"
                    custom={-1}
                    variants={iconVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="w-5 h-5 md:w-6 md:h-6"
                  >
                    <Sun size={20} color="#facc15" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 shadow-md"
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={20} className="text-gray-700 dark:text-gray-300" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={20} className="text-gray-700 dark:text-gray-300" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              className="md:hidden mt-4 pb-4 border-t border-gray-200 dark:border-slate-700"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col space-y-4 pt-4">
                <motion.a
                  href="/"
                  className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                  whileHover={{ x: 5 }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {translate("Home")}
                </motion.a>
                <motion.a
                  href="/story"
                  className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                  whileHover={{ x: 5 }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {translate("Our Story")}
                </motion.a>
                <motion.a
                  href="#products"
                  className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                  whileHover={{ x: 5 }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {translate("Products")}
                </motion.a>
                <motion.a
                  href="#contact"
                  className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                  whileHover={{ x: 5 }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {translate("Contact")}
                </motion.a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default AnimatedHeader;
