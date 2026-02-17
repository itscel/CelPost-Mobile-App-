import { View, Text, StyleSheet } from "react-native";
import { InventoryItem } from "@/hooks/useInventory";

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

type Props = {
  items: InventoryItem[];
};

export default function InventoryList({ items }: Props) {
  return (
    <View style={styles.container}>
      {items.map((item, index) => {
        const expStatus = getExpirationStatus(item.expiration);
        const stockStatus = getStockStatus(item.quantity);

        // Color coding
        let expColor = "#4CAF50"; // Good --> Green (Elphie?)
        if (expStatus === "Almost Expired") expColor = "#FF9800"; // Warning --> orange
        if (expStatus === "Expired") expColor = "#F44336"; // Expired --> red

        let stockColor = "#4CAF50"; // High stock --> Green
        if (stockStatus === "Low Stock") stockColor = "#FF9800"; // Same as expiration
        if (stockStatus === "Out of Stock") stockColor = "#F44336";

        return (
          <View key={index} style={styles.itemCard}>
            <View style={styles.headerRow}>
              <Text style={styles.username}>{item.user}</Text>
            </View>

            <Text style={styles.productName}>{item.name}</Text>
            <View style={styles.detailsRow}>
              <Text>Qty: {item.quantity}</Text>
              <Text>Expires: {item.expiration}</Text>
            </View>

            <View style={styles.tagsContainer}>
              <View style={[styles.tag, { backgroundColor: expColor }]}>
                <Text style={styles.tagText}>{expStatus}</Text>
              </View>
              <View style={[styles.tag, { backgroundColor: stockColor }]}>
                <Text style={styles.tagText}>{stockStatus}</Text>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  itemCard: {
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
  productName: {
    fontWeight: "600",
    fontSize: 15,
    marginBottom: 5,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  tagsContainer: {
    flexDirection: "row",
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    marginRight: 5,
  },
  tagText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
  },
});
