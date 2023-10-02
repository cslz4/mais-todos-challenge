import express from 'express'
import { InMemoryProductRepo } from './repos/in-memory-product-repo'
import { Product } from './entities/product'
import { randomUUID } from 'crypto'
import { z } from "zod"
import multer from 'multer'
import cors from "cors"
import { ProductMapper } from './mappers/product-mapper'
import { InMemoryCartRepo } from './repos/in-memory-cart-repo'
import { Cart } from './entities/cart'
import { CartMapper } from './mappers/cart-mapper'

const stripe = require('stripe')('sk_test_Ho24N7La5CVDtbmpjc377lJI')

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, 'public/images')
  },
  filename: function (_req, file, cb) {
    const extArray = file.mimetype.split("/");
    const extension = extArray[extArray.length - 1];
    cb(null, file.fieldname + '-' + Date.now()+ '.' +extension)
  }})
const upload = multer({ storage: storage })
const app = express()
const port = 3001
const url = `http://localhost:${port}`

app.use(cors({
  origin: "*" 
}))
app.use(express.json());

const productRepo = new InMemoryProductRepo()
const cartRepo = new InMemoryCartRepo()

const products: Product[] = [
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

products.forEach((product) => {
  productRepo.save(product)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/product', async function handler (_req, res) {
  const products = await productRepo.getProducts()

  res.send(products.map(product => ProductMapper.toDTO(product)))
})

app.get('/product/:slug', async function handler (request, res) {
  const paramsSchema = z.object({
    slug: z.string(),
  })
  const params = paramsSchema.parse(request.params)
  const product = await productRepo.getProductByProductSlug(params.slug)

  if(!product) {
    res.status(404)
  } else {
    res.status(200)
    res.send(ProductMapper.toDTO(product))
  }
})

app.post('/product', upload.single('image'), async function handler (request, res) {
  const MAX_FILE_SIZE = 5000000
  const fileSchema = z.object({
    fieldname: z.string(),
    originalname: z.string(),
    encoding: z.string(),
    mimetype: z.string(),
    destination: z.string(),
    filename: z.string(),
    path: z.string(),
    size: z.number().refine(size => size <= MAX_FILE_SIZE)
  })

  try {
    const bodySchema = z.object({
      slug: z.string(),
      name: z.string(),
      description: z.string(),
      price: z.number()
    })

    const { slug, name, description, price } = bodySchema.parse(request.body)
    const file = fileSchema.parse(request.file)

    const product = new Product({
      id: randomUUID(),
      slug,
      name,
      imageUrl: `http://localhost:3000/images/${file.filename}`,
      description,
      price
    })

    const exists = await productRepo.exists(product.slug)

    if (exists) {
      res.status(409)
      res.send()
      return
    }

    productRepo.save(product)
    res.status(201)
    res.send()
  } catch {
    res.status(500)
    res.send()
  }
})

app.delete('/product/:slug', async function handler (request, res) {
  const paramsSchema = z.object({
    slug: z.string(),
  })

  try {
    const params = paramsSchema.parse(request.params)
    const product = await productRepo.getProductByProductSlug(params.slug)

    if(!product) {
      res.status(404)
      return
    }

    product.delete()
    await productRepo.save(product)

    res.status(200)
    res.send()
  } catch {
    res.status(400)
    res.send()
  }
})

app.post('/cart', async (_req, res) => {
  try {
    const cart = new Cart({
      id: randomUUID(),
      products: [],
    })

    await cartRepo.save(cart)

    res.status(201)
    res.send(CartMapper.toDTO(cart))
  } catch(err) {
    res.status(400)   
    res.send()
  }
})

app.put('/cart', async (req, res) => {
  const cartParamsSchema = z.object({
    cartId: z.string(),
    slugs: z.string().array()
  })

  try {
    const { cartId, slugs } = cartParamsSchema.parse(req.body)
    const cart = await cartRepo.getCartByCartId(cartId)

    if(!cart) {
      res.status(404)
      res.send()

      return
    }

    const products = await Promise.all(
      slugs.map(productSlug => productRepo.getProductByProductSlug(productSlug))
    ).then(list => list.filter(Boolean)) as Product[]

    cart.setProducts(products)

    await cartRepo.save(cart)

    res.status(200)
    res.send(CartMapper.toDTO(cart))
  } catch(err) {
    console.log(err)
    res.status(400)   
    res.send()
  }
})

app.get('/cart/:cartId', async (req, res) => {
  const cartParamsSchema = z.object({
    cartId: z.string()
  })

  try {
    const { cartId } = cartParamsSchema.parse(req.params)
    const cart = await cartRepo.getCartByCartId(cartId)

    if(!cart) {
      res.status(404)
      res.send()

      return
    }

    res.status(200)
    res.send(CartMapper.toDTO(cart))
  } catch(err) {
    console.log(err)
    res.status(400)   
    res.send()
  }
})




app.post('/create-checkout-session', async (req, res) => {
  const queryParamsSchema = z.object({
    cartId: z.string()
  })

  try {
    const { cartId } = queryParamsSchema.parse(req.query)
    const cart = await cartRepo.getCartByCartId(cartId)

    if(!cart) {
      res.status(404)
      res.send()

      return
    }

    const session = await stripe.checkout.sessions.create({
      line_items: cart.products.map(product => ({
        price_data: {
          currency: 'BRL',
          product_data: {
            name: product.name,
          },
          unit_amount: Math.ceil(product.price * 100), // cents
        },
        quantity: 1,
      })),
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000',
    });

    res.redirect(303, session.url);
  } catch(err) {
    console.log(err)
    res.status(400)   
    res.redirect(303, 'http://localhost:3000');
    res.send()
  }
});
 app.use(express.static('public'));
