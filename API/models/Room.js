const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Room extends Model {}

Room.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    propertyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "property_list",
        key: "id",
      },
    },
    totalBeds: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalRooms: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalFloors: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    roomsPerFloor: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "room",
  }
);

module.exports = Room;
