import "react-native-gesture-handler";
import { useCallback } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./src/contexts/AuthContext";
import AuthNavigation from "./src/navigations/AuthNavigation";
import RootNavigation from "./src/navigations/RootNavigation";
import { ChatProvider } from "./src/contexts/ChatContext";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    Pacifico: require("./assets/fonts/Pacifico-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
        <AuthProvider>
          <ChatProvider>
            <RootNavigation />
          </ChatProvider>
        </AuthProvider>
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#244c91",
  },
});
