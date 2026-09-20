// React and React Native imports
import React, { useState } from 'react';
import { Alert, Platform } from 'react-native';

// Safe Area imports
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Theme and Constants imports
import { useTheme } from '../../context/ThemeContext';
import { COUNTRY_LIST } from '../../constants/countryData';

// Component imports
import SettingsComponent from './SettingsComponent';

interface FormData {
  name: string;
  email: string;
  birthdate: Date;
  country: string;
}

const SettingsController = () => {
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
    <SettingsComponent
      colors={colors}
      insets={insets}
      formData={formData}
      countrySearch={countrySearch}
      showDatePicker={showDatePicker}
      showCountryPicker={showCountryPicker}
      filteredCountries={filteredCountries}
      setFormData={setFormData}
      handleReset={handleReset}
      handleSubmit={handleSubmit}
      selectCountry={selectCountry}
      handleDateChange={handleDateChange}
      setShowDatePicker={setShowDatePicker}
      openCountryPicker={openCountryPicker}
      closeCountryPicker={closeCountryPicker}
      handleCountrySearch={handleCountrySearch}
    />
  );
};

export default SettingsController;
