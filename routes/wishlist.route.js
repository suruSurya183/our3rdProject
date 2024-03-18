import express from "express";
import {
  createWishlistItem,
  getWishlistItems,
  getWishlistItemById,
  updateWishlistItem,
  deleteWishlistItem,
} from "../controllers/wishlist.conroller.js";

const router = express.Router();

router.post("/newwishlist", createWishlistItem);
router.get("/allwishlist", getWishlistItems);
router.get("single/:id", getWishlistItemById);
router.put("/updatewishlist/:id", updateWishlistItem);
router.delete("/deletewishlist/:id", deleteWishlistItem);

export default router;
