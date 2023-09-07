import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import { ChatContext } from "../contexts/ChatContext";
import ChatMessage from "../components/ChatMessage";
import TextField from "../components/TextField";

const ChatPage = () => {
  const authCtx = useContext(AuthContext);
  const chatCtx = useContext(ChatContext);
  const [typedValue, setTypedValue] = useState("");

  useEffect(() => {
    chatCtx?.getMessages?.();
  }, []);

  const handleSendMessage = async () => {
    await chatCtx?.postMessage(typedValue);
    await chatCtx?.getMessages();
    setTypedValue("");
  };

  return (
    <SafeAreaView style={style.container}>
      <Text style={style.welcomeText}>You are logged in as</Text>
      <Text style={style.username}>{`${authCtx.username}`}</Text>
      <View style={style.chatContainer}>
        <FlatList
          style={style.messageList}
          initialNumToRender={30}
          data={chatCtx.messages}
          inverted={true}
          renderItem={({ item }) => (
            <ChatMessage
              messageId={item?._id}
              content={item?.content}
              author={item?.user?.username}
              isMine={item?.user?._id === authCtx?.userId}
            />
          )}
          keyExtractor={(item) => item._id}
        />
        <View style={style.newMessageContainer}>
          <TextField
            multiline={true}
            containerStyle={style.newMessageInput}
            style={{ color: "#ffcc00" }}
            onChange={(newValue) => setTypedValue(newValue)}
            placeholder="New message..."
            value={typedValue}
          />
          <TouchableOpacity
            style={style.newMessageButton}
            onPress={handleSendMessage}
          >
            <Text style={style.newMessageButton}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    padding: 40,
    backgroundColor: "#244c91",
  },
  welcomeText: {
    textAlign: "center",
    color: "#ffcc00",
    fontSize: 20,
  },
  username: {
    textAlign: "center",
    fontWeight: 700,
    color: "#ffcc00",
    fontSize: 20,
  },
  chatContainer: {
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 20,
    padding: 5,
    flex: 1,
  },
  newMessageContainer: {
    flexDirection: "row",
    gap: 5,
    width: "100%",
    marginTop: 5,
  },
  newMessageInput: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    flex: 1,
    color: "#ffcc00",
  },
  newMessageButton: {
    color: "#244c91",
    backgroundColor: "#ffcc00",
    justifyContent: "center",
    alignItems: "center",
    padding: 4,
    borderRadius: 4,
  },
  // messageList: {
  //   maxHeight: "70%",
  // },
});

export default ChatPage;
