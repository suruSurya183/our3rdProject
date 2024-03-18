import Joi from "@hapi/joi";

const productSchema = Joi.object({
  categoryId: Joi.string().required(),
  itemId: Joi.string().max(100),
  venderId: Joi.string().required(),
  itemName: Joi.string().max(100).required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  photos: Joi.array().items(Joi.string()),
  quantityInStock: Joi.number().integer().required(),
  offers: Joi.number(),
});

const productUpdateSchema = Joi.object({
  categoryId: Joi.string().optional(),
  itemId: Joi.string().optional(),
  venderId: Joi.string().optional().max(100),
  itemName: Joi.string().max(100),
  description: Joi.string(),
  price: Joi.number(),
  photos: Joi.array().items(Joi.string()),
  quantityInStock: Joi.number().integer(),
  offers: Joi.object(),
  disabled: Joi.boolean(),
});

export const validateProductInsertion = (data) => {
  return productSchema.validate(data);
};

export const validateProductUpdate = (data) => {
  return productUpdateSchema.validate(data);
};
