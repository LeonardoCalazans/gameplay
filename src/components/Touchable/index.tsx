import React, { FC } from "react";
import { TouchableOpacity } from "react-native";
import { generateHaptic } from "../../ultis";

const CommonTouchable: FC<TouchableType> = ({
  onPress = (): void => {},
  haptic = "impact",
  disabled = false,
  accessibility,
  accessibilityLabel,
  testID,
  id,
  ...rest
}) => (
  <TouchableOpacity
    {...rest}
    accessibilityLabel={accessibilityLabel || accessibility}
    testID={testID || id || accessibility}
    disabled={disabled}
    onPress={(e): void => {
      generateHaptic(haptic);
      onPress(e);
    }}
  />
);

export default CommonTouchable;
