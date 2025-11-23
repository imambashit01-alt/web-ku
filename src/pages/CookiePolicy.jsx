import { motion } from 'framer-motion';

const CookiePolicy = () => {
  const cookieTypes = [
    {
      title: 'Essential Cookies',
      description: 'These cookies are necessary for the website to function and cannot be switched off in our systems.',
      purpose: 'Enable core functionality like security, network management, and accessibility.',
      duration: 'Session or persistent (varies)'
    },
    {
      title: 'Analytics Cookies',
      description: 'These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site.',
      purpose: 'Help us understand how visitors interact with our website by collecting and reporting information anonymously.',
      duration: '2 years'
    },
    {
      title: 'Functional Cookies',
      description: 'These cookies enable the website to provide enhanced functionality and personalization.',
      purpose: 'Remember choices you make and provide enhanced features.',
      duration: '1 year'
    },
    {
      title: 'Marketing Cookies',
      description: 'These cookies are used to track visitors across websites to display ads that are relevant to their interests.',
      purpose: 'Used to deliver advertisements that are more relevant to you and your interests.',
      duration: '90 days'
    }
  ];

  const thirdPartyCookies = [
    { name: 'Google Analytics', purpose: 'Website analytics and performance monitoring' },
    { name: 'Firebase', purpose: 'Authentication and user management' },
    { name: 'Stripe/PayPal', purpose: 'Payment processing (if applicable)' },
    { name: 'Social Media Plugins', purpose: 'Social sharing functionality' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-mamz-white dark:bg-mamz-black"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-mamz-black dark:text-mamz-white mb-4">
            Cookie Policy
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            How we use cookies and similar technologies
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            Last updated: December 2024
          </p>
        </motion.div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl mb-8"
        >
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            This cookie policy explains how MAMZ uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
          </p>
        </motion.div>

        {/* What are Cookies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-8"
        >
          <h2 className="text-2xl font-bold text-mamz-black dark:text-mamz-white mb-4">
            What are Cookies?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners to make their websites work, or to work more efficiently, as well as to provide reporting information.
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Cookies set by the website owner (in this case, MAMZ) are called "first-party cookies". Cookies set by parties other than the website owner are called "third-party cookies". Third-party cookies enable third-party features or functionality to be provided on or through the website.
          </p>
        </motion.div>

        {/* Types of Cookies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-mamz-black dark:text-mamz-white mb-8 text-center">
            Types of Cookies We Use
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cookieTypes.map((cookie, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <h3 className="text-xl font-bold text-mamz-red mb-3">
                  {cookie.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  {cookie.description}
                </p>
                <div className="space-y-2">
                  <div>
                    <strong className="text-mamz-black dark:text-mamz-white">Purpose:</strong>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">{cookie.purpose}</p>
                  </div>
                  <div>
                    <strong className="text-mamz-black dark:text-mamz-white">Duration:</strong>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">{cookie.duration}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Third-Party Cookies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-8"
        >
          <h2 className="text-2xl font-bold text-mamz-black dark:text-mamz-white mb-6">
            Third-Party Cookies
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-600">
                  <th className="text-left py-3 px-4 font-bold text-mamz-black dark:text-mamz-white">
                    Service
                  </th>
                  <th className="text-left py-3 px-4 font-bold text-mamz-black dark:text-mamz-white">
                    Purpose
                  </th>
                </tr>
              </thead>
              <tbody>
                {thirdPartyCookies.map((service, index) => (
                  <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                    <td className="py-3 px-4 font-semibold text-mamz-black dark:text-mamz-white">
                      {service.name}
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                      {service.purpose}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Managing Cookies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl mb-8"
        >
          <h2 className="text-2xl font-bold text-mamz-black dark:text-mamz-white mb-6">
            Managing Your Cookie Preferences
          </h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-mamz-red mb-2">Browser Settings</h3>
              <p className="text-gray-600 dark:text-gray-300">
                You can control and manage cookies through your browser settings. Most browsers allow you to refuse cookies or alert you when cookies are being sent. However, if you disable essential cookies, some features of our website may not work properly.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-mamz-red mb-2">Opt-out Links</h3>
              <p className="text-gray-600 dark:text-gray-300">
                For more information about how to opt out of interest-based advertising, visit the Network Advertising Initiative opt-out page or the Digital Advertising Alliance opt-out page.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-mamz-red mb-2">Contact Us</h3>
              <p className="text-gray-600 dark:text-gray-300">
                If you have any questions about our use of cookies or other technologies, please contact us at privacy@mamz.com.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-mamz-red text-white p-8 rounded-2xl text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Cookie Questions?</h2>
          <p className="text-red-100 mb-6">
            Have questions about our cookie policy or want to manage your preferences?
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold mb-2">Email</h3>
              <p className="text-red-100">privacy@mamz.com</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Phone</h3>
              <p className="text-red-100">1-800-MAMZ-SHOP</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CookiePolicy;
