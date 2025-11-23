import { motion } from 'framer-motion';
import { useTranslate } from '../context/TranslateContext';

const About = () => {
  const { translate } = useTranslate();

  const stats = [
    { label: translate('Products Sold'), value: '50K+' },
    { label: translate('Happy Customers'), value: '10K+' },
    { label: translate('Years Experience'), value: '5+' },
    { label: translate('Countries Shipped'), value: '25+' }
  ];

  return (
    <section className="py-16 bg-mamz-white dark:bg-mamz-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-mamz-black dark:text-mamz-white mb-6">
              {translate('About MAMZ')}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
              {translate("We're passionate about creating bold, minimal streetwear that stands out. Our designs combine quality craftsmanship with contemporary aesthetics, inspired by the spirit of urban culture.")}
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              {translate("Every piece is carefully crafted to ensure comfort, durability, and style that lasts. Join our community of fashion-forward individuals who choose MAMZ for their wardrobe essentials.")}
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <div className="text-3xl md:text-4xl font-bold text-mamz-red mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
