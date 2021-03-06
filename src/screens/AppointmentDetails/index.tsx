import React, { useEffect, useState } from "react";
import { Fontisto } from "@expo/vector-icons";
import {
  Text,
  ImageBackground,
  View,
  FlatList,
  Alert,
  Platform,
  Share,
} from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import * as Linking from "expo-linking";

import { theme } from "../../global/styles/theme";
import { styles } from "./styles";
import BannerImg from "../../assets/images/banner.png";

import { api } from "../../services/api";
import { useRoute } from "@react-navigation/native";
import Member, { MemberProps } from "../../components/Member";
import {
  Background,
  ButtonIcon,
  Header,
  ListDivider,
  ListHeader,
  Load,
} from "../../components";

type Params = {
  guildSelected: AppointmentType;
};

type GuildWidget = {
  id: string;
  name: string;
  instant_invite: string;
  members: MemberProps[];
};

const AppointmentDetails = () => {
  const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const { guildSelected } = route.params as Params;

  const fetchGuildWidget = async () => {
    try {
      const response = await api.get(
        `/guilds/${guildSelected.guild.id}/widget.json`
      );
      setWidget(response.data);
    } catch (error) {
      Alert.alert(
        "Verifique as configurações do servidor, Widget está habilitado?"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleShareInvitation = () => {
    const message =
      Platform.OS === "ios"
        ? `Junte-se a ${guildSelected.guild.name}`
        : widget.instant_invite;

    Share.share({
      message,
      url: widget.instant_invite,
    });
  };

  const handleOpenGuild = () => {
    Linking.openURL(widget.instant_invite);
  };

  useEffect(() => {
    fetchGuildWidget();
  }, []);

  return (
    <Background>
      <Header
        title="Detalhes"
        action={
          widget.instant_invite && (
            <BorderlessButton onPress={handleShareInvitation}>
              <Fontisto name="share" size={24} color={theme.colors.primary} />
            </BorderlessButton>
          )
        }
      />

      <ImageBackground source={BannerImg} style={styles.banner}>
        <View style={styles.bannerContent}>
          <Text style={styles.title}>{guildSelected.guild.name}</Text>

          <Text style={styles.subtitle}>{guildSelected.description}</Text>
        </View>
      </ImageBackground>

      {loading ? (
        <Load />
      ) : (
        <>
          <ListHeader
            title="Jogadores"
            subtitle={`Total ${!!widget.id ? widget.members.length : ""}`}
          />

          <FlatList
            data={widget.members}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Member data={item} />}
            ItemSeparatorComponent={() => <ListDivider isCentered />}
            style={styles.members}
          />
        </>
      )}

      {widget.instant_invite && (
        <View style={styles.footer}>
          <ButtonIcon title="Entrar na partida" onPress={handleOpenGuild} />
        </View>
      )}
    </Background>
  );
};

export default AppointmentDetails;
