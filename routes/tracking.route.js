import express from "express";
import * as trackingController from "../controllers/tracking.controller.js";

const router = express.Router();

// add tracking
router.post("/", trackingController.insertTracking);

// all trackings

router.get('/', trackingController.ListTrackings);


/* show */
router.get("/:id", trackingController.showTracking);

/* update */
router.put("/:id", trackingController.updateTracking);

/* Delete */
router.delete("/:id", trackingController.deleteTracking);

export default router;
