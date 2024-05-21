import User from "../models/UserModel.js";
import bcryptjs from "bcryptjs";

export const signupUser = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  try {
    const user = await User.findOne({ username: username });

    if (user) {
      return res.status(400).json({
        message: "Sorry the username already exists. Choose another username.",
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username: username,
      password: hashedPassword,
      email: email,
    });

    const userCurr = await newUser.save();
    res
      .status(200)
      .json({ message: "Username created successfully. ", userCurr });
  } catch (error) {
    res.status(500).json("Couldn't create the user.");
  }
};

export const loginUser = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(400).json({ message: "Username not found!" });
    }

    const validPassword = await bcryptjs.compare(password, user.password);

    if (validPassword) {
      return res.status(200).json({ message: "User authenticated!", user });
    } else {
      return res.staus(400).json({ message: "Password is incorrect!" });
    }
  } catch (error) {
    return res.status(500).json("Couldn't login.");
  }
};

export const getUser = async (req, res) => {
  const id = req.body.id;

  try {
    const user = await User.findOne({ _id: id });

    if (user) {
      return res.status(200).json({ message: "User is found!", user });
    } else {
      return res.status(404).json({ message: "User not found!" });
    }
  } catch (error) {
    return res
      .status(500)
      .json("Internal error occured while trying to find the user.");
  }
};

export const getAllUsers = async (req, res) => {
  const { name } = req.query;

  const users = await User.find({
    username: { $regex: new RegExp(name, "i") },
  });

  res.json(users);
};

export const uploadImage = async (req, res) => {
  const { url } = req.body;

  try {
    
  } catch (error) {
    return res
      .status(500)
      .json("Internal server error occured while uploading the link for the profileImage.")
  }
}
