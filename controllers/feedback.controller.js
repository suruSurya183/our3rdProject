import Feedback from "../models/feedback.model.js";
import { validateFeedback, validateUpdateFeedback } from "../validators/feedback.validator.js";


// Insert New feedback 
export async function insertFeedback(req, res) {
        try {
            const feedbackData = req.body;
    
            // Validate feedback data before insertion
            const { error } = validateFeedback(feedbackData);
            if (error) {
                return res.status(400).json({ error: error.message });
            }
    
            // Insert feedback with itemId
            const newFeedback = new Feedback(feedbackData);
            const savedFeedback = await newFeedback.save();
    
            // Send Response
            res.status(200).json({ message: "Feedback data inserted", datashow: savedFeedback });
        } catch (error) {
            return res
                .status(500)
                .json({
                    success: false,
                    message: error.message || "Something went wrong",
                });
        }
    }


    //update feedback
    export async function updateFeedback(req, res, next) {
        try {
            const id = req.params.id;
            const feedbackDataToUpdate = req.body;
    
            // Validate the feedback data
            const { error } = validateUpdateFeedback(feedbackDataToUpdate);
            if (error) {
                return res.status(400).json({ error: error.message });
            }
    
            // Get the existing feedback by ID using Mongoose
            const existingFeedback = await Feedback.findOne({ _id: id });
    
            if (!existingFeedback) {
                return res.status(404).json({ message: 'Feedback not found' });
            }
    
            // Update only the fields that are present in the request body
            Object.assign(existingFeedback, feedbackDataToUpdate);
    
            // Save the updated feedback
            const updatedFeedback = await existingFeedback.save();
    
            // Send the updated feedback as JSON response
            res.status(200).json({ message: 'Feedback data updated', datashow: updatedFeedback });
        } catch (error) {
            return res
                .status(500)
                .json({
                    success: false,
                    message: error.message || "Something went wrong",
                });
        }
    }

//Display  single feedback
export async function showFeedback(req, res, next) {
    try {
        // Find a single Feedback
        const id = req.params.id;

        // Find the Feedback by ID
        const feedback = await Feedback.findById(id);

        // If no Feedback found
        if (!feedback) {
            return res.status(404).json({ message: 'Feedback not found' });
        }

        // Send success response with Feedback data json response
        res.status(200).json({ message: 'Feedback data', datashow: feedback });
    } catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                message: error.message || "Something went wrong",
            });
    }
}

//Display all feedback List
export async function ListFeedback(req, res, next) {
    try {
        // Find all Feedback  User documents
        const feedback = await Feedback.find();

        // If no Feedback found or empty array returned
        if (!feedback) {
            return res.status(404).json({ message: 'Feedback not found' });
        }
        // Send success response
        res.status(200).json({ message: 'Feedback data', datashow: feedback });
    } catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                message: error.message || "Something went wrong",
            });
    }
}

//delete feedback
export async function deleteFeedback(req, res, next) {
    try {
        // Get the Feedback ID from request parameters
        const id = req.params.id;

        // Find the Feedback by ID and delete it
        const feedback = await Feedback.findByIdAndDelete(id);

        // Check if the Feedback was found and deleted successfully
        if (!feedback) {
            return res.status(404).json({ message: 'Feedback not found' });
        }
        // Send success response
        res.status(200).json({ message: 'Feedback data deleted', datashow: feedback });
    } catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                message: error.message || "Something went wrong",
            });
    }
}