/* eslint-disable testing-library/prefer-screen-queries */
import * as Store from "@/store";
import { customRender } from "@/tests/utils";

import { fireEvent } from '@testing-library/react';
import { ProductDetails } from './ProductDetails';


let useCartSpy: jest.SpyInstance
const addMock = jest.fn();
const removeMock = jest.fn()
const useCartReturn = {
  products: [],
  cartId: "123",
  totalAmmount: 0,
  add: addMock,
  remove: removeMock,
  reset: jest.fn(),
  exists: jest.fn()
}

beforeEach(() => {
  jest.restoreAllMocks()
  useCartSpy = jest.spyOn(Store, "useCart")
  useCartSpy.mockReturnValue(useCartReturn)
})

const mockProduct = {
  id: '1',
  name: 'Test Product',
  imageUrl: 'test-image.jpg',
  description: 'This is a test product description.',
  price: 10.99,
  slug: 'test-product',
};

test('renders product details', () => {
  const { getByText, getByAltText } = customRender(
    <ProductDetails product={mockProduct} />
  );

  const productName = getByText('Test Product');
  const productDescription = getByText('This is a test product description.');
  const productPrice = getByText('R$ 10,99');
  const productImage = getByAltText('Test Product');

  expect(productName).toBeInTheDocument();
  expect(productDescription).toBeInTheDocument();
  expect(productPrice).toBeInTheDocument();
  expect(productImage).toBeInTheDocument();
  });

test('calls add function when the button is clicked', () => {
  const { getByText } = customRender(
    <ProductDetails product={mockProduct} />
  );
  const addButton = getByText('Adicionar ao carrinho');

  fireEvent.click(addButton);

  expect(addMock).toHaveBeenCalledWith(mockProduct);
});

test('calls remove function when the button is clicked', () => {
  useCartSpy.mockReturnValue({
    ...useCartReturn,
    exists: () => true
  })
  const { getByText } = customRender(
    <ProductDetails product={{ ...mockProduct, id: '2' }} />
  );
  const removeButton = getByText('Remover do carrinho');

  fireEvent.click(removeButton);

  expect(removeMock).toHaveBeenCalledWith("2");
});

test('renders the edit link with correct path', () => {
  const { getByRole } = customRender(
    <ProductDetails product={mockProduct} />
  );
  const editLink = getByRole('link', { name: 'Editar produto' });

  expect(editLink).toHaveAttribute('href', '/admin/edit-product/test-product');
});
