/* eslint-disable testing-library/prefer-screen-queries */
import * as Store from "@/hooks";
import { customRender } from "@/tests/utils";
import { fireEvent } from "@testing-library/react";
import { ProductListItem } from "./ProductListItem";

const mockProduct = {
  id: '1',
  name: 'Test Product',
  imageUrl: 'test-image.jpg',
  description: "",
  price: 10.99,
  slug: 'test-product',
};


let useCartSpy: jest.SpyInstance

const addMock = jest.fn()
const removeMock = jest.fn()
beforeEach(() => {
  useCartSpy = jest.spyOn(Store, "useCart")
  useCartSpy.mockReturnValue({
    products: [],
    cartId: "123",
    totalAmmount: 0,
    add: addMock,
    remove: removeMock,
    reset: jest.fn(),
    exists: jest.fn()
  })
})

test('renders product details', () => {
  const { getByText, getByAltText } = customRender(
    <ProductListItem product={mockProduct} />
  );

  const productName = getByText('Test Product');
  const productPrice = getByText('R$ 10,99');
  const productImage = getByAltText('Test Product');

  expect(productName).toBeInTheDocument();
  expect(productPrice).toBeInTheDocument();
  expect(productImage).toBeInTheDocument();
});

test('calls add function when add button is clicked', () => {
  const { getByText } = customRender(
    <ProductListItem product={mockProduct} />
  );
  const addButton = getByText('Adicionar ao carrinho');

  fireEvent.click(addButton);

  expect(addMock).toHaveBeenCalledWith(mockProduct);
});

test('calls remove function when remove button is clicked', () => {
  useCartSpy.mockReturnValue({
    products: [],
    cartId: "123",
    totalAmmount: 0,
    add: addMock,
    remove: removeMock,
    reset: jest.fn(),
    exists: () => true
  })

  const { getByText } = customRender(
    <ProductListItem product={{ ...mockProduct, id: '2' }} />
  );
  const removeButton = getByText('Remover do carrinho');

  fireEvent.click(removeButton);

  expect(removeMock).toHaveBeenCalledWith('2');
});

test('navigates to the product details page when the link is clicked', () => {
  const { getByText } = customRender(
    <ProductListItem product={mockProduct} />
  );
  const productLink = getByText('Test Product');

  fireEvent.click(productLink);
});
