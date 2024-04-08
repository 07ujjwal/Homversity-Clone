const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class OccupanciesAndRent extends Model {}

OccupanciesAndRent.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    roomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "room",
        key: "id",
      },
    },
    SharingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "sharing_type",
        key: "id",
      },
    },
    roomTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "room_type",
        key: "id",
      },
    },
    occupancy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    fee: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "occupancies_and_rent",
  }
);

module.exports = OccupanciesAndRent;
