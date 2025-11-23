import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const ThemeCinematicSwitcher = () => {
  const { isDark, toggleTheme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    setIsAnimating(true);
    toggleTheme();
    setTimeout(() => setIsAnimating(false), 1200);
  };

  // Aurora wave effect
  const auroraVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: "easeInOut" } },
  };

  // Stars animation
  const starVariants = {
    hidden: { opacity: 0 },
    visible: (i) => ({
      opacity: [0, 1, 0.5, 1],
      transition: { delay: i * 0.1, duration: 2, repeat: Infinity, repeatType: "reverse" },
    }),
  };

  // Particles for dark mode
  const particleVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: [0, 0.3, 0], transition: { duration: 3, repeat: Infinity, repeatType: "loop" } },
  };

  // Shooting star
  const shootingStarVariants = {
    hidden: { x: -100, y: -100, opacity: 0 },
    visible: {
      x: 400,
      y: 400,
      opacity: [0, 1, 0],
      transition: { duration: 2, ease: "easeIn", repeat: Infinity, repeatDelay: 5 },
    },
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Sky Background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: isDark
            ? 'linear-gradient(to bottom, #0f172a, #1e293b)'
            : 'linear-gradient(to bottom, #87ceeb, #fdf6e3)',
        }}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
      >
        {/* Aurora Overlay */}
        <AnimatePresence>
          {isAnimating && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#3b82f6]/30 to-[#9333ea]/20"
              variants={auroraVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            />
          )}
        </AnimatePresence>

        {/* Clouds for Light Mode */}
        <AnimatePresence>
          {!isDark && (
            <motion.div
              className="absolute top-10 left-10 w-32 h-16 bg-white/60 rounded-full"
              animate={{ x: [0, 20, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {!isDark && (
            <motion.div
              className="absolute top-20 right-20 w-40 h-20 bg-white/50 rounded-full"
              animate={{ x: [0, -30, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
          )}
        </AnimatePresence>

        {/* Stars for Dark Mode */}
        <AnimatePresence>
          {isDark && (
            <>
              {Array.from({ length: 20 }, (_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    top: `${Math.random() * 50}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                  custom={i}
                  variants={starVariants}
                  initial="hidden"
                  animate="visible"
                />
              ))}
              {/* Shooting Star */}
              <motion.div
                className="absolute w-2 h-0.5 bg-white rounded-full"
                style={{ top: '20%', left: '10%' }}
                variants={shootingStarVariants}
                animate="visible"
              />
            </>
          )}
        </AnimatePresence>

        {/* Particles for Dark Mode */}
        <AnimatePresence>
          {isDark && (
            <>
              {Array.from({ length: 10 }, (_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-0.5 h-0.5 bg-white/50 rounded-full"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                  variants={particleVariants}
                  animate="visible"
                />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Light Rays for Light Mode */}
        <AnimatePresence>
          {!isDark && (
            <motion.div
              className="absolute inset-0"
              style={{ background: 'radial-gradient(circle at 50% 20%, rgba(250, 204, 21, 0.2) 0%, transparent 50%)' }}
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Toggle Button */}
      <motion.button
        onClick={handleToggle}
        className={`absolute top-8 right-8 w-12 h-12 rounded-full border-2 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          isDark
            ? 'border-[#38bdf8] shadow-lg shadow-[#38bdf8]/50'
            : 'border-[#facc15] shadow-lg shadow-[#facc15]/50'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="w-6 h-6 rounded-full relative"
              style={{ background: 'linear-gradient(135deg, #38bdf8, #1e40af)' }}
            >
              <div className="absolute inset-1 bg-slate-900 rounded-full"></div>
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="w-6 h-6 rounded-full relative"
              style={{ background: '#facc15', boxShadow: '0 0 10px #facc15' }}
            >
              {/* Sun Rays */}
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-0.5 h-2 bg-[#facc15]"></div>
              <div className="absolute top-1/2 -right-1 transform -translate-y-1/2 w-2 h-0.5 bg-[#facc15]"></div>
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0.5 h-2 bg-[#facc15]"></div>
              <div className="absolute top-1/2 -left-1 transform -translate-y-1/2 w-2 h-0.5 bg-[#facc15]"></div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default ThemeCinematicSwitcher;
