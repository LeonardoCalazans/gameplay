import React, { useState } from "react";
import { RectButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import {
  Text,
  View,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import {
  Background,
  Button,
  CategorySelect,
  GuildIcon,
  Header,
  ModalView,
  SmallInput,
  TextArea,
} from "../../components";
import { styles } from "./styles";
import { theme } from "../../global/styles/theme";
import uuid from "react-native-uuid";
import { useNavigation } from "@react-navigation/native";

import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLLECTION_APPOINTMENTS } from "../../configs/database";
import { GuildProps } from "../../components/Guild";
import { Guilds } from "..";

const AppointmentCreate = () => {
  const [category, setCategory] = useState("");
  const [openGuildsModal, setOpenGuildsModal] = useState(false);
  const [guild, setGuild] = useState<GuildProps>({} as GuildProps);
  const navigation = useNavigation();

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  //criar função Short Date e short Time
  const [day, setDay] = useState(Number);
  const [month, setMonth] = useState(Number);
  const [hour, setHour] = useState(Number);
  const [minute, setMinute] = useState(Number);
  const [description, setDescription] = useState("");

  const handleOpenGuilds = () => {
    setOpenGuildsModal(true);
  };

  const handleCloseGuilds = () => {
    setOpenGuildsModal(false);
  };

  const handleGuildSelect = (guildsSelect: GuildProps) => {
    setGuild(guildsSelect);
    setOpenGuildsModal(false);
  };

  const handleCategorySelect = (categoryId: string) => {
    categoryId === category ? setCategory("") : setCategory(categoryId);
  };

  const handleSave = async () => {
    const newAppointment = {
      id: uuid.v4(),
      guild,
      category,
      date: `${day}/${month} às ${hour}:${minute}h`,
      description,
    };

    const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
    const appointments = storage ? JSON.parse(storage) : [];

    await AsyncStorage.setItem(
      COLLECTION_APPOINTMENTS,
      JSON.stringify([...appointments, newAppointment])
    );

    navigation.navigate("Home");
  };

  const onChange = (event: DateTimePickerEvent, selectedDate: Date) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    if (mode === "date") {
      setDay(selectedDate.getDate());
      setMonth(selectedDate.getMonth());
    }
    if (mode === "time") {
      setHour(selectedDate.getHours());
      setMinute(selectedDate.getMinutes());
    }
  };

  const showMode = (currentMode: React.SetStateAction<string>) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Background>
        <ScrollView>
          <Header title="Agendar partida" />

          <Text
            style={[
              styles.label,
              { marginLeft: 24, marginTop: 36, marginBottom: 18 },
            ]}
          >
            Categoria
          </Text>

          <CategorySelect
            hasCheckBox
            setCategory={handleCategorySelect}
            categorySelected={category}
          />

          <View style={styles.form}>
            <RectButton onPress={handleOpenGuilds}>
              <View style={styles.select}>
                {guild.icon ? (
                  <GuildIcon guildId={guild.id} iconId={guild.icon} />
                ) : (
                  <View style={styles.image} />
                )}

                <View style={styles.selectBody}>
                  <Text style={styles.label}>
                    {guild.name ? guild.name : "Selecione um servidor"}
                  </Text>
                </View>

                <Feather
                  name="chevron-right"
                  color={theme.colors.heading}
                  size={18}
                />
              </View>
            </RectButton>

            <View style={styles.field}>
              <View>
                <RectButton onPress={showDatepicker}>
                  <Text style={[styles.label, { marginBottom: 12 }]}>
                    Dia e mês
                  </Text>

                  <View style={styles.column}>
                    <SmallInput text={day !== 0 ? day.toString() : ""} />
                    <Text style={styles.divider}>/</Text>
                    <SmallInput text={month !== 0 ? month.toString() : ""} />
                  </View>
                </RectButton>
              </View>

              <View>
                <RectButton onPress={showTimepicker}>
                  <Text style={[styles.label, { marginBottom: 12 }]}>
                    Hora e minuto
                  </Text>

                  <View style={styles.column}>
                    <SmallInput text={hour !== 0 ? hour.toString() : ""} />
                    <Text style={styles.divider}>:</Text>
                    <SmallInput text={minute !== 0 ? minute.toString() : ""} />
                  </View>
                </RectButton>
              </View>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  onChange={onChange}
                />
              )}
            </View>

            <View style={[styles.field, { marginBottom: 12 }]}>
              <Text style={styles.label}>Descrição</Text>

              <Text style={styles.caracteresLimit}>Max 100 caracteres</Text>
            </View>

            <TextArea
              multiline
              maxLength={100}
              numberOfLines={5}
              autoCorrect={false}
              onChangeText={setDescription}
            />

            <View style={styles.footer}>
              <Button title="Agendar" onPress={handleSave} />
            </View>
          </View>
        </ScrollView>
      </Background>

      <ModalView visible={openGuildsModal} closeModal={handleCloseGuilds}>
        <Guilds handleGuildSelect={handleGuildSelect} />
      </ModalView>
    </KeyboardAvoidingView>
  );
};

export default AppointmentCreate;
