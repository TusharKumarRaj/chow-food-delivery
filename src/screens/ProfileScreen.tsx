import type { DrawerScreenProps } from '@react-navigation/drawer';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { useAuth } from '../context/AuthContext';
import type { ProfileDrawerParamList } from '../navigation/types';

type Props = DrawerScreenProps<ProfileDrawerParamList, 'ProfileMain'>;

export function ProfileScreen({ navigation }: Props) {
  const { userName } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.name}>{userName}</Text>
      <Text style={styles.subtitle}>Open the menu for account options.</Text>
      <Pressable style={styles.menuButton} onPress={() => navigation.openDrawer()}>
        <Ionicons name="menu" size={22} color={colors.white} />
        <Text style={styles.menuText}>Open Menu</Text>
      </Pressable>
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
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textMuted,
    marginTop: 8,
    marginBottom: 24,
  },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.header,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  menuText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
