import { Product } from "../entities/product";

const url = `http://localhost:3001`

export const products: Product[] = [
  new Product({
    id: '1',
    name: 'Midnight Glasses',
    description: 'Our Midnight Glasses combines style and comfort.',
    slug: 'midnight-elegance-bonnet',
    imageUrl: `${url}/images/black-sun-glasses.webp`,
    price: 19.99,
  }),
  new Product({
    id: '2',
    name: 'Obsidian Comfort Pants',
    description: 'Introducing our Obsidian Comfort Pants, the ultimate blend of fashion and relaxation. These black pants are designed for both lounging at home and making a fashion statement outdoors. With a comfortable fit and timeless color, they are your go-to choice for versatile and stylish comfort.',
    slug: 'obsidian-confort-pants',
    imageUrl: `${url}/images/pants-black.png`,
    price: 29.99,
  }),
  new Product({
    id: '3',
    name: 'Raven Shadow Shorts',
    description: 'Embrace the casual charm of our Raven Shadow Shorts. These black shorts are perfect for active days or leisurely strolls. They offer a flattering fit and are made with breathable fabric, ensuring you stay comfortable and stylish during any activity.',
    slug: 'raven-shadow-shorts',
    imageUrl: `${url}/images/shorts-black.png`,
    price: 39.99,
  }),
  new Product({
    id: '4',
    name: 'Charcoal Cozy Sweatshirt',
    description: 'Stay warm and cozy in our Charcoal Cozy Sweatshirt. This black sweatshirt is a must-have for chilly days. Its soft, fleece-lined interior provides superior comfort, while the charcoal black color adds a touch of sophistication to your casual attire.',
    slug: 'charcoal-cozy-swatshirt',
    imageUrl: `${url}/images/sweatshirt-black.png`,
    price: 49.99,
  }),
  new Product({
    id: '5',
    name: 'Slate Gray Sweatshirt',
    description: 'Elevate your wardrobe with our Slate Gray Sweatshirt. Crafted in a versatile shade of gray, this sweatshirt offers style and comfort in one package. It\'s the perfect addition to your collection, ideal for layering or as a standalone statement piece.',
    slug: 'slate-gray-sweatshirt',
    imageUrl: `${url}/images/sweatshirt-gray.png`,
    price: 59.99,
  }),
  new Product({
    id: '6',
    name: 'Classic Black T-Shirt',
    description: 'The Classic Black T-Shirt is a wardrobe staple that never goes out of style. Made from premium black cotton, this t-shirt offers a comfortable fit and a timeless look. It\'s the perfect canvas for expressing your unique style, whether worn alone or layered with your favorite pieces.',
    slug: 'classic-black-t-shirt',
    imageUrl: `${url}/images/tshirt-black.png`,
    price: 69.99,
  }),
];
