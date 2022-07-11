import React, { useCallback, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { View, FlatList, Text, Alert } from "react-native";
import { styles } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { COLLECTION_APPOINTMENTS } from "../../configs/database";
import Appointment from "../../components/Appointment";
import {
  Background,
  ButtonAdd,
  CategorySelect,
  ListDivider,
  ListHeader,
  Load,
  Profile,
} from "../../components";

const Home = () => {
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [appointments, setAppointments] = useState<AppointmentType[]>([]);

  const handleCategorySelect = (categoryId: string) => {
    categoryId === category ? setCategory("") : setCategory(categoryId);
  };

  const handleAppointmentDetails = (guildSelected: AppointmentType) => {
    navigation.navigate("AppointmentDetails", { guildSelected });
  };

  const deleteAppointment = async (id: AppointmentType["id"]) => {
    Alert.alert("Delete", "Deseja realmente deletar?", [
      {
        text: "Não",
        style: "cancel",
      },
      {
        text: "Sim",
        onPress: async () => {
          const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
          const storage: AppointmentType[] = response
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
    const storage: AppointmentType[] = response ? JSON.parse(response) : [];
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
};

export default Home;
