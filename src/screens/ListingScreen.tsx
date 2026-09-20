// React and React Native imports
import React, { useMemo } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

// Third-party imports
import { faker } from '@faker-js/faker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Context and Component imports
import Header from '../components/Header';
import { useTheme } from '../context/ThemeContext';

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

const ListingScreen: React.FC = () => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const dummyData = useMemo(() => generateDummyData(50), []);

  const renderItem = ({ item }: { item: ListItem }) => (
    <View
      style={[
        styles.listItem,
        {
          backgroundColor: colors.card,
          borderBottomColor: colors.border,
        },
      ]}
    >
      <View
        style={[styles.avatarWrap, { backgroundColor: colors.primarySoft }]}
      >
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
      </View>
      <View style={styles.itemContent}>
        <Text
          style={[styles.itemName, { color: colors.text }]}
          numberOfLines={1}
        >
          {item.name}
        </Text>
        <Text
          style={[styles.itemEmail, { color: colors.primary }]}
          numberOfLines={1}
        >
          {item.email}
        </Text>
        <Text
          style={[styles.itemCompany, { color: colors.text }]}
          numberOfLines={1}
        >
          {item.company}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Listing" />
      <FlatList
        data={dummyData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{
          paddingBottom: insets.bottom + 140,
          paddingHorizontal: 16,
          paddingTop: 8,
        }}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItem: {
    flexDirection: 'row',
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  avatarWrap: {
    width: 60,
    height: 60,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 15,
  },
  itemContent: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 5,
  },
  itemEmail: {
    fontSize: 13,
    marginBottom: 5,
    fontWeight: '600',
  },
  itemCompany: {
    fontSize: 12,
    fontWeight: '700',
  },
});

export default ListingScreen;
