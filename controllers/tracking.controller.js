import TrackingModel from '../models/tracking.model.js';
import { validateCreateTracking, validateUpdateTracking } from '../validators/tracking.validator.js';

// Insert New tracking
export async function insertTracking(req, res) {
  try {
    const trackingData = req.body;
    console.log("trackingData", trackingData);

    // Validate tracking data before insertion
    const { error } = validateCreateTracking(trackingData);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Insert Tracking with itemId
    const newTracking = new TrackingModel(trackingData);
    const savedTracking = await newTracking.save();

    // Send Response
    res.status(200).json({ message: "Tracking data inserted", data: savedTracking });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: error.message || "Something went wrong",
      });
  }
};

// Display List
export async function ListTrackings(req, res, next){
  try {
    let categories = await TrackingModel.find();

    if (!categories || categories.length === 0) {
      console.log('Categories not found');
      return res.status(404).json({ message: 'Categories not found' });
    }

    res.status(200).json({ message: "success", categories });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};



// Display Single tracking
export async function  showTracking(req, res, next){
  try {
    let id = req.params.id; // Assuming the parameter is trackingId
    let tracking = await TrackingModel.findOne({_id: id});

    if (!tracking) {
      console.log('Tracking not found');
      return res.status(404).json({ message: 'Tracking not found' });
    }

    res.status(200).json({ tracking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving tracking' });
  }
};

// Update tracking
export async function updateTracking(req, res, next) {
  try {
    const id = req.params.id;
    const trackingDataToUpdate = req.body;

    // Validate the update data
    const { error } = validateUpdateTracking(trackingDataToUpdate);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Get the existing tracking by ID using Mongoose
    const existingTracking = await TrackingModel.findOne({ _id: id });

    if (!existingTracking) {
      return res.status(404).json({ message: 'Tracking not found' });
    }

    // Update only the fields that are present in the request body
    Object.assign(existingTracking, trackingDataToUpdate);

    // Save the updated tracking
    const updatedTracking = await existingTracking.save();

    // Send the updated tracking as JSON response
    res.status(200).json({ message: 'Tracking updated successfully', tracking: updatedTracking });
  } catch (error) {
    // Send Error Response
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};


// Delete tracking
export async function deleteTracking(req, res, next){
  try {
    let id = req.params.id;

    const deletedTracking = await TrackingModel.findOneAndDelete(
      { _id: id }
    );

    if (!deletedTracking) {
      return res.status(404).json({ message: "Tracking not found." });
    }

    res.status(200).json({ message: "Tracking deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};
