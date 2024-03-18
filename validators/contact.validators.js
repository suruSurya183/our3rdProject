import Joi from '@hapi/joi';

// Validate the contact data
export function validateContact(contactData) {
  const contactSchema = Joi.object({
    fullName: Joi.string().required(),
    address: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    subject: Joi.string().required(),
    message: Joi.string().required()
  });

  const { error } = contactSchema.validate(contactData);
  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(", ");
    throw new Error(errorMessage);
  }
  return { error };
}


// Validate the contact data for update
export function validateUpdateContact(contactDataToUpdate) {
  const contactSchema = Joi.object({
    fullName: Joi.string(),
    address: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
    subject: Joi.string(),
    message: Joi.string()
  }).or('fullName', 'address', 'email', 'phone', 'subject', 'message');

  const { error } = contactSchema.validate(contactDataToUpdate);
  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(", ");
    throw new Error(errorMessage);
  }
  return { error };
}
