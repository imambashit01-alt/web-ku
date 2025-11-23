import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import { useState } from 'react';
import PaymentMethods from './PaymentMethods';

const CartModal = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, total } = useCart();
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('card');

  const handleProceedToCheckout = () => {
    // Navigate to checkout page with selected payment method
    window.location.href = `/checkout?payment=${selectedPayment}`;
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
            onClick={onClose}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween' }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-2xl backdrop-blur-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Shopping Cart ({cart.length})
                  </h2>
                  <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                  >
                    ✕
                  </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-6">
                  {cart.length === 0 ? (
                    <div className="text-center text-gray-500 dark:text-gray-400 py-12">
                      <div className="text-6xl mb-4">🛒</div>
                      <p className="text-lg">Your cart is empty</p>
                      <p className="text-sm mt-2">Add some items to get started!</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="flex items-center space-x-4 bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm p-4 rounded-xl shadow-lg hover:shadow-xl transition-all"
                        >
                          <div
                            className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl shadow-inner"
                            style={{ background: item.gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                          >
                            {item.emoji || '📦'}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                              {item.name}
                            </h3>
                            <p className="text-red-500 font-bold">${item.price}</p>
                            <div className="flex items-center space-x-2 mt-2">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 flex items-center justify-center transition-colors"
                              >
                                -
                              </button>
                              <span className="w-8 text-center font-semibold text-gray-900 dark:text-white">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 flex items-center justify-center transition-colors"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors p-2"
                          >
                            🗑️
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer */}
                {cart.length > 0 && (
                  <div className="border-t border-gray-200 dark:border-gray-700 p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-semibold text-gray-900 dark:text-white">
                        Total: ${total.toFixed(2)}
                      </span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowPaymentPopup(true)}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                    >
                      Proceed to Checkout
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Payment Method Popup */}
      <AnimatePresence>
        {showPaymentPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowPaymentPopup(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Choose Payment Method
                </h3>
                <button
                  onClick={() => setShowPaymentPopup(false)}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 overflow-y-auto max-h-[60vh]">
                <PaymentMethods
                  selectedPayment={selectedPayment}
                  setSelectedPayment={setSelectedPayment}
                />
              </div>

              <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleProceedToCheckout}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  Continue to Checkout
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CartModal;
