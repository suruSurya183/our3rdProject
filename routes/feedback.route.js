import express  from "express";
import * as feedbackController from "../controllers/feedback.controller.js";
const router = express.Router();

// POST function of Insert new feedback
router.post('/', feedbackController.insertFeedback);

// update
router.put('/:id', feedbackController.updateFeedback);

//show
router.get('/:id', feedbackController.showFeedback);

//All show
router.get('/', feedbackController.ListFeedback);

// Delete
router.delete('/:id', feedbackController.deleteFeedback);

export default router;