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
          <View style={styles.headerRow}>
            <ThemedText style={styles.username}>{post.user}</ThemedText>
            <View style={styles.tagsContainer}>
              <View style={[styles.tag, { backgroundColor: "yellow" }]}>
                <Text style={styles.tagText}>{post.category}</Text>
              </View>

              <View style={[styles.tag, { backgroundColor: "orange" }]}>
                <Text style={styles.tagText}>{post.audience}</Text>
              </View>
            </View>
          </View>

          <Text style={styles.postText}>{post.text}</Text>
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
    backgroundColor: "#fff",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
  },
  tagsContainer: {
    flexDirection: "row",
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    marginLeft: 5,
  },
  tagText: {
    fontSize: 12,
    fontWeight: "600",
  },
  postText: {
    fontSize: 14,
  },
});
