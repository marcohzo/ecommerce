import { cartsService } from "../repositories/index.js";

export const getCartById = async (id) => {
  try {
    const cart = await cartsService.getCartById(id);
    return cart;
  } catch (error) {
    throw new Error(`Error fetching cart: ${error.message}`);
  }
};

export const updateCart = async (id, cartData) => {
  try {
    const updatedCart = await cartsService.updateCart(id, cartData);
    return updatedCart;
  } catch (error) {
    throw new Error(`Error updating cart: ${error.message}`);
  }
};
