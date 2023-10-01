type ProductProps = {
  id: string
  name: string
  description: string
  slug: string
  imageUrl: string
  price: number
  isDeleted?: boolean
}

export class Product {
  get id() {
    return this.props.id
  }

  get name() {
    return this.props.name
  }

  get slug() {
    return this.props.slug
  }

  get description() {
    return this.props.description
  }

  get isDeleted() {
    return this.props.isDeleted
  }

  get imageUrl() {
    return this.props.imageUrl
  }

  get price() {
    return this.props.price
  }

  public delete() {
    this.props.isDeleted = true
  }

  constructor(private readonly props: ProductProps) {}
}
