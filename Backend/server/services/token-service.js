const jwt = require("jsonwebtoken");
const tokenModel = require("../models/token-model");
const ApiError = require("../exceptions/api-error");
require("dotenv").config();

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "15s",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "30s",
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(userId, refreshToken) {
    console.log(userId);
    const tokenData = await tokenModel.findOne({ where: { userId: userId } });
    console.log(tokenData);
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      console.log(tokenData);
      return tokenData.save();
    }

    const token = await tokenModel.create({ userId: userId, refreshToken });
    return token;
  }

  async removeToken(refreshToken) {
    const tokenData = await tokenModel.destroy({ where: { refreshToken } });
    return tokenData;
  }

  validateAccessToken(token) {
    try {
      console.log(process.env.JWT_ACCESS_SECRET)
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      console.log(userData)
      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  async findToken(refreshToken) {
    console.log(refreshToken)
    const tokenData = await tokenModel.findOne({ where: { refreshToken } });
    return tokenData;
  }
}

module.exports = new TokenService();
