import { Tabs } from "expo-router";
import { Button } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { router } from "expo-router";

export default function TabLayout() {
  const { user, logout } = useAuth();
  
    const handleLogout = async () => {
      await logout();
      router.replace("../login");
    };
  
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
        title: "CelPost",
        headerRight: () => (
          <Button title="||>" onPress={handleLogout} />
        )
      }}
    />
    <Tabs.Screen
      name="inventory"
      options={{
        title: "Inventory",
        tabBarIcon: () => null,
      }}
    />
    <Tabs.Screen
      name="profile"
      options={{
        title: "Profile",
        tabBarIcon: () => null,
      }}
    />
  </Tabs>
  );
}
