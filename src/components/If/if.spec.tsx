import React from "react";
import { render } from "@testing-library/react-native";
import If from ".";
import { View } from "react-native";

describe("Component If", () => {

  it("should be render correctly", () => {
    const { getByTestId } = render(
      <If condition={true}>
        <View testID="if-view"></View>
      </If>
    );
    expect(getByTestId("if-view")).toBeTruthy();
  });

  it("should be not render children if condition is false", () => {
    const { queryAllByTestId } = render(
      <If condition={false}>
        <View testID="if-view">Test View Text</View>
      </If>
    );
    expect(queryAllByTestId("if-view")).toHaveLength(0);
  });
});
