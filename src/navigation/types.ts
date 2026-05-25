import type { NavigatorScreenParams } from '@react-navigation/native';

export type AuthStackParamList = {
  Login: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  RestaurantDetail: { id: string; name: string };
  Cart: undefined;
};

export type ProfileDrawerParamList = {
  ProfileMain: undefined;
  DrawerOrders: undefined;
  Settings: undefined;
  Help: undefined;
};

export type MainTabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  Search: undefined;
  Orders: undefined;
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Onboarding: undefined;
  Main: undefined;
};
