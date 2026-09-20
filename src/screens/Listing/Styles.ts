import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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