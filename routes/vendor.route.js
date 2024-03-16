import express from 'express';
import * as vendorController from '../controllers/vendor.controller.js';
import * as authController from '../controllers/vendorAuth.controller.js';
// import SchemaValidator from "../middlewares/schemaValidator.js";
// const validateRequest = SchemaValidator(true);
const router = express.Router();

// Add vendor
// router.post('/vendorInsert', levelBasedLimit, vendorController.vendorInsert);
router.post('/', vendorController.vendorInsert);

// All vendors
router.get('/', vendorController.showAllVendors);

// Show vendor
router.get('/:id', vendorController.showVendor);

// Update vendor
router.put('/:id', vendorController.updateVendor);

// Delete vendor
router.delete('/:id', vendorController.deleteVendor);

// Login vendor
router.post('/login', authController.vendorLogin);

// Logout vendor
router.post('/logout', authController.vendorLogout);

// Forget Password
router.post('/forgot-password', authController.forgotPassword);

// Reset Password
router.post('/reset-password', authController.resetPassword);

// Change Password
router.post('/change-password/:id', authController.changePassword);

// Search vendor
router.get('/vendors/search', vendorController.searchVendor);

export default router;
