/* eslint-disable testing-library/prefer-screen-queries */
import { customRender } from "@/tests/utils";
import { fireEvent } from "@testing-library/react";
import { createRef } from "react";
import { Input } from "./Input";

test('renders the input field with label', () => {
  const { getByLabelText } = customRender(<Input label="Name" />);
  const inputElement = getByLabelText('Name');
  expect(inputElement).toBeInTheDocument();
});

test('renders the input field with a placeholder', () => {
  const { getByPlaceholderText } = customRender(<Input label="Email" placeholder="Enter your email" />);
  const inputElement = getByPlaceholderText('Enter your email');
  expect(inputElement).toBeInTheDocument();
});

test('renders an error message', () => {
  const { getByText } = customRender(<Input label="Password" error="Password is required" />);
  const errorMessage = getByText('Password is required');
  expect(errorMessage).toBeInTheDocument();
});

test('forwards ref to the input element', () => {
  const inputRef = createRef<HTMLInputElement>();
  const { getByLabelText } = customRender(<Input label="Username" ref={inputRef} />);
  const inputElementByRef = inputRef.current;
  const inputElement = getByLabelText('Username')
  expect(inputElementByRef).toEqual(inputElement)
});

test('triggers onChange event when the input value changes', () => {
  const handleChange = jest.fn();
  const { getByLabelText } = customRender(<Input label="Search" onChange={handleChange} />);
  const inputElement = getByLabelText('Search');

  fireEvent.change(inputElement, { target: { value: 'test' } });

  expect(handleChange).toHaveBeenCalledTimes(1);
});
