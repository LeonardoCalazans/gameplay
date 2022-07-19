import { scale, moderateScale } from 'react-native-size-matters';
import styled, { css } from 'styled-components/native';

interface Props {
  active?: boolean;
}

export const Wrapper = styled.TextInput<Props>`
    width: 100%;
    height: ${scale(95)}px;
    background-color: ${({ theme }) => theme.colors.secondary40};
    color: ${({ theme }) => theme.colors.heading};
    border-radius: ${moderateScale(8)}px;
    font-family: ${({ theme }) => theme.fonts.text400};
    border-width: 1px;
    border-color: ${({ theme }) => theme.colors.secondary50};
    padding: 10px;
    text-align-vertical: top;
    justify-content: flex-start;
    ${({ active }) => active && css`
        border-color: ${({ theme }) => theme.colors.primary};
    `}
`;