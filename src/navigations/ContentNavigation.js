import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import ChatPage from "../pages/ChatPage";
import { createDrawerNavigator } from "@react-navigation/drawer";
import SettingsPage from "../pages/SettingsPage";

const Drawer = createDrawerNavigator();

const ContentNavigation = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
            backgroundColor: "#ffcc00"
        },
      }}
    >
      <Drawer.Screen name="Chat" component={ChatPage} />
      <Drawer.Screen name="Settings" component={SettingsPage} />
    </Drawer.Navigator>
  );
};

export default ContentNavigation;
