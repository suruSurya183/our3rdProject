import Joi from "@hapi/joi";

// Joi schema for user insertion
const userInsertionSchema = Joi.object({
  userName: Joi.string().max(200).required().messages({
    "string.base": `User Name must be a string`,
    "string.empty": `User Name cannot be empty`,
    "string.max": `User Name should not exceed {{#limit}} characters`,
    "any.required": `User Name is required`,
  }),
  type: Joi.string().valid("Admin", "Customer", "Staff").required().messages({
    "any.required": `Type is required`,
    "any.only": `Type must be one of: Admin, Customer, Staff`,
  }),
  contactNumber: Joi.number().required(),
  emailAddress: Joi.string().email().required().messages({
    "string.base": `Email Address must be a string`,
    "string.empty": `Email Address cannot be empty`,
    "string.email": `Please provide a valid email address`,
    "any.required": `Email Address is required`,
  }),
  password: Joi.string().min(6).max(15).required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": `Password and Confirm Password must match`,
  }),
  disabled: Joi.boolean(),
});

// Joi schema for user update
const userUpdateSchema = Joi.object({
  userName: Joi.string().max(200).messages({
    "string.base": `User Name must be a string`,
    "string.empty": `User Name cannot be empty`,
    "string.max": `User Name should not exceed {{#limit}} characters`,
  }),
  type: Joi.string().valid("Admin", "Customer", "Staff").messages({
    "any.only": `Type must be one of: Admin, Customer, Staff`,
  }),
  contactNumber: Joi.number().max(10),
  emailAddress: Joi.string().email().messages({
    "string.email": `Please provide a valid email address`,
  }),
  password: Joi.string()
    .min(6)
    .max(15)
    .pattern(
      new RegExp("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$")
    )
    .messages({
      "string.min": `Password should have at least {{#limit}} characters`,
      "string.max": `Password should not exceed {{#limit}} characters`,
      "string.pattern.base": `Please provide a valid Password`,
    }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).messages({
    "any.only": `Password and Confirm Password Not match`,
  }),
  disabled: Joi.boolean(),
});

export const validateUserInsertion = (data) => {
  return userInsertionSchema.validate(data, { abortEarly: false });
};

export const validateUserUpdate = (data) => {
  return userUpdateSchema.validate(data, { abortEarly: false });
};
