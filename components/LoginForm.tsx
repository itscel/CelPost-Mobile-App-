import { View, TextInput, Button } from "react-native";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { router } from "expo-router";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!username) return;

    await login(username);
    router.replace("/"); // go to tabs
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
    </View>
  );
}
