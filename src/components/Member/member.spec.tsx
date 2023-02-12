import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import Member from ".";

//mock for component avatar
jest.mock("../Avatar", () => {
  return {
    __esModule: true,
    default: (props: any) => {
      return <div data-testid="avatar" {...props} />;
    },
  };
});

const dataMock = {
  id: "1",
  username: "usernameMock",
  avatar_url: "avatar_urlMock",
  status: "online",
};

describe("Component Member", () => {
  it("should be render component", () => {
    const { getByTestId } = render(<Member data={dataMock} />);

    const member = getByTestId("member");

    expect(member).toBeTruthy();
  });

  it("should be render component with data", () => {
    const dataMock = {
      id: "1",
      username: "usernameMock",
      avatar_url: "avatar_urlMock",
      status: "online",
    };

    const { getByTestId, getByText } = render(<Member data={dataMock} />);
    const member = getByTestId("member");
    const memberStatus = getByTestId("member-status");

    const username = getByText(dataMock.username).props.children;
    const avatar = member.props.children[0].props.urlImage;
    const isOnline = memberStatus.props;
    console.log(isOnline) //vem undefined

    const colorStatus = memberStatus.props.style[1].backgroundColor;

    expect(member).toBeTruthy();
    expect(username).toEqual(dataMock.username);
    expect(avatar).toEqual(dataMock.avatar_url);
    expect(colorStatus).toEqual("#32BD50");
  });

  it("should be render component with data and status offline", () => {
    const dataMock = {
      id: "1",
      username: "usernameMock",
      avatar_url: "avatar_urlMock",
      status: "offline",
    };

    const { getByTestId, getByText } = render(<Member data={dataMock} />);
    const member = getByTestId("member");
    const memberStatus = getByTestId("member-status");

    const username = getByText(dataMock.username).props.children;
    const avatar = member.props.children[0].props.urlImage;

    const colorStatus = memberStatus.props.style[1].backgroundColor;

    expect(member).toBeTruthy();
    expect(username).toEqual(dataMock.username);
    expect(avatar).toEqual(dataMock.avatar_url);
    expect(colorStatus).toEqual("#E51C44");
  });
});
