import Notification from "../models/notification.model.js";
import {validateNotification,validateUpdateNotification} from "../validators/notification.validator.js";


// Insert New notification 
export async function insertnotification(req, res) {
    try {
      const notificationData = req.body;
  
      // Validate notification data before insertion
      const { error } = validateNotification(notificationData);
      if (error) {
        return res.status(400).json({ error: error.message });
      }
  
      // Insert notification with itemId
      const newnotification = new Notification(notificationData);
      const savedNotification = await newnotification.save();
  
      // Send Response
      res.status(200).json({ message: "Notification data inserted", datashow: savedNotification });
    } catch (error) {
      return res
        .status(500)
        .json({
          success: false,
          message: error.message || "Something went wrong",
        });
    }
  };




   // Update Notification 
export async function updateNotification(req, res, next) {
    try {
      const id = req.params.id;
      const notificationDataToUpdate = req.body;
  
      // Validate the Notification data
      const { error } = validateUpdateNotification(notificationDataToUpdate);
      if (error) {
        return res.status(400).json({ error: error.message });
      }
  
      // Get the existing Notification by ID using Mongoose
      const existingNotification = await Notification.findOne({ _id: id });
  
      if (!existingNotification) {
        return res.status(404).json({ message: 'Contact not found' });
      }
  
      // Update only the fields that are present in the request body
      Object.assign(existingNotification, notificationDataToUpdate);
  
      // Save the updated Notification
      const updatedNotification = await existingNotification.save();
  
      // Send the updated Notification as JSON response
      res.status(200).json({ message: 'Notification successfully', contactShow: updatedNotification });
    } catch (error) {
      // Send Error Response
      res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
  };



  // Display Single Notification
export async function  showNotification(req, res, next){
    try {
      let id = req.params.id; // Assuming the parameter is ContactId
      let notification = await Notification.findOne({_id: id});
  
      if (!notification) {
        console.log('Notification not found');
        return res.status(404).json({ message: 'Notification not found' });
      }
  
      res.status(200).json({ notification });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error retrieving Notification' });
    }
  };


  // Display All Notification users
export async function ListNotification(req, res, next) {
    try {
        // Find all Notification  User documents
        const notification = await Notification.find();

        // If no Notification found or empty array returned
        if (!notification || notification.length === 0) {
            console.log("No Notification found");
            return res.status(404).json({ message: "No Notification Found" });
        }

        // If Notification found, send them in response
        res.status(200).json({ notification });
    } catch (error) {
        // If any error occurs, send 500 status with error message
        console.error(error);
        res.status(500).json({ message: "Something Went Wrong" });
    }
};


// Delete a Notification
export async function deleteNotification(req, res) {
    try {
        // Get the Notification ID from request parameters
        const notificationId = req.params.id;

        // Find the Notification by ID and delete it
        const deletednotification = await Notification.findByIdAndDelete(notificationId);

        // Check if the Notification was found and deleted successfully
        if (!deletednotification) {
            return res.status(404).json({ success: false, message: "Notification not found" });
        }

        // Send success response
        res.status(200).json({ success: true, message: "Notification deleted successfully", datashow: deletednotification });
    } catch (error) {
        // Handle errors
        console.error("Error occurred during Notification deletion:", error);
        res.status(500).json({ success: false, message: error.message || "Something went wrong" });
    }
}
