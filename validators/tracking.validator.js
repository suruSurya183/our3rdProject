import Joi from "@hapi/joi";

// Validate the tracking data
export function validateCreateTracking(trackingData) {
  const trackingSchema = Joi.object({
    orderId: Joi.string(),
    status: Joi.string().valid('pending', 'in-transit', 'out-for-delivery', 'delivered'),
    location: Joi.string().max(150).required(),
    estimatedDeliveryDate: Joi.date(),
  });

  const { error } = trackingSchema.validate(trackingData);
  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(", ");
    throw new Error(errorMessage);
  }
  return { error };
}

// Validate the update data
export function validateUpdateTracking(updateData) {
  const trackingSchema = Joi.object({
    orderId: Joi.string().optional(),
    status: Joi.string().valid('pending', 'in-transit', 'out-for-delivery', 'delivered'),
    location: Joi.string().max(150).optional(),
    estimatedDeliveryDate: Joi.date(),
  });

  const { error } = trackingSchema.validate(updateData);
  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(", ");
    throw new Error(errorMessage);
  }
  return { error };
}
