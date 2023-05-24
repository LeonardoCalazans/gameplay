import React from "react";
import { render } from "@testing-library/react-native";
import ButtonIcon from ".";

describe("Component ButtonIcon", () => {
  it("should be render correctly", () => {
    const { getByTestId } = render(<ButtonIcon title={"testTitle"} />);
    expect(getByTestId("buttonIcon")).toBeTruthy();
  });

  it("should be show correctly user input title", () => {
    const { getByText } = render(<ButtonIcon title={"textTitle"} />);
    expect(getByText("textTitle")).toBeTruthy();
  });

  it("should be render correctly with image", () => {
    const { getByTestId } = render(<ButtonIcon title={"testTitle"} />);
    expect(getByTestId("buttonIcon-image")).toBeTruthy();
  });
});
