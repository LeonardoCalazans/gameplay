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
  If,
  ModalView,
  TextArea,
} from "../../components";
import {
  styles,
  Icon,
  LineWrapper,
  TouchableButton,
  TextButtonIOS,
  InputDate,
} from "./styles";
import uuid from "react-native-uuid";
import { useNavigation } from "@react-navigation/native";

import RNDateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLLECTION_APPOINTMENTS } from "../../configs/database";
import Guilds from "../Guilds";

type AppointmentCreate = {
  date: Date;
  hour: Date;
  category: string;
  guild: GuildType;
  description: string;
};

const AppointmentCreate = () => {
  const [openGuildsModal, setOpenGuildsModal] = useState(false);
  const navigation = useNavigation();
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [alert, setAlert] = useState(false);
  const [appointment, setAppointment] = useState<AppointmentCreate>({
    guild: {} as GuildType,
  } as AppointmentCreate);
  const displayPicker = Platform.OS === "ios" ? "spinner" : "default";

  const handleOpenGuilds = () => {
    setOpenGuildsModal(true);
  };

  const handleGuildSelect = (guildsSelect: GuildType) => {
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

  const onChangeDateAndroid = (
    { type }: DateTimePickerEvent,
    selectedDate: Date
  ) => {
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
    setAlert(false);
    setShow(false);
  };

  const showDatepicker = () => {
    setShow(true);
    setMode("date");
  };

  const showTimepicker = () => {
    setShow(true);
    setMode("time");
  };

  const onChangeDatePicker = (
    event: DateTimePickerEvent,
    date: Date | undefined
  ) => {
    if (date && Platform.OS !== "ios") onChangeDateAndroid(event, date);
    if (date && Platform.OS === "ios") onChangeDateIOS(event, date);
  };

  const closeButtonIOS = () => {
    if (mode === "date") {
      setAppointment({
        ...appointment,
        date: new Date(),
      });
    }
    if (mode === "time") {
      setAppointment({
        ...appointment,
        hour: new Date(),
      });
    }
    setShow(false);
    setAlert(false);
  };

  const onChangeDateIOS = (
    _event: DateTimePickerEvent,
    selectedDate: Date
  ): void => {
    if (mode === "date") {
      setAppointment({
        ...appointment,
        date: selectedDate,
      });
    }
    if (mode === "time") {
      setAppointment({
        ...appointment,
        hour: selectedDate,
      });
    }
    setShow(false);
    setAlert(false);
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
                      <InputDate
                        text={
                          appointment.date
                            ? appointment.date.getDate().toString()
                            : ""
                        }
                      />
                      <Text style={styles.divider}>/</Text>
                      <InputDate
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
                      <InputDate
                        text={
                          appointment.hour
                            ? appointment.hour.getHours().toString()
                            : ""
                        }
                      />
                      <Text style={styles.divider}>:</Text>
                      <InputDate
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
        <LineWrapper>
          <If condition={Platform.OS === "ios"}>
            <TouchableButton onPress={closeButtonIOS}>
              <TextButtonIOS>OK</TextButtonIOS>
            </TouchableButton>
          </If>
          <RNDateTimePicker
            testID="dateTimePicker"
            value={new Date()}
            display={displayPicker}
            mode={mode}
            onChange={onChangeDatePicker}
          />
        </LineWrapper>
      )}
    </>
  );
};

export default AppointmentCreate;
