// React and React Native imports
import React from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// Context and Component imports
import Header from '../../components/Header';

// Styles import
import { styles } from './Styles';

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

interface HomeComponentProps {
  deviceDetails: {
    deviceId: string;
    manufacturer: string;
    model: string;
    osName: string;
    systemVersion: string;
    appVersion: string;
    buildNumber: string;
  } | null;
  loading: boolean;
  insets: any;
  colors: any;
  requestGalleryPermission: () => void;
  fetchDeviceDetails: () => void;
}

const HomeComponent = ({
  deviceDetails,
  loading,
  insets,
  colors,
  requestGalleryPermission,
  fetchDeviceDetails,
}: HomeComponentProps) => {
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

export default HomeComponent;
