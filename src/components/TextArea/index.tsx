import React from "react";
import { TextInputProps } from "react-native";
import { Wrapper } from "./styles";

interface Props extends TextInputProps {
  active?: boolean;
}

const TextArea = ({ active = false, ...rest }: Props) => {
  return (
    <Wrapper
      testID="textArea"
      active={active}
      keyboardType={"default"}
      {...rest}
    />
  );
};

export default TextArea;
