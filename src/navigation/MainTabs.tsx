import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { useCart } from '../context/CartContext';
import { HomeStack } from './HomeStack';
import { OrdersScreen } from '../screens/OrdersScreen';
import { SearchScreen } from '../screens/SearchScreen';
import type { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

const hiddenTabRoutes = ['RestaurantDetail', 'Cart'];

function tabBarStyleForHomeRoute(routeName: string | undefined) {
  if (routeName && hiddenTabRoutes.includes(routeName)) {
    return { display: 'none' as const };
  }
  return undefined;
}

export function MainTabs() {
  const { count } = useCart();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        headerShown: false,
      }}>
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
          return {
            title: 'Home',
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
            ),
            tabBarStyle: tabBarStyleForHomeRoute(routeName),
          };
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: colors.header },
          headerTintColor: colors.white,
          title: 'Search',
          tabBarIcon: ({ color, size }) => <Ionicons name="search-outline" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: colors.header },
          headerTintColor: colors.white,
          title: 'Orders',
          tabBarIcon: ({ color, size }) => <Ionicons name="receipt-outline" size={size} color={color} />,
          tabBarBadge: count > 0 ? count : undefined,
        }}
      />
    </Tab.Navigator>
  );
}
