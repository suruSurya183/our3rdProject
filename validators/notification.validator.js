import Joi from 'joi';

// Validate the notification data
export function validateNotification(notificationData) {
  const notificationSchema = Joi.object({
    userId: Joi.string().required(),
    message: Joi.string().required(),
    read: Joi.boolean()
  });

  const { error } = notificationSchema.validate(notificationData);
  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(", ");
    throw new Error(errorMessage);
  }
  return { error };
}


// Validate the notification data for update
export function validateUpdateNotification(notificationDataToUpdate) {
    const notificationSchema = Joi.object({
      userId: Joi.string(),
      message: Joi.string(),
      read: Joi.boolean()
    })
  
    const { error } = notificationSchema.validate(notificationDataToUpdate);
    if (error) {
      const errorMessage = error.details.map((detail) => detail.message).join(", ");
      throw new Error(errorMessage);
    }
    return { error };
  }