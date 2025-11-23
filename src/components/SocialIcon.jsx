import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaInstagram, FaTiktok } from 'react-icons/fa';

const SocialIcon = ({
  type,
  onClick,
  disabled = false,
  className = ""
}) => {
  const getIcon = () => {
    switch (type) {
      case 'github':
        return <FaGithub className="w-5 h-5" />;
      case 'instagram':
        return <FaInstagram className="w-5 h-5" />;
      case 'tiktok':
        return <FaTiktok className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const getAriaLabel = () => {
    switch (type) {
      case 'github':
        return 'Sign in with GitHub';
      case 'instagram':
        return 'Sign in with Instagram';
      case 'tiktok':
        return 'Sign in with TikTok';
      default:
        return 'Social sign in';
    }
  };

  return (
    <motion.button
      whileHover={{
        scale: 1.12,
        y: -4,
        boxShadow: '0 10px 25px rgba(0,0,0,0.15)'
      }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={disabled}
      aria-label={getAriaLabel()}
      className={`
        w-11 h-11 rounded-full flex items-center justify-center
        bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
        text-gray-700 dark:text-gray-300
        hover:bg-gray-50 dark:hover:bg-gray-700
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-colors duration-200
        ${className}
      `}
      style={{
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}
    >
      {getIcon()}
    </motion.button>
  );
};

export default SocialIcon;
