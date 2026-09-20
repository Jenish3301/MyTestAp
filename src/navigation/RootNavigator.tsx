// React and React Native imports
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Navigation imports
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Theme imports
import { useTheme } from '../context/ThemeContext';

// Screen imports
import { HomeScreen } from '../screens/Home';
import { ListingScreen } from '../screens/Listing';
import { SettingsScreen } from '../screens/Settings';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabIcon = ({
  label,
  focused,
  color,
}: {
  label: string;
  focused: boolean;
  color: string;
}) => {
  return (
    <View
      style={[
        styles.iconWrap,
        {
          backgroundColor: focused ? `${color}18` : 'transparent',
          borderColor: focused ? color : 'transparent',
        },
      ]}
    >
      <Text style={[styles.iconText, { color }]}>{label}</Text>
    </View>
  );
};

const getIconLabel = (routeName: string) => {
  switch (routeName) {
    case 'Home':
      return '⌂';
    case 'Listing':
      return '≣';
    case 'Settings':
      return '⚙';
    default:
      return '•';
  }
};

const BottomTabNavigator: React.FC = () => {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color }) => (
          <TabIcon
            label={getIconLabel(route.name)}
            focused={focused}
            color={color}
          />
        ),
        tabBarLabel: route.name,
        tabBarLabelPosition: 'below-icon',
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text + '66',
        tabBarStyle: {
          backgroundColor: colors.cardElevated,
          borderTopColor: colors.primarySoft,
          borderTopWidth: 1,
          height: 74,
          paddingTop: 10,
          paddingBottom: 10,
          marginHorizontal: 16,
          marginBottom: 12,
          borderRadius: 22,
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          elevation: 16,
          shadowColor: '#000',
          shadowOpacity: 0.12,
          shadowRadius: 20,
          shadowOffset: { width: 0, height: 10 },
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        tabBarItemStyle: {
          paddingVertical: 2,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Listing" component={ListingScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export const RootNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Main" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  iconText: {
    fontSize: 18,
    fontWeight: '800',
  },
});
