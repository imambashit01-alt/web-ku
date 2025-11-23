import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import { useCart } from '../../contexts/CartContext';

const ApplePayButton = ({ amount, onSuccess, onClose }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const { cart } = useCart();

  const handleApplePay = async () => {
    setIsProcessing(true);

    try {
      // Check if Apple Pay is available
      if (!window.ApplePaySession || !ApplePaySession.canMakePayments()) {
        toast.error('Apple Pay is not supported on this device');
        return;
      }

      // Create Apple Pay session
      const paymentRequest = {
        countryCode: 'US',
        currencyCode: 'USD',
        supportedNetworks: ['visa', 'masterCard', 'amex', 'discover'],
        merchantCapabilities: ['supports3DS'],
        total: {
          label: 'MAMZ Store',
          amount: amount.toFixed(2),
        },
      };

      const session = new ApplePaySession(3, paymentRequest);

      session.onvalidatemerchant = async (event) => {
        // Validate merchant with Apple
        try {
          const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/stripe/validate-merchant`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              validationURL: event.validationURL,
              domainName: window.location.hostname,
            }),
          });

          const merchantSession = await response.json();
          session.completeMerchantValidation(merchantSession);
        } catch (error) {
          console.error('Merchant validation failed:', error);
          session.abort();
        }
      };

      session.onpaymentauthorized = async (event) => {
        try {
          // Process payment with Stripe
          const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/stripe/create-payment-intent`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              amount,
              currency: 'usd',
              metadata: {
                paymentMethod: 'apple_pay',
                orderId: `order_${Date.now()}`,
              },
            }),
          });

          const { clientSecret } = await response.json();

          // Confirm payment with Apple Pay token
          const result = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/stripe/confirm-payment-intent/${clientSecret.split('_secret_')[0]}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              paymentMethodId: event.payment.token.paymentMethod.identifier,
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
              paymentMethod: 'Apple Pay',
              total: amount,
              items: cart,
              paymentIntentId: paymentResult.paymentIntent.id,
            };

            localStorage.setItem(`mamz-order-${orderId}`, JSON.stringify(orderData));

            session.completePayment(ApplePaySession.STATUS_SUCCESS);
            toast.success('Payment successful!');

            // Close modal and redirect to success page
            onClose();
            navigate(`/payment/success?orderId=${orderId}`);
          } else {
            session.completePayment(ApplePaySession.STATUS_FAILURE);
            throw new Error('Payment failed');
          }
        } catch (error) {
          console.error('Apple Pay payment failed:', error);
          session.completePayment(ApplePaySession.STATUS_FAILURE);
          toast.error('Apple Pay payment failed');
        }
      };

      session.oncancel = () => {
        setIsProcessing(false);
      };

      session.begin();
    } catch (error) {
      console.error('Apple Pay error:', error);
      toast.error('Apple Pay is not available');
      setIsProcessing(false);
    }
  };

  return (
    <div className="text-center py-12">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Pay with Apple Pay
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Quick and secure payment with Touch ID or Face ID
        </p>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleApplePay}
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
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            <span>Pay with Apple Pay</span>
          </>
        )}
      </motion.button>

      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900/20 border border-gray-200 dark:border-gray-800 rounded-xl">
        <p className="text-sm text-gray-800 dark:text-gray-200">
          Apple Pay is available on iPhone, iPad, Mac, and Apple Watch.
        </p>
      </div>
    </div>
  );
};

export default ApplePayButton;
