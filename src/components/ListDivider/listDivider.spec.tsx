import React from "react";
import { render } from "@testing-library/react-native";
import ListDivider from ".";

describe("Component ListDivider", () => {
  it("should be render component", () => {
    const { getByTestId } = render(<ListDivider />);

    const listDivider = getByTestId("listDivider");

    expect(listDivider).toBeTruthy();
    expect(listDivider.props.style[1]).toEqual({
      marginTop: 2,
      marginBottom: 31,
    });
  });

  it("should be render component with isCentered", () => {
    const { getByTestId } = render(<ListDivider isCentered={true} />);

    const listDivider = getByTestId("listDivider");

    expect(listDivider).toBeTruthy();
    expect(listDivider.props.style[1]).toEqual({
      marginVertical: 12,
    });
  });
});
