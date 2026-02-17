import { View, TextInput, Button, Alert, Text, Pressable, Modal, FlatList } from "react-native";
import { useState } from "react";

type Props = {
  onAddPost: (
    text: string,
    user: string,
    category: string,
    audience: string
  ) => void;
  user: string;
};

// Options
const CATEGORY_OPTIONS = ["Inventory", "Event", "Reminder", "Place", "Task"];
const AUDIENCE_OPTIONS = ["Lola", "Everyone"];

export default function PostInput({ onAddPost, user }: Props) {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [audience, setAudience] = useState("");

  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [audienceModalVisible, setAudienceModalVisible] = useState(false);

  const handleAdd = () => {
    if (!text.trim()) {
      Alert.alert("Write something first.");
      return;
    }

    if (!category || !audience) {
      Alert.alert("Please select both category and audience.");
      return;
    }

    onAddPost(text, user, category, audience);

    setText("");
    setCategory("");
    setAudience("");
  };

  const renderOption = (item: string, onSelect: (value: string) => void) => (
    <Pressable
      onPress={() => onSelect(item)}
      style={{ padding: 15, borderBottomWidth: 1, borderColor: "#ddd" }}
    >
      <Text>{item}</Text>
    </Pressable>
  );

  return (
    <View style={{ marginBottom: 15 }}>
      <TextInput
        placeholder="Write post..."
        value={text}
        onChangeText={setText}
        multiline
        style={{
          borderWidth: 1,
          borderRadius: 5,
          padding: 10,
          marginBottom: 10,
        }}
      />

      <View style={{ flexDirection: "row", justifyContent: "flex-end", marginBottom: 10 }}>
        <Pressable
          onPress={() => setCategoryModalVisible(true)}
          style={{
            backgroundColor: "yellow",
            paddingVertical: 8,
            paddingHorizontal: 12,
            borderRadius: 12,
            marginRight: 10,
            width: 120,
            alignItems: "center",
          }}
        >
          <Text>{category || "Category"}</Text>
        </Pressable>

        <Pressable
          onPress={() => setAudienceModalVisible(true)}
          style={{
            backgroundColor: "orange",
            paddingVertical: 8,
            paddingHorizontal: 12,
            borderRadius: 12,
            width: 120,
            alignItems: "center",
          }}
        >
          <Text>{audience || "Audience"}</Text>
        </Pressable>
      </View>

      <Modal visible={categoryModalVisible} transparent animationType="slide">
        <Pressable
          style={{ flex: 1, backgroundColor: "#00000066", justifyContent: "center" }}
          onPress={() => setCategoryModalVisible(false)}
        >
          <View style={{ backgroundColor: "#fff", marginHorizontal: 40, borderRadius: 10 }}>
            <FlatList
              data={CATEGORY_OPTIONS}
              keyExtractor={(item) => item}
              renderItem={({ item }) => renderOption(item, (value) => {
                setCategory(value);
                setCategoryModalVisible(false);
              })}
            />
          </View>
        </Pressable>
      </Modal>

      <Modal visible={audienceModalVisible} transparent animationType="slide">
        <Pressable
          style={{ flex: 1, backgroundColor: "#00000066", justifyContent: "center" }}
          onPress={() => setAudienceModalVisible(false)}
        >
          <View style={{ backgroundColor: "#fff", marginHorizontal: 40, borderRadius: 10 }}>
            <FlatList
              data={AUDIENCE_OPTIONS}
              keyExtractor={(item) => item}
              renderItem={({ item }) => renderOption(item, (value) => {
                setAudience(value);
                setAudienceModalVisible(false);
              })}
            />
          </View>
        </Pressable>
      </Modal>

      <Button title="Post" onPress={handleAdd} />
    </View>
  );
}
