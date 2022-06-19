import React, { useEffect } from "react";
import { useState } from "react";
import { View, FlatList } from "react-native";

import { styles } from "./styles";
import { api } from "../../services/api";
import Guild, { GuildProps } from "../../components/Guild";
import { ListDivider, Load } from "../../components";

type Props = {
  handleGuildSelect: (guild: GuildProps) => void;
};

const Guilds = ({ handleGuildSelect }: Props) => {
  const [guilds, setGuilds] = useState<GuildProps[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGuilds = async () => {
    const response = await api.get("/users/@me/guilds");
    setGuilds(response.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchGuilds();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <Load />
      ) : (
        <FlatList
          data={guilds}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Guild data={item} onPress={() => handleGuildSelect(item)} />
          )}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <ListDivider isCentered />}
          ListHeaderComponent={() => <ListDivider isCentered />}
          contentContainerStyle={{ paddingBottom: 60, paddingTop: 103 }}
          style={styles.guilds}
        />
      )}
    </View>
  );
};

export default Guilds;
