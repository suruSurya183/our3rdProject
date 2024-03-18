import Joi from '@hapi/joi';

// Validate the payment data
export function validatePayment(paymentData) {
    const paymentSchema = Joi.object({
        orderId: Joi.string().required(), // Adjusted to match Mongoose schema
        amount: Joi.number().required(),
        paymentStatus: Joi.string().valid('Pending', 'Completed', 'Failed').required().default("pending"),
        paymentMethod: Joi.string().valid('CreditCard', 'DebitCard', 'NetBanking', 'UPI').required()
    });

    const { error } = paymentSchema.validate(paymentData);
    if (error) {
        const errorMessage = error.details.map((detail) => detail.message).join(", ");
        throw new Error(errorMessage);
    }
    return { error };
}


// Validate the updated payment data
export function validateUpdatePayment(paymentDataToUpdate) {
    const paymentSchema = Joi.object({
        amount: Joi.number().optional(),
        paymentStatus: Joi.string().valid('Pending', 'Completed', 'Failed').optional(),
        paymentMethod: Joi.string().valid('CreditCard', 'DebitCard', 'NetBanking', 'UPI').optional()
    });

    const { error } = paymentSchema.validate(paymentDataToUpdate);
    if (error) {
        const errorMessage = error.details.map((detail) => detail.message).join(", ");
        throw new Error(errorMessage);
    }
    return { error };
}

