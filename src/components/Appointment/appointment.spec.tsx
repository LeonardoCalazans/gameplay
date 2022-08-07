import { mockFontisto, mockLinearGradient } from "../../__tests__/mocks";
import React from "react";
import { render } from "@testing-library/react-native";
import Appointment from ".";
import { View } from "react-native";
import { theme } from "../../global/styles/theme";
import GuildIcon from "../GuildIcon";
import { categories } from "../../ultis";

jest.mock("expo-linear-gradient", () => ({
  LinearGradient: mockLinearGradient,
}));

jest.mock("@expo/vector-icons", () => ({
  Fontisto: mockFontisto,
}));

// jest.mock("../GuildIcon", () => {
//   return {
//     GuildIcon: () => {
//       return <GuildIcon guildId={""} iconId={null} />;
//     },
//   };
// });

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

const deleteAppointment = async (id: AppointmentType["id"]) => {
  console.log(id);
};

const [categoryMock] = categories.filter((item: { id: string }) => {
  return item.id === dataMock.category;
});

const makeValidMockOwnerTestID = (colors: String[]) =>
  `appointment-owner-test${colors.join("")}`;

const { primary, on } = theme.colors;

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
      <Appointment data={dataMock} deleteAppointment={deleteAppointment} />
    );

    expect(getByTestId("appointment")).toBeTruthy();
  });

  it("should render correctly LinearGradient and GuildIcon", () => {
    const { getByTestId } = render(
      <Appointment data={dataMock} deleteAppointment={deleteAppointment} />
    );
  });

  it("should render correctly guild name", () => {
    const { getByText } = render(
      <Appointment data={dataMock} deleteAppointment={deleteAppointment} />
    );

    expect(getByText(dataMock.guild.name)).toBeTruthy();
  });

  it("should render correctly if title category existed", () => {
    const { getByText } = render(
      <Appointment data={dataMock} deleteAppointment={deleteAppointment} />
    );
    expect(getByText(categoryMock.title)).toBeTruthy();
  });
  //porque não funciona?
  it("should not render if title category not existed", () => {
    dataMock.category = "";

    const { getByText } = render(
      <Appointment data={dataMock} deleteAppointment={deleteAppointment} />
    );

    console.log(dataMock.category);
    console.log(categoryMock.title);

    expect(getByText(categoryMock.title)).toBeUndefined();
    expect(getByText("")).toBeTruthy();
  });
  //a fazer
  it("should render correctly icon trash in fontisto", () => {});
  //adicionar verificação de svg
  it("should render correctly date text and svg", () => {
    const { getByText } = render(
      <Appointment data={dataMock} deleteAppointment={deleteAppointment} />
    );

    expect(getByText(dataMock.date)).toBeTruthy();
  });
  //testar svg
  it("should render correctly player svg if owner true", () => {});
  it("should render correctly player svg if owner false", () => {});

  it("should render correctly owner when true in 'Anfitrião' and color when 'primary'", () => {
    const { getByText, getByTestId } = render(
      <Appointment data={dataMock} deleteAppointment={deleteAppointment} />
    );
    const owner = getByTestId(makeValidMockOwnerTestID([primary]));

    expect(getByText("Anfitrião")).toBeTruthy();
    expect(owner.props.style[1]).toEqual({ color: primary });
    expect(getByTestId(owner.props.testID)).toBeTruthy();
  });

  it("should render correctly owner when true in 'Visitante' and color when 'on'", () => {
    dataMock.guild.owner = false;
    const { getByText, getByTestId } = render(
      <Appointment data={dataMock} deleteAppointment={deleteAppointment} />
    );
    const owner = getByTestId(makeValidMockOwnerTestID([on]));

    expect(getByText("Visitante")).toBeTruthy();
    expect(owner.props.style[1]).toEqual({ color: on });
    expect(getByTestId(owner.props.testID)).toBeTruthy();
  });
});
