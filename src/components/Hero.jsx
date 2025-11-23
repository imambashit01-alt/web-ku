import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslate } from '../context/TranslateContext';
import headerImage from '../../textures/dreamina-2025-11-05-4038-Edit Image 1, add the text _Urban Elegan....jpeg';

const Hero = () => {
  const { isDark } = useTheme();

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <img
            src={headerImage}
            alt="Mamz Store"
            className="max-w-full h-auto mx-auto"
            style={{ maxHeight: '800px' }}
          />
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className={`w-6 h-10 border-2 rounded-full flex justify-center ${isDark ? 'border-white' : 'border-black'}`}
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className={`w-1 h-3 rounded-full mt-2 ${isDark ? 'bg-white' : 'bg-black'}`}
            ></motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
