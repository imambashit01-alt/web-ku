import { useState } from 'react';
import { motion } from 'framer-motion';
import ContactModal from './ContactModal';
import SizeGuidePanel from './SizeGuidePanel';
import ShippingInfoCard from './ShippingInfoCard';
import ReturnsTimeline from './ReturnsTimeline';
import FAQAccordion from './FAQAccordion';
import TrackOrderModal from './TrackOrderModal';

const SupportSection = () => {
  const [activeModal, setActiveModal] = useState(null);

  const supportItems = [
    {
      id: 'contact',
      title: 'Contact Us',
      description: 'Get in touch with our support team',
      icon: '📞',
      component: ContactModal
    },
    {
      id: 'size-guide',
      title: 'Size Guide',
      description: 'Find your perfect fit',
      icon: '📏',
      component: SizeGuidePanel
    },
    {
      id: 'shipping',
      title: 'Shipping Info',
      description: 'Learn about delivery options',
      icon: '🚚',
      component: ShippingInfoCard
    },
    {
      id: 'returns',
      title: 'Returns',
      description: 'Easy return process',
      icon: '↩️',
      component: ReturnsTimeline
    },
    {
      id: 'faq',
      title: 'FAQ',
      description: 'Frequently asked questions',
      icon: '❓',
      component: FAQAccordion
    },
    {
      id: 'track-order',
      title: 'Track Order',
      description: 'Check your order status',
      icon: '📦',
      component: TrackOrderModal
    }
  ];

  const openModal = (id) => {
    setActiveModal(id);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const ActiveModal = activeModal ? supportItems.find(item => item.id === activeModal)?.component : null;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Support Center</h1>
          <p className="text-xl text-gray-600">How can we help you today?</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {supportItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => openModal(item.id)}
            >
              <div className="p-6">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {ActiveModal && (
          <ActiveModal isOpen={true} onClose={closeModal} />
        )}
      </div>
    </div>
  );
};

export default SupportSection;
