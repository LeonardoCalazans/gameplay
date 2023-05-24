import { render } from "@testing-library/react-native";
import React from "react";
import { View } from "react-native";
import Background from ".";

describe("Component Background", () => {
  it("should be render correctly", () => {
    const { container, getByTestId } = render(<Background />);

    expect(container).toBeTruthy();
    expect(getByTestId("background")).toBeTruthy();
  });
  it("should be render correctly params onLayout", () => {
    const { getByTestId } = render(<Background onLayout={jest.fn()} />);
    expect(getByTestId("background")).toBeTruthy();
  });
  it("should be render correctly params onLayout", () => {
    const { queryAllByTestId } = render(
      <Background
        children={<View testID="background-view">Test View Text</View>}
      />
    );

    expect(queryAllByTestId("background-view")).toHaveLength(1);
  });
});
