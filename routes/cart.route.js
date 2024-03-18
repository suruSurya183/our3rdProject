import express  from "express";
const router = express.Router();
import * as cartControlller from "../controllers/cart.controller.js";

// //post Insert new cart
router.post('/', cartControlller.insertCart);

// // update
router.put('/:id', cartControlller.updateCart);
// //show
router.get('/:id', cartControlller.showCart);
// //display all shows
router.get('/', cartControlller.ListCart);

 //delete cart
router.delete('/:id', cartControlller.deleteCart);

//delete product from cart
router.delete('/:cartId/product/:productId', cartControlller.deleteProduct);


export default router