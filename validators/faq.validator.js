import Joi from "joi";

// Joi schema for FAQ validation
const faqSchema = Joi.object({
  title: Joi.string().required(),
  question: Joi.string().required(),
  answer: Joi.string().required(),
});

// Joi schema for FAQ update validation
const faqUpdateSchema = Joi.object({
  title: Joi.string().required(),
  question: Joi.string(),
  answer: Joi.string(),
});

// Validate FAQ data for insertion
export const validateFAQInsertion = (faqdata) => {
  return faqSchema.validate(faqdata);
};

// Validate FAQ data for updates
export const validateFAQUpdate = (faqdata) => {
  return faqUpdateSchema.validate(faqdata);
};
