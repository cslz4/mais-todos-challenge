/* eslint-disable testing-library/prefer-screen-queries */
import * as Store from "@/hooks/use-cart";
import { customRender } from '@/tests/utils';
import { ProductList } from './ProductList';

const mockProducts = [
  { id: "1", name: 'Product 1', price: 10.99, description: "product 1", slug: 'product-1', imageUrl: "/image-product-1" },
  { id: "2", name: 'Product 2', price: 15.99, description: "product 2", slug: 'product-2', imageUrl: "/image-product-2" },
  { id: "3", name: 'Product 3', price: 20.99, description: "product 3", slug: 'product-3', imageUrl: "/image-product-3" },
];

let useCartSpy: jest.SpyInstance

beforeEach(() => {
  useCartSpy = jest.spyOn(Store, "useCart")
  useCartSpy.mockReturnValue({
    products: [],
    cartId: "123",
    totalAmmount: 0,
    add: jest.fn(),
    remove: jest.fn(),
    reset: jest.fn(),
    exists: jest.fn()
  })
})


test('renders a list of products', () => {
  const { getByText } = customRender(<ProductList products={mockProducts} />);

  mockProducts.forEach((product) => {
    const productName = getByText(product.name);
    const productPrice = getByText('R$ 10,99');

    expect(productName).toBeInTheDocument();
    expect(productPrice).toBeInTheDocument();
  });
});

test('renders no products when the products array is empty', () => {
  const { queryByText } = customRender(<ProductList products={[]} />);

  mockProducts.forEach((product) => {
    const productName = queryByText(product.name);
    const productPrice = queryByText('R$ 10,99');

    expect(productName).toBeNull();
    expect(productPrice).toBeNull();
  });
  });

test('renders no products when the products prop is not provided', () => {
  // @ts-ignore
  const { queryByText } = customRender(<ProductList />);

  mockProducts.forEach((product) => {
    const productName = queryByText(product.name);
    const productPrice = queryByText('R$ 10,99');

    expect(productName).toBeNull();
    expect(productPrice).toBeNull();
  });
});
