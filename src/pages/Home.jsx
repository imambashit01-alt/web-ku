import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts';
import About from '../components/About';
import Newsletter from '../components/Newsletter';
import FAQSection from '../components/FAQSection';
import { products } from '../data/products';
import { useTranslate } from '../context/TranslateContext';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <FeaturedProducts products={products} />
      <About />
      <FAQSection />
      <Newsletter />
    </motion.div>
  );
};

export default Home;
