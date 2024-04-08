const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Type extends Model {}

Type.init(
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
    modelName: "type",
    underscored: true,
    freezeTableName: true,
  }
);

module.exports = Type;
