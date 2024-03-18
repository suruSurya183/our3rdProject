import Refund from "../models/refund.model.js";
import { validateRefund } from "../validators/refund.validator.js";


// Insert New refund
export async function insertRefund(req, res) {
    try {
        const refundData = req.body;

        // Validate refund data before insertion
        const { error } = validateRefund(refundData);
        if (error) {
            return res.status(400).json({ error: error.message });
        }

        // Insert refund with itemId
        const newRefund = new Refund(refundData);
        const savedRefund = await newRefund.save();

        // Send Response
        res.status(200).json({ message: "Refund data inserted", datashow: savedRefund });
    } catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                message: error.message || "Something went wrong",
            });
    }
}


//update refund
export async function updateRefund(req, res, next) {
    try {
        const id = req.params.id;
        const refundDataToUpdate = req.body;

        // Validate the refund data
        const { error } = validateRefund(refundDataToUpdate);
        if (error) {
            return res.status(400).json({ error: error.message });
        }

        // Get the existing refund by ID using Mongoose
        const existingRefund = await Refund.findOne({ _id: id });

        if (!existingRefund) {
            return res.status(404).json({ message: 'Refund not found' });
        }

        // Update only the fields that are present in the request body
        Object.assign(existingRefund, refundDataToUpdate);

        // Save the updated refund
        const updatedRefund = await existingRefund.save();

        // Send the updated refund as JSON response
        res.status(200).json({ message: 'Refund data updated', datashow: updatedRefund });
    } catch (error) {
        // Send Error Response
        res
            .status(500)
            .json({
                success: false,
                message: error.message || "Something went wrong",
            });
    }
}


//Display refund
export async function showRefund(req, res) {
    try {
        const id = req.params.id;
        const refund = await Refund.findById(id);
        if (!refund) {
            return res.status(404).json({ message: "Refund not found" });
        }
        res.status(200).json({ message: "Refund data", datashow: refund });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Something went wrong",
        });
    }
}

//Display all refund
export async function ListRefund(req, res) {
    try {
        const refund = await Refund.find();
        if (!refund) {
            return res.status(404).json({ message: "Refund not found" });
        }
        res.status(200).json({ message: "Refund data", datashow: refund });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Something went wrong",
        });
    }
}

//Delete refund
export async function deleteRefund(req, res) {
    try {
        const id = req.params.id;
        const refund = await Refund.findByIdAndDelete(id);
        if (!refund) {
            return res.status(404).json({ message: "Refund not found" });
        }
        res.status(200).json({ message: "Refund deleted successfully" });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Something went wrong",
        });
    }
}