import React from "react";
import { mockGuildIcons } from "../../__tests__/mocks/guild-icons-mock";
import { render } from "@testing-library/react-native";
import Guild from ".";

jest.mock("../GuildIcon", () => mockGuildIcons);

const mockIcon = "https://i.imgur.com/wSTFkRM.png";
const validData = {
  id: "testId",
  name: "testName",
  icon: mockIcon,
  owner: false,
};

// SUT = System Under Test
const makeSut = () => {
  return render(<Guild data={validData} />);
};

describe("Component Guild", () => {
  beforeEach(() => {
    validData.id = "testId";
    validData.name = "testName";
    validData.icon = mockIcon;
    validData.owner = false;
  });

  it("should be render correctly", () => {
    const { getByTestId } = makeSut();
    expect(getByTestId("guild")).toBeTruthy();
  });

  it("should render correctly name", () => {
    const { getByText } = makeSut();
    expect(getByText(validData.name)).toBeTruthy();
  });

  it("should render 'Administrador' if owner is true", () => {
    validData.owner = true;
    const { getByText } = makeSut();

    expect(getByText("Administrador")).toBeTruthy();
  });

  it("should render 'Convidado' if owner is false", () => {
    const { getByText } = makeSut();

    expect(getByText("Convidado")).toBeTruthy();
  });

  it("should render GuildIcon with correct params", () => {
    const { getByTestId } = makeSut();

    expect(
      getByTestId(`mocked-guild-icons${validData.id}${validData.icon}`)
    ).toBeTruthy();
  });
});
