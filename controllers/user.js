import bcrypt from "bcryptjs";
import HTTP_STATUS from "../constants/index.js";
import User from "../models/User.js";

export const getAllUsers = async (_, res) => {
  try {
    const users = await User.find();
    res
      .status(HTTP_STATUS.OK)
      .send({ message: "User list fetched.", data: users });
  } catch {
    res.status(HTTP_STATUS.BAD_GATEWAY).send();
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res
        .status(HTTP_STATUS.NOT_FOUND)
        .send(`User with id ${req.params.id} not found`);
    }
    res
      .status(HTTP_STATUS.OK)
      .send({ message: `User with id ${req.params.id} fetched.`, data: user });
  } catch {
    res.status(HTTP_STATUS.BAD_GATEWAY).send();
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res
        .status(HTTP_STATUS.NOT_FOUND)
        .send(`User with id ${req.params.id} not found`);
    }
    let modifiableReqBody = { ...req.body };

    //if the user update the password, it needs to be hashed using bcrypt first before pushing to db
    if (req.body.password) {
      modifiableReqBody = {
        ...modifiableReqBody,
        password: bcrypt.hashSync(req.body.password, 8),
      };
    }
    const updatedUser = await User.updateOne(
      { _id: req.params.id },
      { $set: modifiableReqBody }
    );
    res.status(HTTP_STATUS.OK).send({
      message: `User with id ${req.params.id} updated.`,
      data: updatedUser,
    });
  } catch {
    res.status(HTTP_STATUS.BAD_GATEWAY).send();
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res
        .status(HTTP_STATUS.NOT_FOUND)
        .send(`User with id ${req.params.id} not found`);
    }
    const deletedUser = await User.deleteOne({ _id: req.params.id });
    res
      .status(HTTP_STATUS.OK)
      .send({
        message: `User with id ${req.params.id} deleted.`,
        data: deletedUser,
      });
  } catch {
    res.status(HTTP_STATUS.BAD_GATEWAY).send();
  }
};
