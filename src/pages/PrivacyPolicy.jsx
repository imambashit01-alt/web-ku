import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  const sections = [
    {
      title: 'Information We Collect',
      content: `We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support. This includes your name, email address, shipping address, payment information, and any other information you choose to provide.`
    },
    {
      title: 'How We Use Your Information',
      content: `We use the information we collect to process your orders, provide customer service, send you marketing communications (with your consent), improve our website and services, and comply with legal obligations.`
    },
    {
      title: 'Information Sharing',
      content: `We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. We may share your information with trusted service providers who assist us in operating our website and conducting our business.`
    },
    {
      title: 'Data Security',
      content: `We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.`
    },
    {
      title: 'Cookies and Tracking',
      content: `We use cookies and similar technologies to enhance your browsing experience, analyze website traffic, and personalize content. You can control cookie settings through your browser preferences.`
    },
    {
      title: 'Your Rights',
      content: `You have the right to access, update, or delete your personal information. You may also opt out of marketing communications at any time. To exercise these rights, please contact us using the information provided below.`
    },
    {
      title: 'Data Retention',
      content: `We retain your personal information for as long as necessary to provide our services and comply with legal obligations. If you delete your account, we will retain some information as required by law or for legitimate business purposes.`
    },
    {
      title: 'International Transfers',
      content: `Your information may be transferred to and processed in countries other than your own. We ensure that such transfers comply with applicable data protection laws.`
    },
    {
      title: 'Changes to This Policy',
      content: `We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.`
    }
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
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            How we protect and use your personal information
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
            At MAMZ, we are committed to protecting your privacy and personal information. This privacy policy explains how we collect, use, and safeguard your information when you visit our website or use our services. By using our website, you agree to the collection and use of information in accordance with this policy.
          </p>
        </motion.div>

        {/* Policy Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-2xl font-bold text-mamz-black dark:text-mamz-white mb-4">
                {section.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 bg-mamz-red text-white p-8 rounded-2xl text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Questions About Privacy?</h2>
          <p className="text-red-100 mb-6">
            If you have any questions about this privacy policy or our data practices, please contact us.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold mb-2">Email</h3>
              <p className="text-red-100">privacy@mamz.com</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Mail</h3>
              <p className="text-red-100">
                MAMZ Privacy Team<br />
                123 Fashion Street<br />
                Los Angeles, CA 90210
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PrivacyPolicy;
