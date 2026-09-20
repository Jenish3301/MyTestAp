// React and React Native imports
import React from 'react';
import { FlatList, Image, Text, View } from 'react-native';

// Context and Component imports
import Header from '../../components/Header';

// Styles import
import { styles } from './Styles';

interface ListItem {
  id: string;
  name: string;
  email: string;
  company: string;
  avatar: string;
}

interface ListingComponentProps {
  colors: any;
  insets: any;
  dummyData: ListItem[];
}

const ListingComponent = ({
  colors,
  insets,
  dummyData,
}: ListingComponentProps) => {
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

export default ListingComponent;
