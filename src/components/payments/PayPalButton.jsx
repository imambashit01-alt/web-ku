import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import { useCart } from '../../contexts/CartContext';

const PayPalButton = ({ amount, onSuccess, onClose }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paypalLoaded, setPaypalLoaded] = useState(false);
  const navigate = useNavigate();
  const { cart } = useCart();

  useEffect(() => {
    // Load PayPal SDK
    const loadPayPalScript = () => {
      if (window.paypal) {
        setPaypalLoaded(true);
        return;
      }

      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=${import.meta.env.VITE_PAYPAL_CLIENT_ID || 'your_paypal_client_id'}&currency=USD`;
      script.onload = () => setPaypalLoaded(true);
      script.onerror = () => toast.error('Failed to load PayPal');
      document.head.appendChild(script);
    };

    loadPayPalScript();
  }, []);

  useEffect(() => {
    if (paypalLoaded && window.paypal) {
      window.paypal.Buttons({
        createOrder: async () => {
          try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/paypal/create-order`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                amount: amount.toFixed(2),
                currency: 'USD',
              }),
            });

            const order = await response.json();
            return order.id;
          } catch (error) {
            console.error('Error creating PayPal order:', error);
            throw error;
          }
        },
        onApprove: async (data) => {
          try {
            setIsProcessing(true);

            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/paypal/capture-order`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                orderId: data.orderID,
              }),
            });

            const result = await response.json();

            if (result.status === 'COMPLETED') {
              // Generate unique order ID
              const orderId = uuidv4();

              // Save order data to localStorage
              const orderData = {
                id: orderId,
                date: new Date().toISOString(),
                status: 'Sedang diproses',
                paymentMethod: 'PayPal',
                total: amount,
                items: cart,
                paymentIntentId: result.id,
              };

              localStorage.setItem(`mamz-order-${orderId}`, JSON.stringify(orderData));

              toast.success('Payment successful!');

              // Close modal and redirect to success page
              onClose();
              navigate(`/payment/success?orderId=${orderId}`);
            } else {
              throw new Error('Payment not completed');
            }
          } catch (error) {
            console.error('PayPal capture error:', error);
            toast.error('Payment failed');
          } finally {
            setIsProcessing(false);
          }
        },
        onError: (err) => {
          console.error('PayPal error:', err);
          toast.error('PayPal payment failed');
          setIsProcessing(false);
        },
        style: {
          layout: 'vertical',
          color: 'blue',
          shape: 'rect',
          label: 'paypal',
        },
      }).render('#paypal-button-container');
    }
  }, [paypalLoaded, amount, onSuccess, onClose]);

  return (
    <div className="text-center py-12">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Pay with PayPal
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Secure payment through your PayPal account
        </p>
      </div>

      <div className="max-w-sm mx-auto">
        {paypalLoaded ? (
          <div id="paypal-button-container"></div>
        ) : (
          <div className="flex items-center justify-center space-x-2 py-8">
            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-gray-600 dark:text-gray-400">Loading PayPal...</span>
          </div>
        )}
      </div>

      {isProcessing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 flex items-center justify-center space-x-2 text-blue-600 dark:text-blue-400"
        >
          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span>Processing payment...</span>
        </motion.div>
      )}

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          You'll be redirected to PayPal to complete your payment securely.
        </p>
      </div>
    </div>
  );
};

export default PayPalButton;
