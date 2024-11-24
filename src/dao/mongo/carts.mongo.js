import Cart from "./models/cart.model.js";
export default class CartsMongo {
  async getCarts() {
    return await Cart.find();
  }

  async getCartById(id) {
    return await Cart.findById(id);
  }

  async createCart(cartData) {
    return await Cart.create(cartData);
  }

  async updateCart(id, cartData) {
    return await Cart.findByIdAndUpdate(id, cartData, { new: true });
  }

  async deleteCart(id) {
    return await Cart.findByIdAndDelete(id);
  }
}
