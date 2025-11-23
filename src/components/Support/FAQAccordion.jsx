import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, ChevronUp } from 'lucide-react';

const FAQAccordion = ({ isOpen, onClose }) => {
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const faqData = [
    {
      question: "How do I track my order?",
      answer: "Once your order ships, you'll receive a tracking number via email. You can also track your order by logging into your account and visiting the 'Order History' section. Click on your order to see real-time updates."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return window from the date of delivery. Items must be unworn with original tags attached. Returns are free for all customers. Simply start your return through your account dashboard or contact our support team."
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping takes 5-7 business days, Express shipping takes 2-3 business days, and Next Day delivery is available in select areas. International shipping times vary by location. All orders are processed within 1-2 business days."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship to over 50 countries worldwide. International shipping rates and delivery times vary by location. Customs fees and import duties are the responsibility of the recipient."
    },
    {
      question: "How do I change or cancel my order?",
      answer: "Orders can be modified or cancelled within 2 hours of placement. After that, please contact our support team immediately. Once an order ships, it cannot be cancelled but can be returned upon delivery."
    },
    {
      question: "What sizes should I order?",
      answer: "We recommend checking our size guide for accurate measurements. If you're between sizes, we suggest sizing up for a more comfortable fit. Our customer service team is also available to help with sizing questions."
    },
    {
      question: "Are your products authentic?",
      answer: "Yes, all our products are 100% authentic MAMZ brand items. We source directly from authorized manufacturers and distributors to ensure quality and authenticity."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, Google Pay, and Shop Pay. All transactions are secured with SSL encryption."
    },
    {
      question: "How do I care for my MAMZ products?",
      answer: "For best results, follow the care instructions on each product's label. Generally, we recommend washing in cold water, hanging to dry, and avoiding bleach or high heat. Check our care guide for specific instructions."
    },
    {
      question: "Do you offer gift wrapping?",
      answer: "Yes, we offer complimentary gift wrapping on all orders. During checkout, select the gift wrapping option and add a personalized message. Your order will be beautifully wrapped and ready for gifting."
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
                  <span className="text-2xl">❓</span>
                  <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-3">
                {faqData.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => toggleItem(index)}
                      className="w-full px-4 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
                      <div className="flex-shrink-0">
                        {openItems.has(index) ? (
                          <ChevronUp className="text-gray-500" size={20} />
                        ) : (
                          <ChevronDown className="text-gray-500" size={20} />
                        )}
                      </div>
                    </button>

                    <AnimatePresence>
                      {openItems.has(index) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 text-gray-600 leading-relaxed">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Still have questions?</h3>
                <p className="text-blue-800 text-sm mb-3">
                  Can't find the answer you're looking for? Our support team is here to help.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    // Could trigger contact modal
                  }}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-colors text-sm"
                >
                  Contact Support
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FAQAccordion;
