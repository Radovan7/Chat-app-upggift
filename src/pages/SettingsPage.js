import React, { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Button, SafeAreaView, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const SettingsPage = () => {
  const ctx = useContext(AuthContext);
  return (
    <SafeAreaView style={style.container}>
      <TouchableOpacity onPress={ctx.handleLogout} style={style.logoutButton}>
        <Text style={style.logoutButtonText}>LOGOUT</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: "#244c91",
    width: "100%",
    height: "100%",
  },
  logoutButton: {
    padding: 15,
    width: "70%",
    alignSelf: "center",
    marginTop: 50,
    borderRadius: 20,
    backgroundColor: "#ffcc00"
  },
  logoutButtonText: {
    textAlign: "center"
  }
});

export default SettingsPage;
