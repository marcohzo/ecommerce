import ProductRepository from "./product.repository.js";
import { getProductsDao } from "../../dao/factory.js";

export default class ProductRepositoryMemory extends ProductRepository {
  constructor() {
    super();
    this.productDao = getProductsDao();
  }

  // Implementa los métodos de manera similar al repositorio MongoDB
}
