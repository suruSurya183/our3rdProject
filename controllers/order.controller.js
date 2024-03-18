import Order from "../models/order.model.js";
import { validateOrder,validateupdateOrder } from "../validators/order.validator.js";

//Insert New order
export async function insertOrder(req, res) {
  try {
    const orderData = req.body;
    console.log("orderData", orderData);
    // Validate order data before insertion
    const { error } = validateOrder(orderData);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Insert order with itemId
    const neworder = new Order(orderData);
    console.log("neworder", neworder);
    const savedorder = await neworder.save();
    console.log("savedorder", savedorder);

    // Send Response
    res
      .status(200)
      .json({ message: "order data inserted", datashow: savedorder });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
}


//Update order BY ID
export async function updateOrder(req, res, next) {
  try {
      const id = req.params.id;
      const orderDataToUpdate = req.body;

      // Validate the  order data
      const { error } = validateupdateOrder(orderDataToUpdate);
      if (error) {
          return res.status(400).json({ error: error.message });
      }

      // Get the existing  order by ID using Mongoose
      const existingOrder = await Order.findOne({ _id: id });

      if (!existingOrder) {
          return res.status(404).json({ message: ' cart not found' });
      }

      // Update only the fields that are present in the request body
      Object.assign(existingOrder, orderDataToUpdate);

      // Save the updated  order
      const updatedorder = await existingOrder.save();

      // Send the updated  order as JSON response
      res.status(200).json({ message: ' cart successfully',  cartShow: updatedorder });

  } catch (error) {
      // Send Error Response
      res.status(500).json({ error: error.message });
  }
}


//show order by id
export async function showOrder(req, res) {
  try {
    // Get order by ID
    const order = await Order.findById(req.params.id);
    if (!order) {
      // Send Error Response
      return res.status(404).json({ message: "Order not found" });
    }
    // Send Response
    res.status(200).json({ order });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
}

//display all order
export async function displayOrder(req, res) {
  try {
    // Get order by ID
    const order = await Order.find();
    if (!order) {
      // Send Error Response
      return res.status(404).json({ message: "Order not found" });
    }
    // Send Response
    res.status(200).json({ order });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
}


//delete order by id 
export async function deleteOrder(req, res) {
  try {
    // Find and delete the order by ID
    const order = await Order.findByIdAndDelete(req.params.id);
    // Check if the order was found and deleted
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    // Send the deleted order as JSON response
    res.status(200).json({ success: true, message: "Order deleted successfully", datashow: order });
  } catch (error) {
    console.error("Error occurred during order deletion:", error);
    res.status(500).json({ success: false, message: error.message || "Something went wrong" });
  }
}