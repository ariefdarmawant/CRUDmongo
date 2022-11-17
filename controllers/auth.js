import User from "../models/User.js";
import bcrypt from "bcryptjs";
import HTTP_STATUS from "../constants/index.js";
import config from "../configs/index.js";
import jwt from "jsonwebtoken";
import RefreshToken from "../models/RefreshToken.js";

export const register = async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      role: req.body.role,
    });
    const createdUser = await newUser.save();
    res
      .status(HTTP_STATUS.OK)
      .send({ message: "User created successfully!", data: createdUser });
  } catch (e) {
    res.status(HTTP_STATUS.BAD_REQUEST).send();
  }
};

//can login with either username or email
export const login = async (req, res) => {
  try {
    User.findOne({
      $or: [{ username: req.body.query }, { email: req.body.query }],
    }).then(async (user) => {
      if (!user) {
        return res
          .status(HTTP_STATUS.NOT_FOUND)
          .send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      //Expired dalam 1 jam
      var token = jwt.sign({ _id: user._id }, config.secret, {
        expiresIn: config.jwtExpiration,
      });

      let refreshToken = await RefreshToken.createToken(user);

      res.status(HTTP_STATUS.OK).send({
        username: user.username,
        email: user.email,
        accessToken: token,
        role: user.role,
        refreshToken: refreshToken,
      });
    });
  } catch {
    res.status(HTTP_STATUS.BAD_REQUEST).send();
  }
};
