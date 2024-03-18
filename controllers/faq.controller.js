import FaqModel from "../models/faq.model.js";
import {
  validateFAQInsertion,validateFAQUpdate
} from "../validators/faq.validator.js";

// Insert New faq
export async function insertFaq(req, res) {
  try {
    const faqData = req.body;
    // Validate faq data before insertion
    const { error } = validateFAQInsertion(faqData);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Insert faq 
    const newFaq = new FaqModel(faqData);
    const savedFaq = await newFaq.save();

    // Send Response
    res
      .status(200)
      .json({ message: "Faq data inserted", data: savedFaq });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
}

// Display List
export async function ListFaqs(req, res, next) {
  try {
    
    let faqs = await FaqModel.find();

    if (!faqs || faqs.length === 0) {
      console.log("faq not found");
      return res.status(404).json({ message: "faq not found" });
    }

    res.status(200).json({ message: "success", faqs });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
}

// Display Single faq
export async function showfaq(req, res, next) {
  try {
    let id = req.params.id; // Assuming the parameter is FaqId
    let faq = await FaqModel.findOne({ _id: id });

    if (!faq) {
      console.log("faq not found");
      return res.status(404).json({ message: "faq not found" });
    }

    res.status(200).json({ faq });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving faq" });
  }
}

// Update Faq
export async function updatefaq(req, res, next) {
  try {
    const id = req.params.id;
    const FaqDataToUpdate = req.body;

    // Validate the update data
    const { error } = validateFAQUpdate(FaqDataToUpdate);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Get the existing faq by ID using Mongoose
    const existingFaq = await FaqModel.findOne({ _id: id });

    if (!existingFaq) {
      return res.status(404).json({ message: "Faq not found" });
    }

    // Update only the fields that are present in the request body
    Object.assign(existingFaq, FaqDataToUpdate);

    // Save the updated category
    const updatedFaq = await existingFaq.save();

    // Send the updated category as JSON response
    res.status(200).json({
      message: "faq updated successfully",
      faq: updatedFaq,
    });
  } catch (error) {
    // Send Error Response
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
}

// Delete faq
export async function deleteFaq(req, res, next) {
  try {
    let id = req.params.id;

    const updatedFaq = FaqModel.findOneAndDelete({
        _id:id
    })

    if (!updatedFaq) {
      return res.status(404).json({ message: "Faq not found." });
    }
    res.status(200).json({ message: "Faq deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
}
