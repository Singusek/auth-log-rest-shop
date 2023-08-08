import express from "express";
import User from "../Models/User.js";
import bcrypt from "bcryptjs";
import generateLogToken from "../utils.js";


const router = express.Router();

function isExpired(expirationDate) {
  const currentDate = new Date();
  return currentDate >= expirationDate;
}

/**Create User**/
  router.post("/register", async (req, res) => {
    try {
      let user = await User.findOne({email : req.body.email});

      if (user)
      return res.json({ error: "User with given email is existing!" });
    
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
          expiration_date: req.body.expiration_date
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

        if (!user) {
            return res.status(404).json({ error: "Not Found" });
        }

        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        if (isExpired(user.expiration_date)) {
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