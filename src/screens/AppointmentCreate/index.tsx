import React, { useState } from "react";
import { RectButton } from "react-native-gesture-handler";
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
import { styles, Icon } from "./styles";
import uuid from "react-native-uuid";
import { useNavigation } from "@react-navigation/native";

import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLLECTION_APPOINTMENTS } from "../../configs/database";
import { GuildProps } from "../../components/Guild";
import { Guilds } from "..";

type AppointmentCreate = {
  date: Date;
  hour: Date;
  category: string;
  guild: GuildProps;
  description: string;
};

const AppointmentCreate = () => {
  const [openGuildsModal, setOpenGuildsModal] = useState(false);
  const navigation = useNavigation();
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [appointment, setAppointment] = useState<AppointmentCreate>({
    guild: {} as GuildProps,
  } as AppointmentCreate);

  const handleOpenGuilds = () => {
    setOpenGuildsModal(true);
  };

  const handleGuildSelect = (guildsSelect: GuildProps) => {
    setAppointment({
      ...appointment,
      guild: guildsSelect,
    });
    setOpenGuildsModal(false);
  };

  const handleCategorySelect = (categoryId: string) => {
    categoryId === appointment.category
      ? setAppointment({
          ...appointment,
          category: "",
        })
      : setAppointment({
          ...appointment,
          category: categoryId,
        });
  };

  const handleSave = async () => {
    const newAppointment = {
      id: uuid.v4(),
      guild: appointment.guild,
      category: appointment.category,
      date: `${appointment.date.getDate()}/${appointment.date.getMonth()} às ${appointment.hour.getHours()}:${appointment.hour.getMinutes()}h`,
      description: appointment.description,
    };

    const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
    const appointments = storage ? JSON.parse(storage) : [];

    await AsyncStorage.setItem(
      COLLECTION_APPOINTMENTS,
      JSON.stringify([...appointments, newAppointment])
    );

    navigation.navigate("Home");
  };

  const onChange = ({ type }: DateTimePickerEvent, selectedDate: Date) => {
    if (mode === "date" && type === "set") {
      setAppointment({
        ...appointment,
        date: selectedDate,
      });
    }
    if (mode === "time" && type === "set") {
      setAppointment({
        ...appointment,
        hour: selectedDate,
      });
    }
    setShow(false);
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
    <>
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
              categorySelected={appointment.category}
            />

            <View style={styles.form}>
              <RectButton onPress={handleOpenGuilds}>
                <View style={styles.select}>
                  {appointment.guild.icon ? (
                    <GuildIcon
                      guildId={appointment.guild.id}
                      iconId={appointment.guild.icon}
                    />
                  ) : (
                    <View style={styles.image} />
                  )}

                  <View style={styles.selectBody}>
                    <Text style={styles.label}>
                      {appointment.guild.name
                        ? appointment.guild.name
                        : "Selecione um servidor"}
                    </Text>
                  </View>
                  <Icon />
                </View>
              </RectButton>

              <View style={styles.field}>
                <View>
                  <RectButton onPress={showDatepicker}>
                    <Text style={[styles.label, { marginBottom: 12 }]}>
                      Dia e mês
                    </Text>

                    <View style={styles.column}>
                      <SmallInput
                        text={
                          appointment.date
                            ? appointment.date.getDate().toString()
                            : ""
                        }
                      />
                      <Text style={styles.divider}>/</Text>
                      <SmallInput
                        text={
                          appointment.date
                            ? appointment.date.getMonth().toString()
                            : ""
                        }
                      />
                    </View>
                  </RectButton>
                </View>

                <View>
                  <RectButton onPress={showTimepicker}>
                    <Text style={[styles.label, { marginBottom: 12 }]}>
                      Hora e minuto
                    </Text>

                    <View style={styles.column}>
                      <SmallInput
                        text={
                          appointment.hour
                            ? appointment.hour.getHours().toString()
                            : ""
                        }
                      />
                      <Text style={styles.divider}>:</Text>
                      <SmallInput
                        text={
                          appointment.hour
                            ? appointment.hour.getMinutes().toString()
                            : ""
                        }
                      />
                    </View>
                  </RectButton>
                </View>
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
                onChangeText={(text: string) =>
                  setAppointment({
                    ...appointment,
                    description: text,
                  })
                }
              />

              <View style={styles.footer}>
                <Button title="Agendar" onPress={handleSave} />
              </View>
            </View>
          </ScrollView>
        </Background>

        <ModalView visible={openGuildsModal}>
          <Guilds handleGuildSelect={handleGuildSelect} />
        </ModalView>
      </KeyboardAvoidingView>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          mode={mode}
          onChange={(event: DateTimePickerEvent, date) => {
            date && onChange(event, date);
          }}
        />
      )}
    </>
  );
};

export default AppointmentCreate;
