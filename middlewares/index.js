import mongoose from "mongoose";
import HTTP_STATUS from "../constants/index.js";

export const checkValidId = (req, res, next) => {
  const _id = req.params.id;
  const isValidId = mongoose.Types.ObjectId.isValid(_id);
  if (!isValidId) {
    return res.status(HTTP_STATUS.BAD_REQUEST).send("Invalid ID");
  }
  next();
};
