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
import { products } from './data/products'

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

app.use(cors({
  origin: "*" 
}))

app.use(express.json());

const productRepo = new InMemoryProductRepo()
const cartRepo = new InMemoryCartRepo()

function populate() {
  products.forEach((product) => {
    productRepo.save(product)
  })
}

populate()
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
    res.send()
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
      price: z.preprocess(
        (a) => Number(a),
        z.number().positive()
      )
    })

    const { slug, name, description, price } = bodySchema.parse(request.body)
    const file = fileSchema.parse(request.file)

    const product = new Product({
      id: randomUUID(),
      slug,
      name,
      imageUrl: `http://localhost:3001/images/${file.filename}`,
      description,
      price
    })

    productRepo.save(product)
    res.status(201)
    res.send()
  } catch(err) {
    console.log(err)
    res.status(500)
    res.send()
  }
})

app.put('/product/:productSlug', upload.single('image'), async function handler (request, res) {
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
  }).optional()

  try {
    const bodySchema = z.object({
      slug: z.string(),
      name: z.string(),
      description: z.string(),
      price: z.preprocess(
        (a) => Number(a),
        z.number().positive()
      )
    })


    const { productSlug } = request.params
    const { name, description, price } = bodySchema.parse(request.body)

    const file = fileSchema.parse(request.file)
    const product = await productRepo.getProductByProductSlug(productSlug)

    if (!product) {
      res.status(409)
      res.send()
      return
    }

    product.setName(name)
    product.setDescription(description)
    product.setPrice(price)

    if(file) {
      product.setImageUrl(`http://localhost:3001/images/${file.filename}`)
    }

    productRepo.save(product)
    res.status(200)
    res.send()
  } catch(err) {
    console.log(err)
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
