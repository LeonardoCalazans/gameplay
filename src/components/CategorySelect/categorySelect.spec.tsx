import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { SvgProps } from "react-native-svg";
import { ReactTestInstance } from "react-test-renderer";
import CategorySelect from ".";
import Category from "../Category";

const categories = require("../../ultis");

describe("Component CategorySelect", () => {
  it("should be render component", () => {
    const { getByTestId } = render(
      <CategorySelect categorySelected={""} setCategory={jest.fn()} />
    );
    expect(getByTestId("category-select")).toBeTruthy();
  });

  it("should be render component with categories", () => {
    const { getByTestId } = render(
      <CategorySelect categorySelected={""} setCategory={jest.fn()} />
    );
    const category = getByTestId("category-select");
    const categoriesArr = category.children[0] as ReactTestInstance;

    const categoriesArrMock = categories.categories.map(
      (category: {
        id: React.Key;
        title: string;
        icon: React.FC<SvgProps>;
      }) => {
        return (
          <Category
            key={category.id}
            title={category.title}
            icon={category.icon}
            checked={category.id === ""}
            onPress={() => jest.fn()}
            hasCheckBox={false}
          />
        );
      }
    );

    // console.log("categoriesArrMock", categoriesArrMock);
    // console.log("categories", categories.categories);
    // console.log("categories", categories.categories.length);
    // console.log("categoriesArr", categoriesArr.props.children.props);
    // console.log(
    //   "categoriesArr",
    //   categoriesArr.props.children.map((item: any) => item.props)
    // );

    expect(categoriesArr.props.children.length).toBe(
      categories.categories.length
    );
    // expect(categoriesArr.props.children).toEqual(categories.categories);

    // isso ai aqui esta me dando muito nervoso
    expect(categoriesArr.props.children.props).toEqual(categoriesArrMock.props);
  });

  it("should be render the seleceted category with user click", () => {
    const useStateMock: any = (initState: false) => [initState, setStateMock];
    const setStateMock = jest.fn();
    jest.spyOn(React, "useState").mockImplementation(useStateMock);

    const { getByTestId } = render(
      <CategorySelect categorySelected={""} setCategory={useStateMock} />
    );

    const category = getByTestId("category-select");
    const categoriesArrMock = categories.categories.map(
      (category: {
        id: React.Key;
        title: string;
        icon: React.FC<SvgProps>;
      }) => {
        return (
          <Category
            key={category.id}
            title={category.title}
            icon={category.icon}
            checked={category.id === ""}
            onPress={() => setStateMock()}
            hasCheckBox={false}
          />
        );
      }
    );

    fireEvent.press(categoriesArrMock[0]);
    expect(setStateMock).toBeCalled();
  });
});
