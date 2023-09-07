import React, { useState } from "react";
import { TextInput, View } from "react-native";

const TextField = (props) => {
  const [inputValue, setInputValue] = useState(props?.value || "");

  const handleChangeText = (newValue) => {
    setInputValue(newValue);
    props?.onChange?.(newValue);
  };

  return (
    <View style={props?.containerStyle}>
      <TextInput
        placeholderTextColor="#70785e"
        value={inputValue}
        onChangeText={handleChangeText}
        {...props}
      />
    </View>
  );
};

export default TextField;
