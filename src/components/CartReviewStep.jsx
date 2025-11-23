import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

const CartReviewStep = () => {
  const { cart, removeFromCart, updateQuantity, total } = useCart();

  if (cart.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="text-8xl mb-6"
        >
          🛒
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
        >
          Your cart is empty
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 dark:text-gray-400 mb-8 text-lg"
        >
          Add some amazing MAMZ products to get started!
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link
            to="/"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <span className="mr-2">🛍️</span>
            Continue Shopping
          </Link>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Cart Items */}
      <div className="space-y-4">
        <AnimatePresence>
          {cart.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, x: -50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.9 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                delay: index * 0.1
              }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex items-center space-x-6">
                {/* Product Image */}
                <motion.div
                  className="w-20 h-20 rounded-xl flex items-center justify-center text-3xl shadow-inner flex-shrink-0 overflow-hidden"
                  style={{ background: item.gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {item.emoji || '📦'}
                </motion.div>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <motion.h3
                    className="font-bold text-lg text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                    layoutId={`title-${item.id}`}
                  >
                    {item.name}
                  </motion.h3>

                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {item.color && <span>Color: {item.color}</span>}
                    {item.size && <span>Size: {item.size}</span>}
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center transition-all duration-200 shadow-sm"
                    >
                      <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">-</span>
                    </motion.button>

                    <motion.span
                      key={item.quantity}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="w-12 text-center font-bold text-lg text-gray-900 dark:text-white"
                    >
                      {item.quantity}
                    </motion.span>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center transition-all duration-200 shadow-sm"
                    >
                      <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">+</span>
                    </motion.button>
                  </div>
                </div>

                {/* Price and Remove */}
                <div className="text-right flex-shrink-0">
                  <motion.div
                    className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
                    layoutId={`price-${item.id}`}
                  >
                    ${(item.price * item.quantity).toFixed(2)}
                  </motion.div>

                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Order Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
      >
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Order Summary</h3>

        <div className="space-y-3">
          <div className="flex justify-between text-gray-600 dark:text-gray-400">
            <span>Subtotal ({cart.length} items)</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-gray-600 dark:text-gray-400">
            <span>Shipping</span>
            <span className="text-green-600 dark:text-green-400 font-semibold">FREE</span>
          </div>

          <div className="flex justify-between text-gray-600 dark:text-gray-400">
            <span>Tax</span>
            <span>${(total * 0.08).toFixed(2)}</span>
          </div>

          <motion.div
            className="border-t border-gray-200 dark:border-gray-700 pt-3"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex justify-between text-2xl font-bold text-gray-900 dark:text-white">
              <span>Total</span>
              <motion.span
                key={total}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
              >
                ${(total + total * 0.08).toFixed(2)}
              </motion.span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Continue Shopping Link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center"
      >
        <Link
          to="/"
          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Continue Shopping
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default CartReviewStep;
