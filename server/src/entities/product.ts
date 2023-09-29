type ProductProps = {
  id: string
  name: string
  slug: string
  imageUrl: string
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

  get isDeleted() {
    return this.props.isDeleted
  }

  get imageUrl() {
    return this.props.imageUrl
  }

  public delete() {
    this.props.isDeleted = true
  }

  constructor(private readonly props: ProductProps) {}
}
