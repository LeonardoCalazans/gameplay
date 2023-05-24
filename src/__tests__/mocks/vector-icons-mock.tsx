import React from 'react';
import { View } from "react-native";

const mockMaterialCommunityIcons: React.FC = ({ ...props }) => {
  return <View {...props} testID="material-community-icons-mock" />;
};

export { mockMaterialCommunityIcons };
