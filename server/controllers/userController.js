import apiError from "../error/ApiError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
// import Transaction from "../models/transactionModel.js";

const generateJwt = (id, email) => {
  return jwt.sign({ id, email }, process.env.SECRET_KEY, { expiresIn: "24h" });
};

class UserController {
  async registration(req, res, next) {
    const { name, email, password } = req.body;
    if (!email || !password) {
      return next(apiError.badRequest("No email or password"));
    }

    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(apiError.badRequest("Email is already used"));
    }

    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({ name, email, password: hashPassword });
    // const transaction = await Transaction.create({ userId: user.id });
    const token = generateJwt(user.id, user.email);

    return res.json({ token });
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(apiError.badRequest("No such email"));
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(apiError.badRequest("Wrong password"));
    }
    const token = generateJwt(user.id, user.email);
    return res.json({ token });
  }

  async auth(req, res, next) {
    const token = generateJwt(req.user.id, req.user.email, req.user);
    return res.json({ token });
  }
}

export default new UserController();
