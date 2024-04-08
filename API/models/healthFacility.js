const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class healthFacility extends Model {}

healthFacility.init(
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
    firstAid: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    visitingDoctor: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "health_facility",
  }
);

module.exports = healthFacility;
