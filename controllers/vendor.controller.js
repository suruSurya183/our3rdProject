import VendorModel from "../models/vendor.model.js";
import { validateCreateVendor, validateUpdateVendor } from '../validators/vendor.validator.js';
import bcrypt from "bcrypt";

export async function vendorInsert(req, res) {
  try {
    const vendorData = req.body;

    // Validate vendor data before insertion
    const { error } = validateCreateVendor(vendorData);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Check if emailAddress already exists in VendorModel
    const existingVendor = await VendorModel.findOne({
      emailAddress: vendorData.emailAddress,
    });
    if (existingVendor) {
      return res
        .status(400)
        .json({ error: "Vendor with the given emailAddress already exists" });
    }

    // Replace the plain password with the hashed one
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(vendorData.password, saltRounds);

    // Insert Vendor with vendorId
    const newVendor = new VendorModel({
      ...vendorData,
      password: hashedPassword,
    });
    const savedVendor = await newVendor.save();

    // Send Response
    res.status(200).json({
      message: "Vendor data inserted",
      vendorData: savedVendor,
    });
  } catch (error) {
    res.status(500).json({ error: error.message || "Something went wrong" });
  }
}

// export async function vendorInsert(req, res) {
//   const vendorData = req.body;

//   const newVendor = new VendorModel(vendorData);

//   const savedVendor = await newVendor.save();

//   res.status(200).json({
//     message: "Vendor data inserted",
//     vendorData: savedVendor,
//   });
// }

// Vendor List
export async function showAllVendors(req, res) {
  try {
    const vendor = await VendorModel.find({ disabled: "false" });

    if (!vendor || vendor.length === 0) {
      console.log("Vendor not found");
      return res.status(404).json({ message: "Vendor not found" });
    }

    res.status(200).json({ vendor });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
}

// Display Single Vendor
export async function showVendor(req, res) {
  try {
    const vendorId = req.params.id; // Corrected variable name
    const vendor = await VendorModel.findOne({ _id: vendorId }); // Corrected field name
    // const id = req.params.id; // Corrected variable name
    // const vendor = await VendorModel.find({ _id: id }); // Corrected field name
    console.log(vendor);

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    res.status(200).json({ vendor });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
}

// Update Vendor
export async function updateVendor(req, res) {
  try {
    const vendorId = req.params.id;
    const vendorDataToUpdate = req.body;

    // Validate vendor data before update
    const { error } = validateUpdateVendor(vendorDataToUpdate);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Get the existing vendor by vendorId
    const existingVendor = await VendorModel.findOne({ _id: vendorId });
    if (!existingVendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    // Update vendor fields
    Object.assign(existingVendor, vendorDataToUpdate);
    const updatedVendor = await existingVendor.save();

    // Send the updated vendor as JSON response
    res.status(200).json({ message: "Vendor updated successfully", vendor: updatedVendor });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
}

// Delete Vendor
export async function deleteVendor(req, res, next) {
  try {
    const vendorId = req.params.id;
    const updatedVendor = await VendorModel.findOneAndUpdate(
      { _id: vendorId },
      { disabled: "true" },
      { new: true }
    );

    if (!updatedVendor) {
      return res.status(404).json({ message: "Vendor not found." });
    }

    res.status(200).json({ message: "Vendor deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
}

//Search vendor
export async function searchVendor(req, res) {
  try {
    const searchQuery = req.query.q; // Get the search query from the request query params
    const searchRegex = new RegExp(searchQuery, 'i'); // Create case-insensitive regex pattern for searching

    // Find vendors that match any field using the regex pattern
    const vendors = await VendorModel.find({
      $or: [
        { vendorName: searchRegex },
        { 'address.streetName': searchRegex },
        { 'address.landMark': searchRegex },
        { 'address.city': searchRegex },
        { 'address.pinCode': searchRegex },
        { 'address.state': searchRegex },
        { 'address.country': searchRegex },
        { emailAddress: searchRegex },
      ],
    });

    if (!vendors || vendors.length === 0) {
      return res.status(404).json({ message: "No vendors found" });
    }

    res.status(200).json({ vendors });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}
