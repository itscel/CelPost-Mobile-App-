import { View, Text, StyleSheet } from "react-native";
import { Post } from "@/hooks/usePosts";
import { ThemedText } from "@/components/themed-text";

type Props = {
  posts: Post[];
};

export default function PostList({ posts }: Props) {
  return (
    <View style={styles.container}>
      {posts.map((post, index) => (
        <View key={index} style={styles.postCard}>
          {/* Username */}
          <ThemedText style={styles.username}>{post.user}</ThemedText>

          {/* Post text */}
          <Text>{post.text}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  postCard: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#fff", // optional: makes card stand out
  },
  username: {
    fontWeight: "bold",
    marginBottom: 5,
  },
});
