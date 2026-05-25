import { Ionicons } from '@expo/vector-icons';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors } from '../constants/colors';
import { RESTAURANTS } from '../data/restaurants';

export function SearchScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color={colors.textMuted} />
        <TextInput
          style={styles.input}
          placeholder="Search for restaurants or dishes"
          placeholderTextColor={colors.textMuted}
        />
      </View>
      <Text style={styles.section}>Top picks</Text>
      <FlatList
        data={RESTAURANTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable style={styles.row}>
            <Ionicons name="restaurant-outline" size={22} color={colors.primary} />
            <View style={styles.rowText}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.meta}>{item.cuisine}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    margin: 16,
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  input: { flex: 1, paddingVertical: 12, fontSize: 16, color: colors.text },
  section: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  rowText: { flex: 1 },
  name: { fontSize: 16, fontWeight: '600', color: colors.text },
  meta: { fontSize: 13, color: colors.textMuted, marginTop: 2 },
});
