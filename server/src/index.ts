import Fastify, { FastifyInstance } from 'fastify'
import { InMemoryProductRepo } from './repos/in-memory-product-repo'
import { Product } from './entities/product'
import { randomUUID } from 'crypto'
import { z } from "zod"
import { ProductMapper } from './mappers/product-mapper'

const fastify: FastifyInstance = Fastify({})

const productRepo = new InMemoryProductRepo()

fastify.get('/product', async function handler () {
  const products = await productRepo.getProducts()

  return products.map(product => ProductMapper.toDTO(product))
})

fastify.get('/product/:slug', async function handler (request, reply) {
  const paramsSchema = z.object({
    slug: z.string(),
  })
  const params = paramsSchema.parse(request.params)
  const product = await productRepo.getProductByProductSlug(params.slug)

  if(!product) {
    reply.status(404)
    return
  }

  return ProductMapper.toDTO(product)
})

fastify.post('/product', async function handler (request, reply) {
  const bodySchema = z.object({
    slug: z.string(),
    name: z.string() 
  })

  const { slug, name } = bodySchema.parse(request.body)

  const product = new Product({
    id: randomUUID(),
    slug,
    name
  })

  const exists = await productRepo.exists(product.slug)

  if (exists) {
    reply.status(409)
    return
  }

  productRepo.save(product)
  reply.status(201)
})

fastify.delete('/product/:slug', async function handler (request, reply) {
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
  } catch {
    reply.status(400)
  }
})


fastify.listen({ port: 3000 }).then(() => {
  console.log(`Started server at 3000`)
})
