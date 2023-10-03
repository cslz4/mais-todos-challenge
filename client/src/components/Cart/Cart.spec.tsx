/* eslint-disable testing-library/prefer-screen-queries */
import * as Store from "@/hooks/use-cart";
import { customRender } from "@/tests/utils";
import { fireEvent } from "@testing-library/react";
import { Cart } from "./Cart";

let useCartSpy: jest.SpyInstance

beforeEach(() => {
  useCartSpy = jest.spyOn(Store, "useCart")
  useCartSpy.mockReturnValue({
    products: [
      {
        id: '1',
        name: 'Midnight Glasses',
        description: 'Our Midnight Glasses combines style and comfort.',
        slug: 'midnight-elegance-bonnet',
        imageUrl: `/images/black-sun-glasses.webp`,
        price: 19.99
      },
      {
        id: '2',
        name: 'Moon Glasses',
        description: 'Our Moon Glasses combines style and comfort.',
        slug: 'moon-elegance-bonnet',
        imageUrl: `/images/moon-glasses.webp`,
        price: 40.30
      }
    ],
    cartId: "123",
    totalAmmount: 0,
    add: jest.fn(),
    remove: jest.fn(),
    reset: jest.fn(),
    exists: jest.fn(),
    isCartEmpty: false
  })
})

test('renders without crashing', () => {
  const { getByLabelText } = customRender(<Cart />);
  const cartButton = getByLabelText('Cart');
  expect(cartButton).toBeInTheDocument();
});

test('opens cart when the button is clicked', () => {
  const { getByLabelText, getByTestId } = customRender(<Cart />);
  const cartButton = getByLabelText('Cart');

  fireEvent.click(cartButton);

  const cartContainer = getByTestId('cart-container');
  expect(cartContainer).toHaveClass('translate-x-0');
});

test('closes cart when the close button is clicked', () => {
  const { getByLabelText, getByTestId } = customRender(<Cart />);
  const cartButton = getByLabelText('Cart');

  fireEvent.click(cartButton);

  const closeButton = getByLabelText('X');
  fireEvent.click(closeButton);

  const cartContainer = getByTestId('cart-container');
  expect(cartContainer).toHaveClass('translate-x-full');
});

test('displays product list when there are products in the cart', () => {
  const { getByText } = customRender(<Cart />);
  const product1 = getByText('Midnight Glasses');
  const product2 = getByText('Moon Glasses');
  expect(product1).toBeInTheDocument();
  expect(product2).toBeInTheDocument();
});

test('displays empty cart message when there are no products in the cart', () => {
  useCartSpy.mockReturnValue({
    products: [],
    cartId: "",
    totalAmmount: 0,
    add: jest.fn(),
    remove: jest.fn(),
    reset: jest.fn(),
    exists: jest.fn(),
    isCartEmpty: false
  })

  const { getByText } = customRender(<Cart />);
  const message = getByText('Nada por aqui. Adicione produtos para começar.');
  expect(message).toBeInTheDocument();
});

test('disable checkout button if the cart is empty', () => {
  useCartSpy.mockReturnValue({
    products: [],
    cartId: "",
    totalAmmount: 0,
    add: jest.fn(),
    remove: jest.fn(),
    reset: jest.fn(),
    exists: jest.fn(),
    isCartEmpty: true
  })

  const { getByText } = customRender(<Cart />);
  const checkoutButton = getByText('Checkout');
  expect(checkoutButton).toBeDisabled();
});
