import { StyleSheet, View, Text } from "react-native";
import { ThemedView } from "@/components/themed-view";
import { useAuth } from "../../context/AuthContext";
import { usePosts } from "@/hooks/usePosts"; // <-- import this

export default function ProfileScreen() {
  const { user } = useAuth();
  const { posts } = usePosts(); // <-- get posts

  const userPostCount = posts.filter(post => post.user === user).length;

  return (
    <ThemedView style={styles.container}>
      {/* Gray Circle Avatar */}
      <View style={styles.avatar} />

      {/* Username */}
      {user && (
        <Text style={styles.username}>
          {user}
        </Text>
      )}

      {/* Post Count */}
      <View style={{ marginBottom: 10 }}>
        <Text style={{ fontWeight: "600", fontSize: 16 }}>
          Your Posts: {userPostCount}
        </Text>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 80,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#ccc",
    marginBottom: 20,
  },
  username: {
    fontSize: 22,
    fontWeight: "600",
  },
});
