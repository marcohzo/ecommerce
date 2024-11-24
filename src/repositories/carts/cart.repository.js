import CartDTO from "../../dao/DTOs/cart.dto.js";

export default class CartRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async getCarts() {
    return await this.dao.getCarts();
  }

  async getCartById(id) {
    return await this.dao.getCartById(id);
  }

  async createCart(cart) {
    let cartData = new CartDTO(cart);
    return await this.dao.createCart(cartData);
  }

  async updateCart(id, cartData) {
    return await this.dao.updateCart(id, cartData);
  }

  async deleteCart(id) {
    return await this.dao.deleteCart(id);
  }
}
