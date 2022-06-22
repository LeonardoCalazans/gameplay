import React, { ReactNode } from "react";
import {
  View,
  Modal,
  ModalProps,
  TouchableWithoutFeedback,
} from "react-native";

import { styles } from "./styles";

import { Background } from "..";

type Props = ModalProps & {
  children: ReactNode;
};

const ModalView = ({ children, ...rest }: Props) => {
  return (
    <Modal transparent animationType="slide" statusBarTranslucent {...rest}>
      <TouchableWithoutFeedback>
        <View style={styles.overlay}>
          <View style={styles.container}>
            <Background>
              <View style={styles.bar} />
              {children}
            </Background>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ModalView;
