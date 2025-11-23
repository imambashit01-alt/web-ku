import React from 'react';
import { motion } from 'framer-motion';

const SocialButton = ({
  icon: Icon,
  label,
  onClick,
  variant = 'default',
  disabled = false,
  className = ''
}) => {
  const baseClasses = "w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    google: "bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-blue-500",
    facebook: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    default: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseClasses} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {Icon && <Icon className="w-5 h-5" />}
      <span>{label}</span>
    </motion.button>
  );
};

export default SocialButton;
