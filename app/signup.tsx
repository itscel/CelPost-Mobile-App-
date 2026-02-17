import { View, Text } from "react-native";
import SignupForm from "../components/SignupForm";

export default function Signup() {
  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>
        Sign Up
      </Text>
      <SignupForm />
    </View>
  );
}
