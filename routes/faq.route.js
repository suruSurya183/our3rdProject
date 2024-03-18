import express from "express";
import * as faqController from "../controllers/faq.controller.js";

const router = express.Router();

// add faq
router.post("/", faqController.insertFaq);

// all faqs
router.get("/faqs", faqController.ListFaqs);

/* show */
router.get("/:id", faqController.showfaq);

/* update */
router.put("/:id", faqController.updatefaq);

/* Delete */
router.delete("/:id", faqController.deleteFaq);

export default router;
