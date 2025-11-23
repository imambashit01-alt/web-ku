import { motion } from 'framer-motion';

const SuccessIcon = ({ size = 120, className = "" }) => {
  return (
    <div className={`relative ${className}`}>
      {/* Outer circle with pulse animation */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="absolute inset-0 rounded-full bg-green-500/20"
        style={{ width: size, height: size }}
      />

      {/* Middle circle */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        className="absolute inset-2 rounded-full bg-green-500/40"
      />

      {/* Inner circle with checkmark */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        className="absolute inset-4 rounded-full bg-green-500 flex items-center justify-center"
      >
        <motion.svg
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeInOut" }}
          width={size * 0.4}
          height={size * 0.4}
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.path
            d="M20 6L9 17L4 12"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeInOut" }}
          />
        </motion.svg>
      </motion.div>

      {/* Ripple effect */}
      <motion.div
        initial={{ scale: 1, opacity: 0.6 }}
        animate={{ scale: 2, opacity: 0 }}
        transition={{
          duration: 1.5,
          delay: 0.8,
          repeat: Infinity,
          repeatDelay: 1,
          ease: "easeOut"
        }}
        className="absolute inset-0 rounded-full border-2 border-green-500/30"
        style={{ width: size, height: size }}
      />
    </div>
  );
};

export default SuccessIcon;
