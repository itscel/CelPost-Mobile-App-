import { StyleSheet, View, Text, Modal, Pressable, ScrollView } from "react-native";
import { ThemedView } from "@/components/themed-view";
import InventoryInput from "@/components/InventoryInput";
import InventoryList from "@/components/InventoryList";
import { useInventory, InventoryItem } from "@/hooks/useInventory";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

// Helper functions
function getExpirationStatus(expiration: string) {
  const [year, month, day] = expiration.split("-").map(Number);
  const expDate = new Date(year, month - 1, day);
  const today = new Date();
  const diffDays = (expDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
  if (diffDays < 0) return "Expired";
  if (diffDays <= 7) return "Almost Expired";
  return "Good";
}

function getStockStatus(quantity: number) {
  if (quantity === 0) return "Out of Stock";
  if (quantity <= 3) return "Low Stock";
  return "High Stock";
}

export default function InventoryScreen() {
  const { items, addItem } = useInventory();
  const { user } = useAuth();

  const [modalVisible, setModalVisible] = useState(false);
  const [stockFilter, setStockFilter] = useState<string | null>(null); // "Low Stock" | "High Stock" | "Out of Stock" | null
  const [expFilter, setExpFilter] = useState<string | null>(null); // "Expired" | "Good" | "Almost Expired" | null

  // Filter items based on selected filters
  const filteredItems = items.filter((item: InventoryItem) => {
    const expStatus = getExpirationStatus(item.expiration);
    const stockStatus = getStockStatus(item.quantity);

    let expMatch = true;
    let stockMatch = true;

    if (expFilter) expMatch = expFilter === "Good" ? expStatus === "Good" : expStatus === expFilter;
    if (stockFilter) stockMatch = stockStatus === stockFilter;

    return expMatch && stockMatch;
  });

  return (
    <ThemedView style={styles.container}>
      <InventoryInput
        onAddItem={addItem}
        user={user || "Anonymous"}
      />

      {/* Filter Button */}
      <Pressable style={styles.filterButton} onPress={() => setModalVisible(true)}>
        <Text style={{ color: "#fff" }}>Filter Items</Text>
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
              <Text style={styles.modalTitle}>Expiration Status</Text>
              {["Expired", "Almost Expired", "Good"].map((status) => (
                <Pressable
                  key={status}
                  style={[
                    styles.modalOption,
                    expFilter === status && { backgroundColor: "#007bff" }
                  ]}
                  onPress={() => setExpFilter(expFilter === status ? null : status)}
                >
                  <Text style={{ color: expFilter === status ? "#fff" : "#000" }}>{status}</Text>
                </Pressable>
              ))}

              <View style={styles.divider} />

              <Text style={styles.modalTitle}>Stock Status</Text>
              {["Out of Stock", "Low Stock", "High Stock"].map((status) => (
                <Pressable
                  key={status}
                  style={[
                    styles.modalOption,
                    stockFilter === status && { backgroundColor: "#007bff" }
                  ]}
                  onPress={() => setStockFilter(stockFilter === status ? null : status)}
                >
                  <Text style={{ color: stockFilter === status ? "#fff" : "#000" }}>{status}</Text>
                </Pressable>
              ))}

              <View style={styles.divider} />

              <Pressable
                style={[styles.modalOption, { backgroundColor: "#F44336" }]}
                onPress={() => {
                  setStockFilter(null);
                  setExpFilter(null);
                }}
              >
                <Text style={{ color: "#fff" }}>Clear Filters</Text>
              </Pressable>

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

      {/* Inventory List */}
      <InventoryList items={filteredItems} />
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
