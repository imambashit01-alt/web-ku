import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import heroImage from '../../textures/dreamina-2025-11-05-4038-Edit Image 1, add the text _Urban Elegan....jpeg';

const EarthBackground = () => {
  const { isDark } = useTheme();

  return (
    <div
      className="fixed inset-0 -z-10 bg-cover bg-center"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundColor: isDark ? '#000000' : '#ffffff', // Fallback color
      }}
    />
  );
};

export default EarthBackground;
