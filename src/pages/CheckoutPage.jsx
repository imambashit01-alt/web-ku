import { motion } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import { useTheme } from '../contexts/ThemeContext';
import EarthBackground from '../components/EarthBackground';
import CheckoutForm from '../components/CheckoutForm';
import PaymentMethods from '../components/PaymentMethods';
import CartSummary from '../components/CartSummary';
import { useState } from 'react';
import toast from 'react-hot-toast';

const CheckoutPage = () => {
  const { cart, total, clearCart } = useCart();
  const { isDark } = useTheme();
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    country: ''
  });

  // Redirect if cart is empty
  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Your cart is empty
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Add some items to your cart before checking out
          </p>
          <a
            href="/"
            className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-all"
          >
            Continue Shopping
          </a>
        </motion.div>
      </div>
    );
  }

  const handleCheckout = () => {
    // Validate form
    const requiredFields = ['fullName', 'email', 'address', 'city', 'zip', 'country'];
    const missingFields = requiredFields.filter(field => !formData[field].trim());

    if (missingFields.length > 0) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    // Simulate checkout process
    toast.success('Processing your order...');

    // Simulate API call
    setTimeout(() => {
      toast.success('Order placed successfully! 🎉');
      clearCart();
      // Redirect to success page or home
      window.location.href = '/';
    }, 2000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <EarthBackground />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Checkout
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Complete your purchase securely
            </p>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Forms */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-6"
            >
              {/* Checkout Form */}
              <CheckoutForm
                formData={formData}
                setFormData={setFormData}
              />

              {/* Payment Methods */}
              <PaymentMethods
                selectedPayment={selectedPayment}
                setSelectedPayment={setSelectedPayment}
              />
            </motion.div>

            {/* Right Column - Cart Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <CartSummary />

              {/* Checkout Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCheckout}
                className="w-full mt-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Complete Order - ${total.toFixed(2)}
              </motion.button>

              {/* Security Note */}
              <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
                🔒 Secure checkout powered by industry-standard encryption
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CheckoutPage;
