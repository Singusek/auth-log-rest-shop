import express from "express";
import Items from "../Models/Items.js";

const itemRouter = express.Router();

/**All items with pagination**/
itemRouter.get("/page", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const itemsPerPage = parseInt(req.query.itemsPerPage) || 5;
    const skipItems = (page - 1) * itemsPerPage;

    let query = Items.find();

  /**Add filtering if filter parameters are passed in the query **/
    if (req.body.category !== null) {
      query = query.where("category").equals(req.query.category);
    }

    query = query.skip(skipItems).limit(itemsPerPage);
    const items = await query;

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
        res.status(404).json({ error: "Not Found" });
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
        res.json({ success: "Item deleted" });
      } else {
        res.status(404).json({ error: "Not Found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
export default itemRouter;