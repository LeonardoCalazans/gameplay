import React from "react";
import { View, Text } from "react-native";
import { styles } from "./styles";
import Avatar from "../Avatar";
import { theme } from "../../global/styles/theme";

export type MemberProps = {
  id: string;
  username: string;
  avatar_url: string;
  status: string;
};

type Props = {
  data: MemberProps;
};

const Member = ({ data }: Props) => {
  const { on, primary } = theme.colors;
  const isOnline = data.status === "online";
  return (
    <View testID="member" style={styles.container}>
      <Avatar urlImage={data.avatar_url} />
      <View>
        <Text style={styles.title}>{data.username}</Text>
        <View style={styles.status}>
          <View testID="member-status"
            style={[
              styles.bulletStatus,
              {
                backgroundColor: isOnline ? on : primary,
              },
            ]}
          />
          <Text style={styles.nameStatus}>
            {isOnline ? "Disponível" : "Ocupado"}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Member;
