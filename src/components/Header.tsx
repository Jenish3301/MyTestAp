// React and React Native imports
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Safe Area and Theme imports
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const { isDarkMode, toggleTheme, colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.header,
        {
          backgroundColor: colors.card,
          borderBottomColor: colors.border,
          paddingTop: insets.top,
        },
      ]}
    >
      <View>
        <Text style={[styles.kicker, { color: colors.primary }]}>MyTestAp</Text>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.themeButton,
          {
            borderColor: colors.border,
            backgroundColor: colors.primarySoft,
          },
        ]}
        onPress={toggleTheme}
      >
        <Text style={[styles.themeText, { color: colors.primary }]}>
          {isDarkMode ? '☀️' : '🌙'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderBottomWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  kicker: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: 2,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
  },
  themeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  themeText: {
    fontSize: 20,
  },
});

export default Header;
