import express  from "express";
import * as notificationController from "../controllers/notification.controller.js";
const router = express.Router();


// POST function of Insert new Notification
router.post('/', notificationController.insertnotification);

/* update */
router.put('/:id', notificationController.updateNotification);

/* show */
router.get('/:id', notificationController.showNotification);

/*All show */
router.get('/', notificationController.ListNotification);

/* Delete */
router.delete('/:id', notificationController.deleteNotification);


export default router;
