import { motion } from 'framer-motion';

const GiftCards = ({ onAddToCart }) => {
  const giftCardOptions = [
    { amount: 25, popular: false },
    { amount: 50, popular: true },
    { amount: 100, popular: false },
    { amount: 250, popular: false }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-mamz-white dark:bg-mamz-black"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-mamz-black dark:text-mamz-white mb-4">
            Gift Cards
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            The perfect gift for fashion lovers
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Gift Card Options */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-mamz-black dark:text-mamz-white mb-8">
              Choose Your Amount
            </h2>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {giftCardOptions.map((option) => (
                <motion.div
                  key={option.amount}
                  whileHover={{ scale: 1.05 }}
                  className={`relative p-6 border-2 rounded-lg cursor-pointer transition-all ${
                    option.popular
                      ? 'border-mamz-red bg-red-50 dark:bg-red-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-mamz-red'
                  }`}
                  onClick={() => onAddToCart({
                    id: `giftcard-${option.amount}`,
                    name: `MAMZ Gift Card - $${option.amount}`,
                    price: option.amount,
                    emoji: '🎁',
                    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    description: 'Digital gift card for MAMZ products',
                    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop'
                  })}
                >
                  {option.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-mamz-red text-white px-3 py-1 rounded-full text-xs font-bold">
                      Most Popular
                    </div>
                  )}
                  <div className="text-center">
                    <div className="text-2xl font-bold text-mamz-red mb-2">
                      ${option.amount}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      Gift Card
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="font-semibold text-mamz-black dark:text-mamz-white mb-4">
                Gift Card Benefits
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-center">
                  <span className="text-mamz-red mr-2">✓</span>
                  No expiration date
                </li>
                <li className="flex items-center">
                  <span className="text-mamz-red mr-2">✓</span>
                  Can be used on any MAMZ product
                </li>
                <li className="flex items-center">
                  <span className="text-mamz-red mr-2">✓</span>
                  Perfect for any occasion
                </li>
                <li className="flex items-center">
                  <span className="text-mamz-red mr-2">✓</span>
                  Instant digital delivery
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Gift Card Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-mamz-black dark:text-mamz-white mb-8">
              Digital Gift Card
            </h2>

            <div className="bg-gradient-to-br from-mamz-red to-red-600 p-8 rounded-2xl text-white">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">🎁</div>
                <h3 className="text-2xl font-bold mb-2">MAMZ Gift Card</h3>
                <div className="text-red-100">Valid at all MAMZ locations</div>
              </div>

              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold">Card Value:</span>
                  <span className="text-2xl font-bold">$50.00</span>
                </div>
                <div className="text-sm text-red-100">
                  Card Number: **** **** **** 1234
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Gift cards are delivered instantly via email and can be redeemed online or in-store.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
              >
                Purchase Gift Card
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default GiftCards;
