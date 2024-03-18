import joi from '@hapi/joi';

// Validate the refund data
export function validateRefund(refundData) {
    const refundSchema = joi.object({
        orderId: joi.string().required(),
        userId: joi.string().required(),
        refundedAmount: joi.number().required(),
        refundReason: joi.string().optional(),
        refundStatus: joi.string().required()
    });

    const { error } = refundSchema.validate(refundData);
    if (error) {
        const errorMessage = error.details.map((detail) => detail.message).join(", ");
        throw new Error(errorMessage);
    }
    return { error };
}

// Validate the refund data for update
export function validateUpdateRefund(refundDataToUpdate) {
    const refundSchema = joi.object({
        refundedAmount: joi.number().optional(),
        refundReason: joi.string().optional(),
        refundStatus: joi.string().optional()
    });

    const { error } = refundSchema.validate(refundDataToUpdate);
    if (error) {
        const errorMessage = error.details.map((detail) => detail.message).join(", ");
        throw new Error(errorMessage);
    }
    return { error };
}
        