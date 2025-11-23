import { motion, AnimatePresence } from 'framer-motion';
import { X, Truck, Clock, MapPin, Shield } from 'lucide-react';

const ShippingInfoCard = ({ isOpen, onClose }) => {
  const shippingOptions = [
    {
      name: 'Standard Shipping',
      time: '5-7 business days',
      cost: 'Free on orders over $50',
      costAlt: '$9.99 for orders under $50',
      icon: <Truck className="text-blue-500" size={24} />,
      description: 'Reliable delivery to your doorstep'
    },
    {
      name: 'Express Shipping',
      time: '2-3 business days',
      cost: '$19.99',
      costAlt: '',
      icon: <Clock className="text-orange-500" size={24} />,
      description: 'Faster delivery for urgent needs'
    },
    {
      name: 'Next Day Delivery',
      time: '1 business day',
      cost: '$29.99',
      costAlt: 'Available in select areas',
      icon: <MapPin className="text-red-500" size={24} />,
      description: 'Get your order the next business day'
    }
  ];

  const features = [
    {
      icon: <Shield className="text-green-500" size={20} />,
      title: 'Secure Packaging',
      description: 'All orders are carefully packaged to ensure safe delivery'
    },
    {
      icon: <Truck className="text-blue-500" size={20} />,
      title: 'Real-time Tracking',
      description: 'Track your order from pickup to delivery'
    },
    {
      icon: <Clock className="text-purple-500" size={20} />,
      title: 'Order Processing',
      description: 'Orders are processed within 1-2 business days'
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <Truck className="text-red-500" size={24} />
                  <h2 className="text-2xl font-bold text-gray-900">Shipping Information</h2>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Shipping Options */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Shipping Options</h3>
                <div className="space-y-4">
                  {shippingOptions.map((option, index) => (
                    <motion.div
                      key={option.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border border-gray-200 rounded-lg p-4 hover:border-red-300 transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 mt-1">
                          {option.icon}
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-semibold text-gray-900 mb-1">{option.name}</h4>
                          <p className="text-gray-600 text-sm mb-2">{option.description}</p>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm">
                            <span className="font-medium text-gray-900">{option.time}</span>
                            <span className="text-gray-600">•</span>
                            <span className="text-green-600 font-medium">{option.cost}</span>
                            {option.costAlt && (
                              <>
                                <span className="text-gray-600">•</span>
                                <span className="text-gray-600">{option.costAlt}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Shipping Features */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Why Choose Our Shipping?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="text-center p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex justify-center mb-3">
                        {feature.icon}
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* International Shipping */}
              <div className="mb-8 p-4 bg-blue-50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">International Shipping</h3>
                <p className="text-gray-700 text-sm mb-3">
                  We ship to over 50 countries worldwide. International shipping rates and delivery times vary by location.
                </p>
                <p className="text-gray-600 text-sm">
                  Customs fees and import duties may apply and are the responsibility of the recipient.
                </p>
              </div>

              {/* Contact Info */}
              <div className="text-center">
                <p className="text-gray-600 text-sm mb-2">
                  Have questions about shipping?
                </p>
                <button
                  onClick={() => {
                    onClose();
                    // Could trigger contact modal here
                  }}
                  className="text-red-500 hover:text-red-600 font-medium text-sm"
                >
                  Contact our support team →
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ShippingInfoCard;
