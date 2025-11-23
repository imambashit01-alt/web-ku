import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslate } from '../context/TranslateContext';

const Contact = () => {
  const { translate } = useTranslate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    alert(translate('Thank you for your message! We\'ll get back to you soon.'));
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

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
            {translate('Contact Us')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {translate('Get in touch with the MAMZ team')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-mamz-black dark:text-mamz-white mb-8">
              {translate('Get In Touch')}
            </h2>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-mamz-red text-mamz-white p-3 rounded-lg">
                  📞
                </div>
                <div>
                  <h3 className="font-semibold text-mamz-black dark:text-mamz-white mb-1">
                    {translate('Customer Service')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    1-800-MAMZ-SHOP<br />
                    {translate('Mon-Fri: 9AM - 6PM PST')}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-mamz-red text-mamz-white p-3 rounded-lg">
                  ✉️
                </div>
                <div>
                  <h3 className="font-semibold text-mamz-black dark:text-mamz-white mb-1">
                    {translate('Email Support')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    support@mamz.com<br />
                    orders@mamz.com
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-mamz-red text-mamz-white p-3 rounded-lg">
                  📍
                </div>
                <div>
                  <h3 className="font-semibold text-mamz-black dark:text-mamz-white mb-1">
                    {translate('Store Locations')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {translate('Los Angeles, CA')}<br />
                    {translate('New York, NY')}<br />
                    {translate('Miami, FL')}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-mamz-red text-mamz-white p-3 rounded-lg">
                  💬
                </div>
                <div>
                  <h3 className="font-semibold text-mamz-black dark:text-mamz-white mb-1">
                    {translate('Live Chat')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {translate('Available 24/7')}<br />
                    {translate('Average response time: 2 minutes')}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-mamz-black dark:text-mamz-white mb-8">
              {translate('Send us a Message')}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {translate('Name')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="input-field"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {translate('Email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {translate('Subject')}
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="input-field"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {translate('Message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="input-field resize-none"
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full btn-primary"
              >
                {translate('Send Message')}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
