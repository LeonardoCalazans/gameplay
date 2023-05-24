import React from "react";
import { render } from "@testing-library/react-native";
import { mockLinearGradient } from "../../__tests__/mocks/linear-gradient-mock";
import { makeValidMockLinearGradientTestID } from '../../__tests__/mocks/utils/linear-gradient';
import Avatar from ".";
import { theme } from "../../global/styles/theme";

jest.mock("expo-linear-gradient", () => ({
  LinearGradient: mockLinearGradient,
}));

describe("Component Avatar", () => {
  const { secondary70, secondary50 } = theme.colors;

  it("should be render correctly with correctly colors", () => {
    const { getByTestId } = render(<Avatar urlImage={""} />);
    expect(getByTestId(makeValidMockLinearGradientTestID([secondary70, secondary50]))).toBeTruthy();
  });

  it("should be render correctly with urlImage", () => {
    const urlImage = "https://i.pravatar.cc/300";

    const { getByTestId } = render(<Avatar urlImage={urlImage} />);

    expect(getByTestId(urlImage)).toBeTruthy();
  });
});
