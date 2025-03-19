const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const User = require("./user-model");

const Token = sequelize.define(
  "Token",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Tokens",
    timestamps: true,
  }
);

//Отношения
Token.belongsTo(User, {foreignKey: "userId"});

module.exports = Token;
