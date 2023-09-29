import express from 'express'
import { InMemoryProductRepo } from './repos/in-memory-product-repo'
import { Product } from './entities/product'
import { randomUUID } from 'crypto'
import { z } from "zod"
import multer from 'multer'
import { ProductMapper } from './mappers/product-mapper'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    const extArray = file.mimetype.split("/");
    const extension = extArray[extArray.length - 1];
    cb(null, file.fieldname + '-' + Date.now()+ '.' +extension)
  }})
const upload = multer({ storage: storage })
const app = express()
const port = 3000

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const productRepo = new InMemoryProductRepo()

app.get('/product', async function handler (req, reply) {
  const products = await productRepo.getProducts()

  reply.status(200)
  reply.json(products.map(product => ProductMapper.toDTO(product)))
  reply.send()
})

app.get('/product/:slug', async function handler (request, reply) {
  const paramsSchema = z.object({
    slug: z.string(),
  })
  const params = paramsSchema.parse(request.params)
  const product = await productRepo.getProductByProductSlug(params.slug)

  if(!product) {
    reply.status(404)
    reply.send()

    return
  }

  reply.status(200)
  reply.json(ProductMapper.toDTO(product))
  reply.send()
})

app.post('/product', upload.single('image'), async function handler (request, reply) {
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

  const bodySchema = z.object({
    slug: z.string(),
    name: z.string() 
  })

  const { slug, name } = bodySchema.parse(request.body)
  const file = fileSchema.parse(request.file)

  const product = new Product({
    id: randomUUID(),
    slug,
    name,
    imageUrl: `http://localhost:3000/images/${file.filename}`
  })

  const exists = await productRepo.exists(product.slug)

  if (exists) {
    reply.status(409)
    reply.send()
    return
  }

  productRepo.save(product)
  reply.status(201)
  reply.send()
})

app.delete('/product/:slug', async function handler (request, reply) {
  const paramsSchema = z.object({
    slug: z.string(),
  })

  try {
    const params = paramsSchema.parse(request.params)
    const product = await productRepo.getProductByProductSlug(params.slug)

    if(!product) {
      reply.status(404)
      return
    }

    product.delete()
    await productRepo.save(product)

    reply.status(200)
    reply.send()
  } catch {
    reply.status(400)
    reply.send()
  }
})

 app.use(express.static('public'));
