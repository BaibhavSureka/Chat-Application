import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createTokenAndSaveKookie } from "../jwt/generateToken.js";

export const signup = async (req, res) => {
  const { fullname, email, password, confirmPassword } = req.body;
  try {
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "password does not match" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "user already exist" });
    }

    // Hashing password

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await new User({
      fullname,
      email,
      password: hashPassword,
    });
    await newUser.save();
    if (newUser) {
      createTokenAndSaveKookie(newUser._id, res);
      res.status(201).json({
        message: "user create successfully ",
        user: {
          _id: newUser._id,
          fullname: newUser.fullname,
          email: newUser.email,
        },
      });
    }
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};

export const login = async (req, res) => {
  const { password, email } = req.body;
  try {
    const user = await User.findOne({ email });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!user || !isMatch) {
      return res.status(201).json({ message: "Invalid user credential" });
    }
    createTokenAndSaveKookie(user._id, res);
    res.status(200).json({
      message: "user login successfully",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "user logout successfully" });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};

export const allUsers = async (req, res) => {
  try {
    const loggedInUser = await req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUser },
    }).select("-password");                              // it is used to hide the password from the satabase
    res.status(201).json(filteredUsers);
  } catch (error) {
    console.log("errors in allusers controller:" + error);
  }
};
