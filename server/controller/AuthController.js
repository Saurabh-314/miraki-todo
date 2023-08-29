import User from "../models/User.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const userExists = await User.findOne({ email })
  if (userExists) {
    return res.status(406).json({ message: "User already exists" });
  }

  const salt = bcrypt.genSaltSync(12);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const user = await User({
    email,
    password: hashedPassword,
    firstName,
    lastName,
  });
  await user.save();
  res.status(201).json({ message: "user is created" })
}

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(406).json({ message: "User not found" });
  }
  const matched = await bcrypt.compare(password, user.password);
  if (!matched) {
    return res.status(406).json({ message: "User Name or Password is incorrect" });
  }

  // create jwt token
  const payload = {
    email,
    _id: user._id,
  }

  const token = jwt.sign(payload, process.env.JWT_SECRET);

  res.json({ message: "successfully logged in.", token, user });

}