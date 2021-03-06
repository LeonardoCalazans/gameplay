import React from "react";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { Text, Image, View } from "react-native";

import DiscordImg from "../../assets/images/discord.png";
import { styles } from "./styles";

type props = RectButtonProps & {
  title: string;
};

const ButtonIcon = ({ title, ...rest }: props) => {
  return (
    <RectButton style={styles.container} {...rest}>
      <View style={styles.iconWrapper}>
        <Image source={DiscordImg} style={styles.icon} />
      </View>
      <Text style={styles.title}>{title}</Text>
    </RectButton>
  );
};

export default ButtonIcon;
