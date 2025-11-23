import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { discountedPrice } from '../data/products';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { useTranslate } from '../context/TranslateContext';

const QuickViewModal = ({ product, isOpen, onClose, onAddToCart }) => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const { translate } = useTranslate();
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);

  // Handle loading state when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          setSelectedImage(prev => prev > 0 ? prev - 1 : images.length - 1);
          break;
        case 'ArrowRight':
          setSelectedImage(prev => prev < images.length - 1 ? prev + 1 : 0);
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!product) return null;

  const safePrice = Number(product.price) || 0;
  const safeDiscount = Number(product.discount) || 0;
  const finalPrice = discountedPrice ? discountedPrice(safePrice, safeDiscount) : safePrice;

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const images = product?.images || [product?.image || "/assets/placeholder.jpg"];

  const handleBuyNow = () => {
    onAddToCart({ ...product, selectedSize, quantity });
    navigate('/checkout');
    onClose();
  };

  const handleAddToCart = () => {
    onAddToCart({ ...product, selectedSize, quantity });
    onClose();
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = `Check out this ${product.name}!`;

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
        break;
      default:
        break;
    }
    setShowShareOptions(false);
  };

  const specifications = [
    { label: 'Material', value: product.material || 'Premium Quality' },
    { label: 'Care Instructions', value: product.care || 'Machine washable' },
    { label: 'Origin', value: product.origin || 'Made in Indonesia' },
    { label: 'Warranty', value: product.warranty || '1 Year Limited' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`relative max-w-6xl w-full max-h-[95vh] overflow-hidden rounded-lg shadow-2xl ${isDark ? 'bg-gray-800' : 'bg-white'}`}
            onClick={(e) => e.stopPropagation()}
          >
            {isLoading ? (
              <div className="flex items-center justify-center h-96">
                <div className="flex flex-col items-center space-y-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mamz-red"></div>
                  <p className={`text-lg ${isDark ? 'text-white' : 'text-black'}`}>Loading product details...</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col lg:flex-row">
                {/* Image Section */}
                <div className="lg:w-1/2 relative">
                  <div className="relative h-96 lg:h-full">
                    <motion.img
                      src={images[selectedImage] || "/assets/placeholder.jpg"}
                      alt={product.name}
                      className={`w-full h-full object-cover cursor-zoom-in ${isImageZoomed ? 'scale-150' : ''}`}
                      onError={(e) => (e.target.src = "/assets/placeholder.jpg")}
                      onClick={() => setIsImageZoomed(!isImageZoomed)}
                      whileHover={{ scale: isImageZoomed ? 1 : 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                    {product.discount && (
                      <div className="absolute top-4 left-4 bg-mamz-red text-white px-3 py-1 rounded-full text-sm font-bold">
                        -{safeDiscount}%
                      </div>
                    )}
                    {product.badge && (
                      <div className="absolute top-4 right-4 bg-mamz-red text-white px-3 py-1 rounded-full text-xs font-bold">
                        {product.badge}
                      </div>
                    )}

                    {/* Zoom Icon */}
                    <div className="absolute top-4 right-16 bg-black bg-opacity-50 text-white p-2 rounded-full">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>

                    {/* Navigation Arrows */}
                    {images.length > 1 && (
                      <>
                        <button
                          onClick={() => setSelectedImage(prev => prev > 0 ? prev - 1 : images.length - 1)}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button
                          onClick={() => setSelectedImage(prev => prev < images.length - 1 ? prev + 1 : 0)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </>
                    )}
                  </div>

                  {/* Thumbnail Images */}
                  {images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {images.map((img, index) => (
                        <motion.button
                          key={index}
                          onClick={() => setSelectedImage(index)}
                          className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                            selectedImage === index
                              ? 'border-mamz-red scale-110'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <img
                            src={img}
                            alt={`${product.name} ${index + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) => (e.target.src = "/assets/placeholder.jpg")}
                          />
                        </motion.button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="lg:w-1/2 p-8 overflow-y-auto max-h-[60vh] lg:max-h-none">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex-1">
                      <h2 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
                        {product.name}
                      </h2>
                      {product.category && (
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {product.category}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      {/* Share Button */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setShowShareOptions(!showShareOptions)}
                        className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${isDark ? 'hover:bg-gray-700' : ''}`}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                        </svg>
                      </motion.button>

                      {/* Close Button */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={onClose}
                        className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${isDark ? 'hover:bg-gray-700' : ''}`}
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </motion.button>
                    </div>
                  </div>

                  {/* Share Options */}
                  <AnimatePresence>
                    {showShareOptions && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`mb-4 p-3 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}
                      >
                        <p className={`text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-black'}`}>Share this product:</p>
                        <div className="flex space-x-2">
                          {[
                            { name: 'Facebook', icon: '📘', platform: 'facebook' },
                            { name: 'Twitter', icon: '🐦', platform: 'twitter' },
                            { name: 'WhatsApp', icon: '💬', platform: 'whatsapp' },
                            { name: 'Copy Link', icon: '🔗', platform: 'copy' }
                          ].map(({ name, icon, platform }) => (
                            <motion.button
                              key={platform}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleShare(platform)}
                              className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                isDark ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-white hover:bg-gray-100 text-black'
                              }`}
                            >
                              <span>{icon}</span>
                              <span>{name}</span>
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Rating */}
                  {product.rating && (
                    <div className="flex items-center mb-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className={`ml-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        {product.rating} ({product.reviews || 0} reviews)
                      </span>
                    </div>
                  )}

                  <p className={`text-lg mb-6 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {product.description}
                  </p>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <span className="text-3xl font-bold text-mamz-red">
                        ${finalPrice.toFixed(2)}
                      </span>
                      {safeDiscount > 0 && (
                        <span className={`text-xl line-through ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          ${safePrice}
                        </span>
                      )}
                      {safeDiscount > 0 && (
                        <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          Save ${(safePrice - finalPrice).toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Size Selection */}
                  <div className="mb-6">
                    <h3 className={`text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-black'}`}>
                      {translate('Size')}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {sizes.map((size) => (
                        <motion.button
                          key={size}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-2 border rounded-lg transition-all duration-200 ${
                            selectedSize === size
                              ? 'bg-mamz-red text-white border-mamz-red shadow-lg'
                              : `border-gray-300 ${isDark ? 'text-white hover:bg-gray-700' : 'text-black hover:bg-gray-50'}`
                          }`}
                        >
                          {size}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity Selection */}
                  <div className="mb-8">
                    <h3 className={`text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-black'}`}>
                      {translate('Quantity')}
                    </h3>
                    <div className="flex items-center space-x-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className={`p-3 border rounded-lg transition-colors ${isDark ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-50'}`}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </motion.button>
                      <span className={`text-xl font-semibold px-4 ${isDark ? 'text-white' : 'text-black'}`}>
                        {quantity}
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setQuantity(quantity + 1)}
                        className={`p-3 border rounded-lg transition-colors ${isDark ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-50'}`}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </motion.button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col space-y-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleBuyNow}
                      className="w-full bg-mamz-red text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-red-600 transition-colors shadow-lg"
                    >
                      {translate('Buy Now')} - ${(finalPrice * quantity).toFixed(2)}
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleAddToCart}
                      className={`w-full py-4 px-6 rounded-lg font-semibold text-lg border-2 transition-all duration-200 shadow-lg ${
                        isDark
                          ? 'border-mamz-red text-mamz-red hover:bg-mamz-red hover:text-white'
                          : 'border-mamz-red text-mamz-red hover:bg-mamz-red hover:text-white'
                      }`}
                    >
                      {translate('Add to Cart')}
                    </motion.button>
                  </div>

                  {/* Specifications */}
                  <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
                      Specifications
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                      {specifications.map((spec, index) => (
                        <div key={index} className="flex justify-between">
                          <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                            {spec.label}:
                          </span>
                          <span className={`${isDark ? 'text-white' : 'text-black'}`}>
                            {spec.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className={`font-semibold ${isDark ? 'text-white' : 'text-black'}`}>SKU:</span>
                        <span className={`ml-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{product.sku || 'N/A'}</span>
                      </div>
                      <div>
                        <span className={`font-semibold ${isDark ? 'text-white' : 'text-black'}`}>Stock:</span>
                        <span className={`ml-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{product.stock || 'In Stock'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuickViewModal;
