import express from "express";
import * as paymentController from "../controllers/payment.controller.js";
const router = express.Router();


// POST function of Insert new payment
router.post('/', paymentController.insertPayment);

//update
router.put('/:id', paymentController.updatePayment);

//show
router.get('/:id', paymentController.showPayment);

//All show
router.get('/', paymentController.ListPayment);

// Delete
router.delete('/:id', paymentController.deletePayment);


export default router;