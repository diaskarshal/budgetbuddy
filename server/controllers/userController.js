import ApiError from "../error/ApiError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const generateJwt = (id, email) => {
  return jwt.sign({ id, email }, process.env.SECRET_KEY, { expiresIn: "24h" });
};

class UserController {
  async registration(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest("No email or password"));
    }

    const candidate = await User.findOne({ email });
    if (candidate) {
      return next(ApiError.badRequest("Email is already used"));
    }

    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({ email, password: hashPassword });
    const token = generateJwt(user._id, user.email);

    return res.json({ 
      token,
      user: {
        id: user._id,
        email: user.email
      }
    });
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest("Please, enter all the fields."));
    }
    const user = await User.findOne({ email });
    if (!user) {
      return next(ApiError.badRequest("No such email"));
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.badRequest("Wrong password"));
    }
    const token = generateJwt(user._id, user.email);
    return res.json({ token });
  }

  async auth(req, res, next) {
    const token = generateJwt(req.user._id, req.user.email);
    return res.json({ token });
  }

  async getCurrentUser(req, res, next) {
    try {
      const user = await User.findById(req.user._id).select('-password');
      if (!user) {
        return next(ApiError.badRequest("User not found"));
      }
      return res.json({
        success: true,
        user: {
          id: user._id,
          email: user.email,
        }
      });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

export default new UserController();
