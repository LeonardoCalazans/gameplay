import React from "react";
import { View } from "react-native";

import { styles } from "./styles";

type Props = {
  isCentered?: boolean;
};

const ListDivider = ({ isCentered }: Props) => {
  return (
    <View
      testID="listDivider"
      style={[
        styles.container,
        isCentered
          ? {
              marginVertical: 12,
            }
          : {
              marginTop: 2,
              marginBottom: 31,
            },
      ]}
    />
  );
};

export default ListDivider;
