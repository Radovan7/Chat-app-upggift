import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);

  const handleLogin = async (username, password) => {

    try {
      let result = await fetch(
        "https://chat-api-with-auth.up.railway.app/auth/token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );
      if (!result.ok) return false;
      let resultParsed = await result.json();
      let userIdFromRequest = resultParsed?.data?._id;
      let accessTokenFromRequest = resultParsed?.data?.accessToken;
      let usernameFromRequest = resultParsed?.data?.username;
      await AsyncStorage.setItem("accessToken", accessTokenFromRequest);
      await AsyncStorage.setItem("userId", userIdFromRequest);
      await AsyncStorage.setItem("username", usernameFromRequest);
      setAccessToken(accessTokenFromRequest);
      setUsername(usernameFromRequest);
      setUserId(userIdFromRequest);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const handleRegister = async (username, password) => {

    try {
      let result = await fetch(
        "https://chat-api-with-auth.up.railway.app/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );
      return result.ok;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("accessToken");
      await AsyncStorage.removeItem("username");
      await AsyncStorage.removeItem("userId");
      setAccessToken(null);
      setUsername(null);
      setUserId(null);
    } catch (error) {
      console.log(error);
    }
  };

  const isLoggedIn = async () => {
    try {
      const accessTokenFromStorage = await AsyncStorage.getItem("accessToken");
      const usernameFromStorage = await AsyncStorage.getItem("username");
      const userIdFromStorage = await AsyncStorage.getItem("userId");
      setAccessToken(accessTokenFromStorage);
      setUsername(usernameFromStorage);
      setUserId(userIdFromStorage);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{ accessToken, username, userId, handleLogin, handleLogout, handleRegister }}
    >
      {children}
    </AuthContext.Provider>
  );
};
