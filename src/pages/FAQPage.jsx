import { motion } from 'framer-motion';
import FAQSection from '../components/FAQSection';

const FAQPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      <FAQSection />
    </motion.div>
  );
};

export default FAQPage;
