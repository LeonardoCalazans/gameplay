import { Inter_100Thin } from '@expo-google-fonts/inter';
import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: theme.colors.secondary40,
    marginRight: 4,
    borderWidth: 1,
    borderColor: theme.colors.secondary50
  },
  text: {
    fontSize: 13,
    fontFamily: theme.fonts.text400,
    color: theme.colors.heading,
    textAlign: 'center',
  }
});