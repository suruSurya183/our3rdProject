import Joi from "@hapi/joi";

// Validate the category data
export function validateCreateCategory(categoryData) {
  const categorySchema = Joi.object({
    parentCategory: Joi.string(),
    categoryName: Joi.string().required(),
    description: Joi.string(),
  });

  const { error } = categorySchema.validate(categoryData);
  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(", ");
    throw new Error(errorMessage);
  }
  return { error };
}

// Validate the update data
export function validateUpdateCategory(updateData) {
  const categorySchema = Joi.object({


    categoryName: Joi.string().optional(),
    description: Joi.string().optional()

  });

  const { error } = categorySchema.validate(updateData);
  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(", ");
    throw new Error(errorMessage);
  }
  return { error };
}
