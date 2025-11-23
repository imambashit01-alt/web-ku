import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslate } from '../context/TranslateContext';
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { ShoppingBagIcon, TruckIcon, ArrowPathIcon, UserIcon, ClipboardDocumentListIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid';

const FAQSection = () => {
  const { isDark } = useTheme();
  const { translate, currentLanguage, isTransitioning } = useTranslate();
  const [openItems, setOpenItems] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredFaq, setFilteredFaq] = useState([]);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);


  // Load state from localStorage
  useEffect(() => {
    const savedOpenItems = localStorage.getItem('mamz-faq-open-items');
    const savedCategory = localStorage.getItem('mamz-faq-category');

    if (savedOpenItems) setOpenItems(new Set(JSON.parse(savedOpenItems)));
    if (savedCategory) setActiveCategory(savedCategory);
  }, []);


  useEffect(() => {
    localStorage.setItem('mamz-faq-open-items', JSON.stringify([...openItems]));
  }, [openItems]);

  useEffect(() => {
    localStorage.setItem('mamz-faq-category', activeCategory);
  }, [activeCategory]);


  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) newOpenItems.delete(index);
    else newOpenItems.add(index);
    setOpenItems(newOpenItems);
  };

  const categories = [
    { id: 'all', label: { id: 'Semua', en: 'All' }, icon: null },
    { id: 'products', label: { id: 'Produk', en: 'Products' }, icon: ShoppingBagIcon },
    { id: 'shipping', label: { id: 'Pengiriman', en: 'Shipping' }, icon: TruckIcon },
    { id: 'returns', label: { id: 'Pengembalian', en: 'Returns' }, icon: ArrowPathIcon },
    { id: 'account', label: { id: 'Akun', en: 'Account' }, icon: UserIcon },
    { id: 'orders', label: { id: 'Pesanan', en: 'Orders' }, icon: ClipboardDocumentListIcon },
    { id: 'general', label: { id: 'Umum', en: 'General' }, icon: ChatBubbleLeftRightIcon },
  ];

  const faqData = [
    {
      id: 'size-guide',
      category: 'products',
      question: { id: 'Bagaimana cara menentukan ukuran yang tepat?', en: 'How do I find my correct size?' },
      answer: { id: 'Gunakan panduan ukuran...', en: 'Use our size guide...' }
    },
    {
      id: 'authentic',
      category: 'products',
      question: { id: 'Apakah produk MAMZ 100% original?', en: 'Are MAMZ products 100% authentic?' },
      answer: { id: 'Semua produk kami...', en: 'All our products...' }
    },
    {
      id: 'shipping-time',
      category: 'shipping',
      question: { id: 'Berapa lama waktu pengiriman?', en: 'How long does shipping take?' },
      answer: { id: 'Pengiriman domestik...', en: 'Domestic shipping...' }
    },
    {
      id: 'international',
      category: 'shipping',
      question: { id: 'Apakah MAMZ mengirim ke luar negeri?', en: 'Do you ship internationally?' },
      answer: { id: 'Saat ini kami fokus...', en: 'Currently we focus...' }
    },
    {
      id: 'return-process',
      category: 'returns',
      question: { id: 'Bagaimana proses pengembalian barang?', en: 'How do I return a product?' },
      answer: { id: 'Isi formulir...', en: 'Fill out the form...' }
    },
    {
      id: 'account-needed',
      category: 'account',
      question: { id: 'Apakah saya perlu akun?', en: 'Do I need an account?' },
      answer: { id: 'Tidak wajib...', en: 'Not required...' }
    },
    {
      id: 'track-order',
      category: 'orders',
      question: { id: 'Bagaimana cara melacak pesanan?', en: 'How do I track my order?' },
      answer: { id: 'Gunakan fitur...', en: 'Use the “Track Order”...' }
    },
    {
      id: 'local-made',
      category: 'general',
      question: { id: 'Apakah produk MAMZ buatan lokal?', en: 'Are MAMZ products locally made?' },
      answer: { id: 'Ya! Semua produk...', en: 'Yes! All MAMZ products...' }
    }
  ];

  // Filter FAQ based on search and category (FIXED)
  useEffect(() => {
    let filtered = faqData;

    if (activeCategory !== 'all') {
      filtered = filtered.filter(item => item.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item =>
        item.question[currentLanguage].toLowerCase().includes(query) ||
        item.answer[currentLanguage].toLowerCase().includes(query)
      );
    }

    setFilteredFaq(filtered);
  }, [searchQuery, activeCategory, currentLanguage]);


  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  return (
    <div className="min-h-screen">
      
      {/* Category Filters */}
      <section className={`py-8 px-4 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold"
                >
                  {Icon && <Icon className="w-5 h-5" />}
                  {category.label[currentLanguage]}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className={`py-16 px-4 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto space-y-6">
          {filteredFaq.map((item, index) => (
            <div key={item.id} className="rounded-2xl border-2 p-6">
              <button onClick={() => toggleItem(index)} className="w-full flex justify-between">
                <span className="text-xl font-bold">
                  {item.question[currentLanguage]}
                </span>
                <ChevronDownIcon className="w-6 h-6 text-red-500" />
              </button>

              {openItems.has(index) && (
                <div className="mt-4 text-lg">
                  {item.answer[currentLanguage]}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FAQSection;
