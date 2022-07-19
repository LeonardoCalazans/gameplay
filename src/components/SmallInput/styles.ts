import styled from 'styled-components/native';
import { scale, moderateScale } from 'react-native-size-matters';
import Typography from '../Typography';


export const Wrapper = styled.View`
  justify-content: center;
  width: ${scale(48)}px;
  height: ${scale(48)}px;
  border-radius: ${moderateScale(8)}px;
  background-color: ${({ theme }) => theme.colors.secondary40};
  margin-right: 4px;
  border-width: ${moderateScale(1)}px;
  border-color: ${({ theme }) => theme.colors.secondary50};
`;

export const Text = styled(Typography)`
  font-size: ${moderateScale(12)}px; 
  font-family: ${({ theme }) => theme.fonts.text400};
  color: ${({ theme }) => theme.colors.heading};
  text-align: center;
`;
