import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import type { DrawerContentComponentProps } from '@react-navigation/drawer';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { colors } from '../constants/colors';

export function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { userName, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.scroll}>
      <View style={styles.header}>
        <Image source={require('../../assets/chow.png')} style={styles.avatar} />
        <Text style={styles.name}>{userName}</Text>
        <Text style={styles.subtitle}>Chow member</Text>
      </View>

      <DrawerItem
        label="My Orders"
        icon={({ color, size }) => <Ionicons name="receipt-outline" size={size} color={color} />}
        onPress={() => props.navigation.navigate('DrawerOrders')}
        activeTintColor={colors.primary}
      />
      <DrawerItem
        label="Settings"
        icon={({ color, size }) => <Ionicons name="settings-outline" size={size} color={color} />}
        onPress={() => props.navigation.navigate('Settings')}
        activeTintColor={colors.primary}
      />
      <DrawerItem
        label="Help"
        icon={({ color, size }) => <Ionicons name="help-circle-outline" size={size} color={color} />}
        onPress={() => props.navigation.navigate('Help')}
        activeTintColor={colors.primary}
      />
      <DrawerItem
        label="Logout"
        icon={({ color, size }) => <Ionicons name="log-out-outline" size={size} color={color} />}
        onPress={handleLogout}
        activeTintColor={colors.danger}
        inactiveTintColor={colors.danger}
      />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingTop: 8,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginBottom: 8,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 4,
  },
});
