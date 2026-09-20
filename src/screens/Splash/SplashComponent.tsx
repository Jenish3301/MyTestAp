// React and React Native imports
import React from 'react';
import { Text, View } from 'react-native';

// Styles import
import { styles } from './Styles';

interface SplashComponentProps {
  insets: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

const SplashComponent = ({ insets }: SplashComponentProps) => {
  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}
    >
      <View style={styles.logoContainer}>
        <View style={styles.logoOuter}>
          <View style={styles.logoInner}>
            <Text style={styles.logoMark}>MT</Text>
          </View>
          <View style={styles.accentOne} />
          <View style={styles.accentTwo} />
        </View>
        <Text style={styles.title}>MyTestAp</Text>
        <Text style={styles.subtitle}>React Native Practical Task</Text>
      </View>
    </View>
  );
};

export default SplashComponent;
