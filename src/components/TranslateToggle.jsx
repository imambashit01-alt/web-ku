import { motion } from "framer-motion";
import { useTranslate } from "../context/TranslateContext";

const TranslateToggle = () => {
  const { currentLanguage, toggleLanguageSmooth, isIndonesian, isTransitioning } = useTranslate();

  return (
    <motion.button
      onClick={toggleLanguageSmooth}
      className="relative flex items-center justify-center w-16 h-8 bg-gray-200 dark:bg-gray-700 rounded-full p-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={false}
      animate={{
        backgroundColor: isIndonesian ? "#DC2626" : "#2563EB", // Red for ID, Blue for EN
        opacity: isTransitioning ? 0.8 : 1
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Toggle Ball */}
      <motion.div
        className="absolute w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center text-xs font-bold"
        animate={{
          x: isIndonesian ? 8 : -8,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30
        }}
      >
        <motion.span
          key={currentLanguage}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.2 }}
        >
          {isIndonesian ? "🇮🇩" : "🇬🇧"}
        </motion.span>
      </motion.div>

      {/* Background Text */}
      <div className="flex w-full justify-between px-1 text-xs font-medium text-white">
        <span className={`transition-opacity duration-300 ${isIndonesian ? 'opacity-0' : 'opacity-100'}`}>
          EN
        </span>
        <span className={`transition-opacity duration-300 ${isIndonesian ? 'opacity-100' : 'opacity-0'}`}>
          ID
        </span>
      </div>
    </motion.button>
  );
};

export default TranslateToggle;
