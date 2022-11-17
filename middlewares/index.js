import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import HTTP_STATUS from "../constants/index.js";
import User from "../models/User.js";
import configs from "../configs/index.js";

export const checkValidId = (req, res, next) => {
  const _id = req.params.id;
  const isValidId = mongoose.Types.ObjectId.isValid(_id);
  if (!isValidId) {
    return res.status(HTTP_STATUS.BAD_REQUEST).send("Invalid ID");
  }
  next();
};

export const checkDuplicateEmailOrUsername = async (req, res, next) => {
  const usernameCheck = await User.findOne({
    username: req.body.username,
  });
  if (usernameCheck) {
    res.status(HTTP_STATUS.BAD_REQUEST).send({
      message: "Username already in use!",
    });
    return;
  }

  const emailCheck = await User.findOne({
    email: req.body.email,
  });
  if (emailCheck) {
    res.status(HTTP_STATUS.BAD_REQUEST).send({
      message: "Email already in use!",
    });
    return;
  }

  next();
};

export const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(HTTP_STATUS.FORBIDDEN).send({
      message: "No token provided!",
    });
  } else {
    jwt.verify(token, configs.secret, (err, decoded) => {
      if (err) {
        return res
          .status(HTTP_STATUS.UNAUTHORIZED)
          .send({ message: "Unauthorized!" });
      }
      req.userId = decoded._id;
      next();
    });
  }
};

export const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.userId);
  if (user.role === "Admin") {
    next();
  } else {
    res.status(HTTP_STATUS.UNAUTHORIZED).send({
      message: "Require Admin Role!",
    });
    return;
  }
};

export const isAdminOrCurrentUser = async (req, res, next) => {
  if (req.userId === req.params.id) {
    next();
  } else {
    //check isAdmin
    isAdmin(req, res, next);
  }
};
