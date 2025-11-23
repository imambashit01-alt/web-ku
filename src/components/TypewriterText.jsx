import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TypewriterText = ({
  text = "ww.mamz.com",
  speed = 60,
  loop = true,
  pause = 3000,
  className = ""
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showCaret, setShowCaret] = useState(true);

  useEffect(() => {
    let timeout;
    let index = 0;
    let isDeleting = false;

    const type = () => {
      if (!isDeleting) {
        setDisplayText(text.slice(0, index + 1));
        index++;
        if (index === text.length) {
          if (loop) {
            timeout = setTimeout(() => {
              isDeleting = true;
              setIsTyping(false);
            }, pause);
          } else {
            setIsTyping(false);
          }
        } else {
          timeout = setTimeout(type, speed);
        }
      } else {
        setDisplayText(text.slice(0, index));
        index--;
        if (index === 0) {
          isDeleting = false;
          setIsTyping(true);
          timeout = setTimeout(type, speed);
        } else {
          timeout = setTimeout(type, speed / 2);
        }
      }
    };

    type();

    return () => clearTimeout(timeout);
  }, [text, speed, loop, pause]);

  useEffect(() => {
    if (!isTyping) return;

    const caretInterval = setInterval(() => {
      setShowCaret(prev => !prev);
    }, 500);

    return () => clearInterval(caretInterval);
  }, [isTyping]);

  return (
    <div className={`font-mono text-lg font-semibold text-gray-900 dark:text-white ${className}`}>
      {displayText}
      {isTyping && (
        <motion.span
          animate={{ opacity: showCaret ? 1 : 0 }}
          className="inline-block w-1 h-8 bg-gray-900 dark:bg-white ml-1"
        />
      )}
    </div>
  );
};

export default TypewriterText;
