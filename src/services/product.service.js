import { productsService } from "../repositories/index.js";

export const getProducts = async () => {
  return await productsService.getProducts();
};

export const getProductById = async (id) => {
  return await productsService.getProductById(id);
};

export const createProduct = async (productData) => {
  return await productsService.createProduct(productData);
};

export const updateProduct = async (id, productData) => {
  return await productsService.updateProduct(id, productData);
};

export const deleteProduct = async (id) => {
  return await productsService.deleteProduct(id);
};
