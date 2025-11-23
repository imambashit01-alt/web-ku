import { motion } from "framer-motion";
import { useState } from "react";
import { discountedPrice } from "../data/products";
import DiscountTag from "./DiscountTag";
import QuickViewModal from "./QuickViewModal";
import { useTheme } from '../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { useTranslate } from '../context/TranslateContext';

const ProductCard = ({ product = {}, onAddToCart = () => {} }) => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const { translate } = useTranslate();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const safePrice = Number(product.price) || 0;
  const safeDiscount = Number(product.discount) || 0;
  const finalPrice = discountedPrice ? discountedPrice(safePrice, safeDiscount) : safePrice;

  const handleBuyNow = () => {
    onAddToCart(product);
    navigate('/checkout');
  };

  const handleQuickView = () => {
    setIsQuickViewOpen(true);
    setIsLoading(true);
    // Simulate loading delay for better UX
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className={`rounded-lg shadow-lg overflow-hidden group ${isDark ? 'bg-gray-800' : 'bg-white'}`}
    >
      <div className="relative overflow-hidden">
        <img
          src={product.image || "/assets/placeholder.jpg"}
          alt={product.name || "Product"}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => (e.target.src = "/assets/placeholder.jpg")}
        />

        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
        {product.discount ? <DiscountTag discount={safeDiscount} /> : null}

        {product.badge && (
          <div className="absolute top-2 left-2 bg-mamz-red text-white px-3 py-1 rounded-full text-xs font-bold">
            {product.badge}
          </div>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onAddToCart(product)}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-mamz-red text-white px-4 py-2 rounded-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          {translate('Add to Cart')}
        </motion.button>
      </div>

      <div className="p-6">
        <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
          {product.name || "Unnamed Product"}
        </h3>

        <p className={`text-sm mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          {product.description || "No description available."}
        </p>

        <div className="flex items-center space-x-2 mb-4">
          <span className="text-2xl font-bold text-mamz-red">
            ${finalPrice.toFixed(2)}
          </span>

          {safeDiscount > 0 && (
            <span className={`text-lg line-through ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              ${safePrice}
            </span>
          )}
        </div>

        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleQuickView}
            disabled={isLoading}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-colors duration-300 relative ${
              isDark
                ? 'bg-gray-700 text-white hover:bg-gray-600 disabled:bg-gray-600'
                : 'bg-gray-200 text-black hover:bg-gray-300 disabled:bg-gray-300'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                <span className="ml-2">{translate('Loading...')}</span>
              </div>
            ) : (
              translate('Quick View')
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBuyNow}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-colors duration-300 ${
              isDark
                ? 'bg-mamz-red text-white hover:bg-red-600'
                : 'bg-mamz-red text-white hover:bg-red-700'
            }`}
          >
            {translate('Buy Now')}
          </motion.button>
        </div>
      </div>

      <QuickViewModal
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        onAddToCart={onAddToCart}
      />
    </motion.div>
  );
};

export default ProductCard;
