import express from "express";
import * as refundController from "../controllers/refund.controller.js";
const router = express.Router();


// POST function of Insert new refund
router.post('/', refundController.insertRefund);

//put function of update
router.put('/:id', refundController.updateRefund);

//show
router.get('/:id', refundController.showRefund);

//ALL show
router.get('/', refundController.ListRefund);

//Delete
router.delete('/:id', refundController.deleteRefund);
export default router;
