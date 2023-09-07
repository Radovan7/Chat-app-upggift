import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState(null);
  const { accessToken } = useContext(AuthContext);

  const getMessages = async () => {
    try {
      let result = await fetch(
        "https://chat-api-with-auth.up.railway.app/messages",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (!result.ok) return false;
      let resultParsed = await result.json();
      setMessages(resultParsed.data?.sort?.((a, b) => new Date(b?.date) - new Date(a?.date)));
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const postMessage = async (content) => {
    try {
      let result = await fetch(
        "https://chat-api-with-auth.up.railway.app/messages",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ content }),
        }
      );
      return result.ok;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  const deleteMessage = async (messageId) => {
    try {
      let result = await fetch(
        "https://chat-api-with-auth.up.railway.app/messages/" + messageId,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return result.ok;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return (
    <ChatContext.Provider value={{ messages, getMessages, postMessage, deleteMessage }}>
      {children}
    </ChatContext.Provider>
  );
};
