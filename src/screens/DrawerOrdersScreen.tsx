import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/colors';

export function DrawerOrdersScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Orders</Text>
      <Text style={styles.body}>Order history from the drawer menu.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  body: {
    fontSize: 16,
    color: colors.textMuted,
  },
});
