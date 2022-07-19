import React from "react";
import { Wrapper, Text } from "./styles";

type SmallInputProps = {
  text?: string;
};

const SmallInput = ({ text }: SmallInputProps) => {
  return (
    <Wrapper testID="smallInput">
      <Text>{text}</Text>
    </Wrapper>
  );
};

export default SmallInput;
