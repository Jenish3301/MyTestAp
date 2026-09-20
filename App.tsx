// React and React Native imports
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';

// Third-party imports
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Context and Navigation imports
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { RootNavigator } from './src/navigation/RootNavigator';
import { SplashScreen } from './src/screens/Splash';

function AppContent() {
  const { isDarkMode } = useTheme();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Simulate splash screen display
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
        <RootNavigator />
      </NavigationContainer>
    </>
  );
}

function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;
