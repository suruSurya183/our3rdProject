import  express  from "express";
const router = express.Router();
import * as orderControlller from "../controllers/order.controller.js";

//post Insert new order
router.post('/', orderControlller.insertOrder);

// update
router.put('/:id', orderControlller.updateOrder);

//show
router.get('/:id', orderControlller.showOrder);

//display all shows orders
router.get('/', orderControlller.displayOrder);

//delete order
router.delete('/:id', orderControlller.deleteOrder);

export default router;