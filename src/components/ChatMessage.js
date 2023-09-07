import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ChatContext } from "../contexts/ChatContext";

const ChatMessage = (props) => {
  const chatCtx = useContext(ChatContext);

  const handleDeleteMessage = async () => {
    await chatCtx?.deleteMessage?.(props?.messageId);
    await chatCtx?.getMessages?.();
  };

  return (
    <View style={style.container(props?.isMine)}>
      <View style={style.messageContainer}>
        <View style={style.infoContainer}>
          <Text style={style.author}>{props?.author}</Text>
        </View>
        <Text style={style.content}>{props?.content}</Text>
      </View>
      {props?.isMine && (
        <TouchableOpacity onPress={handleDeleteMessage}>
          <Text style={style.delete}>Delete</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  container: (isReversed) => ({
    marginTop: 2,
    marginBottom: 2,
    flexDirection: isReversed ? "row-reverse" : "row",
    justifyContent: "space-between",
    alignItems: "center"
  }),
  messageContainer: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: "#ffcc00",
    alignSelf: "flex-start",
    maxWidth: "80%",
  },
  content: {
    color: "#244c91",
  },
  infoContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignSelf: "flex-start",
  },
  author: {
    fontSize: 18,
    marginBottom: 8,
  },
  delete: {
    backgroundColor: "#ff4c4c",
    maxHeight: 24,
    padding: 2,
    borderRadius: 5,
    alignSelf: "center"
  },
});

export default ChatMessage;
