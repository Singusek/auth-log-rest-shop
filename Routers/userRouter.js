import express from "express";
import User from "../Models/User.js";
import bcrypt from "bcryptjs";
import generateLogToken from "../utils.js";

const router = express.Router();
const saltRound = bcrypt.genSalt(10); 
//Create User
router.post("/register", async(req, res) => {
    console.log("req.body:", req.body);
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.send("User with given email is existing!");
      }
  
      user = new User({
        fullname: req.body.fullname,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, saltRound),
      }).save();
      
      res.send(user);
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred during registration.");
    }
  });
  
  // Login
  router.post("/login", async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if (passwordMatch) {
          res.send({
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            password: user.password,
            token: generateLogToken(user),
          });
        } else {
          res.status(401).send("Invalid password");
        }
      } else {
        res.status(404).send("User not found");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred during login.");
    }
  });




export default router;