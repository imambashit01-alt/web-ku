import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import ThemeSkySwitcher from './components/ThemeSkySwitcher';

function AppTest() {
  return (
    <ThemeProvider>
      <ThemeSkySwitcher />
    </ThemeProvider>
  );
}

export default AppTest;
