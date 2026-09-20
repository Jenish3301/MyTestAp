// React and React Native imports
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';

export interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  colors: {
    background: string;
    backgroundSoft: string;
    text: string;
    textMuted: string;
    border: string;
    primary: string;
    primarySoft: string;
    secondary: string;
    card: string;
    cardElevated: string;
    success: string;
    danger: string;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');

  useEffect(() => {
    setIsDarkMode(systemColorScheme === 'dark');
  }, [systemColorScheme]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const colors = {
    background: isDarkMode ? '#0F172A' : '#F7F9FC',
    backgroundSoft: isDarkMode ? '#111C33' : '#EEF4FF',
    text: isDarkMode ? '#F8FAFC' : '#0F172A',
    textMuted: isDarkMode ? '#94A3B8' : '#64748B',
    border: isDarkMode ? '#22314F' : '#DCE6F5',
    primary: '#2563EB',
    primarySoft: isDarkMode
      ? 'rgba(37, 99, 235, 0.18)'
      : 'rgba(37, 99, 235, 0.10)',
    secondary: isDarkMode ? '#1E293B' : '#EDF4FF',
    card: isDarkMode ? '#111C33' : '#FFFFFF',
    cardElevated: isDarkMode ? '#16213A' : '#FFFFFF',
    success: '#22C55E',
    danger: '#EF4444',
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
