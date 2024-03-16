import express from "express";
import {
  createReview,
  getReviews,
  getReviewById,
  updateReview,
  deleteReview,
} from "../controllers/review.controller.js";

const router = express.Router();

router.post("/newreview", createReview);
router.get("/reviews", getReviews);
router.get("/:id", getReviewById);
router.put("/updatereview/:id", updateReview);
router.delete("/deletereview/:id", deleteReview);

export default router;
