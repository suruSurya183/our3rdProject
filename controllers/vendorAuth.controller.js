import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from 'crypto'; // Import the crypto module
import VendorModel from "../models/vendor.model.js";
import nodemailer from "nodemailer"; // Import nodemailer for sending emails

// Function to generate a random token
function generateToken() {
    return crypto.randomBytes(20).toString('hex');
}

export async function vendorLogin(req, res) {
    try {
        const { emailAddress, password } = req.body;

        // Find vendor by email address
        const vendor = await VendorModel.findOne({ emailAddress });
        console.log("vendor", vendor);
        if (!vendor) {
            return res.status(404).json({ error: "Vendor not found" });
        }

        // Check if the provided password matches the stored hashed password
        const passwordMatch = await bcrypt.compare(password, vendor.password);
        console.log("passwordMatch", passwordMatch);
        
        if (!passwordMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ _id: vendor.id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        console.log("token", token);

        // Set the token as a cookie
        res.cookie('token', token, { httpOnly: true }); // You can set other options like expiration, domain, secure, etc. as needed

        // Send the vendor data and token in the response
        res.status(200).json({ vendor, token });
    } catch (error) {
        res.status(500).json({ error: error.message || "Something went wrong" });
    }
}

export async function vendorLogout(req, res) {
    try {
        // Instead of clearing localStorage here, send a response to the client to clear the token
        res.clearCookie('token'); // Clearing a cookie if token is stored in cookies

        // Alternatively, you can send a response instructing the client to clear the token from local storage
        res.status(200).json({ message: "Logged out successfully", clearToken: true });
    } catch (error) {
        res.status(500).json({ error: error.message || "Something went wrong" });
    }
}

const transporter = nodemailer.createTransport({
    service: 'suryaumpteen@gmail.com', // e.g., 'gmail'
    auth: {
        user: 'suryaumpteen@gmail.com',
        pass: 'egye onio jxeo rhmt'
    }
});

async function sendPasswordResetEmail(vendor, resetToken) {
    try {
        await transporter.sendMail({
            from: 'suryaumpteen@gmail.com',
            to: vendor.emailAddress,
            subject: 'Password Reset',
            text: `Hello ${vendor.vendorName},\n\nPlease use the following link to reset your password: ${resetToken}`
        });
        console.log('Password reset email sent successfully');
    } catch (error) {
        console.error('Error sending password reset email:', error);
        throw new Error('Error sending password reset email');
    }
}

export async function forgotPassword(req, res) {
    try {
        let { emailAddress } = req.body;
        emailAddress = emailAddress.trim().toLowerCase(); // Trim whitespace and convert to lowercase
        console.log("emailAddress--->", emailAddress);

        // Find vendor by email address
        const vendor = await VendorModel.findOne({ emailAddress });
        console.log("vendor--->", vendor);
        if (!vendor) {
            return res.status(404).json({ error: "Vendor not found" });
        }

        // Generate a reset token
        const resetToken = generateToken();

        // Update vendor with reset token and expiry time
        vendor.resetPasswordToken = resetToken;
        vendor.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
        await vendor.save();

        // Send password reset email
        await sendPasswordResetEmail(vendor, resetToken);

        // Respond to the client
        res.status(200).json({ message: "Password reset email sent successfully" });
    } catch (error) {
        console.error("Error in forgotPassword:", error);
        res.status(500).json({ error: error.message || "Something went wrong" });
    }
}

// Reset password handler
export async function resetPassword(req, res) {
    try {
        const { resetToken, newPassword } = req.body;

        // Find vendor by reset token
        const vendor = await VendorModel.findOne({ resetPasswordToken: resetToken });

        if (!vendor) {
            return res.status(404).json({ error: "Invalid or expired reset token" });
        }

        // Check if the reset token has expired
        if (vendor.resetPasswordExpires < Date.now()) {
            return res.status(401).json({ error: "Reset token has expired" });
        }

        // Generate a new hashed password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update vendor's password and clear reset token
        vendor.password = hashedPassword;
        vendor.resetPasswordToken = undefined;
        vendor.resetPasswordExpires = undefined;

        // Save the updated vendor
        await vendor.save();

        // Respond to the client
        res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
        console.error("Error in resetPassword:", error);
        res.status(500).json({ error: error.message || "Something went wrong" });
    }
}

// Method to change vendor password
export async function changePassword(req, res) {
    try {
      const { id } = req.params;
      console.log("id", id);
      const { oldPassword, newPassword } = req.body;
  
      // Find the vendor by vendorId
      const vendor = await VendorModel.findById(id); // <- Corrected this line
  
      console.log("vendor", vendor);
  
      // If vendor not found
      if (!vendor) {
        return res.status(404).json({ message: "Vendor not found" });
      }
  
      // Compare old password with the hashed password stored in the database
      const passwordMatch = await bcrypt.compare(oldPassword, vendor.password);
  
      // If old password doesn't match
      if (!passwordMatch) {
        return res.status(400).json({ message: "Old password is incorrect" });
      }
  
      // Hash the new password
      const saltRounds = 10;
      const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);
  
      // Update vendor's password
      vendor.password = hashedNewPassword;
      await vendor.save();
  
      // Send success response
      res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
      // Handle errors
      res.status(500).json({ message: "Something went wrong", error: error.message });
    }
  }
  
