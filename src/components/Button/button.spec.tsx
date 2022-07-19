import React from "react";
import { render } from "@testing-library/react-native";
import Button from ".";

describe("Component Button", () => {
  it("should be render correctly", () => {
    const { getByTestId } = render(<Button title={""} />);
    expect(getByTestId("button")).toBeTruthy();
  });

  it("should be show correctly user input title", () => {
    const { getByText } = render(<Button title={"Title button"} />);
    const inputTitle = getByText("Title button");
    expect(inputTitle).toBeTruthy();
  });
  
});
