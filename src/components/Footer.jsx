import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaTiktok, FaYoutube, FaInstagram } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa6';
import { useTranslate } from '../context/TranslateContext';

const Footer = () => {
  const { translate } = useTranslate();

  const footerSections = [
    {
      title: translate('Shop'),
      links: [
        { name: translate('New Arrivals'), path: '/new' },
        { name: translate('Women'), path: '/women' },
        { name: translate('Men'), path: '/men' },
        { name: translate('Kids'), path: '/kids' },
        { name: translate('Sale'), path: '/sale' },
        { name: translate('Gift Cards'), path: '/gift-cards' },
      ]
    },
    {
      title: translate('Support'),
      links: [
        { name: translate('Contact Us'), path: '/contact' },
        { name: translate('Size Guide'), path: '/size-guide' },
        { name: translate('Shipping Info'), path: '/shipping' },
        { name: translate('Returns'), path: '/returns' },
        { name: translate('FAQ'), path: '/faq' },
        { name: translate('Track Order'), path: '/track' },
      ]
    },
    {
      title: translate('Company'),
      links: [
        { name: translate('About MAMZ'), path: '/about' },
        { name: translate('Our Story'), path: '/story' },
        { name: translate('Careers'), path: '/careers' },
        { name: translate('Sustainability'), path: '/sustainability' },
        { name: translate('Store Locator'), path: '/locator' },
        { name: translate('News'), path: '/news' },
      ]
    },
    {
      title: translate('Legal'),
      links: [
        { name: translate('Privacy Policy'), path: '/privacy' },
        { name: translate('Terms of Service'), path: '/terms' },
        { name: translate('Cookie Policy'), path: '/cookies' },
        { name: translate('Accessibility'), path: '/accessibility' },
        { name: translate('Student Discount'), path: '/student' },
        { name: translate('Affiliate Program'), path: '/affiliate' },
      ]
    }
  ];

  const socialLinks = [
    { icon: FaTiktok, url: 'https://www.tiktok.com/@ruthvnn', label: 'TikTok' },
    { icon: FaYoutube, url: 'https://www.youtube.com/@ReganSamp', label: 'YouTube' },
    { icon: FaInstagram, url: 'https://www.instagram.com/distortussmm', label: 'Instagram' },
    { icon: FaGithub, url: 'https://github.com/imambashit01-alt', label: 'GitHub' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      viewport={{ once: true }}
      className="bg-black text-gray-300 font-inter px-8 py-10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-white font-bold uppercase mb-4 text-sm tracking-wide">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-sm hover:text-red-500 transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-gray-700 pt-6 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4"
        >
          <div className="flex flex-col gap-2">
            <p className="text-gray-400 text-sm text-center lg:text-left">
              © 2025 MAMZ. {translate('Bold style, quality craftsmanship. Redefining streetwear fashion.')}
            </p>
            <span className="text-mamz-red font-bold text-lg tracking-wide">
              MAMZ
            </span>
          </div>
          <div className="flex items-center gap-4">
            {socialLinks.map(({ icon: Icon, url, label }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-red-500 transition-colors duration-300"
                aria-label={label}
              >
                <Icon size={22} />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Scroll to Top Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-red-500/50 hover:scale-110 z-50"
          aria-label={translate("Scroll to top")}
        >
          ↑
        </motion.button>
      </div>
    </motion.footer>
  );
};

export default Footer;
