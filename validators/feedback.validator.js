import Joi from '@hapi/joi';

// Validate the feedback data
export function validateFeedback(feedbackData) {
    const feedbackSchema = Joi.object({
        userId: Joi.string().required(),
        comment: Joi.string().required()
    });

    const { error } = feedbackSchema.validate(feedbackData);
    if (error) {
        const errorMessage = error.details.map((detail) => detail.message).join(", ");
        throw new Error(errorMessage);
    }
    return { error };
}

// Validate the feedback data for update
export function validateUpdateFeedback(feedbackDataToUpdate) {
    const feedbackSchema = Joi.object({
        comment: Joi.string().optional()
    });

    const { error } = feedbackSchema.validate(feedbackDataToUpdate);
    if (error) {
        const errorMessage = error.details.map((detail) => detail.message).join(", ");
        throw new Error(errorMessage);
    }
    return { error };
}