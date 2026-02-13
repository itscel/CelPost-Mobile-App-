import { Stack } from "expo-router";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { Redirect } from "expo-router";

function RootNavigation() {
  const { user, loading } = useAuth();

  if (loading) return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {!user ? (
        <Stack.Screen name="login" />
      ) : (
        <Stack.Screen name="(tabs)" />
      )}
    </Stack>
  );
}

export default function Layout() {
  return (
    <AuthProvider>
      <RootNavigation />
    </AuthProvider>
  );
}
