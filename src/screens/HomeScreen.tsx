// React and React Native imports
import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Alert,
  ActivityIndicator,
} from 'react-native';

// Third-party imports
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DeviceInfo from 'react-native-device-info';
import { launchImageLibrary } from 'react-native-image-picker';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

// Context and Component imports
import { useTheme } from '../context/ThemeContext';
import Header from '../components/Header';

interface DeviceDetails {
  osName: string;
  deviceId: string;
  manufacturer: string;
  model: string;
  systemVersion: string;
  appVersion: string;
  buildNumber: string;
}

interface DetailRowProps {
  label: string;
  value: string;
  colors: any;
}

interface SummaryChipProps {
  label: string;
  value: string;
  colors: any;
}

const HomeScreen: React.FC = () => {
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
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Home" />
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 140 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <View
            style={[styles.loadingContainer, { backgroundColor: colors.card }]}
          >
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={[styles.loadingText, { color: colors.textMuted }]}>
              Fetching device details...
            </Text>
          </View>
        ) : deviceDetails ? (
          <>
            <View style={[styles.summaryRow, { backgroundColor: colors.card }]}>
              <SummaryChip
                label="OS"
                value={deviceDetails.osName}
                colors={colors}
              />
              <SummaryChip
                label="Version"
                value={deviceDetails.systemVersion}
                colors={colors}
              />
            </View>

            <View style={[styles.card, { backgroundColor: colors.card }]}>
              <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  Device Information
                </Text>
                <Text
                  style={[
                    styles.sectionPill,
                    {
                      color: colors.primary,
                      backgroundColor: colors.primarySoft,
                    },
                  ]}
                >
                  Live
                </Text>
              </View>
              <Text
                style={[styles.sectionDescription, { color: colors.textMuted }]}
              >
                Key details collected after permission checks.
              </Text>

              <View style={styles.detailGrid}>
                <DetailRow
                  label="Device ID"
                  value={deviceDetails.deviceId}
                  colors={colors}
                />
                <DetailRow
                  label="Manufacturer"
                  value={deviceDetails.manufacturer}
                  colors={colors}
                />
                <DetailRow
                  label="Model"
                  value={deviceDetails.model}
                  colors={colors}
                />
                <DetailRow
                  label="App Version"
                  value={deviceDetails.appVersion}
                  colors={colors}
                />
                <DetailRow
                  label="Build Number"
                  value={deviceDetails.buildNumber}
                  colors={colors}
                />
              </View>
            </View>

            <TouchableOpacity
              style={[styles.photoButton, { backgroundColor: colors.primary }]}
              onPress={requestGalleryPermission}
              activeOpacity={0.85}
            >
              <Text style={styles.photoButtonText}>📷 Open Gallery</Text>
              <Text style={styles.photoButtonSubtext}>
                Select a photo from your phone
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.errorContainer}>
            <Text style={[styles.errorText, { color: colors.text }]}>
              Failed to load device details
            </Text>
            <TouchableOpacity
              style={[styles.retryButton, { borderColor: colors.primary }]}
              onPress={fetchDeviceDetails}
            >
              <Text style={[styles.retryButtonText, { color: colors.primary }]}>
                Retry
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const DetailRow: React.FC<DetailRowProps> = ({ label, value, colors }) => (
  <View style={[styles.detailRow, { borderBottomColor: colors.border }]}>
    <Text style={[styles.detailLabel, { color: colors.textMuted }]}>
      {label}
    </Text>
    <Text
      style={[styles.detailValue, { color: colors.text }]}
      numberOfLines={1}
    >
      {value}
    </Text>
  </View>
);

const SummaryChip: React.FC<SummaryChipProps> = ({ label, value, colors }) => (
  <View
    style={[styles.summaryChip, { backgroundColor: colors.backgroundSoft }]}
  >
    <Text style={[styles.summaryLabel, { color: colors.textMuted }]}>
      {label}
    </Text>
    <Text
      style={[styles.summaryValue, { color: colors.text }]}
      numberOfLines={1}
    >
      {value}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    gap: 14,
  },
  loadingContainer: {
    minHeight: 220,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 15,
    fontWeight: '600',
  },
  summaryRow: {
    flexDirection: 'row',
    gap: 12,
    borderRadius: 24,
    padding: 12,
  },
  summaryChip: {
    flex: 1,
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  summaryLabel: {
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '800',
  },
  card: {
    borderRadius: 24,
    padding: 18,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '900',
  },
  sectionPill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    overflow: 'hidden',
    fontSize: 12,
    fontWeight: '800',
  },
  sectionDescription: {
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 12,
  },
  detailGrid: {
    gap: 4,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 13,
    borderBottomWidth: 1,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '700',
    flex: 1,
    paddingRight: 10,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '800',
    flex: 1,
    textAlign: 'right',
  },
  photoButton: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  photoButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
  },
  photoButtonSubtext: {
    color: 'rgba(255,255,255,0.88)',
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 300,
  },
  errorText: {
    fontSize: 16,
    marginBottom: 16,
    fontWeight: '600',
  },
  retryButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderWidth: 2,
    borderRadius: 14,
  },
  retryButtonText: {
    fontSize: 16,
    fontWeight: '800',
  },
});

export default HomeScreen;
