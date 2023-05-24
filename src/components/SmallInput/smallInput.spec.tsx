import React from "react";
import { render } from "@testing-library/react-native";
import SmallInput from ".";
import { ThemeProvider } from "styled-components/native";
import { theme } from "../../global/styles/theme";

const Providers: React.FC = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

describe("Component SmallInput", () => {
  it("should be render correctly", () => {
    const { getByTestId } = render(<SmallInput />, {
      wrapper: Providers,
    });
    expect(getByTestId("smallInput")).toBeTruthy();
  });

  it("should be render text correctly", () => {
    const { getByText } = render(<SmallInput text={"Testing text"} />, {
      wrapper: Providers,
    });
    expect(getByText("Testing text")).toBeTruthy();
  });
});
