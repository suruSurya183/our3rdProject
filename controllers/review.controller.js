import Review from "../models/review.model.js";
import {
  validateReviewInsertion,
  validateReviewUpdate,
} from "../validators/review.validator.js";

export const createReview = async (req, res) => {
  const { error } = validateReviewInsertion(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const review = new Review(req.body);
    const savedReview = await review.save();
    res.status(201).json({message:"review created successfully",Data:savedReview});
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json({message:"All reviews",Data: reviews});
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).send("Review not found");
    res.json({message:"single review",Data:review});
  } catch (err) {
    res.status(500).send(err);
  }
};

export const updateReview = async (req, res) => {
  const { error } = validateReviewUpdate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedReview) return res.status(404).send("Review not found");
    res.json({message:"review updated successfully",Data:updatedReview});
  } catch (err) {
    res.status(500).send(err);
  }
};

export const deleteReview = async (req, res) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.id);
    if (!deletedReview) return res.status(404).send("Review not found");
    res.json({message:"review deleted successfully"});
  } catch (err) {
    res.status(500).send(err);
  }
};
