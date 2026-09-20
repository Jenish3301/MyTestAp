import { faker } from '@faker-js/faker';
import { useTheme } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ListingComponent from './ListingComponent';

interface ListItem {
  id: string;
  name: string;
  email: string;
  company: string;
  avatar: string;
}

const generateDummyData = (count: number): ListItem[] => {
  const data: ListItem[] = [];
  for (let i = 0; i < count; i++) {
    data.push({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      company: faker.company.name(),
      avatar: faker.image.avatar(),
    });
  }
  return data;
};

const SplashController = () => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const dummyData = useMemo(() => generateDummyData(50), []);
  return (
    <ListingComponent colors={colors} insets={insets} dummyData={dummyData} />
  );
};

export default SplashController;
