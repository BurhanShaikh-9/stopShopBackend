const cartModel = require("../model/cart");



const cart = async (req, res) => {
    const {  itemId, quantity, userId } = req.body;
    
    
    try {
        let userCart = await cartModel.findOne({ userId });
     
    }
    catch (error) {
      
    }
}

module.exports = {
    signIn
}