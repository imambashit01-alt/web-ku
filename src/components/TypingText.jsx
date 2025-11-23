import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TypingText = ({
  text = "Terima kasih telah berbelanja di MAMZ.",
  speed = 60,
  className = ""
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showCaret, setShowCaret] = useState(true);

  useEffect(() => {
    let timeout;
    let index = 0;

    const type = () => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1));
        index++;
        timeout = setTimeout(type, speed);
      } else {
        setIsTyping(false);
      }
    };

    type();

    return () => clearTimeout(timeout);
  }, [text, speed]);

  useEffect(() => {
    if (!isTyping) return;

    const caretInterval = setInterval(() => {
      setShowCaret(prev => !prev);
    }, 500);

    return () => clearInterval(caretInterval);
  }, [isTyping]);

  return (
    <div className={`font-medium text-gray-600 dark:text-gray-300 ${className}`}>
      {displayText}
      {isTyping && (
        <motion.span
          animate={{ opacity: showCaret ? 1 : 0 }}
          className="inline-block w-0.5 h-6 bg-gray-600 dark:bg-gray-300 ml-1"
        />
      )}
    </div>
  );
};

export default TypingText;
