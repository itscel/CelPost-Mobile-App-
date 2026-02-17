import { View, TextInput, Button, StyleSheet } from "react-native";
import { useState } from "react";

type Props = {
  onAddItem: (
    name: string,
    quantity: number,
    expiration: string, // will be combined as YYYY-MM-DD
    user: string
  ) => void;
  user: string;
};

export default function InventoryInput({ onAddItem, user }: Props) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");

  const handleAdd = () => {
    if (!name || !quantity || !year || !month || !day) return;

    // Combine into YYYY-MM-DD
    const expiration = `${year.padStart(4, "0")}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;

    onAddItem(name, Number(quantity), expiration, user);

    // Reset all fields
    setName("");
    setQuantity("");
    setYear("");
    setMonth("");
    setDay("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Product Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="Quantity"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
        style={styles.input}
      />

      <View style={styles.expirationRow}>
        <TextInput
          placeholder="Year"
          value={year}
          onChangeText={setYear}
          keyboardType="numeric"
          style={[styles.input, styles.expirationInput]}
        />
        <TextInput
          placeholder="Month"
          value={month}
          onChangeText={setMonth}
          keyboardType="numeric"
          style={[styles.input, styles.expirationInput]}
        />
        <TextInput
          placeholder="Day"
          value={day}
          onChangeText={setDay}
          keyboardType="numeric"
          style={[styles.input, styles.expirationInput]}
        />
      </View>

      <Button title="Add Item" onPress={handleAdd} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    // borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    flex: 1,
  },
  expirationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  expirationInput: {
    flex: 1,
    marginRight: 5,
  },
});
