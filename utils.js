import jwt from "jsonwebtoken";

const generateLogToken = (user) => {
  
    return jwt.sign(
      {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_PASS || '401230',
      {
        expiresIn: '10d',
      }
    );
  };
export default generateLogToken;