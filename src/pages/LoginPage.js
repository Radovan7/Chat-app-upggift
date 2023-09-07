import React, { useContext, useEffect, useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import TextField from "../components/TextField";
import { Button, StyleSheet, Text, TouchableOpacity } from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";

const LoginPage = () => {
  const ctx = useContext(AuthContext);
  const navigation = useNavigation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  const isDisabled = useMemo(
    () => username?.length === 0 || password?.length === 0,
    [username, password]
  );

  const loginStyles = useMemo(() => {
    if (isDisabled) return style.loginButtonDisabled;
    return style.loginButton;
  }, [username, password, isDisabled]);

  const handleLogin = async () => {
    if (isDisabled) return;
    let loginResult = await ctx.handleLogin(username, password);
    if (!loginResult) setShowError(true);
  };

  const handleRegister = () => {
    navigation.navigate("RegisterPage");
  };

  return (
    <SafeAreaView style={style.container}>
      <Text style={style.loginTitle}>Login</Text>

      <TextField
        style={style.textField}
        placeholder="Username..."
        onChange={(newValue) => setUsername(newValue)}
      />
      <TextField
        style={style.textField}
        secureTextEntry={true}
        placeholder="Password..."
        onChange={(newValue) => setPassword(newValue)}
      />
      {showError && (
        <Text style={style.errorMessage}>Incorrect user information</Text>
      )}  
      <TouchableOpacity style={loginStyles} onPress={handleLogin}>
        <Text style={style.loginButtonText}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity style={style.registerButton} onPress={handleRegister}>
        <Text style={style.registerButtonText}>REGISTER NEW ACCOUNT</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export const style = StyleSheet.create({
  container: {
    width: "100%",
    textAlign: "center",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#244c91",
  },
  loginTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 40,
    color: "#ffcc00",
  },
  textField: {
    borderWidth: 1,
    borderColor: "#ffcc00",
    color: "#ffcc00",
    borderRadius: 20,
    padding: 15,
    width: "70%",
    maxWidth: "70%",
    minWidth: "70%",
    marginTop: 20,
  },
  loginButton: {
    borderRadius: 20,
    marginTop: 20,
    width: "70%",
    maxWidth: "70%",
    minWidth: "70%",
    textAlign: "center",
    backgroundColor: "#ffcc00",
    padding: 15,
  },
  loginButtonDisabled: {
    borderRadius: 20,
    backgroundColor: "#70785e",
    color: "#244c91",
    marginTop: 20,
    width: "70%",
    maxWidth: "70%",
    minWidth: "70%",
    textAlign: "center",
    padding: 15,
  },
  registerButton: {
    borderRadius: 20,
    borderColor: "#ffcc00",
    borderWidth: 2,
    marginTop: 20,
    width: "70%",
    maxWidth: "70%",
    minWidth: "70%",
    textAlign: "center",
    padding: 15,
  },
  registerButtonText: {
    color: "#ffcc00",
    textAlign: "center",
  },
  loginButtonText: {
    color: "#244c91",
    textAlign: "center",
  },
  errorMessage: {
    textAlign: "center",
    color: "#ff4c4c",
    paddingTop: 20,
    fontWeight: 700,
    fontSize: 16,
  },
});

export default LoginPage;
