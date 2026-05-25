import * as ScreenCapture from 'expo-screen-capture';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import { RootNavigator } from '../navigation/RootNavigator';

SplashScreen.preventAutoHideAsync();

export default function App() {
  useEffect(() => {
    void ScreenCapture.allowScreenCaptureAsync();
    SplashScreen.hideAsync();
  }, []);

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <CartProvider>
          <StatusBar style="light" />
          <RootNavigator />
        </CartProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
