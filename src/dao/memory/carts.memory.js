export default class CartMemory {
  constructor() {
    this.carts = [];
  }

  async getCarts() {
    return this.carts;
  }

  async getCartById(id) {
    return this.carts.find((cart) => cart.id === id);
  }

  async createCart(cart) {
    this.carts.push(cart);
    return cart;
  }

  async updateCart(id, cartData) {
    let cart = this.carts.find((cart) => cart.id === id);
    if (cart) {
      cart.products = cartData.products;
    }
    return cart;
  }

  async deleteCart(id) {
    let cart = this.carts.find((cart) => cart.id === id);
    if (cart) {
      this.carts = this.carts.filter((cart) => cart.id !== id);
      return cart;
    }
    return null;
  }
}
