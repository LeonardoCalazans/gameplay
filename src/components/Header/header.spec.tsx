import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import Header from ".";
import { ReactTestInstance } from "react-test-renderer";

jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      dispatch: jest.fn(),
    }),
  };
});

describe("Component Header", () => {
  it("should be render component", () => {
    const { getByTestId } = render(<Header title="" />);
    expect(getByTestId("header")).toBeTruthy();
  });

  it("should be render component with title", () => {
    const titleMock = "titleMock";
    const { getByTestId } = render(<Header title={titleMock} />);

    const header = getByTestId("header");
    const title = header.props.children[1].props.children;

    const action = header.props.children[2];

    expect(action).toBeTruthy();

    expect(title).toEqual(titleMock);
  });

  // refazer esse teste
  it("should be render component with action", () => {
    const { getByTestId } = render(
      <Header title="" action={() => jest.fn()} />
    );
    const header = getByTestId("header");
    const action = header.props.children[2];

    expect(action).toBeTruthy();
    // expect(action).toBeCalled();
    // expect(action).toBeCalledTimes(1);
  });
});
