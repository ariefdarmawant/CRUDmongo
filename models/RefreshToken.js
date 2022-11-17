import mongoose from "mongoose";
import { uuid } from "uuidv4";
import configs from "../configs/index.js";

const RefreshToken = mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  }
});

RefreshToken.statics.createToken = async function (user) {
  let expiredAt = new Date();

  expiredAt.setSeconds(expiredAt.getSeconds() + configs.jwtRefreshExpiration);

  let _token = uuid();

  let refreshToken = await this.create({
    token: _token,
    userId: user._id,
    expiryDate: expiredAt.getTime(),
  });

  return refreshToken.token;
};

RefreshToken.statics.verifyExpiration = async function (token) {
  return token.expiryDate.getTime() < new Date().getTime();
};

export default mongoose.model("RefreshTokens", RefreshToken);
