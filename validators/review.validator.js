import Joi from "@hapi/joi";

const reviewSchema = Joi.object({
  productId: Joi.string().required(),
  userId: Joi.string().required(),
  rating: Joi.number().integer().required(),
  comment: Joi.string(),
});

const reviewUpdateSchema = Joi.object({
  rating: Joi.number().integer(),
  comment: Joi.string(),
});

export const validateReviewInsertion = (data) => {
  return reviewSchema.validate(data);
};

export const validateReviewUpdate = (data) => {
  return reviewUpdateSchema.validate(data);
};
