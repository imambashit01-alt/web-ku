import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Support = () => {
  const supportCategories = [
    {
      title: 'Order Support',
      icon: '📦',
      description: 'Track orders, modify shipments, and get delivery updates',
      links: [
        { name: 'Track Your Order', path: '/track' },
        { name: 'Order Status', path: '/order-status' },
        { name: 'Modify Order', path: '/modify-order' }
      ]
    },
    {
      title: 'Returns & Exchanges',
      icon: '↩️',
      description: 'Easy returns, exchanges, and refund information',
      links: [
        { name: 'Start a Return', path: '/returns' },
        { name: 'Return Policy', path: '/return-policy' },
        { name: 'Exchange Items', path: '/exchange' }
      ]
    },
    {
      title: 'Product Support',
      icon: '👟',
      description: 'Size guides, care instructions, and product information',
      links: [
        { name: 'Size Guide', path: '/size-guide' },
        { name: 'Care Instructions', path: '/care' },
        { name: 'Product Info', path: '/product-info' }
      ]
    },
    {
      title: 'Account & Billing',
      icon: '👤',
      description: 'Account settings, payment methods, and billing questions',
      links: [
        { name: 'Account Settings', path: '/account' },
        { name: 'Payment Methods', path: '/payment' },
        { name: 'Billing History', path: '/billing' }
      ]
    }
  ];

  const faqs = [
    {
      question: 'How long does shipping take?',
      answer: 'Standard shipping takes 5-7 business days. Express shipping is available for 2-3 business days.'
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy on all items. Items must be unworn with original tags attached.'
    },
    {
      question: 'How do I track my order?',
      answer: 'You will receive a tracking number via email once your order ships. You can also track it in your account.'
    },
    {
      question: 'Do you offer international shipping?',
      answer: 'Yes, we ship to over 25 countries worldwide. International shipping rates vary by location.'
    }
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
            Support Center
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            How can we help you today?
          </p>
        </motion.div>

        {/* Support Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {supportCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">{category.icon}</div>
              <h3 className="text-xl font-bold text-mamz-black dark:text-mamz-white mb-3">
                {category.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                {category.description}
              </p>
              <ul className="space-y-2">
                {category.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-mamz-red hover:underline text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-mamz-red text-white p-8 rounded-2xl mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Need More Help?</h2>
            <p className="text-red-100">Our support team is here to assist you</p>
          </div>

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
              <div className="text-4xl mb-4">✉️</div>
              <h3 className="font-bold mb-2">Email Support</h3>
              <p className="text-red-100">support@mamz.com</p>
              <p className="text-red-100 text-sm">Response within 24 hours</p>
            </div>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-mamz-black dark:text-mamz-white text-center mb-8">
            Frequently Asked Questions
          </h2>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg"
              >
                <h3 className="font-bold text-mamz-black dark:text-mamz-white mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Support;
