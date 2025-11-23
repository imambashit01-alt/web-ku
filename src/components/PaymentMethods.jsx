import { motion } from 'framer-motion';

const PaymentMethods = ({ selectedPayment, setSelectedPayment }) => {
  const paymentOptions = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: '💳',
      description: 'Visa, Mastercard, American Express',
      placeholder: 'Stripe integration ready'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: '🅿️',
      description: 'Pay with your PayPal account',
      placeholder: 'PayPal SDK integration ready'
    },
    {
      id: 'google',
      name: 'Google Pay',
      icon: '🇬',
      description: 'Fast checkout with Google Pay',
      placeholder: 'Google Pay API integration ready'
    },
    {
      id: 'apple',
      name: 'Apple Pay',
      icon: '🍎',
      description: 'Secure payment with Apple Pay',
      placeholder: 'Apple Pay integration ready'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700"
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Payment Method
      </h2>

      <div className="space-y-3">
        {paymentOptions.map((option) => (
          <motion.div
            key={option.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedPayment(option.id)}
            className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
              selectedPayment === option.id
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg'
                : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-500'
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className={`text-2xl ${selectedPayment === option.id ? 'scale-110' : ''} transition-transform`}>
                {option.icon}
              </div>
              <div className="flex-1">
                <h3 className={`font-semibold ${
                  selectedPayment === option.id
                    ? 'text-blue-900 dark:text-blue-100'
                    : 'text-gray-900 dark:text-white'
                }`}>
                  {option.name}
                </h3>
                <p className={`text-sm ${
                  selectedPayment === option.id
                    ? 'text-blue-700 dark:text-blue-200'
                    : 'text-gray-600 dark:text-gray-400'
                }`}>
                  {option.description}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  {option.placeholder}
                </p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selectedPayment === option.id
                  ? 'border-blue-500 bg-blue-500'
                  : 'border-gray-300 dark:border-gray-600'
              }`}>
                {selectedPayment === option.id && (
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                )}
              </div>
            </div>

            {/* Selected indicator animation */}
            {selectedPayment === option.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 pointer-events-none"
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Card Form Placeholder */}
      {selectedPayment === 'card' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600"
        >
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
            Card Information
          </h4>
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                Card Number
              </label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                disabled
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Expiry Date
                </label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                  CVV
                </label>
                <input
                  type="text"
                  placeholder="123"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  disabled
                />
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-3">
            🔧 Stripe Elements integration placeholder - secure card processing ready
          </p>
        </motion.div>
      )}

      {/* Other payment placeholders */}
      {selectedPayment !== 'card' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 text-center"
        >
          <div className="text-3xl mb-2">{paymentOptions.find(p => p.id === selectedPayment)?.icon}</div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {paymentOptions.find(p => p.id === selectedPayment)?.placeholder}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default PaymentMethods;
