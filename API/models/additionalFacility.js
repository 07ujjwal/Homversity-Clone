const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class additionalFacility extends Model {}

additionalFacility.init(
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
    fireSafety: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    attachedBathroom: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    garden: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    parking: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    terrace: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    lift: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    commonFacility: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "additional_facility",
  }
);

module.exports = additionalFacility;
