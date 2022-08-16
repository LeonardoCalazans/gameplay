import { makeValidMockLinearGradientTestID } from "../../__tests__/mocks/utils";
import {
  mockFontisto,
  mockGuildIcons,
  mockLinearGradient,
} from "../../__tests__/mocks";
import React from "react";
import Svg from "react-native-svg";
import { render } from "@testing-library/react-native";
import { ReactTestInstance } from "react-test-renderer";
import Appointment from ".";
import { theme } from "../../global/styles/theme";

jest.mock("expo-linear-gradient", () => ({
  LinearGradient: mockLinearGradient,
}));
jest.mock("@expo/vector-icons", () => ({
  Fontisto: mockFontisto,
}));
jest.mock("../GuildIcon", () => mockGuildIcons);
const deleteAppointment = jest.fn();
const mockSvg = jest.fn(() => <Svg testID="mocked-svg" />);

const makeValidMockOwnerTestID = (colors: String[]) =>
  `appointment-owner-test${colors.join("")}`;

const dataMock = {
  id: "test-id-data",
  guild: {
    id: "test-id-guild",
    name: "test-name-guild",
    icon: "test-icon-guild",
    owner: true,
  },
  category: "1",
  date: "2020-01-01",
  description: "test-description",
};
const categoryMock = { id: "1", title: "Ranqueada", icon: mockSvg };

const { secondary70, secondary50, primary, on } = theme.colors;

describe("Component Appointment", () => {
  beforeEach(() => {
    dataMock.id = "test-id-data";
    dataMock.guild = {
      id: "test-id-guild",
      name: "test-name-guild",
      icon: "test-icon-guild",
      owner: true,
    };
    dataMock.category = "1";
    dataMock.date = "2020-01-01";
    dataMock.description = "test-description";
  });

  it("should render correctly", () => {
    const { getByTestId } = render(
      <Appointment data={dataMock} deleteAppointment={jest.fn()} />
    );

    expect(getByTestId("appointment")).toBeTruthy();
  });

  it("should render correctly LinearGradient", () => {
    const { getByTestId } = render(
      <Appointment data={dataMock} deleteAppointment={deleteAppointment} />
    );

    expect(
      getByTestId(makeValidMockLinearGradientTestID([secondary50, secondary70]))
    ).toBeTruthy();
  });

  it("should render correctly guildIcon", () => {
    const { getByText, getByTestId } = render(
      <Appointment data={dataMock} deleteAppointment={deleteAppointment} />
    );

    expect(
      getByTestId(
        `mocked-guild-icons${dataMock.guild.id}${dataMock.guild.icon}`
      )
    ).toBeTruthy();
    expect(getByText(dataMock.guild.name)).toBeTruthy();
  });

  it("should render category title", () => {
    const { getByTestId } = render(
      <Appointment data={dataMock} deleteAppointment={deleteAppointment} />
    );

    const textCategoryTitle = getByTestId("appointment-category-title");

    expect(textCategoryTitle.children[0]).toBe(categoryMock.title);
  });

  it("should not render category title when category is not defined", () => {
    dataMock.category = undefined as any;
    const { getByTestId } = render(
      <Appointment data={dataMock} deleteAppointment={deleteAppointment} />
    );

    const textCategoryTitle = getByTestId("appointment-category-title");

    expect(textCategoryTitle.children[0]).toBeUndefined();
  });

  it("should render correctly icon trash in fontisto", () => {
    const { getByTestId } = render(
      <Appointment data={dataMock} deleteAppointment={deleteAppointment} />
    );

    const iconTrash = getByTestId("fontisto");

    expect(iconTrash).toBeTruthy();
  });

  it("should render correctly date", () => {
    const { getByTestId } = render(
      <Appointment data={dataMock} deleteAppointment={deleteAppointment} />
    );

    const viewAppointmentDate = getByTestId("appointment-dateInfo");
    const textDate = viewAppointmentDate.children[1] as ReactTestInstance;

    expect(textDate.instance.props.children).toBe(dataMock.date);
  });

  it("should render correctly svg", () => {
    const { getByTestId } = render(
      <Appointment data={dataMock} deleteAppointment={deleteAppointment} />
    );

    const viewAppointmentDate = getByTestId("appointment-dateInfo");
    const svgCalendar = viewAppointmentDate.children[0] as ReactTestInstance;

    expect(svgCalendar.type).toBe("calendar.svg");
  });

  //duas formas de fazer o test vendo props
  it("should render correctly player svg if owner true", () => {
    const { getByTestId } = render(
      <Appointment data={dataMock} deleteAppointment={deleteAppointment} />
    );

    const viewAppointmentDate = getByTestId("appointment-playersInfo");
    const svgPlayerPrimary = viewAppointmentDate
      .children[0] as ReactTestInstance;

    expect(svgPlayerPrimary.type).toBe("player.svg");
    expect(svgPlayerPrimary.props.fill).toBe(primary);
  });

  it("should render correctly player svg if owner false", () => {
    dataMock.guild.owner = false;
    const { getByTestId } = render(
      <Appointment data={dataMock} deleteAppointment={deleteAppointment} />
    );

    const viewAppointmentDate = getByTestId("appointment-playersInfo");
    const svgPlayerOn = viewAppointmentDate.children[0] as ReactTestInstance;

    expect(svgPlayerOn.type).toBe("player.svg");
    expect(svgPlayerOn.props.fill).toBe(on);
  });
  //outra forma - pegando o testID dinâmico
  it("should render correctly owner when true in 'Anfitrião' and color when 'primary'", () => {
    const { getByText, getByTestId } = render(
      <Appointment data={dataMock} deleteAppointment={deleteAppointment} />
    );

    const owner = getByTestId(makeValidMockOwnerTestID([primary]));

    expect(getByText("Anfitrião")).toBeTruthy();
    expect(owner.props.style[1]).toEqual({ color: primary });
  });

  it("should render correctly owner when true in 'Visitante' and color when 'on'", () => {
    dataMock.guild.owner = false;

    const { getByText, getByTestId } = render(
      <Appointment data={dataMock} deleteAppointment={deleteAppointment} />
    );

    const owner = getByTestId(makeValidMockOwnerTestID([on]));

    expect(getByText("Visitante")).toBeTruthy();
    expect(owner.props.style[1]).toEqual({ color: on });
  });
});
