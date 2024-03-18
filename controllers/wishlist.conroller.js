import Wishlist from "../models/wishlist.model.js";
import {
  validateWishlistInsertion,
  validateWishlistUpdate,
} from "../validators/wishlist.validator.js";

export const createWishlistItem = async (req, res) => {
  const { error } = validateWishlistInsertion(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const wishlistItem = new Wishlist(req.body);
    const savedWishlistItem = await wishlistItem.save();
    res.status(201).json(savedWishlistItem);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getWishlistItems = async (req, res) => {
  try {
    const wishlistItems = await Wishlist.find();
    res.json(wishlistItems);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getWishlistItemById = async (req, res) => {
  try {
    const wishlistItem = await Wishlist.findById(req.params.id);
    if (!wishlistItem) return res.status(404).send("Wishlist item not found");
    res.json(wishlistItem);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const updateWishlistItem = async (req, res) => {
  const { error } = validateWishlistUpdate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const updatedWishlistItem = await Wishlist.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedWishlistItem)
      return res.status(404).send("Wishlist item not found");
    res.json(updatedWishlistItem);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const deleteWishlistItem = async (req, res) => {
  try {
    const deletedWishlistItem = await Wishlist.findByIdAndDelete(req.params.id);
    if (!deletedWishlistItem)
      return res.status(404).send("Wishlist item not found");
    res.json(deletedWishlistItem);
  } catch (err) {
    res.status(500).send(err);
  }
};
