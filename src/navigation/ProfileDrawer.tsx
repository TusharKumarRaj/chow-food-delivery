import { createDrawerNavigator } from '@react-navigation/drawer';
import { colors } from '../constants/colors';
import { CustomDrawerContent } from '../components/CustomDrawerContent';
import { DrawerOrdersScreen } from '../screens/DrawerOrdersScreen';
import { HelpScreen } from '../screens/HelpScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import type { ProfileDrawerParamList } from './types';

const Drawer = createDrawerNavigator<ProfileDrawerParamList>();

export function ProfileDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: colors.header },
        headerTintColor: colors.white,
        headerTitleStyle: { fontWeight: '600' },
        drawerActiveTintColor: colors.primary,
      }}>
      <Drawer.Screen
        name="ProfileMain"
        component={ProfileScreen}
        options={{ title: 'Profile', headerShown: false }}
      />
      <Drawer.Screen name="DrawerOrders" component={DrawerOrdersScreen} options={{ title: 'My Orders' }} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="Help" component={HelpScreen} />
    </Drawer.Navigator>
  );
}
