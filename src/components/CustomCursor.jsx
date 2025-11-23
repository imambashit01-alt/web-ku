import React, { useEffect, useState, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const CustomCursor = () => {
  const { isDark } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isClickingOnInteractive, setIsClickingOnInteractive] = useState(false);
  const cursorRef = useRef(null);
  const animationRef = useRef(null);

  // Track mouse position with requestAnimationFrame for smooth performance
  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const animateCursor = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${mousePosition.x - 10}px, ${mousePosition.y - 10}px)`;
      }
      animationRef.current = requestAnimationFrame(animateCursor);
    };

    document.addEventListener('mousemove', updateMousePosition);
    animateCursor();

    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mousePosition]);

  // Handle hover states for interactive elements
  useEffect(() => {
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);
    const handleMouseDown = () => setIsClickingOnInteractive(true);

    const interactiveElements = document.querySelectorAll(
      'button, a, input, textarea, select, [role="button"], [tabindex]:not([tabindex="-1"])'
    );

    interactiveElements.forEach((element) => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
      element.addEventListener('mousedown', handleMouseDown);
    });

    return () => {
      interactiveElements.forEach((element) => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
        element.removeEventListener('mousedown', handleMouseDown);
      });
    };
  }, []);

  // Handle click animations
  useEffect(() => {
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => {
      setIsClicking(false);
      setIsClickingOnInteractive(false);
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Fallback for touch devices - hide cursor
  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice && cursorRef.current) {
      cursorRef.current.style.display = 'none';
    }
  }, []);

  const cursorSize = isHovering ? 20 : isClicking ? 15 : 10;
  const cursorColor = isDark ? '#ffffff' : '#000000';

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[100] transition-all duration-150 ease-out"
      style={{
        width: `${cursorSize}px`,
        height: `${cursorSize}px`,
        backgroundColor: cursorColor,
        borderRadius: '50%',
        mixBlendMode: isDark ? 'difference' : 'normal',
        boxShadow: isHovering
          ? `0 0 ${cursorSize * 2}px rgba(${isDark ? '255, 255, 255' : '0, 0, 0'}, 0.3)`
          : 'none',
        transform: 'translate(-50%, -50%)',
        opacity: isClickingOnInteractive ? 0 : 1,
      }}
    />
  );
};

export default CustomCursor;
