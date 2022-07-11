import React from "react";
import { TextInput, TextInputProps } from "react-native";

import { styles } from "./styles";

const TextArea = ({ ...rest }: TextInputProps) => {
  return <TextInput style={styles.container} {...rest} />;
};

export default TextArea;
