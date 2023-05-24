import React from "react";
import { View } from "react-native";

const mockFontisto: React.FC = ({ ...props }) => {
  return <View {...props} testID={"fontisto"} />;
};

export { mockFontisto };
