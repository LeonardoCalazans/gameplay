import React, { useState } from "react";
import { View, FlatList, Text } from "react-native";
import { ButtomAdd } from "../../components/ButtomAdd";
import { CategorySelect } from "../../components/CategorySelect";
import { ListHeader } from "../../components/ListHeader";
import { Profile } from "../../components/Profile";
import { ListDivider } from "../../components/ListDivider";
import { Appointment } from "../../components/Appointment";
import { styles } from "./styles";

export function Home() {
  const [category, setCategory] = useState("");

  const appointment = [
    {
      id: "1",
      guild: {
        id: "1",
        name: "Lendários",
        icon: null,
        owner: true,
      },
      category: "1",
      date: "22/06 às 20:00h",
      description:
        "É hoje que vamos chegar ao challenger sem perder uma partida da md10",
    },
    {
      id: "2",
      guild: {
        id: "1",
        name: "José",
        icon: null,
        owner: true,
      },
      category: "2",
      date: "22/06 às 20:00h",
      description:
        "É hoje que vamos chegar ao challenger sem perder uma partida da md10",
    },
    {
      id: "3",
      guild: {
        id: "1",
        name: "Nubizados",
        icon: null,
        owner: true,
      },
      category: "2",
      date: "22/06 às 20:00h",
      description:
        "É hoje que vamos chegar ao challenger sem perder uma partida da md10",
    },
  ];

  function handleCategorySelect(categoryId: string) {
    categoryId === category ? setCategory("") : setCategory(categoryId);
  }

  return (
    <View>
      <View style={styles.header}>
        <Profile />
        <ButtomAdd />
      </View>
      <CategorySelect
        categorySelected={category}
        setCategory={handleCategorySelect}
      />
      <>
        <ListHeader
          title="Partidas Agendadas"
          subtitle={`Total ${appointment.length}`}
        />
        <FlatList
          data={appointment}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Appointment data={item} />}
          showsVerticalScrollIndicator={false}
          style={styles.matches}
          ItemSeparatorComponent={() => <ListDivider />}
        />
      </>
    </View>
  );
}
