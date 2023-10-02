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

  public setSlug(slug: string) {
    this.props.slug = slug
  }

  public setName(name: string) {
    this.props.name = name
  }

  public setDescription(description: string) {
    this.props.description = description
  }

  public setImageUrl(imageUrl:string) {
    this.props.imageUrl = imageUrl
  }

  public setPrice(price:number) {
    this.props.price = price
  }

  public delete() {
    this.props.isDeleted = true
  }

  constructor(private readonly props: ProductProps) {}
}
