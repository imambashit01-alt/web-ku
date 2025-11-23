import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const ThemeSkySwitcher = () => {
  const { isDark, toggleTheme } = useTheme();
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handleChange = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleToggle = () => {
    toggleTheme();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
    }
  };

  const skyVariants = {
    light: {
      background: 'linear-gradient(to bottom, #aee1f9, #fdf6e3, #ffe5b4)',
    },
    dark: {
      background: 'linear-gradient(to bottom, #0b132b, #1c2541, #3a506b)',
    },
  };

  const auroraVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: reducedMotion ? { duration: 0 } : { duration: 1.2, ease: 'easeInOut' },
    },
  };

  const cloudVariants = {
    animate: {
      x: [0, 50, 0],
      transition: reducedMotion ? { duration: 0 } : { duration: 8, repeat: Infinity, ease: 'linear' },
    },
  };

  const starVariants = {
    hidden: { opacity: 0 },
    visible: (i) => ({
      opacity: [0, 1, 0.5, 1],
      transition: reducedMotion
        ? { duration: 0 }
        : { delay: i * 0.1, duration: 2, repeat: Infinity, repeatType: 'reverse' },
    }),
  };

  const particleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: [0, 0.3, 0],
      transition: reducedMotion ? { duration: 0 } : { duration: 3, repeat: Infinity, repeatType: 'loop' },
    },
  };

  const iconVariants = {
    hover: reducedMotion ? {} : { rotate: [0, -5, 5, 0], transition: { duration: 0.5 } },
  };

  const buttonVariants = {
    tap: { scale: 0.95 },
    hover: { scale: 1.1 },
  };

  const glowVariants = {
    initial: { scale: 1, opacity: 0.7 },
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.7, 1, 0.7],
      transition: reducedMotion ? { duration: 0 } : { duration: 0.5 },
    },
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Sky Background */}
      <motion.div
        className="absolute inset-0"
        variants={skyVariants}
        animate={isDark ? 'dark' : 'light'}
        transition={reducedMotion ? { duration: 0 } : { duration: 1.2, ease: 'easeInOut' }}
      >
        {/* Aurora Layer */}
        <AnimatePresence>
          {isDark && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#3b82f6]/30 to-[#9333ea]/25"
              variants={auroraVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            />
          )}
        </AnimatePresence>

        {/* Clouds Layer */}
        <AnimatePresence>
          {!isDark && (
            <>
              <motion.div
                className="absolute top-10 left-10 w-32 h-16 bg-white/60 rounded-full blur-sm"
                variants={cloudVariants}
                animate="animate"
              />
              <motion.div
                className="absolute top-20 right-20 w-40 h-20 bg-white/50 rounded-full blur-sm"
                variants={cloudVariants}
                animate="animate"
                transition={reducedMotion ? { duration: 0 } : { duration: 10, repeat: Infinity, ease: 'linear' }}
              />
            </>
          )}
        </AnimatePresence>

        {/* Stars Layer */}
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
            </>
          )}
        </AnimatePresence>

        {/* Particles Layer */}
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

        {/* Ambient Light Bloom */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: isDark
              ? 'radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.1) 0%, transparent 50%)'
              : 'radial-gradient(circle at 50% 20%, rgba(250, 204, 21, 0.2) 0%, transparent 50%)',
          }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={reducedMotion ? { duration: 0 } : { duration: 4, repeat: Infinity }}
        />
      </motion.div>

      {/* Toggle Button */}
      <motion.button
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        className="absolute top-8 right-8 w-12 h-12 rounded-full backdrop-blur-md bg-white/10 border border-white/20 shadow-lg cursor-pointer flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white/50"
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        aria-label={`Toggle to ${isDark ? 'light' : 'dark'} theme`}
        transition={reducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 300, damping: 20 }}
      >
        {/* Glow Ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(56, 189, 248, 0.4) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(250, 204, 21, 0.4) 0%, transparent 70%)',
          }}
          variants={glowVariants}
          initial="initial"
          animate="animate"
        />

        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.6 }}
              variants={iconVariants}
              whileHover="hover"
              className="relative z-10"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="#e0f2fe" />
                <circle cx="15" cy="9" r="6" fill="#0f172a" />
              </svg>
              <div className="absolute inset-0 blur-md opacity-70 bg-[#38bdf8] rounded-full" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.6 }}
              variants={iconVariants}
              whileHover="hover"
              className="relative z-10"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="#facc15" />
                <line x1="12" y1="2" x2="12" y2="6" stroke="#facc15" strokeWidth="2" />
                <line x1="12" y1="18" x2="12" y2="22" stroke="#facc15" strokeWidth="2" />
                <line x1="2" y1="12" x2="6" y2="12" stroke="#facc15" strokeWidth="2" />
                <line x1="18" y1="12" x2="22" y2="12" stroke="#facc15" strokeWidth="2" />
                <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" stroke="#facc15" strokeWidth="2" />
                <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" stroke="#facc15" strokeWidth="2" />
                <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" stroke="#facc15" strokeWidth="2" />
                <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" stroke="#facc15" strokeWidth="2" />
              </svg>
              <div className="absolute inset-0 blur-md opacity-70 bg-[#facc15] rounded-full" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default ThemeSkySwitcher;
