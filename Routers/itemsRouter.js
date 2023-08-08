import express from "express";
import Items from "../Models/Items.js";

const itemRouter = express.Router();

/**All items**/
itemRouter.get("/all", async (req, res) => {
    try {
      const items = await Items.find();
      res.json(items);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
/**Dowland Items by ID **/
itemRouter.get("/_id", async (req, res) => {
    try {
      const item = await Items.findById(req.params._id);
      if (item) {
        res.json(item);
      } else {
        res.status(404).send("Not Found");
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

/**Add new item**/
itemRouter.post("/add", async (req, res) => {
    try {
      const newItem = new Items({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        availability: req.body.availability,
        availableQuantity: req.body.availableQuantity
      }).save();
      res.send(newItem);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: "Bad request" });
    }
  });


/**Update item**/
itemRouter.put("/_id", async (req, res) => {
    try {
      const updatedItem = await Items.findByIdAndUpdate(req.params._id, req.body, {
        new: true,
      });
      if (updatedItem) {
        res.json(updatedItem);
      } else {
        res.status(404).json({ error: "Not Found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

/**Delete Item**/
itemRouter.delete("/_id", async (req, res) => {
    try {
      const deletedItem = await Items.findByIdAndDelete(req.params._id);
      if (deletedItem) {
        res.send("Item deleted");
      } else {
        res.status(404).json({ error: "Not Found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
export default itemRouter;