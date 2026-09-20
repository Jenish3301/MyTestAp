// React and imports
import React from 'react';

// Safe Area imports
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Component import
import SplashComponent from './SplashComponent';

const SplashController = () => {
  const insets = useSafeAreaInsets();
  return <SplashComponent insets={insets} />;
};

export default SplashController;
