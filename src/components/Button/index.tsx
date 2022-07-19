import React from "react";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { Text } from "react-native";

import { styles } from "./styles";

type props = RectButtonProps & {
  title: string;
};

const Button = ({ title, ...rest }: props) => {
  return (
    <RectButton testID="button" style={styles.container} {...rest}>
      <Text style={styles.title}>{title}</Text>
    </RectButton>
  );
};

export default Button;
