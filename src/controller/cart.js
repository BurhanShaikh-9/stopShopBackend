const CartModel = require("../model/cart");
const Product = require('../model/product')


const createCart = async (req, res) => {
    const { userId, products } = req.body;
  
    try {
      // Calculate totalAmount based on products in the cart
      const totalAmount = await calculateTotalAmount(products);
  
      // Create a new cart instance
      const newCart = new CartModel({
        userId,
        products,
        totalAmount,
      });
  
      // Save the cart to the database
      await newCart.save();
  
      res.status(201).json({ message: "Cart created successfully.", cart: newCart });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  const calculateTotalAmount = async (products) => {
    try {
      let totalAmount = 0;
  
      // Iterate through each product in the cart
      for (const product of products) {
        // Retrieve the product details from the database
        const { productAmount } = await Product.findById(product.itemId);
  
        // Calculate the total price for the current product
        const productTotal = productAmount * product.quantity;
  
        // Add the total price to the overall totalAmount
        totalAmount += productTotal;
      }
  
      return totalAmount;
    } catch (error) {
      throw new Error("Error calculating total amount");
    }
  };
  

module.exports = {
    createCart
}