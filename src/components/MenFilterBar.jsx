import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const MenFilterBar = ({ onFilterChange, onSortChange, onSearchChange }) => {
  const { isDark } = useTheme();
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const categories = ['All', 'Shoes', 'Jackets', 'T-Shirts', 'Accessories'];
  const sortOptions = [
    { value: 'newest', label: 'Newest' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'name', label: 'Name A-Z' }
  ];

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      onSearchChange(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, onSearchChange]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    onFilterChange(category);
  };

  const handleSortChange = (sortValue) => {
    setSortBy(sortValue);
    onSortChange(sortValue);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setDebouncedSearch('');
    onSearchChange('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 z-40 backdrop-blur-md border-b ${isDark ? 'bg-gray-900/90 border-gray-700' : 'bg-white/90 border-gray-200'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-mamz-red text-white shadow-lg'
                    : isDark
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-black'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>

          {/* Search and Sort */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">

            {/* Search Bar */}
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative"
              >
                <input
                  type="text"
                  placeholder="Search men's collection..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full sm:w-64 px-4 py-2 pl-10 pr-10 rounded-lg border transition-all duration-300 ${
                    isDark
                      ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-mamz-red focus:ring-2 focus:ring-mamz-red/20'
                      : 'bg-white border-gray-300 text-black placeholder-gray-500 focus:border-mamz-red focus:ring-2 focus:ring-mamz-red/20'
                  }`}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </motion.div>
            </div>

            {/* Sort Dropdown */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative"
            >
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className={`px-4 py-2 pr-8 rounded-lg border appearance-none transition-all duration-300 ${
                  isDark
                    ? 'bg-gray-800 border-gray-600 text-white focus:border-mamz-red focus:ring-2 focus:ring-mamz-red/20'
                    : 'bg-white border-gray-300 text-black focus:border-mamz-red focus:ring-2 focus:ring-mamz-red/20'
                }`}
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Active Filters Display */}
        {(activeCategory !== 'All' || debouncedSearch) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
          >
            {activeCategory !== 'All' && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-mamz-red text-white"
              >
                Category: {activeCategory}
                <button
                  onClick={() => handleCategoryChange('All')}
                  className="ml-2 hover:text-gray-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </motion.span>
            )}
            {debouncedSearch && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-mamz-red text-white"
              >
                Search: "{debouncedSearch}"
                <button
                  onClick={clearSearch}
                  className="ml-2 hover:text-gray-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </motion.span>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default MenFilterBar;
