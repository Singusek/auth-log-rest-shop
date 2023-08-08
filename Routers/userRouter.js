import express from "express";
import User from "../Models/User.js";
import bcrypt from "bcryptjs";
import generateLogToken from "../utils.js";



const router = express.Router();


/**Create User**/
  router.post("/re", async (req, res) => {

    console.log(req.body);
    try {
      console.log(req.body);
      let user = await User.findOne({email : req.body.email});
      if (user)
      return res.send("User with given email is existing!");
    
      user = new User({
          username: req.body.username,
          name: req.body.name,
          surname: req.body.surname,
          email: req.body.email,
          password: await bcrypt.hash(req.body.password, 10),
          gender: req.body.gender,
          phone: req.body.phone,
          country: req.body.country,
          zip_code: req.body.zip_code,
          birthdate: req.body.birthdate,
          date_registration: req.body.date_registration
      }).save();
    
      res.send(user);
      }
    catch (error) {
      console.error(error);
    }
  });
  
  /**Login**/
  router.post("/login", async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      console.log(req.body);
      if (user) {
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        
        if (passwordMatch) {
          res.send({
            _id: user._id,
            username: user.username,
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