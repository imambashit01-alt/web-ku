import { motion } from 'framer-motion';

const Accessibility = () => {
  const accessibilityFeatures = [
    {
      title: 'Keyboard Navigation',
      description: 'All interactive elements can be accessed and operated using only the keyboard.',
      icon: '⌨️'
    },
    {
      title: 'Screen Reader Support',
      description: 'Our website is compatible with popular screen readers and follows WCAG guidelines.',
      icon: '🔊'
    },
    {
      title: 'High Contrast Mode',
      description: 'Dark mode option and high contrast colors for better visibility.',
      icon: '🌙'
    },
    {
      title: 'Font Size Adjustment',
      description: 'Responsive design that works well with browser zoom and text size adjustments.',
      icon: '🔍'
    },
    {
      title: 'Alternative Text',
      description: 'All images include descriptive alt text for screen readers.',
      icon: '📷'
    },
    {
      title: 'Focus Indicators',
      description: 'Clear visual indicators when navigating with keyboard or screen readers.',
      icon: '🎯'
    }
  ];

  const wcagGuidelines = [
    {
      level: 'A',
      title: 'Level A - Essential',
      description: 'Basic web accessibility features that all websites should meet.',
      requirements: [
        'Text alternatives for non-text content',
        'Keyboard accessible',
        'No keyboard trap',
        'Enough time to read and use content',
        'No content that flashes more than 3 times per second'
      ]
    },
    {
      level: 'AA',
      title: 'Level AA - Acceptable',
      description: 'Most websites should meet this level of accessibility.',
      requirements: [
        'All Level A requirements',
        'Color is not used as the only way to convey information',
        'Contrast ratio of at least 4.5:1 for normal text',
        'Text can be resized up to 200% without loss of functionality',
        'Multiple ways to find content'
      ]
    },
    {
      level: 'AAA',
      title: 'Level AAA - Optimal',
      description: 'Highest level of accessibility, not always practical for all content.',
      requirements: [
        'All Level A and AA requirements',
        'Contrast ratio of at least 7:1 for normal text',
        'Very low or no background audio',
        'Sign language interpretation for prerecorded media',
        'Extended audio description for prerecorded video'
      ]
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-mamz-black dark:text-mamz-white mb-4">
            Accessibility Statement
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Our commitment to making MAMZ accessible to everyone
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
            At MAMZ, we are committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards. Our website follows the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards.
          </p>
        </motion.div>

        {/* Accessibility Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-mamz-black dark:text-mamz-white mb-8 text-center">
            Accessibility Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {accessibilityFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 text-center"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-mamz-black dark:text-mamz-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* WCAG Guidelines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-mamz-black dark:text-mamz-white mb-8 text-center">
            WCAG 2.1 Compliance
          </h2>

          <div className="space-y-6">
            {wcagGuidelines.map((level, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4 ${
                    level.level === 'A' ? 'bg-red-500' :
                    level.level === 'AA' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}>
                    {level.level}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-mamz-black dark:text-mamz-white">
                      {level.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {level.description}
                    </p>
                  </div>
                </div>

                <div className="ml-16">
                  <h4 className="font-bold text-mamz-red mb-3">Key Requirements:</h4>
                  <ul className="space-y-2">
                    {level.requirements.map((req, reqIndex) => (
                      <li key={reqIndex} className="flex items-start">
                        <span className="text-mamz-red mr-2 mt-1">•</span>
                        <span className="text-gray-600 dark:text-gray-300 text-sm">
                          {req}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Browser Compatibility */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-8"
        >
          <h2 className="text-2xl font-bold text-mamz-black dark:text-mamz-white mb-6">
            Browser and Assistive Technology Compatibility
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-mamz-red mb-3">Supported Browsers</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Chrome (latest 2 versions)
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Firefox (latest 2 versions)
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Safari (latest 2 versions)
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Edge (latest 2 versions)
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-mamz-red mb-3">Screen Readers</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  NVDA (Windows)
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  JAWS (Windows)
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  VoiceOver (macOS/iOS)
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  TalkBack (Android)
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Feedback and Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-mamz-red text-white p-8 rounded-2xl text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Accessibility Feedback</h2>
          <p className="text-red-100 mb-6">
            We strive to make our website accessible to everyone. If you encounter any accessibility barriers or have suggestions for improvement, please let us know.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold mb-2">Report Issues</h3>
              <p className="text-red-100 text-sm">accessibility@mamz.com</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">General Support</h3>
              <p className="text-red-100 text-sm">support@mamz.com</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Phone</h3>
              <p className="text-red-100 text-sm">1-800-MAMZ-SHOP</p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-red-300">
            <p className="text-red-100 text-sm">
              This accessibility statement was last reviewed on December 2024. We regularly review and update our accessibility practices to ensure we continue to meet the highest standards.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Accessibility;
