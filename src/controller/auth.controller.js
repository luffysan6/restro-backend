import UserModel from "../model/User.model.js";
import { comparePassword, genHashPassword } from "../utils/bcrypt.js";
import { checktoken, gentoken } from "../utils/genToken.js";

export const AuthHome = async (req, res) => {
  try {
    res.status(200).json({
      message: "Hello From AuthHome",
      success: true,
    });
  } catch (error) {
    console.log("Error At Home Route auth/ \t", error.message);
    res.status(500).json({
      message: "Error at Server",
      success: false,
    });
  }
};

export const SaveUser = async (req, res) => {
  try {
    let { name, email, password } = req.body || {};

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please Provide All Required Info",
        success: false,
      });
    }

    const existingUser = await UserModel.findOne({
      email: email,
    });

    if (existingUser) {
      return res.status(409).json({
        message: "User with this Email Already Exist",
        success: false,
      });
    }

    const hashpassword = await genHashPassword(password);

    let newUser = new UserModel();
    newUser.name = name;
    newUser.email = email;
    newUser.password = hashpassword;

    const result = await newUser.save();

    return res.status(201).json({
      message: "User Created Successfully",
      success: true,
      user: result,
    });
  } catch (error) {
    console.log("Error At Home Route auth/ \t", error.message);
    return res.status(500).json({
      message: "Error at Server",
      success: false,
    });
  }
};

export const getUser = async (req, res) => {
  try {
    // console.log(req);
    const { email, password } = req.body || {};
    console.log({
      email,
      password,
    });

    if (!email || !password) {
      return res.status(400).json({
        message: "Please Provide All Required Info",
        success: false,
      });
    }

    const existingUser = await UserModel.findOne({
      email: email,
    });
    if (await comparePassword(password, existingUser.password)) {
      const token = await gentoken({
        id: existingUser._id,
        name: existingUser.name,
        role: existingUser.role,
      });

      res.cookie("jwt", token, {
        maxAge: 7 * 24 * 24 * 60 * 1000,
        httpOnly: true,
        secure: false,
      });
      return res.status(200).json({
        message: "Login Successful",
        success: true,
        role: existingUser.role,
      });
    } else {
      return res.status(400).json({
        message: "Login Failed",
        success: false,
      });
    }
  } catch (error) {
    console.log("Error At Home Route auth/ \t", error.message);
    return res.status(500).json({
      message: "Error at Server",
      success: false,
    });
  }
};

export const checkAuth = async (req, res) => {
  try {
    // console.log(req);

    let token = req.cookies;
    // console.log(token);
    token = token.jwt;

    // console.log(token);

    // return res;

    const { payload } = await checktoken(token);

    return res.json({
      message: "Auth Success",
      success: true,
      role: payload.role,
    });
  } catch (error) {
    if (error.message == "invalid signature")
      return res.status(401).json({ message: "Auth Failed", success: false });

    console.log("Error At Token Check/ \t", error.message);
    return res.status(500).json({
      message: "Error at Server",
      success: false,
    });
  }
};
export const logout = async (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
  return res.status(200).json({
    message: "Logout Successfully",
    success: true,
  });
};
