import express from "express";
import Order from "../Models/Order.js";



const orderRouter = express.Router();

// Get all orders 
orderRouter.get("/all", async (req, res) => {
    try {
      const orders = await Order.find();
      res.json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while fetching orders.");
    }
  });

// Get order by ID 
orderRouter.get("/:_id", async (req, res) => {
    try {
      const order = await Order.findById(req.params._id);
      if (order) {
        res.json(order);
      } else {
        res.status(404).send("Order not found");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while fetching the order.");
    }
  });

// Add new order
orderRouter.post("/add", async (req, res) => {
    try {
      const newOrder = new Order({
        user: req.body.user,
        items: req.body.items.map(item => ({
            item: item.item,
            quantity: item.quantity
          })),
        total: req.body.total,
        status: req.body.status,
        order_date: req.body.order_date
      });
      const savedOrder = await newOrder.save();
      res.json(savedOrder);
    } catch (error) {
      console.error(error);
      res.status(400).send("Invalid data provided.");
    }
  });

// Update order
orderRouter.put("/:_id", async (req, res) => {
    try {
      const updatedOrder = await Order.findByIdAndUpdate(req.params._id, req.body, {
        new: true,
      });
      if (updatedOrder) {
        res.json(updatedOrder);
      } else {
        res.status(404).send("Order not found");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while updating the order.");
    }
  });

// Delete order by ID
orderRouter.delete("/:_id", async (req, res) => {
    try {
      const deletedOrder = await Order.findByIdAndDelete(req.params._id);
      if (deletedOrder) {
        res.send("Order deleted");
      } else {
        res.status(404).send("Order not found");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while deleting the order.");
    }
  });

export default orderRouter;