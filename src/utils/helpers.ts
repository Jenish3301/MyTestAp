// React Native imports
import { Platform } from 'react-native';

// Third-party imports
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

export const requestPermissions = async (permissionType: 'photos' | 'camera') => {
  try {
    let permission;

    if (Platform.OS === 'android') {
      permission = permissionType === 'photos' 
        ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES 
        : PERMISSIONS.ANDROID.CAMERA;
    } else {
      permission = permissionType === 'photos' 
        ? PERMISSIONS.IOS.PHOTO_LIBRARY 
        : PERMISSIONS.IOS.CAMERA;
    }

    const status = await check(permission);

    if (status === RESULTS.DENIED) {
      const result = await request(permission);
      return result === RESULTS.GRANTED;
    }

    return status === RESULTS.GRANTED;
  } catch (error) {
    console.error('Permission request error:', error);
    return false;
  }
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const calculateAge = (birthdate: Date): number => {
  const today = new Date();
  let age = today.getFullYear() - birthdate.getFullYear();
  const monthDiff = today.getMonth() - birthdate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) {
    age--;
  }

  return age;
};

export const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return date.toLocaleDateString('en-US', options);
};
