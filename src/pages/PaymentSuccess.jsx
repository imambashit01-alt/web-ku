import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import SuccessIcon from '../components/SuccessIcon';
import TypingText from '../components/TypingText';
import confetti from 'canvas-confetti';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(false);

  // Detect payment method from URL
  const paymentMethod = searchParams.get('payment') || 'card';

  const paymentLabels = {
    card: 'Payment via Credit/Debit Card',
    paypal: 'Payment via PayPal',
    apple: 'Payment via Apple Pay',
    google: 'Payment via Google Pay'
  };

  useEffect(() => {
    // Trigger confetti effect
    const triggerConfetti = () => {
      const duration = 3000;
      const animationEnd = Date.now() + duration;

      const randomInRange = (min, max) => Math.random() * (max - min) + min;

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          clearInterval(interval);
          return;
        }

        const particleCount = 50 * (timeLeft / duration);

        confetti({
          particleCount,
          startVelocity: randomInRange(50, 100),
          spread: randomInRange(50, 70),
          origin: {
            x: randomInRange(0.1, 0.3),
            y: Math.random() - 0.2
          }
        });

        confetti({
          particleCount,
          startVelocity: randomInRange(50, 100),
          spread: randomInRange(50, 70),
          origin: {
            x: randomInRange(0.7, 0.9),
            y: Math.random() - 0.2
          }
        });
      }, 250);
    };

    // Delay confetti to sync with animations
    const timer = setTimeout(() => {
      triggerConfetti();
      setShowConfetti(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleViewOrders = () => {
    navigate('/orders');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-md w-full mx-auto text-center"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, type: "spring", bounce: 0.4 }}
          className="mb-8 flex justify-center"
        >
          <SuccessIcon size={120} />
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-6"
        >
          {/* Header */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Pembayaran Berhasil!
            </h1>
            <h2 className="text-xl md:text-2xl font-semibold text-green-600 dark:text-green-400 mb-2">
              Payment Successful!
            </h2>

            {/* Typing Text */}
            <TypingText
              text="Terima kasih telah berbelanja di MAMZ."
              speed={80}
              className="text-lg mb-4"
            />

            {/* Payment Method */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.5 }}
              className="text-sm text-gray-600 dark:text-gray-400"
            >
              Metode Pembayaran: {paymentLabels[paymentMethod] || paymentLabels.card}
            </motion.p>
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.8 }}
            className="space-y-4"
          >
            {/* Primary Button */}
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleViewOrders}
              className="w-full bg-black dark:bg-white text-white dark:text-black font-semibold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 group"
            >
              <span>Cek Pesananmu</span>
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="text-xl"
              >
                →
              </motion.span>
            </motion.button>

            {/* Secondary Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGoHome}
              className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-600"
            >
              Kembali ke Beranda
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
