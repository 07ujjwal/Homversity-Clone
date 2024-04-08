const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class RoomType extends Model {}

RoomType.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "room_type",
    underscored: true,
    freezeTableName: true,
  }
);

module.exports = RoomType;
