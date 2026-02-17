import { StyleSheet, View, Text, Modal, Pressable, ScrollView } from "react-native";
import { ThemedView } from "@/components/themed-view";
import PostInput from "@/components/PostInput";
import PostList from "@/components/PostList";
import { usePosts, Post } from "@/hooks/usePosts";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

export default function HomeScreen() {
  const { posts, addPost } = usePosts();
  const { user } = useAuth();

  const userPostCount = posts.filter(post => post.user === user).length;

  // Modal state
  const [modalVisible, setModalVisible] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [audienceFilter, setAudienceFilter] = useState<string | null>(null);

  // Apply filters
  const filteredPosts = posts.filter((post: Post) => {
    let categoryMatch = true;
    let audienceMatch = true;

    if (categoryFilter) categoryMatch = post.category === categoryFilter;
    if (audienceFilter) audienceMatch = post.audience === audienceFilter;

    return categoryMatch && audienceMatch;
  });

  return (
    <ThemedView style={styles.container}>
      <View style={{ marginBottom: 10 }}>
        <Text style={{ fontWeight: "600", fontSize: 16 }}>
          Your Posts: {userPostCount}
        </Text>
      </View>

      <PostInput onAddPost={addPost} user={user || "Anonymous"} />

      {/* Filter Button */}
      <Pressable style={styles.filterButton} onPress={() => setModalVisible(true)}>
        <Text style={{ color: "#fff" }}>Filter Posts</Text>
      </Pressable>

      {/* Filter Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView>

              {/* CATEGORY */}
              <Text style={styles.modalTitle}>CATEGORY</Text>
              {["Inventory", "Event", "Reminder", "Place", "Task"].map((cat) => (
                <Pressable
                  key={cat}
                  style={[
                    styles.modalOption,
                    categoryFilter === cat && { backgroundColor: "#007bff" },
                  ]}
                  onPress={() => setCategoryFilter(categoryFilter === cat ? null : cat)}
                >
                  <Text style={{ color: categoryFilter === cat ? "#fff" : "#000" }}>{cat}</Text>
                </Pressable>
              ))}

              <View style={styles.divider} />

              {/* AUDIENCE */}
              <Text style={styles.modalTitle}>AUDIENCE</Text>
              {["Lola", "Everyone"].map((aud) => (
                <Pressable
                  key={aud}
                  style={[
                    styles.modalOption,
                    audienceFilter === aud && { backgroundColor: "#007bff" },
                  ]}
                  onPress={() => setAudienceFilter(audienceFilter === aud ? null : aud)}
                >
                  <Text style={{ color: audienceFilter === aud ? "#fff" : "#000" }}>{aud}</Text>
                </Pressable>
              ))}

              <View style={styles.divider} />

              {/* Clear Filters */}
              <Pressable
                style={[styles.modalOption, { backgroundColor: "#F44336" }]}
                onPress={() => {
                  setCategoryFilter(null);
                  setAudienceFilter(null);
                }}
              >
                <Text style={{ color: "#fff" }}>Clear Filters</Text>
              </Pressable>

              {/* Apply */}
              <Pressable
                style={[styles.modalOption, { backgroundColor: "#4CAF50", marginTop: 10 }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={{ color: "#fff" }}>Apply</Text>
              </Pressable>

            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Post List */}
      <PostList posts={filteredPosts} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  filterButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    maxHeight: "80%",
  },
  modalTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
  },
  modalOption: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 8,
  },
  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 10,
  },
});
