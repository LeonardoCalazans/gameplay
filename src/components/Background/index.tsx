import React, { ReactNode } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./styles";
import { theme } from "../../global/styles/theme";

type Props = {
  onLayout?: () => void;
};

const Background: React.FC<Props> = ({ children, onLayout }) => {
  const { secondary80, secondary100 } = theme.colors;
  return (
    <LinearGradient
      style={styles.container}
      colors={[secondary80, secondary100]}
      onLayout={onLayout}
      children={children as any}
    />
  );
}

export default Background;
