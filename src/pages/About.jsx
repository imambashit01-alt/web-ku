import { motion } from 'framer-motion';
import { useTranslate } from '../context/TranslateContext';

const About = () => {
  const { translate } = useTranslate();

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
            {translate('About MAMZ')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {translate('Born from the skate culture of Southern California, MAMZ has been redefining streetwear fashion for over 50 years.')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-mamz-black dark:text-mamz-white mb-6">
              {translate('Our Story')}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
              {translate('Founded in 1966 in Anaheim, California, MAMZ started as a small skate shop serving the local skateboarding community. What began as a passion for skate culture quickly evolved into a global brand synonymous with authentic streetwear.')}
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
              {translate('Our commitment to quality craftsmanship, innovative design, and the spirit of skateboarding has made MAMZ a staple in wardrobes worldwide. From the iconic checkerboard pattern to our signature waffle soles, every piece tells a story of creativity and rebellion.')}
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              {translate('Today, MAMZ continues to push boundaries, blending traditional skate aesthetics with contemporary fashion trends, ensuring that our legacy lives on in every step our customers take.')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=600&h=600&fit=crop"
              alt="MAMZ Skate Culture"
              className="rounded-lg shadow-2xl"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-mamz-black dark:text-mamz-white mb-8">
            {translate('Our Values')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg">
              <h3 className="text-xl font-semibold text-mamz-red mb-4">{translate('Authenticity')}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {translate('Staying true to our skateboarding roots and the culture that made us who we are.')}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg">
              <h3 className="text-xl font-semibold text-mamz-red mb-4">{translate('Quality')}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {translate('Every product is crafted with attention to detail and built to last.')}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg">
              <h3 className="text-xl font-semibold text-mamz-red mb-4">{translate('Innovation')}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {translate('Constantly pushing boundaries and redefining what\'s possible in streetwear.')}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;
