import { motion } from 'framer-motion';

const ShippingInfo = () => {
  const shippingOptions = [
    {
      name: 'Standard Shipping',
      time: '5-7 business days',
      cost: '$10',
      description: 'Free on orders $50+',
      icon: '📦'
    },
    {
      name: 'Express Shipping',
      time: '2-3 business days',
      cost: '$20',
      description: 'Order by 2 PM for same-day processing',
      icon: '🚚'
    },
    {
      name: 'Overnight Shipping',
      time: '1 business day',
      cost: '$35',
      description: 'Available for select locations',
      icon: '✈️'
    }
  ];

  const internationalShipping = [
    { region: 'Canada', time: '7-10 business days', cost: '$15' },
    { region: 'Europe', time: '10-14 business days', cost: '$25' },
    { region: 'Asia Pacific', time: '12-18 business days', cost: '$30' },
    { region: 'Rest of World', time: '14-21 business days', cost: '$40' }
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
            Shipping Information
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Fast, reliable delivery worldwide
          </p>
        </motion.div>

        {/* Domestic Shipping */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-mamz-black dark:text-mamz-white mb-8 text-center">
            Domestic Shipping (US)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {shippingOptions.map((option, index) => (
              <motion.div
                key={option.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg text-center hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-4">{option.icon}</div>
                <h3 className="text-xl font-bold text-mamz-black dark:text-mamz-white mb-2">
                  {option.name}
                </h3>
                <div className="text-2xl font-bold text-mamz-red mb-2">
                  {option.cost}
                </div>
                <div className="text-gray-600 dark:text-gray-300 mb-2">
                  {option.time}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {option.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* International Shipping */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-mamz-black dark:text-mamz-white mb-8 text-center">
            International Shipping
          </h2>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-300 dark:border-gray-600">
                    <th className="text-left py-4 px-4 font-bold text-mamz-black dark:text-mamz-white">
                      Region
                    </th>
                    <th className="text-left py-4 px-4 font-bold text-mamz-black dark:text-mamz-white">
                      Delivery Time
                    </th>
                    <th className="text-left py-4 px-4 font-bold text-mamz-black dark:text-mamz-white">
                      Cost
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {internationalShipping.map((region, index) => (
                    <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                      <td className="py-4 px-4 font-semibold text-mamz-black dark:text-mamz-white">
                        {region.region}
                      </td>
                      <td className="py-4 px-4 text-gray-600 dark:text-gray-300">
                        {region.time}
                      </td>
                      <td className="py-4 px-4 text-mamz-red font-bold">
                        {region.cost}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Shipping Policies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <div className="bg-mamz-red text-white p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-6">Shipping Policies</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-red-200 mr-3 mt-1">•</span>
                <div>
                  <strong>Processing Time:</strong> Orders are processed within 1-2 business days
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-red-200 mr-3 mt-1">•</span>
                <div>
                  <strong>Free Shipping:</strong> Available on orders over $50
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-red-200 mr-3 mt-1">•</span>
                <div>
                  <strong>Order Tracking:</strong> Tracking information provided via email
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-red-200 mr-3 mt-1">•</span>
                <div>
                  <strong>Delivery Updates:</strong> Real-time updates via carrier notifications
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-mamz-black dark:text-mamz-white mb-6">
              Important Notes
            </h3>
            <ul className="space-y-4 text-gray-600 dark:text-gray-300">
              <li className="flex items-start">
                <span className="text-mamz-red mr-3 mt-1">✓</span>
                <div>
                  Business days exclude weekends and holidays
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-mamz-red mr-3 mt-1">✓</span>
                <div>
                  Delivery times may vary during peak seasons
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-mamz-red mr-3 mt-1">✓</span>
                <div>
                  Signature may be required for high-value orders
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-mamz-red mr-3 mt-1">✓</span>
                <div>
                  We ship to APO/FPO addresses
                </div>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Contact for Shipping Questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-bold text-mamz-black dark:text-mamz-white mb-4">
            Have Shipping Questions?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Our customer service team is here to help with any shipping inquiries.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-300">
              <span>📞</span>
              <span>1-800-MAMZ-SHOP</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-300">
              <span>✉️</span>
              <span>shipping@mamz.com</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ShippingInfo;
