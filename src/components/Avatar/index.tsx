import React from "react";
import { Image } from "react-native";
import { styles } from "./styles";
import { theme } from "../../global/styles/theme";
import { LinearGradient } from "expo-linear-gradient";

type Props = {
  urlImage: string;
};

const Avatar = ({ urlImage }: Props) => {
  const { secondary70, secondary50 } = theme.colors;

  return (
    <LinearGradient
      style={styles.container}
      colors={[secondary70, secondary50]}
    >
      <Image source={{ uri: urlImage }} style={styles.avatar} />
    </LinearGradient>
  );
};

export default Avatar;
