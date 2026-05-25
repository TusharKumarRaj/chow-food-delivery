import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

const AUTH_KEY = '@chow_auth';
const ONBOARDING_KEY = '@chow_onboarding_done';

type AuthContextValue = {
  isAuthenticated: boolean;
  isLoading: boolean;
  hasSeenOnboarding: boolean;
  userName: string;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  completeOnboarding: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const userName = 'Alex Morgan';

  useEffect(() => {
    (async () => {
      try {
        const [auth, onboarding] = await Promise.all([
          AsyncStorage.getItem(AUTH_KEY),
          AsyncStorage.getItem(ONBOARDING_KEY),
        ]);
        setIsAuthenticated(auth === 'true');
        setHasSeenOnboarding(onboarding === 'true');
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const login = useCallback(async () => {
    await AsyncStorage.setItem(AUTH_KEY, 'true');
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(async () => {
    await AsyncStorage.multiRemove([AUTH_KEY, ONBOARDING_KEY]);
    setIsAuthenticated(false);
    setHasSeenOnboarding(false);
  }, []);

  const completeOnboarding = useCallback(async () => {
    await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
    setHasSeenOnboarding(true);
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated,
      isLoading,
      hasSeenOnboarding,
      userName,
      login,
      logout,
      completeOnboarding,
    }),
    [isAuthenticated, isLoading, hasSeenOnboarding, userName, login, logout, completeOnboarding],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
