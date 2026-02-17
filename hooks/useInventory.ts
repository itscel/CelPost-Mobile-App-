import { useState } from "react";

export type InventoryItem = {
  name: string;
  quantity: number;
  expiration: string;
  user: string;
};

export function useInventory() {
  const [items, setItems] = useState<InventoryItem[]>([]);

  const addItem = (
    name: string,
    quantity: number,
    expiration: string,
    user: string
  ) => {
    setItems((prev) => [
      ...prev,
      { name, quantity, expiration, user },
    ]);
  };

  return { items, addItem };
}
