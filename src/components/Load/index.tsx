import React from 'react';

import {
  View,
  ActivityIndicator
} from 'react-native';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';

const Load = () => {
  return (
    <View style={styles.container} testID={"Load"}>
      <ActivityIndicator 
        size="large"
        color={theme.colors.primary}
      />
    </View>
  );
}

export default Load;
