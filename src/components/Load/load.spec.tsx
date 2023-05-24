import React from "react";
import { render } from "@testing-library/react-native";
import { theme } from "../../global/styles/theme";
import Load from ".";

describe("Load component", () => {
  it("should render an ActivityIndicator component", () => {
    const { getByTestId } = render(<Load />);
    const activityIndicator = getByTestId("Load");
    
    expect(activityIndicator).toBeTruthy();
    // expect to activityIndicator size large
    // console.log(activityIndicator.props.size);

  });
});
