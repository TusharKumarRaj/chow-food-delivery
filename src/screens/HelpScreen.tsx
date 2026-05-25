import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/colors';

export function HelpScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Help</Text>
      <Text style={styles.body}>FAQ, contact support, and delivery help would go here.</Text>
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
    lineHeight: 24,
  },
});
