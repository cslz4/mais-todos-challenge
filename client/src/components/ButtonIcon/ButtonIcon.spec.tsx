/* eslint-disable testing-library/prefer-screen-queries */
import { customRender } from "@/tests/utils";
import { fireEvent } from "@testing-library/react";
import { createRef } from "react";
import { ButtonIcon } from "./ButtonIcon";

test("render correctly", () => {
  const { getByRole } = customRender(<ButtonIcon>Click me</ButtonIcon>);
  const buttonElement = getByRole("button");
  expect(buttonElement).toBeInTheDocument();
});

test("renders the specified component when prop is provided", () => {
  const { getByText } = customRender(<ButtonIcon as="a">Click me</ButtonIcon>);
  const anchorElement = getByText("Click me");
  expect(anchorElement).toBeInTheDocument();
  expect(anchorElement.tagName.toLowerCase()).toBe("a");
});

test("forwards ref to the button element", () => {
  const buttonRef = createRef<HTMLButtonElement>();
  customRender(<ButtonIcon ref={buttonRef}>Click me</ButtonIcon>);
  const buttonElement = buttonRef.current;
  expect(buttonElement).toBeInTheDocument();
});

test("triggers onClick event when the button is clicked", () => {
  const handleClick = jest.fn();
  const { getByRole } = customRender(
    <ButtonIcon onClick={handleClick}>Click me</ButtonIcon>,
  );
  const buttonElement = getByRole("button");

  fireEvent.click(buttonElement);

  expect(handleClick).toHaveBeenCalledTimes(1);
});

test("renders children inside the button", () => {
  const { getByText } = customRender(<ButtonIcon>Click me</ButtonIcon>);
  const buttonText = getByText("Click me");
  expect(buttonText).toBeInTheDocument();
});
