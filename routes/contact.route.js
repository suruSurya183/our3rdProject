import express  from "express";
import * as contactController from "../controllers/contact.controller.js";
const router = express.Router();

// POST function of Insert new contact
router.post('/', contactController.insertContact);

/* update */
router.put('/:id', contactController.updateContact);

/* show */
router.get('/:id', contactController.showContact);

/*All show */
router.get('/', contactController.ListContact);

/* Delete */
router.delete('/:id', contactController.deleteContact);

export default router;