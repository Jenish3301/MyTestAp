// React and React Native imports
import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

// Third-party imports
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Context and Component imports
import Header from '../../components/Header';
import { COUNTRY_LIST } from '../../constants/countryData';
import { useTheme } from '../../context/ThemeContext';
import { styles } from './Styles';

interface SettingsComponentProps {
  colors: any;
  insets: any;
  formData: {
    name: string;
    email: string;
    birthdate: Date;
    country: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      name: string;
      email: string;
      birthdate: Date;
      country: string;
    }>
  >;
  showDatePicker: boolean;
  setShowDatePicker: React.Dispatch<React.SetStateAction<boolean>>;
  showCountryPicker: boolean;
  filteredCountries: string[];
  countrySearch: string;
  handleDateChange: (event: any, selectedDate: any) => void;
  handleCountrySearch: (text: string) => void;
  selectCountry: (country: string) => void;
  openCountryPicker: () => void;
  closeCountryPicker: () => void;
  handleSubmit: () => void;
  handleReset: () => void;
}

const SettingsComponent = ({
  colors,
  insets,
  formData,
  countrySearch,
  showDatePicker,
  showCountryPicker,
  filteredCountries,
  setFormData,
  handleReset,
  handleSubmit,
  selectCountry,
  handleDateChange,
  setShowDatePicker,
  openCountryPicker,
  closeCountryPicker,
  handleCountrySearch,
}: SettingsComponentProps) => {
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Settings" />
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 140 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          {/* Name Field */}
          <View style={styles.formSection}>
            <Text style={[styles.label, { color: colors.text }]}>
              Name <Text style={{ color: '#FF3B30' }}>*</Text>
            </Text>
            <Text style={[styles.helperText, { color: colors.textMuted }]}>
              Enter your full name exactly as you want it displayed.
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.secondary,
                  color: colors.text,
                  borderColor: colors.border,
                },
              ]}
              placeholder="Enter your full name"
              placeholderTextColor={colors.text + '80'}
              value={formData.name}
              onChangeText={text => setFormData({ ...formData, name: text })}
            />
          </View>

          {/* Email Field */}
          <View style={styles.formSection}>
            <Text style={[styles.label, { color: colors.text }]}>
              Email Address <Text style={{ color: '#FF3B30' }}>*</Text>
            </Text>
            <Text style={[styles.helperText, { color: colors.textMuted }]}>
              We use this for form validation only.
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.secondary,
                  color: colors.text,
                  borderColor: colors.border,
                },
              ]}
              placeholder="Enter your email"
              placeholderTextColor={colors.text + '80'}
              keyboardType="email-address"
              value={formData.email}
              onChangeText={text => setFormData({ ...formData, email: text })}
            />
          </View>

          {/* Birthdate Field */}
          <View style={styles.formSection}>
            <Text style={[styles.label, { color: colors.text }]}>
              Birthdate
            </Text>
            <Text style={[styles.helperText, { color: colors.textMuted }]}>
              Pick your date of birth from the calendar.
            </Text>
            <TouchableOpacity
              style={[
                styles.dateButton,
                {
                  backgroundColor: colors.secondary,
                  borderColor: colors.border,
                },
              ]}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={[styles.dateButtonText, { color: colors.text }]}>
                📅 {formData.birthdate.toDateString()}
              </Text>
            </TouchableOpacity>
          </View>

          {showDatePicker && (
            <DateTimePicker
              value={formData.birthdate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleDateChange}
              maximumDate={new Date()}
            />
          )}

          {/* Country Field */}
          <View style={styles.formSection}>
            <Text style={[styles.label, { color: colors.text }]}>
              Country <Text style={{ color: '#FF3B30' }}>*</Text>
            </Text>
            <Text style={[styles.helperText, { color: colors.textMuted }]}>
              Search and select your country from the list.
            </Text>

            <TouchableOpacity
              style={[
                styles.countryButton,
                {
                  backgroundColor: colors.secondary,
                  borderColor: colors.border,
                },
              ]}
              onPress={openCountryPicker}
            >
              <Text style={[styles.countryButtonText, { color: colors.text }]}>
                {formData.country || '🌍 Select a country'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.submitButton, { backgroundColor: colors.primary }]}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>✓ Submit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.resetButton, { borderColor: colors.primary }]}
              onPress={handleReset}
            >
              <Text style={[styles.resetButtonText, { color: colors.primary }]}>
                ↻ Reset
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <Modal
        visible={showCountryPicker}
        transparent
        animationType="fade"
        onRequestClose={closeCountryPicker}
      >
        <Pressable style={styles.modalBackdrop} onPress={closeCountryPicker}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.modalCenter}
          >
            <Pressable
              style={[styles.modalCard, { backgroundColor: colors.card }]}
              onPress={() => {}}
            >
              <View style={styles.modalHeader}>
                <Text style={[styles.modalTitle, { color: colors.text }]}>
                  Select Country
                </Text>
                <TouchableOpacity onPress={closeCountryPicker}>
                  <Text style={[styles.modalClose, { color: colors.primary }]}>
                    ✕
                  </Text>
                </TouchableOpacity>
              </View>

              <TextInput
                style={[
                  styles.searchInput,
                  {
                    backgroundColor: colors.backgroundSoft,
                    color: colors.text,
                    borderColor: colors.border,
                  },
                ]}
                placeholder="Search country..."
                placeholderTextColor={colors.text + '80'}
                value={countrySearch}
                onChangeText={handleCountrySearch}
                autoFocus
              />

              <FlatList
                data={filteredCountries}
                keyExtractor={item => item}
                keyboardShouldPersistTaps="handled"
                style={styles.countryList}
                contentContainerStyle={styles.countryListContent}
                ListEmptyComponent={
                  <Text style={[styles.emptyText, { color: colors.text }]}>
                    No countries found
                  </Text>
                }
                renderItem={({ item }) => {
                  const selected = formData.country === item;
                  return (
                    <TouchableOpacity
                      style={[
                        styles.countryItem,
                        {
                          borderBottomColor: colors.border,
                          backgroundColor: selected
                            ? colors.primary + '14'
                            : 'transparent',
                        },
                      ]}
                      onPress={() => selectCountry(item)}
                    >
                      <Text
                        style={[styles.countryItemText, { color: colors.text }]}
                      >
                        {item}
                      </Text>
                      {selected ? (
                        <Text
                          style={[
                            styles.selectedMark,
                            { color: colors.primary },
                          ]}
                        >
                          ✓
                        </Text>
                      ) : null}
                    </TouchableOpacity>
                  );
                }}
              />
            </Pressable>
          </KeyboardAvoidingView>
        </Pressable>
      </Modal>
    </View>
  );
};

export default SettingsComponent;
