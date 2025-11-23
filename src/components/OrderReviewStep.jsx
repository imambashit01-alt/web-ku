import { motion } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import { useState } from 'react';

const OrderReviewStep = ({ shippingData, paymentData, onPlaceOrder }) => {
  const { cart, total } = useCart();
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const deliveryOptions = {
    standard: { name: 'Standard Shipping', time: '3-5 business days', price: 0 },
    express: { name: 'Express Shipping', time: '1-2 business days', price: 9.99 },
    overnight: { name: 'Overnight', time: 'Next business day', price: 19.99 }
  };

  const deliveryMethod = deliveryOptions[shippingData.deliveryMethod] || deliveryOptions.standard;

  const handlePlaceOrder = async () => {
    setIsPlacingOrder(true);

    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    onPlaceOrder({
      shipping: shippingData,
      payment: paymentData,
      items: cart,
      delivery: deliveryMethod,
      total: total + (total * 0.08) + deliveryMethod.price
    });

    setIsPlacingOrder(false);
  };

  const EditSection = ({ title, onEdit, children }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onEdit}
          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold text-sm flex items-center space-x-1"
        >
          <span>Edit</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </motion.button>
      </div>
      {children}
    </motion.div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Order Items */}
      <EditSection title="Order Items" onEdit={() => window.history.back()}>
        <div className="space-y-4">
          {cart.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
            >
              <div
                className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl shadow-inner"
                style={{ background: item.gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
              >
                {item.emoji || '📦'}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 dark:text-white">{item.name}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Quantity: {item.quantity} × ${item.price}
                </p>
                {item.color && <p className="text-sm text-gray-600 dark:text-gray-400">Color: {item.color}</p>}
                {item.size && <p className="text-sm text-gray-600 dark:text-gray-400">Size: {item.size}</p>}
              </div>
              <div className="text-right">
                <div className="font-bold text-gray-900 dark:text-white">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </EditSection>

      {/* Shipping Information */}
      <EditSection title="Shipping Information" onEdit={() => window.history.back()}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Contact</h4>
            <p className="text-gray-600 dark:text-gray-400">{shippingData.fullName}</p>
            <p className="text-gray-600 dark:text-gray-400">{shippingData.email}</p>
            <p className="text-gray-600 dark:text-gray-400">{shippingData.phone}</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Address</h4>
            <p className="text-gray-600 dark:text-gray-400">{shippingData.address}</p>
            <p className="text-gray-600 dark:text-gray-400">
              {shippingData.city}, {shippingData.zipCode}
            </p>
            <p className="text-gray-600 dark:text-gray-400">{shippingData.country}</p>
          </div>
        </div>
      </EditSection>

      {/* Delivery Method */}
      <EditSection title="Delivery Method" onEdit={() => window.history.back()}>
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white">{deliveryMethod.name}</h4>
            <p className="text-gray-600 dark:text-gray-400">{deliveryMethod.time}</p>
          </div>
          <div className="text-right">
            <div className="font-bold text-gray-900 dark:text-white">
              {deliveryMethod.price === 0 ? 'FREE' : `$${deliveryMethod.price}`}
            </div>
          </div>
        </div>
      </EditSection>

      {/* Payment Method */}
      <EditSection title="Payment Method" onEdit={() => window.history.back()}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {paymentData.paymentMethod === 'card' && (
              <>
                <div className="text-2xl">💳</div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Credit/Debit Card</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    •••• •••• •••• {paymentData.cardNumber?.slice(-4)}
                  </p>
                </div>
              </>
            )}
            {['gopay', 'ovo', 'dana'].includes(paymentData.paymentMethod) && (
              <>
                <div className="text-2xl">
                  {paymentData.paymentMethod === 'gopay' ? '🟢' :
                   paymentData.paymentMethod === 'ovo' ? '🟣' : '🟡'}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {paymentData.paymentMethod.toUpperCase()}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">E-wallet payment</p>
                </div>
              </>
            )}
            {paymentData.paymentMethod === 'cod' && (
              <>
                <div className="text-2xl">💵</div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Cash on Delivery</h4>
                  <p className="text-gray-600 dark:text-gray-400">Pay when you receive</p>
                </div>
              </>
            )}
          </div>
          <div className="text-green-600 dark:text-green-400">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </EditSection>

      {/* Order Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700 sticky bottom-0"
      >
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Order Summary</h3>

        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-gray-600 dark:text-gray-400">
            <span>Subtotal ({cart.length} items)</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-600 dark:text-gray-400">
            <span>Shipping</span>
            <span>{deliveryMethod.price === 0 ? 'FREE' : `$${deliveryMethod.price}`}</span>
          </div>
          <div className="flex justify-between text-gray-600 dark:text-gray-400">
            <span>Tax</span>
            <span>${(total * 0.08).toFixed(2)}</span>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
            <div className="flex justify-between text-2xl font-bold text-gray-900 dark:text-white">
              <span>Total</span>
              <motion.span
                key={(total + total * 0.08 + deliveryMethod.price).toFixed(2)}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
              >
                ${(total + total * 0.08 + deliveryMethod.price).toFixed(2)}
              </motion.span>
            </div>
          </div>
        </div>

        {/* Place Order Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handlePlaceOrder}
          disabled={isPlacingOrder}
          className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 ${
            isPlacingOrder
              ? 'bg-gray-400 dark:bg-gray-600 text-gray-200 cursor-not-allowed'
              : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl'
          }`}
        >
          {isPlacingOrder ? (
            <div className="flex items-center justify-center space-x-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              />
              <span>Processing Order...</span>
            </div>
          ) : (
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center justify-center space-x-2"
            >
              <span>Place Order</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
          )}
        </motion.button>

        {/* Terms and Conditions */}
        <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
          By placing your order, you agree to our{' '}
          <a href="/terms" className="text-blue-600 dark:text-blue-400 hover:underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">
            Privacy Policy
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderReviewStep;
