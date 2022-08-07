import React from "react";
import { View } from "react-native";

interface FontistoProps {
  name: string;
}

const mockFontisto: React.FC<FontistoProps> = ({ name }) => {
  return <View testID={`fontisto-${name}`} />;
};

export { mockFontisto };
