const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class SharingType extends Model {}

SharingType.init(
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
    modelName: "sharing_type",
    underscored: true,
    freezeTableName: true,
  }
);

module.exports = SharingType;
