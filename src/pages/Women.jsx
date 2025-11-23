import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { useTheme } from '../contexts/ThemeContext';

const Women = ({ onAddToCart }) => {
  const { isDark } = useTheme();
  const [sortBy, setSortBy] = useState('name');
  const [filterBy, setFilterBy] = useState('all');

  const womenProducts = useMemo(() => {
    let filtered = products.filter(product =>
      product.subcategory === 'women' ||
      (product.category === 'women')
    );

    if (filterBy !== 'all') {
      filtered = filtered.filter(product => product.category === filterBy);
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [sortBy, filterBy]);

  const categories = ['all', 'Shoes', 'Jackets', 'T-Shirts', 'Bags'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-mamz-white dark:bg-mamz-black"
    >
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 dark:from-pink-600 dark:via-purple-600 dark:to-indigo-600"
      >
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Women's Collection
            </h1>
            <p className="text-xl md:text-2xl text-white text-opacity-90 mb-8">
              Bold styles for the modern woman
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex justify-center space-x-4"
            >
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-6 py-3">
                <span className="text-white font-semibold">Premium Quality</span>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-6 py-3">
                <span className="text-white font-semibold">Trendy Designs</span>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-6 py-3">
                <span className="text-white font-semibold">Sustainable</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Filters and Sort */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row justify-between items-center mb-12 space-y-4 md:space-y-0"
        >
          <div className="flex flex-wrap items-center space-x-4">
            <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-700'}`}>
              Filter by:
            </span>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilterBy(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterBy === category
                    ? 'bg-mamz-red text-white'
                    : isDark
                      ? 'bg-gray-700 text-white hover:bg-gray-600'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category === 'all' ? 'All' : category}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-700'}`}>
              Sort by:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                isDark
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-700'
              }`}
            >
              <option value="name">Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {womenProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard product={product} onAddToCart={onAddToCart} />
            </motion.div>
          ))}
        </motion.div>

        {womenProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Women;
