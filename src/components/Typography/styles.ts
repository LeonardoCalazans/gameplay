import { moderateScale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const Text = styled.Text<TypographyType>`
  color: ${({ theme }) => theme.colors.heading};
  font-size: ${moderateScale(13)}px;
`;
