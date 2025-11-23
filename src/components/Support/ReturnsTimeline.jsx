import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Clock, Truck, RefreshCw, CreditCard } from 'lucide-react';

const ReturnsTimeline = ({ isOpen, onClose }) => {
  const timelineSteps = [
    {
      step: 1,
      title: 'Initiate Return',
      description: 'Start your return within 30 days of delivery',
      icon: <RefreshCw className="text-blue-500" size={20} />,
      details: [
        'Log into your account',
        'Go to order history',
        'Select items to return',
        'Choose return reason'
      ]
    },
    {
      step: 2,
      title: 'Print Label',
      description: 'Get your prepaid return shipping label',
      icon: <Truck className="text-orange-500" size={20} />,
      details: [
        'Free return shipping',
        'Prepaid label generated',
        'Print or save to phone',
        'Pack items securely'
      ]
    },
    {
      step: 3,
      title: 'Ship Package',
      description: 'Drop off at any UPS location or schedule pickup',
      icon: <Truck className="text-green-500" size={20} />,
      details: [
        'Use any UPS location',
        'Schedule free pickup',
        'Track your return',
        'Keep tracking number'
      ]
    },
    {
      step: 4,
      title: 'Processing',
      description: 'We inspect and process your return',
      icon: <Clock className="text-purple-500" size={20} />,
      details: [
        'Items inspected for condition',
        'Processing takes 5-7 days',
        'Email confirmation sent',
        'Refund initiated'
      ]
    },
    {
      step: 5,
      title: 'Refund Complete',
      description: 'Money back to your original payment method',
      icon: <CreditCard className="text-red-500" size={20} />,
      details: [
        'Refund to original payment',
        'Processing time varies by method',
        'Email confirmation',
        'Credit card: 3-5 days'
      ]
    }
  ];

  const returnPolicy = [
    '30-day return window from delivery date',
    'Items must be unworn with original tags',
    'Free return shipping on all orders',
    'Refunds processed within 5-7 business days',
    'Exchanges available for different sizes/colors'
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
            className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <RefreshCw className="text-red-500" size={24} />
                  <h2 className="text-2xl font-bold text-gray-900">Returns Process</h2>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Timeline */}
              <div className="mb-8">
                <div className="space-y-6">
                  {timelineSteps.map((step, index) => (
                    <motion.div
                      key={step.step}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex gap-4"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                          {step.icon}
                        </div>
                        {index < timelineSteps.length - 1 && (
                          <div className="w-px h-8 bg-gray-300 mx-auto mt-2"></div>
                        )}
                      </div>
                      <div className="flex-grow pb-6">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm font-medium text-red-500 bg-red-50 px-2 py-1 rounded">
                            Step {step.step}
                          </span>
                          <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                        </div>
                        <p className="text-gray-600 mb-3">{step.description}</p>
                        <ul className="space-y-1">
                          {step.details.map((detail, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                              <CheckCircle className="text-green-500 flex-shrink-0" size={14} />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Return Policy */}
              <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Return Policy</h3>
                <ul className="space-y-2">
                  {returnPolicy.map((policy, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="text-green-500 flex-shrink-0" size={16} />
                      {policy}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Important Notes */}
              <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">Important Notes</h3>
                <ul className="space-y-1 text-yellow-700 text-sm">
                  <li>• Final sale items cannot be returned</li>
                  <li>• Personalized or custom items are not returnable</li>
                  <li>• Damaged items may be subject to restocking fees</li>
                  <li>• Gift returns require original receipt</li>
                </ul>
              </div>

              {/* CTA */}
              <div className="text-center">
                <p className="text-gray-600 text-sm mb-4">
                  Ready to start your return?
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => {
                      onClose();
                      // Could navigate to returns page or account
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-md transition-colors"
                  >
                    Start Return
                  </button>
                  <button
                    onClick={() => {
                      onClose();
                      // Could trigger contact modal
                    }}
                    className="border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-2 px-6 rounded-md transition-colors"
                  >
                    Need Help?
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ReturnsTimeline;
