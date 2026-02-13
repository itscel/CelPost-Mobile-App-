import { View, TextInput, Button } from "react-native";
import { useState } from "react";

type Props = {
  onAddPost: (text: string, user: string) => void;
  user: string;
};

export default function PostInput({ onAddPost, user }: Props) {
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (!text) return;
    onAddPost(text, user);
    setText("");
  };

  return (
    <View style={{ marginBottom: 10 }}>
      <TextInput
        placeholder="Write your post..."
        value={text}
        onChangeText={setText}
        multiline
        style={{
          borderWidth: 1,
          borderRadius: 5,
          padding: 10,
          marginBottom: 5,
        }}
      />
      <Button title="Post" onPress={handleAdd} />
    </View>
  );
}
