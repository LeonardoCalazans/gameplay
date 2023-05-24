import React from "react";
import { render } from "@testing-library/react-native";
import { mockMaterialCommunityIcons } from "../../__tests__/mocks/vector-icons-mock";
import ButtonAdd from ".";

jest.mock("@expo/vector-icons", () => ({
  MaterialCommunityIcons: mockMaterialCommunityIcons,
}));

describe("Component ButtonAdd", () => {
  it("should be render correctly", () => {
    const { getByTestId } = render(<ButtonAdd />);
    expect(getByTestId("buttonAdd")).toBeTruthy();
  });

  it("should be render MaterialCommunityIcons", () => {
    const { getByTestId } = render(<ButtonAdd />);
    expect(getByTestId("material-community-icons-mock")).toBeTruthy();
  });
});
