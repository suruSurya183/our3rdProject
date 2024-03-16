// vendorValidation.js
import Joi from 'joi';

// Validate the vendor data
export function validateCreateVendor(vendorData) {
  const vendorSchema = Joi.object({
  vendorName: Joi.string().required(),
  contactNumber: Joi.number().required(),
  address: Joi.object({
    streetName: Joi.string().required(),
    landMark: Joi.string().required(),
    city: Joi.string().required(),
    pinCode: Joi.string().required(),
    state: Joi.string().required(),
    country: Joi.string().required(),
  }).required(),
  emailAddress: Joi.string().email().required(),
  password: Joi.string().required()
  });


  const { error } = vendorSchema.validate(vendorData);
  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(", ");
    throw new Error(errorMessage);
  }
  return {error};
}

// Validate the update data
export function validateUpdateVendor(updateData) {
  const vendorSchema = Joi.object({
  vendorName: Joi.string().optional(),
  contactNumber: Joi.number().optional(),
  address: Joi.object({
    streetName: Joi.string(),
    landMark: Joi.string(),
    city: Joi.string(),
    pinCode: Joi.string(),
    state: Joi.string(),
    country: Joi.string(),
  }).optional(),
  emailAddress: Joi.string().email().optional(),
  password: Joi.string().optional()
  });
  
  const { error } = vendorSchema.validate(updateData);
  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(", ");
    throw new Error(errorMessage);
  }
  return {error};
}