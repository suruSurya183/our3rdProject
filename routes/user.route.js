import express from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  searchUser
} from "../controllers/user.controller.js";
import * as authController from '../controllers/auth.controller.js';

const router = express.Router();

// Route for creating a new user
router.post("/newuser/", createUser);

// Route for getting all users
router.get("/users", getUsers);

// Route for getting a user by ID
router.get("singleuser/:id", getUserById);

// Route for updating a user
router.put("/updateuser/:id", updateUser);

// Route for deleting a user
router.delete("/deleteuser/:id", deleteUser);

// Login user
router.post('/login', authController.userLogin);

// Logout user
router.post('/logout', authController.userLogout);

// Forget Password
router.post('/forgot-password', authController.forgotPassword);

// Reset Password
router.post('/reset-password', authController.resetPassword);

// Change Password
router.post('/change-password/:id', authController.changePassword);

// Search user
router.get('/users/search', searchUser);

export default router;
