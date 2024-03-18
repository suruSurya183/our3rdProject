import Payment from "../models/payment.model.js";
import { validatePayment,validateUpdatePayment } from "../validators/payment.validator.js";

//Insert New Payment
export async function insertPayment(req, res) {
        try {
            const paymentData = req.body;
    
            // Validate payment data before insertion
            const { error } = validatePayment(paymentData);
            if (error) {
                return res.status(400).json({ error: error.message });
            }
    
            // Insert payment with itemId
            const newPayment = new Payment(paymentData);
            const savedPayment = await newPayment.save();
    
            // Send Response
            res.status(200).json({ message: "Payment data inserted", datashow: savedPayment });
        } catch (error) {
            return res
                .status(500)
                .json({
                    success: false,
                    message: error.message || "Something went wrong",
                });
        }
    }

//Update Payment
export async function updatePayment(req, res, next) {
    try {
        const id = req.params.id;
        const paymentDataToUpdate = req.body;

        // Validate the Payment data
        const { error } = validateUpdatePayment(paymentDataToUpdate);
        if (error) {
            return res.status(400).json({ error: error.message });
        }

        // Get the existing Payment by ID using Mongoose
        const existingPayment = await Payment.findOne({ _id: id });

        if (!existingPayment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        // Update only the fields that are present in the request body
        Object.assign(existingPayment, paymentDataToUpdate);

        // Save the updated Payment
        const updatedPayment = await existingPayment.save();

        // Send the updated Payment as JSON response
        res.status(200).json({ message: 'Payment successfully', paymentShow: updatedPayment });

    } catch (error) {
        // Send Error Response
        res.status(500).json({ error: error.message });
    }
}

//DISPLAY SINGLE PAYMENT
export async function showPayment(req, res, next) {
    try {
        let id = req.params.id; // Assuming the parameter is PaymentId

        // Get the Payment by ID
        let payment = await Payment.findOne({ _id: id });

        // Check if the Payment was found
        if (!payment) {

            // Send Error Response
            return res.status(404).json({ message: 'Payment not found' });
        }

        // Send the Payment as JSON response
        res.status(200).json({ payment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error retrieving Payment' });
    }
} 

//DISPLAY ALL PAYMENT
export async function ListPayment(req, res, next) {
    try {
        // Get all Payments
        let payment = await Payment.find();

        // Send the Payment as JSON response
        res.status(200).json({ payment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error retrieving Payment' });
    }
}


//delete payment
export async function deletePayment(req, res) {
    try {
        // Find and delete the Payment by ID
        const paymentId = req.params.id;

        // Validate the Payment ID
        const deletedPayment = await Payment.findByIdAndDelete(paymentId);

        // Check if the Payment was found and deleted
        if (!deletedPayment) {
            return res.status(404).json({ success: false, message: "Payment not found" });
        }
        // Send the deleted Payment as JSON response
        res.status(200).json({ success: true, message: "Payment deleted successfully", datashow: deletedPayment });
    } catch (error) {
        console.error("Error occurred during Payment deletion:", error);
        res.status(500).json({ success: false, message: error.message || "Something went wrong" });
    }
}