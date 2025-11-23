import { useEffect, useState } from 'react';

interface ScrollTransform {
  scrollY: number;
  scrollYProgress: number;
  headerOpacity: number;
  headerBackground: string;
  heroScale: number;
  heroTranslateY: number;
  captionOpacity: number;
  captionTranslateY: number;
}

export const useScrollTransform = (): ScrollTransform => {
  const [scrollY, setScrollY] = useState(0);
  const [scrollYProgress, setScrollYProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const maxScroll = window.innerHeight; // 100vh for hero section
      const progress = Math.min(currentScrollY / maxScroll, 1);

      setScrollY(currentScrollY);
      setScrollYProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Header transforms: transparent glass → solid on scroll
  const headerOpacity = Math.min(scrollY / 100, 1); // Fade in over 100px
  const headerBackground = scrollY > 50
    ? 'rgba(255, 255, 255, 0.95)' // Solid white with slight transparency
    : 'rgba(255, 255, 255, 0.1)'; // Glass effect

  // Hero transforms: scale 1 → 1.08 during first 50vh scroll
  const heroScale = 1 + (scrollYProgress * 0.08);

  // Caption animations: translate upward and fade out as user scrolls
  const heroTranslateY = scrollYProgress * -50; // Move up by 50px over full progress
  const captionOpacity = Math.max(1 - scrollYProgress * 2, 0); // Fade out faster
  const captionTranslateY = scrollYProgress * -30; // Subtle upward movement

  return {
    scrollY,
    scrollYProgress,
    headerOpacity,
    headerBackground,
    heroScale,
    heroTranslateY,
    captionOpacity,
    captionTranslateY,
  };
};
