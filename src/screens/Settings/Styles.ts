import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
    paddingVertical: 70,
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