import React, { useCallback, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { View, FlatList, Text, Alert } from "react-native";
import { styles } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ButtonAdd } from "../../components/ButtonAdd";
import { CategorySelect } from "../../components/CategorySelect";
import { ListHeader } from "../../components/ListHeader";
import { Profile } from "../../components/Profile";
import { ListDivider } from "../../components/ListDivider";
import { Appointment, AppointmentProps } from "../../components/Appointment";
import { Background } from "../../components/Background";
import { COLLECTION_APPOINTMENTS } from "../../configs/database";
import { Load } from "../../components/Load";

export function Home() {
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [appointments, setAppointments] = useState<AppointmentProps[]>([]);

  const handleCategorySelect = (categoryId: string) => {
    categoryId === category ? setCategory("") : setCategory(categoryId);
  };

  const handleAppointmentDetails = (guildSelected: AppointmentProps) => {
    navigation.navigate("AppointmentDetails", { guildSelected });
  };

  const deleteAppointment = async (id: AppointmentProps["id"]) => {
    Alert.alert("Delete", "Deseja realmente deletar?", [
      {
        text: "Não",
        style: "cancel",
      },
      {
        text: "Sim",
        onPress: async () => {
          const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
          const storage: AppointmentProps[] = response
            ? JSON.parse(response)
            : [];
          const storage2 = storage.filter((item) => {
            return item.id !== id;
          });
          await AsyncStorage.setItem(
            COLLECTION_APPOINTMENTS,
            JSON.stringify(storage2)
          );
          loadAppointments();
        },
      },
    ]);
  };

  const handleAppointmentCreate = () => {
    navigation.navigate("AppointmentCreate");
  };

  const loadAppointments = async () => {
    const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
    const storage: AppointmentProps[] = response ? JSON.parse(response) : [];
    if (category) {
      setAppointments(storage.filter((item) => item.category === category));
    } else {
      setAppointments(storage);
    }

    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      loadAppointments();
    }, [category])
  );

  return (
    <Background>
      <View style={styles.header}>
        <Profile />
        <ButtonAdd onPress={handleAppointmentCreate} />
      </View>

      <CategorySelect
        categorySelected={category}
        setCategory={handleCategorySelect}
      />

      {loading ? (
        <Load />
      ) : (
        <>
          <ListHeader
            title="Partidas agendadas"
            subtitle={`Total ${appointments.length}`}
          />

          <FlatList
            data={appointments}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Appointment
                data={item}
                onPress={() => handleAppointmentDetails(item)}
                deleteAppointment={deleteAppointment}
              />
            )}
            ItemSeparatorComponent={() => <ListDivider />}
            contentContainerStyle={{ paddingBottom: 69 }}
            style={styles.matches}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
    </Background>
  );
}
