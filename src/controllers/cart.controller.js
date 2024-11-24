import { getCartById, updateCart } from "../services/cart.service.js";
import { getProductById, updateProduct } from "../services/product.service.js";
import { createTicket } from "../services/ticket.service.js";

export const purchaseCart = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const cart = await getCartById(cartId);

    if (!cart) {
      return res
        .status(404)
        .send({ status: "error", message: "Cart not found" });
    }

    const productsNotProcessed = [];
    let totalAmount = 0;

    // Iterar sobre los productos del carrito
    for (const item of cart.products) {
      const product = await getProductById(item.productId);

      if (!product) {
        productsNotProcessed.push(item.productId);
        continue;
      }

      if (product.stock >= item.quantity) {
        // Restar del stock del producto
        product.stock -= item.quantity;
        await updateProduct(product.id, { stock: product.stock });

        // Sumar al total de la compra
        totalAmount += product.price * item.quantity;
      } else {
        // Agregar a la lista de productos no procesados
        productsNotProcessed.push(item.productId);
      }
    }

    // Filtrar los productos que no pudieron procesarse y actualizar el carrito
    const productsToKeep = cart.products.filter((item) =>
      productsNotProcessed.includes(item.productId)
    );

    await updateCart(cartId, { products: productsToKeep });

    // Crear el ticket si hay al menos un producto comprado
    if (totalAmount > 0) {
      const ticketData = {
        amount: totalAmount,
        purchaser: req.user.email,
      };

      const ticket = await createTicket(ticketData);

      res.status(200).send({
        status: "success",
        message: "Purchase completed",
        payload: {
          ticket,
          productsNotProcessed,
        },
      });
    } else {
      res.status(400).send({
        status: "error",
        message: "No products could be purchased due to insufficient stock",
        productsNotProcessed,
      });
    }
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
};

export const addProductToCartController = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.body.productId;
    const quantity = req.body.quantity;

    const cart = await getCartById(cartId);

    if (!cart) {
      return res
        .status(404)
        .send({ status: "error", message: "Cart not found" });
    }

    const product = await getProductById(productId);

    if (!product) {
      return res
        .status(404)
        .send({ status: "error", message: "Product not found" });
    }

    if (product.stock < quantity) {
      return res.status(400).send({
        status: "error",
        message: "Insufficient stock",
        payload: { productId },
      });
    }

    const newProduct = {
      productId,
      quantity,
    };

    cart.products.push(newProduct);

    await updateCart(cartId, { products: cart.products });

    res.status(200).send({
      status: "success",
      message: "Product added to cart",
      payload: newProduct,
    });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
};
