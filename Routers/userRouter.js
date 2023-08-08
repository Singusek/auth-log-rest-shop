import express from "express";
import User from "../Models/User.js";
import bcrypt from "bcryptjs";
import generateLogToken from "../utils.js";



const router = express.Router();


/**Create User**/
  router.post("/register", async (req, res) => {

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
          date_registration: req.body.date_registration,
          current_data_registration: req.body.current_data_registration
      }).save();
    
      res.send(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  /**Login**/
  router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        console.log(req.body);

        if (!user) {
            return res.status(404).json({ error: "Not Found" });
        }

        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const currentDate = new Date();
        const registrationDate = new Date(user.current_data_registration);
        const differenceInMilliseconds = currentDate - registrationDate;
        const differenceInYears = differenceInMilliseconds / (1000 * 60 * 60 * 24 * 365);

        if (differenceInYears >= 2) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const token = generateLogToken(user);

        res.json({ token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


export default router;