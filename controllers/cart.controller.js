import Cart from"../models/cart.model.js";
import { validateCart,validateUpdatecart } from "../validators/cart.validator.js";


//Inset cart
export async function insertCart(req, res) {
    try {
        const cartData = req.body;
        console.log("cartData", cartData);
        // Validate cart data before insertion
        const { error } = validateCart(cartData);
        if (error) {
            return res.status(400).json({ error: error.message });
        }

        // Insert cart with itemId
        const newCart = new Cart(cartData);
        console.log("newCart", newCart);
        const savedCart = await newCart.save();
        console.log("savedCart", savedCart);

        // Send Response
        res
            .status(200)
            .json({ message: "cart data inserted", datashow: savedCart });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Something went wrong",
        });
    }
}


//Update cart BY ID
export async function updateCart(req, res, next) {
    try {
        const id = req.params.id;
        const cartDataToUpdate = req.body;

        // Validate the  cart data
        const { error } = validateUpdatecart(cartDataToUpdate);
        if (error) {
            return res.status(400).json({ error: error.message });
        }

        // Get the existing  cart by ID using Mongoose
        const existingcart = await Cart.findOne({ _id: id });

        if (!existingcart) {
            return res.status(404).json({ message: ' cart not found' });
        }

        // Update only the fields that are present in the request body
        Object.assign(existingcart, cartDataToUpdate);

        // Save the updated  cart
        const updatedcart = await existingcart.save();

        // Send the updated  cart as JSON response
        res.status(200).json({ message: ' cart successfully',  cartShow: updatedcart });

    } catch (error) {
        // Send Error Response
        res.status(500).json({ error: error.message });
    }
}


// Display Single Cart
export async function showCart(req, res, next) {
    try {
      let id = req.params.id; // Assuming the parameter is FaqId
      let cart = await Cart.findOne({ _id: id });
  
      if (!cart) {
        console.log("faq not found");
        return res.status(404).json({ message: "faq not found" });
      }
  
      res.status(200).json({ cart });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error retrieving faq" });
    }
  }

// Display All Cart users
export async function ListCart(req, res, next) {
    try {
        // Find all  Cart  User documents
        const  cart = await Cart.find();

        // If no  Cart found or empty array returned
        if (!cart || cart.length === 0) {
            console.log("No Card found");
            return res.status(404).json({ message: "No Contact Found" });
        }

        // If  Cart found, send them in response
        res.status(200).json({ cart });
    } catch (error) {
        // If any error occurs, send 500 status with error message
        console.error(error);
        res.status(500).json({ message: "Something Went Wrong" });
    }
};

// Delete a cart
export async function deleteCart(req, res) {
    try {
        // Get the card ID from request parameters
        const cartId = req.params.id;

        // Find the cart by ID and delete it
        const deletedcart = await Cart.findByIdAndDelete(cartId);

        // Check if the cart was found and deleted successfully
        if (!deletedcart) {
            return res.status(404).json({ success: false, message: "Contact not found" });
        }

        // Send success response
        res.status(200).json({ success: true, message: "Contact deleted successfully", datashow: deletedcart });
    } catch (error) {
        // Handle errors
        console.error("Error occurred during Contact deletion:", error);
        res.status(500).json({ success: false, message: error.message || "Something went wrong" });
    }
}





// Delete  product in cart 
export async function deleteProduct(req, res, next){
    try {
      const cartId = req.params.cartId;
      console.log("cartId", cartId);
      const productId = req.params.productId;
      console.log("productId", productId);
  
      // Find the cart by ID
      const cart = await Cart.findById(cartId);
      console.log("cart", cart);
  
      if (!cart) {
        return res.status(404).json({ message: "Cart not found." });
      }
      // Check if the product exists in the cart
      const productIndex = cart.items.findIndex(items => items.productId.toString() === productId);
      console.log("productIndex", productIndex);
  
      if (productIndex === -1) {
        return res.status(404).json({ message: "Product not found in the cart." });
      }
  
      // Remove the product from the items array
      cart.items.splice(productIndex, 1);
  
      // Save the updated cart
      await cart.save();
  
      res.status(200).json({ message: "Product deleted from cart successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong", error: error.message });
    }
  
  }