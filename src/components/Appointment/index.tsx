import React from "react";
import { View, Text } from "react-native";
import {
  BorderlessButton,
  RectButton,
  RectButtonProps,
} from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { Fontisto } from "@expo/vector-icons";
import { PlayerSvg, CalendarSvg } from "../../assets/svg";
import { theme } from "../../global/styles/theme";
import { styles } from "./styles";
import { categories } from "../../ultis";
import GuildIcon from "../GuildIcon";

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
    <RectButton {...rest} testID={"appointment"}>
      <View style={styles.container}>
        <LinearGradient
          style={styles.guildIconContainer}
          colors={[secondary50, secondary70]}
        >
          <GuildIcon guildId={data.guild.id} iconId={data.guild.icon} />
        </LinearGradient>

        <View style={styles.content}>
          <View testID="appointment-header" style={styles.header}>
            <Text style={styles.title}>{data.guild.name}</Text>

            <Text testID="appointment-category-title" style={styles.category}>
              {category?.title}
            </Text>
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
            <View testID="appointment-dateInfo" style={styles.dateInfo}>
              <CalendarSvg />
              <Text style={styles.date}>{data.date}</Text>
            </View>

            <View testID="appointment-playersInfo" style={styles.playersInfo}>
              <PlayerSvg fill={owner ? primary : on} />

              <Text
                testID={`appointment-owner-test${owner ? primary : on}`}
                style={[styles.player, { color: owner ? primary : on }]}
              >
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
