import Contact from "../models/contact.model.js";
import {validateContact, validateUpdateContact} from "../validators/contact.validators.js";


// Insert New contact 
export async function insertContact(req, res) {
    try {
      const contactData = req.body;
  
      // Validate contact data before insertion
      const { error } = validateContact(contactData);
      if (error) {
        return res.status(400).json({ error: error.message });
      }
  
      // Insert Category with itemId
      const newContact = new Contact(contactData);
      const savedContact = await newContact.save();
  
      // Send Response
      res.status(200).json({ message: "contact data inserted", datashow: savedContact });
    } catch (error) {
      return res
        .status(500)
        .json({
          success: false,
          message: error.message || "Something went wrong",
        });
    }
  };
  
  // Update Contact 
export async function updateContact(req, res, next) {
    try {
      const id = req.params.id;
      const contactDataToUpdate = req.body;
  
      // Validate the Contact data
      const { error } = validateUpdateContact(contactDataToUpdate);
      if (error) {
        return res.status(400).json({ error: error.message });
      }
  
      // Get the existing Contact by ID using Mongoose
      const existingContact = await Contact.findOne({ _id: id });
  
      if (!existingContact) {
        return res.status(404).json({ message: 'Contact not found' });
      }
  
      // Update only the fields that are present in the request body
      Object.assign(existingContact, contactDataToUpdate);
  
      // Save the updated Contact
      const updatedContact = await existingContact.save();
  
      // Send the updated Contact as JSON response
      res.status(200).json({ message: 'Contact successfully', contactShow: updatedContact });
    } catch (error) {
      // Send Error Response
      res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
  };
  

  // Display Single Contact
export async function  showContact(req, res, next){
    try {
      let id = req.params.id; // Assuming the parameter is ContactId
      let contact = await Contact.findOne({_id: id});
  
      if (!contact) {
        console.log('Contact not found');
        return res.status(404).json({ message: 'Contact not found' });
      }
  
      res.status(200).json({ contact });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error retrieving Contact' });
    }
  };

  
  
  // Display All Contact users
export async function ListContact(req, res, next) {
    try {
        // Find all Contact  User documents
        const contact = await Contact.find();

        // If no cards found or empty array returned
        if (!contact || contact.length === 0) {
            console.log("No Card found");
            return res.status(404).json({ message: "No Contact Found" });
        }

        // If contact found, send them in response
        res.status(200).json({ contact });
    } catch (error) {
        // If any error occurs, send 500 status with error message
        console.error(error);
        res.status(500).json({ message: "Something Went Wrong" });
    }
};



// Delete a contact
export async function deleteContact(req, res) {
    try {
        // Get the card ID from request parameters
        const contactId = req.params.id;

        // Find the contact by ID and delete it
        const deletedcontact = await Contact.findByIdAndDelete(contactId);

        // Check if the contact was found and deleted successfully
        if (!deletedcontact) {
            return res.status(404).json({ success: false, message: "Contact not found" });
        }

        // Send success response
        res.status(200).json({ success: true, message: "Contact deleted successfully", datashow: deletedcontact });
    } catch (error) {
        // Handle errors
        console.error("Error occurred during Contact deletion:", error);
        res.status(500).json({ success: false, message: error.message || "Something went wrong" });
    }
}