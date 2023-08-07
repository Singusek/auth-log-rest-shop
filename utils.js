import jwt from "jsonwebtoken";
const generateLogToken = (user) => {
    console.log("user:", user);
    console.log("JWT_PASS:", process.env.JWT_PASS);
  
    return jwt.sign(
      {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
      },
      process.env.JWT_PASS || '401230',
      {
        expiresIn: '10d',
      }
    );
  };
export default generateLogToken;