import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from '../constants/colors';
import { CartScreen } from '../screens/CartScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { RestaurantDetailScreen } from '../screens/RestaurantDetailScreen';
import type { HomeStackParamList } from './types';

const Stack = createNativeStackNavigator<HomeStackParamList>();

const stackScreenOptions = {
  headerStyle: { backgroundColor: colors.header },
  headerTintColor: colors.white,
  headerTitleStyle: { fontWeight: '600' as const },
  headerBackTitle: 'Back',
  animation: 'slide_from_right' as const,
};

export function HomeStack() {
  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="RestaurantDetail"
        component={RestaurantDetailScreen}
        options={({ route }) => ({
          title: route.params.name,
          headerBackTitle: 'Restaurants',
        })}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          title: 'Your Cart',
          headerBackTitle: 'Back',
        }}
      />
    </Stack.Navigator>
  );
}
