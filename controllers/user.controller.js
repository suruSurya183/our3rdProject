import User from '../models/user.model.js';
import { validateUserInsertion, validateUserUpdate } from '../validators/user.validator.js';

export const createUser = async (req, res) => {
  const { error } = validateUserInsertion(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    
    const userexist = await User.findOne({ emailAddress: req.body.emailAddress});
    if(userexist){
      return res.status(401).json({message:"User Already Exist with Email Id"})
    }
    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(201).json({
      message:"User Created Successfully",
      Data:savedUser
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({
      message:"All Users",
      Data:users});
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('User not found');
    res.json({
      message:"Single user",
      Data:user});
  } catch (err) {
    res.status(500).send(err);
  }
};

export const updateUser = async (req, res) => {
  const { error } = validateUserUpdate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) return res.status(404).send('User not found');
    res.json({
      message:"user updated Successfully",
      updatedUser
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).send('User not found');
    res.json({
      message:"user deleted succesfully",
      deletedUser
  });
  } catch (err) {
    res.status(500).send(err);
  }
};

export async function searchUser(req, res) {
  try {
    const searchQuery = req.query.q; // Get the search query from the request query params
    const searchRegex = new RegExp(searchQuery, 'i'); // Create case-insensitive regex pattern for searching

    // Find users that match any field using the regex pattern
    const users = await UserModel.find({
      $or: [
        { userName: searchRegex },
        { emailAddress: searchRegex },
      ],
    });

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}