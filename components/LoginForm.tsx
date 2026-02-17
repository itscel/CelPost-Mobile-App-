import { View, TextInput, Button, Text, Pressable } from "react-native";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { router } from "expo-router";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!username) return;

    await login(username);
    router.replace("/");
  };

  return (
    <View>
      <TextInput
        placeholder="Enter username"
        value={username}
        onChangeText={setUsername}
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 15,
          borderRadius: 5,
        }}
      />

      <Button title="Login" onPress={handleLogin} />

      {/* SIGN UP LINK */}
      <Pressable
        onPress={() => router.push("/signup")}
        style={{ marginTop: 20, alignItems: "center" }}
      >
        <Text style={{ color: "blue" }}>
          Don't have an account? Sign up
        </Text>
      </Pressable>
    </View>
  );
}
