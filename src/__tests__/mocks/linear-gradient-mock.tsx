import React from "react";
import { View } from "react-native";

interface MockLinearGradientProps {
  style: Object;
  colors: [String];
}

const mockLinearGradient: React.FC<MockLinearGradientProps> = ({
  colors,
  children,
}) => {
  return <View
        testID={`mocked-linear-gradient${colors.join('')}`}
    >{children && children}</View>;
};

export { mockLinearGradient };
