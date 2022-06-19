import React from "react";
import {
  View,
  Text,
  Image,
  Alert,
  ActivityIndicator,
  Button,
} from "react-native";

import IllustrationImg from "../../assets/illustration.png";
import { styles } from "./styles";
import { useAuth } from "../../hooks/auth";
import { theme } from "../../global/styles/theme";
import { Background } from "../../components";

const SignIn = () => {
  const { loading, signIn } = useAuth();
  const handleSignIn = async () => {
    try {
      await signIn();
    } catch (error) {
      console.log(error);
      Alert.alert(`${error}`);
    }
  };

  return (
    <Background>
      <View style={styles.container}>
        <Image
          source={IllustrationImg}
          style={styles.image}
          resizeMode="stretch"
        />
        <View style={styles.content}>
          <Text style={styles.title}>
            Conecte-se {`\n`}e organize suas {`\n`}
            jogatinas
          </Text>
          <Text style={styles.subtitle}>
            Crie grupos para jogar seus games {`\n`}
            favoritos com seus amigos
          </Text>
          {loading ? (
            <ActivityIndicator color={theme.colors.primary} />
          ) : (
            <Button title="Entrar com o discord" onPress={handleSignIn} />
          )}
        </View>
      </View>
    </Background>
  );
}

export default SignIn;
