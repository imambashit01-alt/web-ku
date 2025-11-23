import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X } from 'lucide-react';
import StripeCardForm from './StripeCardForm';
import GooglePayButton from './GooglePayButton';
import ApplePayButton from './ApplePayButton';
import PayPalButton from './PayPalButton';

const PaymentPopup = ({ isOpen, onClose, amount, onPaymentSuccess }) => {
  const [selectedMethod, setSelectedMethod] = useState('card');

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: '💳',
      description: 'Visa, Mastercard, American Express',
      component: StripeCardForm
    },
    {
      id: 'google_pay',
      name: 'Google Pay',
      icon: '🤖',
      description: 'Pay with Google',
      component: GooglePayButton
    },
    {
      id: 'apple_pay',
      name: 'Apple Pay',
      icon: '📱',
      description: 'Pay with Apple',
      component: ApplePayButton
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: '🅿️',
      description: 'Pay with PayPal',
      component: PayPalButton
    }
  ];

  const selectedMethodData = paymentMethods.find(method => method.id === selectedMethod);
  const PaymentComponent = selectedMethodData?.component;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Complete Payment
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Total: ${amount?.toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              <div className="flex-1 overflow-hidden">
                <div className="h-full flex flex-col md:flex-row">
                  {/* Payment Methods Sidebar */}
                  <div className="w-full md:w-80 border-r border-gray-200 dark:border-gray-700 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Payment Methods
                    </h3>
                    <div className="space-y-3">
                      {paymentMethods.map((method) => (
                        <motion.button
                          key={method.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelectedMethod(method.id)}
                          className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                            selectedMethod === method.id
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                              : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{method.icon}</span>
                            <div>
                              <h4 className={`font-semibold ${
                                selectedMethod === method.id
                                  ? 'text-blue-900 dark:text-blue-100'
                                  : 'text-gray-900 dark:text-white'
                              }`}>
                                {method.name}
                              </h4>
                              <p className={`text-sm ${
                                selectedMethod === method.id
                                  ? 'text-blue-700 dark:text-blue-200'
                                  : 'text-gray-600 dark:text-gray-400'
                              }`}>
                                {method.description}
                              </p>
                            </div>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Payment Form */}
                  <div className="flex-1 p-6 overflow-y-auto">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={selectedMethod}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="h-full"
                      >
                        {PaymentComponent && (
                          <PaymentComponent
                            amount={amount}
                            onSuccess={onPaymentSuccess}
                            onClose={onClose}
                          />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PaymentPopup;
