import ProductDTO from "../../dao/DTOs/product.dto.js";

export default class ProductRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async getProducts() {
    return await this.dao.getProducts();
  }

  async getProductById(id) {
    return await this.dao.getProductById(id);
  }

  async createProduct(product) {
    let productData = new ProductDTO(product);
    console.log(productData);
    return await this.dao.createProduct(productData);
  }

  async updateProduct(id, productData) {
    return await this.dao.updateProduct(id, productData);
  }

  async deleteProduct(id) {
    return await this.dao.deleteProduct(id);
  }
}
