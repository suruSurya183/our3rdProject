import Joi from "@hapi/joi";

const wishlistSchema = Joi.object({
  userId: Joi.number().integer().required(),
  productId: Joi.number().integer().required(),
});

const wishlistUpdateSchema = Joi.object({
  userId: Joi.number().integer(),
  productId: Joi.number().integer(),
});

export const validateWishlistInsertion = (data) => {
  return wishlistSchema.validate(data);
};

export const validateWishlistUpdate = (data) => {
  return wishlistUpdateSchema.validate(data);
};
