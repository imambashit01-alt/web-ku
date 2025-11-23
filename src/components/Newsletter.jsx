import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslate } from '../context/TranslateContext';

const Newsletter = () => {
  const { isDark } = useTheme();
  const { translate } = useTranslate();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <section className={`py-16 ${isDark ? 'bg-mamz-red' : 'bg-gray-800'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-mamz-white mb-4">
            {translate('Stay Updated')}
          </h2>
          <p className={`text-lg mb-8 ${isDark ? 'text-red-100' : 'text-gray-300'}`}>
            {translate('Get the latest drops, exclusive offers, and style inspiration delivered to your inbox.')}
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={translate("Enter your email")}
                className="flex-1 px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-mamz-white"
                required
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="bg-mamz-black text-mamz-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                {translate('Subscribe')}
              </motion.button>
            </div>
          </form>

          {isSubscribed && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 text-mamz-white font-semibold"
            >
              {translate('Thanks for subscribing! 🎉')}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
