const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const User = require("./user-model");

//STRING до 255 символов
//TEXT до 65 535 символов

const Task = sequelize.define(
  "Task",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    audioTrack: {
      type: DataTypes.STRING, //Путь к файлу
      allowNull: true,
    },
    isCompleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "Tasks",
    timestamps: true,
  }
);

User.hasMany(Task, { foreignKey: "userId" }); //1 ко многим
Task.belongsTo(User, { foreignKey: "userId" }); //связь по айди

module.exports = Task;
