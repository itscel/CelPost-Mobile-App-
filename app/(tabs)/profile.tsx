import { StyleSheet, View, Text } from "react-native";
import { ThemedView } from "@/components/themed-view";

export default function ProfileScreen() {
  return (
    <ThemedView style={styles.container}>
      <Text style={styles.text}>Profile Screen (Coming Soon!)</Text>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 18 },
});
