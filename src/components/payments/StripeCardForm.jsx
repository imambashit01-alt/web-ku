import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import { useCart } from '../../contexts/CartContext';

// Initialize Stripe (this should be done at the app level)
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': {
        color: '#aab7c4',
      },
      backgroundColor: 'transparent',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    },
    invalid: {
      color: '#9e2146',
    },
  },
};

const StripeCardForm = ({ amount, onSuccess, onClose }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { cart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Create PaymentIntent on the server
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/stripe/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          currency: 'usd',
          metadata: {
            orderId: `order_${Date.now()}`,
          },
        }),
      });

      const { clientSecret } = await response.json();

      // Confirm the PaymentIntent
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
        },
      });

      if (stripeError) {
        setError(stripeError.message);
        toast.error(stripeError.message);
      } else if (paymentIntent.status === 'succeeded') {
        // Generate unique order ID
        const orderId = uuidv4();

        // Save order data to localStorage
        const orderData = {
          id: orderId,
          date: new Date().toISOString(),
          status: 'Sedang diproses',
          paymentMethod: 'Kartu',
          total: amount,
          items: cart,
          paymentIntentId: paymentIntent.id,
        };

        localStorage.setItem(`mamz-order-${orderId}`, JSON.stringify(orderData));

        toast.success('Payment successful!');

        // Close modal and redirect to success page
        onClose();
        navigate(`/payment/success?orderId=${orderId}`);
      }
    } catch (err) {
      setError('Payment failed. Please try again.');
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Card Payment
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Enter your card details to complete the payment
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Card Number */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Card Number
          </label>
          <div className="relative">
            <CardNumberElement
              options={ELEMENT_OPTIONS}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Expiry and CVC */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Expiry Date
            </label>
            <CardExpiryElement
              options={ELEMENT_OPTIONS}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              CVC
            </label>
            <CardCvcElement
              options={ELEMENT_OPTIONS}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl"
          >
            <p className="text-red-800 dark:text-red-200 text-sm">{error}</p>
          </motion.div>
        )}

        {/* Security Notice */}
        <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
          <div className="flex items-center space-x-3">
            <div className="text-green-600 dark:text-green-400 text-xl">🔒</div>
            <div>
              <h4 className="font-semibold text-green-800 dark:text-green-200">
                Secure Payment
              </h4>
              <p className="text-sm text-green-700 dark:text-green-300">
                Your payment information is encrypted and secure. We never store your full card details.
              </p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={!stripe || isProcessing}
          className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 ${
            !stripe || isProcessing
              ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl'
          }`}
        >
          {isProcessing ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Processing...</span>
            </div>
          ) : (
            `Pay $${amount?.toFixed(2)}`
          )}
        </motion.button>
      </form>
    </div>
  );
};

export default StripeCardForm;
