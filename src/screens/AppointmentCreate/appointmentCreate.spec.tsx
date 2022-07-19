import React from "react";
import AppointmentCreate from ".";
import { render, fireEvent } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";
import { theme } from "../../global/styles/theme";

const Providers: React.FC = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      dispatch: jest.fn(),
    }),
  };
});

describe("Screen AppointmentCreate", () => {
  it("should be rendered", () => {
    const screen = render(<AppointmentCreate />, {
      wrapper: Providers,
    });

    expect(screen).toBeTruthy();
  });

  it("should be close Guilds modal when opening screen", () => {
    const { getByTestId } = render(<AppointmentCreate />, {
      wrapper: Providers,
    });

    const guildsModal = getByTestId("modal-guilds");

    expect(guildsModal.props.visible).toBeFalsy();
  });

  it("should be open Guilds modal when user click on button", () => {
    const { getByTestId } = render(<AppointmentCreate />, {
      wrapper: Providers,
    });

    const guildsModal = getByTestId("modal-guilds");
    const buttonGuilds = getByTestId("button-guilds");
    fireEvent.press(buttonGuilds);

    expect(guildsModal.props.visible).toBeTruthy();
  });
});
