import { motion } from 'framer-motion';
import { useState } from 'react';

const CardPreview = ({ cardData, isFlipped }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const getCardType = (number) => {
    if (!number) return 'unknown';
    const num = number.replace(/\s/g, '');

    if (/^4/.test(num)) return 'visa';
    if (/^5[1-5]/.test(num) || /^2[2-7]/.test(num)) return 'mastercard';
    if (/^3[47]/.test(num)) return 'amex';
    if (/^6(?:011|5)/.test(num)) return 'discover';

    return 'unknown';
  };

  const cardType = getCardType(cardData.cardNumber);

  const cardTypeIcons = {
    visa: '💳',
    mastercard: '💳',
    amex: '💳',
    discover: '💳',
    unknown: '💳'
  };

  const cardColors = {
    visa: 'from-blue-500 to-blue-600',
    mastercard: 'from-red-500 to-orange-500',
    amex: 'from-green-500 to-teal-500',
    discover: 'from-purple-500 to-pink-500',
    unknown: 'from-gray-500 to-gray-600'
  };

  return (
    <div className="relative w-80 h-48 mx-auto mb-6">
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 300 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of Card */}
        <motion.div
          className={`absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br ${cardColors[cardType]} p-6 shadow-2xl border border-white/20`}
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="flex justify-between items-start mb-8">
            <div className="text-white/80 text-sm font-medium">MAMZ</div>
            <div className="text-2xl">{cardTypeIcons[cardType]}</div>
          </div>

          <div className="mb-6">
            <div className="text-white text-xl font-mono tracking-wider mb-2">
              {cardData.cardNumber || '•••• •••• •••• ••••'}
            </div>
          </div>

          <div className="flex justify-between items-end">
            <div>
              <div className="text-white/60 text-xs uppercase tracking-wide mb-1">Card Holder</div>
              <div className="text-white font-semibold">
                {cardData.cardholderName || 'YOUR NAME'}
              </div>
            </div>
            <div className="text-right">
              <div className="text-white/60 text-xs uppercase tracking-wide mb-1">Expires</div>
              <div className="text-white font-semibold">
                {cardData.expiryDate || 'MM/YY'}
              </div>
            </div>
          </div>

          {/* Chip */}
          <div className="absolute top-20 left-6 w-12 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg shadow-inner">
            <div className="w-full h-full bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-lg flex items-center justify-center">
              <div className="w-6 h-4 bg-gradient-to-br from-gray-300 to-gray-500 rounded"></div>
            </div>
          </div>
        </motion.div>

        {/* Back of Card */}
        <motion.div
          className={`absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br ${cardColors[cardType]} p-6 shadow-2xl border border-white/20`}
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}
        >
          <div className="w-full h-12 bg-gray-800 mt-4 mb-6 rounded"></div>

          <div className="mb-6">
            <div className="bg-white/90 h-8 rounded flex items-center justify-end px-4">
              <div className="text-gray-800 font-mono text-sm">
                {cardData.cvv ? '•••' : '•••'}
              </div>
            </div>
            <div className="text-white/60 text-xs text-center mt-2">
              Security Code
            </div>
          </div>

          <div className="text-white/80 text-xs text-center">
            This card is secured by MAMZ's advanced encryption
          </div>
        </motion.div>
      </motion.div>

      {/* Card Shine Effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, transparent 100%)',
          transform: 'translateX(-100%)',
        }}
        animate={{
          transform: ['translateX(-100%)', 'translateX(100%)'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 5,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default CardPreview;
