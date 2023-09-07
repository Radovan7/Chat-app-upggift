import React, { useContext } from "react";
import PropTypes from "prop-types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginPage from "../pages/LoginPage";
import { AuthContext } from "../contexts/AuthContext";
import RegisterPage from "../pages/RegisterPage";
const Stack = createNativeStackNavigator();

const AuthNavigation = (props) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginPage" component={LoginPage} />
      <Stack.Screen name="RegisterPage" component={RegisterPage} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
