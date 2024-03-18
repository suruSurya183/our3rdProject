import joi from "joi";

// Validate the cart data
export function validateCart(cartData) {
    const cartSchema = joi.object({
        userId: joi.string().required(),
        items: joi.array().items(
            joi.object({
                productId: joi.string().required(),
                quantity: joi.number().required(),
            })
        ).required(),
    });

    const { error } = cartSchema.validate(cartData);
    if (error) {
        const errorMessage = error.details.map((detail) => detail.message).join(", ");
        throw new Error(errorMessage);
    }
    return { error };
}

//update validation
export function validateUpdatecart(cartDataToUpdate) {
    const cartSchema = joi.object({
        userId: joi.string().optional(),
        items: joi.array().items(
            joi.object({
                productId: joi.string().optional(),
                quantity: joi.number().optional(),
            })
        ).optional(),
    });

    const { error } = cartSchema.validate(cartDataToUpdate);
    if (error) {
        const errorMessage = error.details.map((detail) => detail.message).join(", ");
        throw new Error(errorMessage);
    }
    return { error };
}