const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class PropertyFacility extends Model {}

PropertyFacility.init(
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
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "owner",
        key: "id",
      },
    },

    staffGender: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    servingType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    servingFrequency: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    menu: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    foodType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    studentLunch: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nonVegFrequency: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    fruitProvision: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    milkProvision: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    roWater: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    laundrySystem: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    laundryMode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    clothLimit: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    laundryAction: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "property_facility",
  }
);

module.exports = PropertyFacility;
