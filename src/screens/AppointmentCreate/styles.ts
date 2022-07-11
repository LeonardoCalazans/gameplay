import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';
import { Feather } from "@expo/vector-icons";
import { Typography, Touchable, SmallInput } from '../../components';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    fontSize: 18,
    fontFamily: theme.fonts.title700,
    color: theme.colors.heading,
  },
  form: {
    paddingHorizontal: 24,
    marginTop: 32
  },
  select: {
    flexDirection: 'row',
    width: '100%',
    height: 68,
    borderColor: theme.colors.secondary50,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    paddingRight: 25,
    overflow: 'hidden',
  },
  selectBody: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: 64,
    height: 68,
    backgroundColor: theme.colors.secondary40,
    borderColor: theme.colors.secondary50,
    borderWidth: 1,
    borderRadius: 8,
  },
  field: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30
  },
  column: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  divider: {
    marginRight: 4,
    fontSize: 15,
    fontFamily: theme.fonts.text500,
    color: theme.colors.highlight
  },
  caracteresLimit: {
    fontFamily: theme.fonts.text400,
    fontSize: 13,
    color: theme.colors.highlight
  },
  footer: {
    marginVertical: 20,
    marginBottom: 56,
  }
});

export const InputDate = styled(SmallInput).attrs({
})`
  background-color: '#498545';
  color: '#498545';
`;

export const Icon = styled(Feather).attrs({
  name: "chevron-right",
  color: theme.colors.heading,
  size: 18,
})``;

export const LineWrapper = styled.View`
  background-color: ${theme.colors.secondary30};
`;

export const TouchableButton = styled(Touchable)`
  padding: 30px 32px;
  align-self: flex-end;
`;

export const TextButtonIOS = styled(Typography).attrs({})`
  color: ${theme.colors.heading};
  text-align: right;
  font-weight: bold;
`;
