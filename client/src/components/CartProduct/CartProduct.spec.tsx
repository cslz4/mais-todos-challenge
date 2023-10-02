/* eslint-disable testing-library/prefer-screen-queries */
import * as Store from "@/store";
import { customRender } from "@/tests/utils";
import { fireEvent } from "@testing-library/react";
import { CartProduct } from "./CartProduct";

const mockProduct = {
  id: '1',
  name: 'Test Product',
  imageUrl: 'test-image.jpg',
  price: 10.99,
  description: 'Test Product',
  slug: 'test-product'
};

let useCartSpy: jest.SpyInstance
const removeMock = jest.fn();

beforeEach(() => {
  useCartSpy = jest.spyOn(Store, "useCart")
  useCartSpy.mockReturnValue({
    products: [],
    cartId: "123",
    totalAmmount: 0,
    add: jest.fn(),
    remove: removeMock,
    reset: jest.fn(),
    exists: jest.fn()
  })
})


test('renders the product details', () => {
  const { getByText, getByAltText } = customRender(<CartProduct product={mockProduct} />);

  const productName = getByText('Test Product');
  const productPrice = getByText('R$ 10,99');
  const productImage = getByAltText('Test Product');

  expect(productName).toBeInTheDocument();
  expect(productPrice).toBeInTheDocument();
  expect(productImage).toBeInTheDocument();
});

test('calls remove function when the remove button is clicked', () => {
  const { getByTestId } = customRender(<CartProduct product={mockProduct} />);
  const removeButton = getByTestId('remove-button');

  fireEvent.click(removeButton);

  expect(removeMock).toHaveBeenCalled();
});
