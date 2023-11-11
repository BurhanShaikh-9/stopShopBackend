const CartModel = require("../model/cart");
const Product = require('../model/product')


const createCart = async (req, res) => {
  const { userId, products } = req.body;
  try {
    const existingCart = await CartModel.findOne({ userId });
    if (existingCart) {
      // If the cart already exists, update the products and totalAmount
      const totalAmount = await calculateTotalAmount(products);
      existingCart.products = mergeProducts(existingCart.products, products);
      existingCart.totalAmount = totalAmount;
      await existingCart.save();
      res.status(200).json({ message: "Cart updated successfully.", cart: existingCart });
    } else {
      const totalAmount = await calculateTotalAmount(products);
      const newCart = new CartModel({
        userId,
        products,
        totalAmount,
      });
      await newCart.save();
      res.status(201).json({ message: "Cart created successfully.", cart: newCart });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const calculateTotalAmount = async (products) => {
  try {
    let totalAmount = 0;
    for (const product of products) {
      const { productAmount } = await Product.findById(product.itemId);
      const productTotal = productAmount * product.quantity;
      totalAmount += productTotal;
    }
    return totalAmount;
  } catch (error) {
    console.log(error, 'error in Calculate Total Amount');
    throw new Error("Error calculating total amount");
  }
};

const mergeProducts = (existingProducts, newProducts) => {
  for (const newProduct of newProducts) {
    const existingProductIndex = existingProducts.findIndex((p) => p.itemId === newProduct.itemId);
    if (existingProductIndex !== -1) {
      // Product with the same itemId already exists, update its quantity
      existingProducts[existingProductIndex].quantity = newProduct.quantity;
    } else {
      // Product doesn't exist, add it to the existing products
      existingProducts.push(newProduct);
    }
  }
  return existingProducts;
};

const getCartByUser = async (req, res) => {
  const { userId } = req.params; 

  try {
    const cart = await CartModel.findOne({ userId });
    console.log(cart, 'carttt');

    if (cart) {
      res.status(200).json({ message: "Cart found.", cart });
    } else {
      res.status(404).json({ message: "Cart not found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



module.exports = {
  createCart,
  getCartByUser
}