// Navigation Types
export type RootStackParamList = {
  Main: undefined;
  Home: undefined;
  Listing: undefined;
  Settings: undefined;
};

export type TabParamList = {
  Home: undefined;
  Listing: undefined;
  Settings: undefined;
};

// Device Info Types
export interface DeviceInfo {
  osName: string;
  deviceId: string;
  manufacturer: string;
  model: string;
  systemVersion: string;
  appVersion: string;
  buildNumber: string;
}

// List Item Types
export interface ListItem {
  id: string;
  name: string;
  email: string;
  company: string;
  avatar: string;
}

// Form Types
export interface FormData {
  name: string;
  email: string;
  birthdate: Date;
  country: string;
}

// Theme Types
export interface ThemeColors {
  background: string;
  text: string;
  border: string;
  primary: string;
  secondary: string;
  card: string;
}

export interface PermissionStatus {
  status: 'granted' | 'denied' | 'blocked';
  message: string;
}
