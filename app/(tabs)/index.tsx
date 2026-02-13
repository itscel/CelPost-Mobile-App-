import { StyleSheet, View, Text, Button } from "react-native";
import { ThemedView } from "@/components/themed-view";

import PostInput from "@/components/PostInput";
import PostList from "@/components/PostList";
import { usePosts } from "@/hooks/usePosts";
import { useAuth } from "../../context/AuthContext";

export default function HomeScreen() {
  const { posts, addPost } = usePosts();
  const { user, logout } = useAuth();

    return (
    <ThemedView style={styles.container}>
      {user && (
        <View style={styles.greetingContainer}>
          <Text style={styles.greeting}>Welcome, {user}!</Text>
        </View>
      )}

      <PostInput onAddPost={addPost} user={user || "Anonymous"} />
      <PostList posts={posts} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  greetingContainer: {
    marginBottom: 20,
  },
  greeting: {
    fontSize: 18,
    marginBottom: 5,
  },
});
