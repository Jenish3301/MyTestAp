// React and React Native imports
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Safe Area imports
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Splash = () => {
  const insets = useSafeAreaInsets();

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007AFF',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoOuter: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255,255,255,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 22,
  },
  logoInner: {
    width: 108,
    height: 108,
    borderRadius: 54,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  logoMark: {
    color: '#007AFF',
    fontSize: 34,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  accentOne: {
    position: 'absolute',
    top: 18,
    right: 26,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#ffffff',
    opacity: 0.92,
  },
  accentTwo: {
    position: 'absolute',
    bottom: 22,
    left: 28,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#BFD9FF',
    opacity: 0.95,
  },
  title: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.9)',
    marginTop: 8,
    fontSize: 14,
    letterSpacing: 0.6,
  },
});

export default Splash;
