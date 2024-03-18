import express from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

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

export default router;
