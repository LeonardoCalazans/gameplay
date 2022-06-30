import React, { useState } from "react";
import { View, Text } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useAuth } from "../../hooks/auth";
import Avatar from "../Avatar";
import ModalView from "../ModalView";
import { styles } from "./styles";
import Logout from "../Logout";

const Profile = () => {
  const { user, singOut } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <RectButton onPress={handleOpenModal}>
        <Avatar urlImage={user.avatar} />
      </RectButton>

      <View>
        <View style={styles.user}>
          <Text style={styles.greeting}>Olá,</Text>
          <Text style={styles.username}>{user.firstName}</Text>
        </View>
        <Text style={styles.message}>Hoje é dia de vitória</Text>
      </View>
      <ModalView visible={modalVisible} onRequestClose={handleCloseModal}>
        <Logout goBack={handleCloseModal} goConfirm={singOut} />
      </ModalView>
    </View>
  );
};

export default Profile;
