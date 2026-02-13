import { View, Text } from "react-native";
import LoginForm from "../components/LoginForm"
export default function Login() {
  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Login</Text>
      <LoginForm />
    </View>
  );
}
