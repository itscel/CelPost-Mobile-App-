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
    <Tabs
      screenOptions={{
        headerShown: true, // or false if you don't want a header
      }}
    >
      <Tabs.Screen
        name="index" // this matches your index.tsx file
        options={{
          title: "CelPost", // <-- this is what shows on the tab
          headerRight: () => (
            <Button title="||>" onPress={handleLogout} />
          )
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile", // text under tab icon
          tabBarIcon: () => null, // placeholder: no icon yet
        }}
      />
    </Tabs>
    
  );
}
