import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export default async function (req, res, next) {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Not authenticated." });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Not authenticated." });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User not found." });
    }

    req.user = {
      _id: user._id,
      email: user.email
    };
    
    next();
  } catch (e) {
    return res.status(401).json({ message: "Not authenticated." });
  }
}
