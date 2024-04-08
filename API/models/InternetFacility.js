const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class InternetFacility extends Model {}

InternetFacility.init(
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
    internetType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    wifiMode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dataPermission: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    downloadSpeed: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "internet_facility",
  }
);

module.exports = InternetFacility;
