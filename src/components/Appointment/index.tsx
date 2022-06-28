import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  BorderlessButton,
  RectButton,
  RectButtonProps,
} from "react-native-gesture-handler";
import { View, Text } from "react-native";

import { theme } from "../../global/styles/theme";
import { styles } from "./styles";
import PlayerSvg from "../../assets/player.svg";
import CalendarSvg from "../../assets/calendar.svg";
import { categories } from "../../ultis/consts/categories.consts";
import { Fontisto } from "@expo/vector-icons";
import { GuildIcon } from "..";

type Props = RectButtonProps & {
  data: AppointmentType;
  deleteAppointment: (id: AppointmentType["id"]) => void;
};

const Appointment = ({ data, deleteAppointment, ...rest }: Props) => {
  const [category] = categories.filter(
    (item: { id: string }) => item.id === data.category
  );
  const { owner } = data.guild;
  const { primary, on, secondary50, secondary70 } = theme.colors;

  return (
    <RectButton {...rest}>
      <View style={styles.container}>
        <LinearGradient
          style={styles.guildIconContainer}
          colors={[secondary50, secondary70]}
        >
          <GuildIcon guildId={data.guild.id} iconId={data.guild.icon} />
        </LinearGradient>

        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>{data.guild.name}</Text>

            <Text style={styles.category}>{category?.title}</Text>
            <BorderlessButton>
              <Fontisto
                name="trash"
                style={styles.iconDelete}
                color={theme.colors.primary}
                onPress={() => deleteAppointment(data.id)}
              />
            </BorderlessButton>
          </View>

          <View style={styles.footer}>
            <View style={styles.dateInfo}>
              <CalendarSvg />

              <Text style={styles.date}>{data.date}</Text>
            </View>

            <View style={styles.playersInfo}>
              <PlayerSvg fill={owner ? primary : on} />

              <Text style={[styles.player, { color: owner ? primary : on }]}>
                {owner ? "Anfitrião" : "Visitante"}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </RectButton>
  );
};

export default Appointment;
