export default class ProductDTO {
  constructor(product) {
    this.id = product.id || product._id;
    this.name = product.name;
    this.price = product.price;
    this.description = product.description;
    this.category = product.category;
  }
}
