import React from "react";
import { render } from "@testing-library/react-native";
import Typography from ".";
import { ThemeProvider } from "styled-components/native";
import { theme } from "../../global/styles/theme";

const Providers: React.FC = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

describe("Component Typography", () => {
  it("should be render correctly", () => {
    const { getByTestId } = render(<Typography />, {
      wrapper: Providers,
    });
    expect(getByTestId("typography")).toBeTruthy();
  });

  it("should be render text correctly", () => {
    const { getByText } = render(<Typography children={"Testing text"} />, {
      wrapper: Providers,
    });
    expect(getByText("Testing text")).toBeTruthy();
  });

  it("must have specific color font", () => {
    const { getByTestId } = render(<Typography children={"Testing text"} />, {
      wrapper: Providers,
    });

    const typography = getByTestId("typography");

    expect(typography.props.style[0].color).toEqual(theme.colors.heading);
  });

  it("should be render text acessibility correctly", () => {
    const { getByTestId } = render(<Typography children={"Testing text"} />, {
      wrapper: Providers,
    });

    const typography = getByTestId("typography");

    expect(typography.props.accessibility).toEqual("Testing text");
  });

  it("should be render text acessibilityLabel correctly", () => {
    const { getByTestId } = render(<Typography children={"Testing text"} />, {
      wrapper: Providers,
    });

    const typography = getByTestId("typography");

    expect(typography.props.accessibilityLabel).toEqual("Testing text");
  });
});
