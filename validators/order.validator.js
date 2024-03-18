import Joi from "joi";

// Validate the order data
export function validateOrder(orderData) {
  const orderSchema = Joi.object({
    userId: Joi.string().required(),
    items: Joi.array().items(
      Joi.object({
        productId: Joi.string().required(),
        quantity: Joi.number().required(),
      })
    ).required(),
    cartId: Joi.string().allow(null),
    totalPrice: Joi.number().required(),
    shippingAddress: Joi.string().max(150).required(),
    billingAddress: Joi.string().max(200).required(),
    discount: Joi.number().allow(null),
    deliveryFee: Joi.number().optional(), 
    bookingStatus: Joi.string().valid("confirmed", "pending", "cancelled").default("pending"), 
    shippingStatus: Joi.string().valid("processing", "shipped", "delivered").default("pending"), 
  });

  const { error } = orderSchema.validate(orderData);
  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(", ");
    throw new Error(errorMessage);
  }
  return { error };
}


// update validation
export function validateupdateOrder(orderDataToUpdate) {
  const orderSchema = Joi.object({
    userId: Joi.string().optional(),
    items: Joi.array().items(
      Joi.object({
        productId: Joi.string().optional(),
        quantity: Joi.number().optional(),
      })
    ).optional(),
    cartId: Joi.string().allow(null).optional(),
    totalPrice: Joi.number().optional(),
    shippingAddress: Joi.string().max(150).optional(),
    billingAddress: Joi.string().max(200).optional(),
    discount: Joi.number().optional(),
    deliveryFee: Joi.number().optional(), 
    bookingStatus: Joi.string().valid("confirmed", "pending", "cancelled").optional(), 
    shippingStatus: Joi.string().valid("processing", "shipped", "delivered").optional(), 
  });

  const { error } = orderSchema.validate(orderDataToUpdate);
  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(", ");
    throw new Error(errorMessage);
  }
  return { error };
}