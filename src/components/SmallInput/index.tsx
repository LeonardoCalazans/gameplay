import React from "react";
import { View, Text } from "react-native";

import { styles } from "./styles";

type SmallInputProps = {
  text?: string;
};

const SmallInput = ({ text }: SmallInputProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default SmallInput;
