// React and React Native imports
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';

// Third-party imports
import DeviceInfo from 'react-native-device-info';
import { launchImageLibrary } from 'react-native-image-picker';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Context and Component imports
import { useTheme } from '../../context/ThemeContext';
import HomeComponent from './HomeComponent';

interface DeviceDetails {
  osName: string;
  deviceId: string;
  manufacturer: string;
  model: string;
  systemVersion: string;
  appVersion: string;
  buildNumber: string;
}

const HomeController = () => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [deviceDetails, setDeviceDetails] = useState<DeviceDetails | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDeviceDetails();
  }, []);

  const fetchDeviceDetails = async () => {
    try {
      const [
        osName,
        deviceId,
        manufacturer,
        model,
        systemVersion,
        appVersion,
        buildNumber,
      ] = await Promise.all([
        DeviceInfo.getSystemName(),
        DeviceInfo.getUniqueId(),
        DeviceInfo.getManufacturer(),
        DeviceInfo.getModel(),
        DeviceInfo.getSystemVersion(),
        DeviceInfo.getVersion(),
        DeviceInfo.getBuildNumber(),
      ]);

      setDeviceDetails({
        osName,
        deviceId,
        manufacturer,
        model,
        systemVersion,
        appVersion,
        buildNumber,
      });
    } catch (error) {
      console.error('Error fetching device details:', error);
      Alert.alert('Error', 'Failed to fetch device details');
    } finally {
      setLoading(false);
    }
  };

  const requestGalleryPermission = async () => {
    try {
      const permission = await check(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);

      if (permission === RESULTS.GRANTED) {
        openGallery();
        return;
      }

      if (permission === RESULTS.DENIED) {
        const result = await request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
        if (result === RESULTS.GRANTED) {
          openGallery();
          return;
        }
      }

      Alert.alert(
        'Permission Required',
        'Gallery access is required to select photos.',
      );
    } catch (error) {
      console.error('Permission error:', error);
      openGallery();
    }
  };

  const openGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 1,
      },
      response => {
        if (response.didCancel) {
          return;
        }

        if (response.errorCode) {
          Alert.alert('Error', response.errorMessage || 'Failed to pick image');
          return;
        }

        if (response.assets?.[0]) {
          Alert.alert(
            'Success',
            `Selected: ${response.assets[0].fileName || 'Photo'}`,
          );
        }
      },
    );
  };
  return (
    <HomeComponent
      deviceDetails={deviceDetails}
      insets={insets}
      colors={colors}
      loading={loading}
      requestGalleryPermission={requestGalleryPermission}
      fetchDeviceDetails={fetchDeviceDetails}
    />
  );
};

export default HomeController;
