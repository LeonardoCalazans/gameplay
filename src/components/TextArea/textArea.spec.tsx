import React from "react";
import { render } from "@testing-library/react-native";
import TextArea from ".";
import { ThemeProvider } from "styled-components/native";
import { theme } from "../../global/styles/theme";

const Providers: React.FC = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

describe("Component TextArea", () => {
  it("should be render correctly", () => {
    const { getByTestId } = render(
      <Providers>
        <TextArea />
      </Providers>
    );
    expect(getByTestId("textArea")).toBeTruthy();
  });

  it("must have specific border color when active", () => {
    const { getByTestId } = render(<TextArea active={true} />, {
      wrapper: Providers,
    });

    const textArea = getByTestId("textArea");

    expect(getByTestId("textArea")).toBeTruthy();
    expect(textArea.props.style[0].borderColor).toEqual(theme.colors.primary);
  });

  //criar o active quando false
});
