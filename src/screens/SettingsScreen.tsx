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
import Header from '../components/Header';
import { COUNTRY_LIST } from '../constants/countryData';
import { useTheme } from '../context/ThemeContext';

interface FormData {
  name: string;
  email: string;
  birthdate: Date;
  country: string;
}

const SettingsScreen: React.FC = () => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    birthdate: new Date(),
    country: '',
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [filteredCountries, setFilteredCountries] =
    useState<string[]>(COUNTRY_LIST);
  const [countrySearch, setCountrySearch] = useState('');

  const handleDateChange = (event: any, selectedDate: any) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }

    if (selectedDate) {
      setFormData({
        ...formData,
        birthdate: selectedDate,
      });
    }
  };

  const handleCountrySearch = (text: string) => {
    setCountrySearch(text);
    if (text.trim() === '') {
      setFilteredCountries(COUNTRY_LIST);
    } else {
      const filtered = COUNTRY_LIST.filter(country =>
        country.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredCountries(filtered);
    }
  };

  const selectCountry = (country: string) => {
    setFormData({
      ...formData,
      country,
    });
    setShowCountryPicker(false);
    setCountrySearch('');
    setFilteredCountries(COUNTRY_LIST);
  };

  const openCountryPicker = () => {
    setShowCountryPicker(true);
    setCountrySearch('');
    setFilteredCountries(COUNTRY_LIST);
  };

  const closeCountryPicker = () => {
    setShowCountryPicker(false);
    setCountrySearch('');
    setFilteredCountries(COUNTRY_LIST);
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      Alert.alert('Validation Error', 'Please enter your name');
      return false;
    }
    if (!formData.email.trim()) {
      Alert.alert('Validation Error', 'Please enter your email');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Alert.alert('Validation Error', 'Please enter a valid email address');
      return false;
    }
    if (!formData.country) {
      Alert.alert('Validation Error', 'Please select a country');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      Alert.alert(
        'Success',
        `Form submitted!\n\nName: ${formData.name}\nEmail: ${
          formData.email
        }\nBirthdate: ${formData.birthdate.toDateString()}\nCountry: ${
          formData.country
        }`,
      );
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      birthdate: new Date(),
      country: '',
    });
  };

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    gap: 14,
  },
  card: {
    borderRadius: 24,
    padding: 18,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
  },
  formSection: {
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 6,
  },
  helperText: {
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 15,
  },
  searchInput: {
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 15,
  },
  dateButton: {
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 15,
    justifyContent: 'center',
  },
  dateButtonText: {
    fontSize: 14,
    fontWeight: '700',
  },
  countryButton: {
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 15,
    justifyContent: 'center',
  },
  countryButtonText: {
    fontSize: 14,
    fontWeight: '700',
  },
  countryList: {
    marginTop: 12,
    maxHeight: 360,
  },
  countryListContent: {
    paddingBottom: 8,
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  countryItemText: {
    fontSize: 14,
    flex: 1,
    paddingRight: 12,
  },
  selectedMark: {
    fontSize: 16,
    fontWeight: '800',
  },
  emptyText: {
    textAlign: 'center',
    paddingVertical: 24,
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 24,
    gap: 12,
  },
  submitButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
  },
  resetButton: {
    flex: 1,
    paddingVertical: 12,
    borderWidth: 2,
    borderRadius: 16,
    alignItems: 'center',
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: '800',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    padding: 18,
  },
  modalCenter: {
    width: '100%',
  },
  modalCard: {
    borderRadius: 24,
    padding: 16,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '900',
  },
  modalClose: {
    fontSize: 20,
    fontWeight: '800',
    paddingHorizontal: 6,
  },
});

export default SettingsScreen;
