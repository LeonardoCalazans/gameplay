import { makeValidMockLinearGradientTestID } from "../../__tests__/mocks/utils/linear-gradient";
import { mockLinearGradient } from "../../__tests__/mocks/linear-gradient-mock";
import React from "react";
import { render } from "@testing-library/react-native";
import Category from ".";
import { theme } from "../../global/styles/theme";
import Svg from "react-native-svg";
import { styles } from './styles';

jest.mock("expo-linear-gradient", () => ({
  LinearGradient: mockLinearGradient,
}));

describe("Component Category", () => {
  const mockSvg = jest.fn(() => <Svg testID="mocked-svg" />);
  const { secondary85, secondary70, secondary50, secondary40 } = theme.colors;

  it("should be render correctly", () => {
    const { getByTestId } = render(
      <Category title={"testTitle"} icon={mockSvg} checked={false} />
    );
    expect(getByTestId("category")).toBeTruthy();
  });

  it("should not render View if hasCheckBox is false", () => {
    const { queryAllByTestId } = render(
      <Category
        title={"textTitle"}
        icon={mockSvg}
        checked={true}
        hasCheckBox={false}
      />
    );

    expect(queryAllByTestId("checkbox")).toHaveLength(0);
  });

  it("should render View if hasCheckBox is true", () => {
    const { getByTestId } = render(
      <Category
        title={"textTitle"}
        icon={mockSvg}
        checked={true}
        hasCheckBox={true}
      />
    );

    expect(getByTestId("checkbox")).toBeTruthy();
  });

  it("should render correct Icon", () => {
    const { getByTestId } = render(
      <Category
        title={"textTitle"}
        icon={mockSvg}
        checked={true}
        hasCheckBox={true}
      />
    );

    expect(getByTestId("mocked-svg")).toBeTruthy();
  });

  it("should be render correctly text", () => {
    const { getByText } = render(
      <Category
        title={"textTitle"}
        icon={mockSvg}
        checked={true}
        hasCheckBox={true}
      />
    );
    expect(getByText("textTitle")).toBeTruthy();
  });

  it("should render linearGradient with correct colors", () => {
    const { getByTestId } = render(
      <Category
        title={"textTitle"}
        icon={mockSvg}
        checked={true}
        hasCheckBox={true}
      />
    );

    expect(
      getByTestId(makeValidMockLinearGradientTestID([secondary70, secondary50]))
    ).toBeTruthy();
  });

  it("should render linearGradient with correct colors if checked is true", () => {
    const { getByTestId } = render(
      <Category
        title={"textTitle"}
        icon={mockSvg}
        checked={true}
        hasCheckBox={true}
      />
    );

    expect(
      getByTestId(makeValidMockLinearGradientTestID([secondary85, secondary40]))
    ).toBeTruthy();
  });

  it("should render linearGradient with correct colors if checked is false", () => {
    const { getByTestId } = render(
      <Category
        title={"textTitle"}
        icon={mockSvg}
        checked={false}
        hasCheckBox={true}
      />
    );

    expect(
      getByTestId(makeValidMockLinearGradientTestID([secondary50, secondary40]))
    ).toBeTruthy();
  });

  it("should render checkBox View with correct style if checked is true", () => {
    const { getByTestId } = render(
      <Category
        title={"textTitle"}
        icon={mockSvg}
        checked={true}
        hasCheckBox={true}
      />
    );

    const checkBox = getByTestId("checkbox");

    expect(checkBox.props.style).toEqual(styles.checked);
  });

  it("should render checkBox View with correct style if checked is false", () => {
    const { getByTestId } = render(
      <Category
        title={"textTitle"}
        icon={mockSvg}
        checked={false}
        hasCheckBox={true}
      />
    );

    const checkBox = getByTestId("checkbox");

    expect(checkBox.props.style).toEqual(styles.check);
  });
});
