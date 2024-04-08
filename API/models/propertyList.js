const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class PropertyList extends Model {}

PropertyList.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    propertyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    typeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "type",
        key: "id",
      },
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "owner",
        key: "id",
      },
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    locality: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nearestCollege: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    distanceFromCollege: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    genderAllowed: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    geolocation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("leased", "selfOwned"),
      allowNull: false,
    },
    paymentOptions: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pics: {
      type: DataTypes.JSON,
      defaultValue: [],
      get() {
        const pics = this.getDataValue("pics");
        try {
          return pics ? JSON.parse(pics) : [];
        } catch (error) {
          console.error("Error parsing JSON for pics:", error);
          return [];
        }
      },
      set(pics) {
        this.setDataValue("pics", JSON.stringify(pics));
      },
    },
    video: {
      type: DataTypes.STRING,
    },
    videoThumbnail: {
      type: DataTypes.STRING,
    },
    priority: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    view: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: "property_list",
    underscored: true,
    freezeTableName: true,
  }
);

module.exports = PropertyList;
