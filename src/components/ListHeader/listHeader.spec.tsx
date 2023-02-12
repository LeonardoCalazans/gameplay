import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import ListHeader from ".";

describe("Component ListHeader", () => {
  it("should be render component", () => {
    const { getByTestId } = render(<ListHeader title="" subtitle="" />);

    const listHeader = getByTestId("listHeader");

    expect(listHeader).toBeTruthy();
  });

  it("should be render component with title and subtitle", () => {
    const titleMock = "titleMock";
    const subtitleMock = "subtitleMock";

    const { getByTestId } = render(
      <ListHeader title={titleMock} subtitle={subtitleMock} />
    );

    const listHeader = getByTestId("listHeader");

    const title = listHeader.props.children[0].props.children;
    const subtitle = listHeader.props.children[1].props.children;

    expect(title).toEqual(titleMock);
    expect(subtitle).toEqual(subtitleMock);
  });
});
