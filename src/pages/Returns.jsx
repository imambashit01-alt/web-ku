import { motion } from 'framer-motion';

const Returns = () => {
  const returnSteps = [
    {
      step: 1,
      title: 'Prepare Your Return',
      description: 'Ensure items are unworn, unwashed, and have original tags attached.',
      icon: '📦'
    },
    {
      step: 2,
      title: 'Start Return Process',
      description: 'Log into your account or contact customer service to initiate your return.',
      icon: '📝'
    },
    {
      step: 3,
      title: 'Package & Ship',
      description: 'Pack items securely and use the provided return label for free shipping.',
      icon: '🚚'
    },
    {
      step: 4,
      title: 'Get Refund',
      description: 'Receive your refund within 3-5 business days after we process your return.',
      icon: '💰'
    }
  ];

  const returnReasons = [
    'Wrong size ordered',
    'Item doesn\'t fit',
    'Changed my mind',
    'Defective product',
    'Not as described',
    'Late delivery'
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
            Returns & Exchanges
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Hassle-free returns within 30 days
          </p>
        </motion.div>

        {/* Return Process Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-mamz-black dark:text-mamz-white mb-8 text-center">
            How Returns Work
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {returnSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="bg-mamz-red text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-bold text-mamz-black dark:text-mamz-white mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Return Policy Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          {/* Return Policy */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-mamz-black dark:text-mamz-white mb-6">
              Return Policy
            </h2>

            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h3 className="font-bold text-mamz-red mb-2">30-Day Return Window</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  You have 30 days from delivery to initiate a return. Items must be in original condition.
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h3 className="font-bold text-mamz-red mb-2">Free Return Shipping</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We provide prepaid return labels for all US returns. International returns may incur shipping costs.
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h3 className="font-bold text-mamz-red mb-2">Refund Processing</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Refunds are processed within 3-5 business days after we receive your return. Original payment method will be refunded.
                </p>
              </div>
            </div>
          </motion.div>

          {/* What We Accept */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-mamz-black dark:text-mamz-white mb-6">
              What We Accept for Return
            </h2>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <span className="text-green-500 text-xl mt-1">✓</span>
                <div>
                  <strong>Unworn items</strong>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Items must not have been worn or used</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <span className="text-green-500 text-xl mt-1">✓</span>
                <div>
                  <strong>Original tags attached</strong>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">All tags and labels must be intact</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <span className="text-green-500 text-xl mt-1">✓</span>
                <div>
                  <strong>Original packaging</strong>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Items should be in original packaging when possible</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <span className="text-red-500 text-xl mt-1">✗</span>
                <div>
                  <strong>Washed or altered items</strong>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Items that have been washed or modified</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <span className="text-red-500 text-xl mt-1">✗</span>
                <div>
                  <strong>Items without receipt</strong>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Proof of purchase required</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Return Reasons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-mamz-black dark:text-mamz-white mb-8 text-center">
            Common Return Reasons
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {returnReasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg text-center"
              >
                <p className="text-gray-600 dark:text-gray-300">{reason}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center bg-mamz-red text-white p-8 rounded-2xl"
        >
          <h2 className="text-3xl font-bold mb-4">Need Help with a Return?</h2>
          <p className="text-red-100 mb-6">
            Our customer service team is here to assist you with any return questions.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">📞</div>
              <h3 className="font-bold mb-2">Call Us</h3>
              <p className="text-red-100">1-800-MAMZ-SHOP</p>
              <p className="text-red-100 text-sm">Mon-Fri: 9AM - 6PM PST</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="font-bold mb-2">Live Chat</h3>
              <p className="text-red-100">Available 24/7</p>
              <p className="text-red-100 text-sm">Average response: 2 minutes</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">📧</div>
              <h3 className="font-bold mb-2">Email Support</h3>
              <p className="text-red-100">returns@mamz.com</p>
              <p className="text-red-100 text-sm">Response within 24 hours</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Returns;
