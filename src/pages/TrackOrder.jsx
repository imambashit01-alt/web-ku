import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Package, Truck, CheckCircle, Clock, MapPin, Globe, Sparkles } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { pageVariants, containerVariants, itemVariants, buttonVariants } from '../utils/animations';

// Bilingual content
const content = {
  en: {
    title: "Track Your Order",
    subtitle: "Real-time updates on your MAMZ purchase",
    orderNumber: "Order Number",
    orderNumberPlaceholder: "e.g. MAMZ-123456",
    email: "Email Address",
    emailPlaceholder: "your@email.com",
    trackButton: "Track Order",
    tracking: "Tracking...",
    orderSummary: "Order Summary",
    estimatedDelivery: "Estimated Delivery",
    trackingTimeline: "Tracking Timeline",
    orderPlaced: "Order Placed",
    processing: "Processing",
    shipped: "Shipped",
    inTransit: "In Transit",
    delivered: "Delivered",
    trackAnother: "Track Another Order",
    needHelp: "Need Help?",
    orderNotFound: "Order Not Found",
    orderNotFoundDesc: "We couldn't find an order with that information. Please check your details and try again.",
    tryAgain: "Try Again",
    language: "ID"
  },
  id: {
    title: "Lacak Pesanan Anda",
    subtitle: "Update real-time untuk pembelian MAMZ Anda",
    orderNumber: "Nomor Pesanan",
    orderNumberPlaceholder: "contoh: MAMZ-123456",
    email: "Alamat Email",
    emailPlaceholder: "email@anda.com",
    trackButton: "Lacak Pesanan",
    tracking: "Melacak...",
    orderSummary: "Ringkasan Pesanan",
    estimatedDelivery: "Estimasi Pengiriman",
    trackingTimeline: "Timeline Pelacakan",
    orderPlaced: "Pesanan Dibuat",
    processing: "Diproses",
    shipped: "Dikirim",
    inTransit: "Dalam Perjalanan",
    delivered: "Diterima",
    trackAnother: "Lacak Pesanan Lain",
    needHelp: "Butuh Bantuan?",
    orderNotFound: "Pesanan Tidak Ditemukan",
    orderNotFoundDesc: "Kami tidak dapat menemukan pesanan dengan informasi tersebut. Silakan periksa detail Anda dan coba lagi.",
    tryAgain: "Coba Lagi",
    language: "EN"
  }
};

// Mock tracking data
const mockTrackingData = {
  'MAMZ-123456': {
    orderNumber: 'MAMZ-123456',
    status: 'in_transit',
    estimatedDelivery: 'December 15, 2024',
    trackingSteps: [
      {
        status: 'ordered',
        title: { en: 'Order Placed', id: 'Pesanan Dibuat' },
        description: { en: 'Your order has been received', id: 'Pesanan Anda telah diterima' },
        date: 'Dec 10, 2024',
        time: '2:30 PM',
        completed: true
      },
      {
        status: 'processing',
        title: { en: 'Processing', id: 'Diproses' },
        description: { en: 'Your order is being prepared', id: 'Pesanan Anda sedang disiapkan' },
        date: 'Dec 11, 2024',
        time: '9:15 AM',
        completed: true
      },
      {
        status: 'shipped',
        title: { en: 'Shipped', id: 'Dikirim' },
        description: { en: 'Your order has been shipped', id: 'Pesanan Anda telah dikirim' },
        date: 'Dec 12, 2024',
        time: '11:45 AM',
        completed: true
      },
      {
        status: 'in_transit',
        title: { en: 'In Transit', id: 'Dalam Perjalanan' },
        description: { en: 'Your package is on the way', id: 'Paket Anda sedang dalam perjalanan' },
        date: 'Dec 13, 2024',
        time: '8:20 AM',
        completed: true
      },
      {
        status: 'delivered',
        title: { en: 'Delivered', id: 'Diterima' },
        description: { en: 'Package delivered successfully', id: 'Paket berhasil diterima' },
        date: null,
        time: null,
        completed: false
      }
    ]
  }
};

const TrackOrder = () => {
  const { isDark } = useTheme();
  const [language, setLanguage] = useState('en');
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const [trackingResult, setTrackingResult] = useState(null);
  const [error, setError] = useState(null);
  const resultsRef = useRef(null);

  const t = content[language];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'id' : 'en');
  };

  const handleTrackOrder = async (e) => {
    e.preventDefault();
    setIsTracking(true);
    setError(null);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    const result = mockTrackingData[orderNumber];
    if (result) {
      setTrackingResult(result);
      // Smooth scroll to results
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 500);
    } else {
      setError('order_not_found');
    }

    setIsTracking(false);
  };

  const getStatusIcon = (status, completed) => {
    if (!completed) return <Clock className="text-gray-400 w-6 h-6" />;

    switch (status) {
      case 'ordered':
        return <Package className="text-blue-500 w-6 h-6" />;
      case 'processing':
        return <Clock className="text-orange-500 w-6 h-6" />;
      case 'shipped':
        return <Truck className="text-purple-500 w-6 h-6" />;
      case 'in_transit':
        return <Truck className="text-green-500 w-6 h-6" />;
      case 'delivered':
        return <CheckCircle className="text-green-500 w-6 h-6" />;
      default:
        return <Package className="text-gray-500 w-6 h-6" />;
    }
  };

  const getStatusColor = (status, completed) => {
    if (!completed) return 'text-gray-400';

    switch (status) {
      case 'ordered':
        return 'text-blue-600';
      case 'processing':
        return 'text-orange-600';
      case 'shipped':
        return 'text-purple-600';
      case 'in_transit':
        return 'text-green-600';
      case 'delivered':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const getProgressPercentage = () => {
    if (!trackingResult) return 0;
    const completedSteps = trackingResult.trackingSteps.filter(step => step.completed).length;
    return (completedSteps / trackingResult.trackingSteps.length) * 100;
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="min-h-screen bg-gradient-to-br from-black via-red-900/20 to-black dark:from-black dark:via-red-900/30 dark:to-black relative overflow-hidden"
    >
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-red-500/20 rounded-full"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* MAMZ Logo Watermark */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 opacity-5 pointer-events-none">
        <motion.h1
          className="text-8xl md:text-9xl font-black text-white"
          animate={{
            textShadow: [
              "0 0 20px rgba(255, 0, 0, 0.5)",
              "0 0 40px rgba(255, 0, 0, 0.8)",
              "0 0 20px rgba(255, 0, 0, 0.5)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          MAMZ
        </motion.h1>
      </div>

      {/* Language Toggle */}
      <motion.button
        onClick={toggleLanguage}
        className="absolute top-6 right-6 z-10 bg-red-500/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-red-500/30 transition-colors flex items-center gap-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Globe size={16} />
        {t.language}
      </motion.button>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="mb-6"
          >
            <Sparkles className="inline-block text-red-500 mb-4" size={48} />
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-black text-white mb-6"
            style={{
              textShadow: "0 0 30px rgba(255, 0, 0, 0.5)",
              background: "linear-gradient(45deg, #ffffff, #ff0000, #ffffff)",
              backgroundSize: "200% 200%",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "gradientShift 3s ease-in-out infinite"
            }}
          >
            {t.title}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-300 mb-8"
          >
            {t.subtitle}
          </motion.p>
        </motion.div>

        {/* Tracking Form */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-md mx-auto mb-16"
        >
          <motion.form
            onSubmit={handleTrackOrder}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-red-500/20"
            variants={itemVariants}
          >
            <div className="space-y-6">
              <motion.div variants={itemVariants}>
                <label htmlFor="orderNumber" className="block text-sm font-semibold text-white mb-2">
                  {t.orderNumber} *
                </label>
                <motion.input
                  type="text"
                  id="orderNumber"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  className="w-full px-4 py-3 bg-white/20 border border-red-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  placeholder={t.orderNumberPlaceholder}
                  required
                  whileFocus={{ scale: 1.02 }}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
                  {t.email} *
                </label>
                <motion.input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white/20 border border-red-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  placeholder={t.emailPlaceholder}
                  required
                  whileFocus={{ scale: 1.02 }}
                />
              </motion.div>

              <motion.button
                type="submit"
                disabled={isTracking}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:from-gray-500 disabled:to-gray-600 text-white font-bold py-4 px-6 rounded-lg transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-red-500/25"
              >
                {isTracking ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    {t.tracking}
                  </>
                ) : (
                  <>
                    <Search size={20} />
                    {t.trackButton}
                  </>
                )}
              </motion.button>
            </div>
          </motion.form>
        </motion.div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-md mx-auto mb-8"
            >
              <div className="bg-red-500/20 backdrop-blur-lg border border-red-500/30 rounded-lg p-6 text-center">
                <h3 className="text-xl font-bold text-white mb-2">{t.orderNotFound}</h3>
                <p className="text-gray-300 mb-4">{t.orderNotFoundDesc}</p>
                <button
                  onClick={() => setError(null)}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  {t.tryAgain}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tracking Results */}
        <AnimatePresence>
          {trackingResult && (
            <motion.div
              ref={resultsRef}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="max-w-4xl mx-auto"
            >
              {/* Order Summary */}
              <motion.div
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8 border border-red-500/20"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">{t.orderSummary}</h2>
                    <p className="text-gray-300">#{trackingResult.orderNumber}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                      trackingResult.status === 'delivered' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                      trackingResult.status === 'in_transit' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                      'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                    }`}>
                      {trackingResult.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <MapPin size={18} />
                  <span>{t.estimatedDelivery}: {trackingResult.estimatedDelivery}</span>
                </div>
              </motion.div>

              {/* Progress Bar */}
              <motion.div
                className="mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-red-500/20">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-white">{t.trackingTimeline}</h3>
                    <span className="text-sm text-gray-300">{Math.round(getProgressPercentage())}% Complete</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${getProgressPercentage()}%` }}
                      transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
                      style={{
                        boxShadow: "0 0 20px rgba(255, 0, 0, 0.5)"
                      }}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Timeline */}
              <motion.div
                className="space-y-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {trackingResult.trackingSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-red-500/20"
                    whileHover={{ scale: 1.02, borderColor: "rgba(255, 0, 0, 0.4)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <div className="flex gap-6">
                      <div className="flex-shrink-0 mt-1">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className={`p-3 rounded-full ${
                            step.completed ? 'bg-red-500/20 border-2 border-red-500/50' : 'bg-gray-600/20 border-2 border-gray-600/50'
                          }`}
                        >
                          {getStatusIcon(step.status, step.completed)}
                        </motion.div>
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className={`text-lg font-bold ${getStatusColor(step.status, step.completed)}`}>
                            {typeof step.title === 'object' ? step.title[language] : step.title}
                          </h4>
                          {step.completed && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.5 + index * 0.1 }}
                            >
                              <CheckCircle className="text-green-500" size={20} />
                            </motion.div>
                          )}
                        </div>
                        <p className="text-gray-300 mb-2">
                          {typeof step.description === 'object' ? step.description[language] : step.description}
                        </p>
                        {step.date && (
                          <p className="text-sm text-gray-400 flex items-center gap-2">
                            <Clock size={14} />
                            {step.date} at {step.time}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Actions */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                <motion.button
                  onClick={() => {
                    setTrackingResult(null);
                    setOrderNumber('');
                    setEmail('');
                  }}
                  className="flex-1 bg-white/10 backdrop-blur-lg border border-red-500/30 hover:border-red-500/50 text-white font-semibold py-4 px-6 rounded-lg transition-all flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Search size={18} />
                  {t.trackAnother}
                </motion.button>
                <motion.button
                  onClick={() => {
                    // Could navigate to contact support
                    window.location.href = '/support';
                  }}
                  className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-4 px-6 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-red-500/25"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t.needHelp}
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Custom CSS for gradient animation */}
      <style jsx>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </motion.div>
  );
};

export default TrackOrder;
