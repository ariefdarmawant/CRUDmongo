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
});

RefreshToken.statics.createToken = async function (user) {
  let expiredAt = new Date();

  expiredAt.setSeconds(expiredAt.getSeconds() + configs.jwtRefreshExpiration);

  let _token = uuid();

  let refreshToken = await this.create({
    token: _token,
    userId: user.id,
    expiryDate: expiredAt.getTime(),
  });

  return refreshToken.token;
};

export default mongoose.model("RefreshTokens", RefreshToken);
