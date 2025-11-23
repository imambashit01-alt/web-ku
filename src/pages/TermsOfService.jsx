import { motion } from 'framer-motion';

const TermsOfService = () => {
  const sections = [
    {
      title: 'Acceptance of Terms',
      content: `By accessing and using MAMZ's website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.`
    },
    {
      title: 'Use License',
      content: `Permission is granted to temporarily access the materials on MAMZ's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not: modify or copy the materials; use the materials for any commercial purpose or for any public display; attempt to decompile or reverse engineer any software contained on the website.`
    },
    {
      title: 'Product Information',
      content: `We strive to provide accurate product descriptions and images. However, we do not warrant that product descriptions or other content is accurate, complete, reliable, current, or error-free. Prices and availability are subject to change without notice.`
    },
    {
      title: 'Billing and Account Information',
      content: `You agree to provide current, complete, and accurate purchase and account information for all purchases made at our store. You agree to promptly update your account and other information, including your email address and credit card numbers and expiration dates, so that we can complete your transactions and contact you as needed.`
    },
    {
      title: 'Returns and Refunds',
      content: `Items may be returned within 30 days of purchase in accordance with our return policy. Refunds will be processed to the original payment method within 3-5 business days after receipt and inspection of the returned item.`
    },
    {
      title: 'Prohibited Uses',
      content: `You may not use our products or services: for any unlawful purpose or to solicit others to perform unlawful acts; to violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances; to infringe upon or violate our intellectual property rights or the intellectual property rights of others.`
    },
    {
      title: 'Limitation of Liability',
      content: `In no event shall MAMZ or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on MAMZ's website.`
    },
    {
      title: 'Governing Law',
      content: `These terms and conditions are governed by and construed in accordance with the laws of California, and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.`
    },
    {
      title: 'Changes to Terms',
      content: `We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.`
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
            Terms of Service
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Please read these terms carefully before using our services
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
            Welcome to MAMZ! These terms of service outline the rules and regulations for the use of MAMZ's website and services. By accessing this website, we assume you accept these terms and conditions. Do not continue to use MAMZ if you do not agree to take all of the terms and conditions stated on this page.
          </p>
        </motion.div>

        {/* Terms Sections */}
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
          <h2 className="text-3xl font-bold mb-4">Questions About Terms?</h2>
          <p className="text-red-100 mb-6">
            If you have any questions about these terms of service, please contact us.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold mb-2">Email</h3>
              <p className="text-red-100">legal@mamz.com</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Mail</h3>
              <p className="text-red-100">
                MAMZ Legal Team<br />
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

export default TermsOfService;
