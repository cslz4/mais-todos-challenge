import { Product } from "./product"

type CartProps = {
  id: string
  products: Product[]
  isDeleted?: boolean
}

export class Cart {
  get id() {
    return this.props.id
  }

  get products() {
    return this.props.products
  }

  get isDeleted() {
    return this.props.isDeleted
  }

  public setProducts(products: Product[]) {
    this.props.products = products
  }

  public delete() {
    this.props.isDeleted = true
  }

  constructor(private readonly props: CartProps) {}
}
