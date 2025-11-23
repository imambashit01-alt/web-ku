import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import { useCart } from '../../contexts/CartContext';

const GooglePayButton = ({ amount, onSuccess, onClose }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const { cart } = useCart();

  const handleGooglePay = async () => {
    setIsProcessing(true);

    try {
      // Check if Google Pay is available
      if (!window.PaymentRequest) {
        toast.error('Google Pay is not supported on this device');
        return;
      }

      // Create PaymentRequest
      const paymentRequest = new PaymentRequest(
        [
          {
            supportedMethods: 'https://google.com/pay',
            data: {
              environment: 'TEST', // Change to 'PRODUCTION' for live
              apiVersion: 2,
              apiVersionMinor: 0,
              merchantInfo: {
                merchantId: 'your-merchant-id', // Replace with your merchant ID
                merchantName: 'MAMZ Store',
              },
              allowedPaymentMethods: [
                {
                  type: 'CARD',
                  parameters: {
                    allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                    allowedCardNetworks: ['AMEX', 'DISCOVER', 'INTERAC', 'JCB', 'MASTERCARD', 'VISA'],
                  },
                  tokenizationSpecification: {
                    type: 'PAYMENT_GATEWAY',
                    parameters: {
                      gateway: 'stripe',
                      'stripe:publishableKey': import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY,
                      'stripe:version': '2020-08-27',
                    },
                  },
                },
              ],
            },
          },
        ],
        {
          total: {
            label: 'Total',
            amount: {
              currency: 'USD',
              value: amount.toFixed(2),
            },
          },
        }
      );

      // Show payment UI
      const paymentResponse = await paymentRequest.show();

      // Process payment
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/stripe/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          currency: 'usd',
          metadata: {
            paymentMethod: 'google_pay',
            orderId: `order_${Date.now()}`,
          },
        }),
      });

      const { clientSecret } = await response.json();

      // Confirm payment with Google Pay token
      const result = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/stripe/confirm-payment-intent/${clientSecret.split('_secret_')[0]}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMethodId: paymentResponse.details.paymentMethodToken.id,
        }),
      });

      const paymentResult = await result.json();

      if (paymentResult.status === 'succeeded') {
        // Generate unique order ID
        const orderId = uuidv4();

        // Save order data to localStorage
        const orderData = {
          id: orderId,
          date: new Date().toISOString(),
          status: 'Sedang diproses',
          paymentMethod: 'Google Pay',
          total: amount,
          items: cart,
          paymentIntentId: paymentResult.paymentIntent.id,
        };

        localStorage.setItem(`mamz-order-${orderId}`, JSON.stringify(orderData));

        toast.success('Payment successful!');

        // Close modal and redirect to success page
        onClose();
        navigate(`/payment/success?orderId=${orderId}`);
      } else {
        throw new Error('Payment failed');
      }

      paymentResponse.complete('success');
    } catch (error) {
      console.error('Google Pay error:', error);
      toast.error('Google Pay payment failed');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="text-center py-12">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Pay with Google Pay
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Quick and secure payment with your Google account
        </p>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleGooglePay}
        disabled={isProcessing}
        className={`px-8 py-4 bg-black text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-3 mx-auto ${
          isProcessing ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isProcessing ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Processing...</span>
          </>
        ) : (
          <>
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <span>Pay with Google Pay</span>
          </>
        )}
      </motion.button>

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          You'll be redirected to Google Pay to complete your payment securely.
        </p>
      </div>
    </div>
  );
};

export default GooglePayButton;
