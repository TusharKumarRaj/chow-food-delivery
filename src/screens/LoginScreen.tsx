import { Ionicons } from "@expo/vector-icons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { colors } from "../constants/colors";
import { useAuth } from "../context/AuthContext";
import type { AuthStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<AuthStackParamList, "Login">;

export function LoginScreen(_props: Props) {
  const { login } = useAuth();

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.cardWrap}>
        <Image source={require("../../assets/chow.png")} style={styles.logo} />
        <View style={styles.card}>
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>Sign in to continue with Chow</Text>

          <View style={styles.field}>
            <Ionicons name="mail-outline" size={20} color={colors.textMuted} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={colors.textMuted}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.field}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color={colors.textMuted}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={colors.textMuted}
            />
          </View>

          <Pressable style={styles.button} onPress={login}>
            <Text style={styles.buttonText}>Sign In</Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    padding: 24,
  },
  cardWrap: {
    alignItems: "center",
    marginTop: 40,
  },
  logo: {
    width: 88,
    height: 88,
    borderRadius: 44,
    marginBottom: -44,
    zIndex: 2,
    borderWidth: 4,
    borderColor: colors.white,
  },
  card: {
    width: "100%",
    backgroundColor: colors.card,
    borderRadius: 16,
    paddingTop: 56,
    paddingHorizontal: 24,
    paddingBottom: 28,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.text,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    color: colors.textMuted,
    textAlign: "center",
    marginTop: 6,
    marginBottom: 24,
  },
  field: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 12,
    gap: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.text,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: colors.white,
    fontSize: 17,
    fontWeight: "600",
  },
  hint: {
    marginTop: 14,
    fontSize: 13,
    color: colors.textMuted,
    textAlign: "center",
  },
});
