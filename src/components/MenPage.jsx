import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import { products } from '../data/products';
import { useTheme } from '../contexts/ThemeContext';
import { useCart } from '../contexts/CartContext';
import MenHero from './MenHero';
import MenFilterBar from './MenFilterBar';
import ProductCard from './ProductCard';

const ITEMS_PER_PAGE = 12;

const ProductSkeleton = ({ isDark }) => (
  <div className={`rounded-lg shadow-lg overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
    <div className={`w-full h-64 ${isDark ? 'bg-gray-700' : 'bg-gray-300'} animate-pulse`} />
    <div className="p-6 space-y-4">
      <div className={`h-6 ${isDark ? 'bg-gray-700' : 'bg-gray-300'} rounded animate-pulse`} />
      <div className={`h-4 ${isDark ? 'bg-gray-700' : 'bg-gray-300'} rounded animate-pulse w-3/4`} />
      <div className={`h-8 ${isDark ? 'bg-gray-700' : 'bg-gray-300'} rounded animate-pulse w-1/2`} />
      <div className="flex space-x-2">
        <div className={`h-10 ${isDark ? 'bg-gray-700' : 'bg-gray-300'} rounded animate-pulse flex-1`} />
        <div className={`h-10 ${isDark ? 'bg-gray-700' : 'bg-gray-300'} rounded animate-pulse flex-1`} />
      </div>
    </div>
  </div>
);

const MenPage = () => {
  const { isDark } = useTheme();
  const { addToCart } = useCart();
  const [currentPage, setCurrentPage] = useState(1);
  const [filterCategory, setFilterCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Filter men's products
  const menProducts = useMemo(() => {
    return products.filter(product => product.subcategory === 'men');
  }, []);

  // Apply filters and sorting
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = menProducts;

    // Apply category filter
    if (filterCategory !== 'All') {
      filtered = filtered.filter(product => product.category === filterCategory);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'newest':
        default:
          // Assuming newer products have higher IDs
          return b.id.localeCompare(a.id);
      }
    });

    return filtered;
  }, [menProducts, filterCategory, searchQuery, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProducts = filteredAndSortedProducts.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filterCategory, searchQuery, sortBy]);

  // Simulate loading when filters change
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [filterCategory, searchQuery, sortBy]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilterChange = (category) => {
    setFilterCategory(category);
  };

  const handleSortChange = (sortValue) => {
    setSortBy(sortValue);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Hero Section */}
      <MenHero />

      {/* Filter Bar */}
      <MenFilterBar
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
        onSearchChange={handleSearchChange}
      />

      {/* Products Section */}
      <section id="men-products" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Results Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
              {filterCategory === 'All' ? 'All Men\'s Products' : `${filterCategory}`}
            </h2>
            <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {filteredAndSortedProducts.length} {filteredAndSortedProducts.length === 1 ? 'item' : 'items'} found
            </p>
          </motion.div>

          {/* Products Grid */}
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              >
                {Array.from({ length: ITEMS_PER_PAGE }, (_, i) => (
                  <ProductSkeleton key={i} isDark={isDark} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="products"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              >
                {currentProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ProductCard product={product} onAddToCart={addToCart} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* No Results */}
          {!isLoading && currentProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className={`text-6xl mb-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>🔍</div>
              <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
                No products found
              </h3>
              <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Try adjusting your filters or search terms
              </p>
            </motion.div>
          )}

          {/* Pagination */}
          {totalPages > 1 && !isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex justify-center items-center space-x-2 mt-16"
            >
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  currentPage === 1
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : isDark
                      ? 'bg-gray-800 text-white hover:bg-gray-700'
                      : 'bg-white text-black hover:bg-gray-50 border border-gray-300'
                }`}
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    currentPage === page
                      ? 'bg-mamz-red text-white'
                      : isDark
                        ? 'bg-gray-800 text-white hover:bg-gray-700'
                        : 'bg-white text-black hover:bg-gray-50 border border-gray-300'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  currentPage === totalPages
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : isDark
                      ? 'bg-gray-800 text-white hover:bg-gray-700'
                      : 'bg-white text-black hover:bg-gray-50 border border-gray-300'
                }`}
              >
                Next
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default MenPage;
