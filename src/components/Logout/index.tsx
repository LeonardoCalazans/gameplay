import React from "react";

import {
  Container,
  Title,
  Text,
  TextBoldWhite,
  TextBoldPrimary,
  OptionsButtons,
  CancelButton,
  ButtonText,
  LogOutButton,
} from "./styles";

type TLogoutProps = {
  goBack?: () => void;
  goConfirm?: () => void;
};

const Logout: React.FC<TLogoutProps> = ({ goBack, goConfirm }) => {
  return (
    <Container>
      <Title>
        <Text>Deseja sair do </Text>
        <TextBoldWhite>Game</TextBoldWhite>
        <TextBoldPrimary>Play</TextBoldPrimary>
        <TextBoldWhite>?</TextBoldWhite>
      </Title>

      <OptionsButtons>
        <CancelButton onPress={goBack}>
          <ButtonText>Não</ButtonText>
        </CancelButton>
        <LogOutButton onPress={goConfirm}>
          <ButtonText>Sim</ButtonText>
        </LogOutButton>
      </OptionsButtons>
    </Container>
  );
};

export default Logout;
