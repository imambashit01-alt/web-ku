import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import KidsHero from '../components/KidsHero';
import KidsFilterBar from '../components/KidsFilterBar';
import { useTheme } from '../contexts/ThemeContext';

const Kids = ({ onAddToCart }) => {
  const { isDark } = useTheme();
  const [filters, setFilters] = useState({
    size: '',
    color: '',
    category: '',
    priceRange: ''
  });
  const [sortBy, setSortBy] = useState('newest');

  // Get kids products
  const kidsProducts = useMemo(() => {
    return products.filter(product => product.subcategory === 'kids');
  }, []);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = kidsProducts;

    // Apply filters
    if (filters.category) {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    if (filters.priceRange) {
      switch (filters.priceRange) {
        case 'Under $200':
          filtered = filtered.filter(product => product.price < 200);
          break;
        case '$200-$400':
          filtered = filtered.filter(product => product.price >= 200 && product.price <= 400);
          break;
        case '$400-$600':
          filtered = filtered.filter(product => product.price >= 400 && product.price <= 600);
          break;
        case 'Over $600':
          filtered = filtered.filter(product => product.price > 600);
          break;
        default:
          break;
      }
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
      default:
        // Assuming products are already in newest order, or add date logic here
        break;
    }

    return filtered;
  }, [kidsProducts, filters, sortBy]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSortChange = (sortValue) => {
    setSortBy(sortValue);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen ${isDark ? 'bg-mamz-black' : 'bg-mamz-white'}`}
    >
      {/* Hero Section */}
      <KidsHero />

      {/* Breadcrumb */}
      <div className={`py-4 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <a
                  href="/"
                  className={`text-sm font-medium hover:text-mamz-red transition-colors ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  Home
                </a>
              </li>
              <li>
                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </li>
              <li>
                <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Kids
                </span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Filter Bar */}
      <KidsFilterBar onFilterChange={handleFilterChange} onSortChange={handleSortChange} />

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
        >
          {filteredAndSortedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
            >
              <ProductCard product={product} onAddToCart={onAddToCart} />
            </motion.div>
          ))}
        </motion.div>

        {filteredAndSortedProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              No products found matching your filters.
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Kids;
