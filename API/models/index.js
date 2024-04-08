const { Model } = require("sequelize");
const User = require("./users");
const healthFacility = require("./HealthFacility");
const internetFacility = require("./InternetFacility");
const additionalFacility = require("./additionalFacility");

const propertyList = require("./propertyList");

const Owner = require("./Owner");
const PropertyList = require("./propertyList");
const Room = require("./Room");
const PropertyFacility = require("./PropertyFacility");
const Type = require("./type");

const RoomType = require("./roomType");
const SharingType = require("./sharingType");
const OccupanciesAndRent = require("./Occupancies");

///////////////////////////////////

Type.hasMany(PropertyList, {
  foreignKey: "typeId",
});

PropertyList.belongsTo(Type, {
  foreignKey: "typeId",
});

PropertyList.belongsTo(Owner, {
  foreignKey: "ownerId",
});

Owner.hasMany(PropertyList, {
  foreignKey: "ownerId",
});

Owner.hasMany(PropertyFacility, {
  foreignKey: "ownerId",
});

PropertyFacility.belongsTo(Owner, {
  foreignKey: "ownerId",
});

PropertyList.hasMany(PropertyFacility, {
  foreignKey: "propertyId",
  onDelete: "CASCADE",
});

PropertyFacility.belongsTo(PropertyList, {
  foreignKey: "propertyId",
});

///////////////////////////////////

PropertyList.hasMany(Room, {
  foreignKey: "propertyId",
  onDelete: "CASCADE",
});

Room.belongsTo(propertyList, {
  foreignKey: "propertyId",
});

PropertyList.hasMany(additionalFacility, {
  foreignKey: "propertyId",
  onDelete: "CASCADE",
});

additionalFacility.belongsTo(propertyList, {
  foreignKey: "propertyId",
});

PropertyList.hasMany(healthFacility, {
  foreignKey: "propertyId",
  onDelete: "CASCADE",
});

healthFacility.belongsTo(propertyList, {
  foreignKey: "propertyId",
});

PropertyList.hasMany(internetFacility, {
  foreignKey: "propertyId",
  onDelete: "CASCADE",
});

internetFacility.belongsTo(PropertyFacility, {
  foreignKey: "propertyId",
});

///////////////////////////////////

OccupanciesAndRent.belongsTo(RoomType, {
  foreignKey: "roomTypeId",
});

RoomType.hasMany(OccupanciesAndRent, {
  foreignKey: "roomTypeId",
});

SharingType.hasMany(OccupanciesAndRent, {
  foreignKey: "SharingId",
});

OccupanciesAndRent.belongsTo(SharingType, {
  foreignKey: "SharingId",
});

Room.hasMany(OccupanciesAndRent, {
  foreignKey: "roomId",
  onDelete: "CASCADE",
});

OccupanciesAndRent.belongsTo(Room, {
  foreignKey: "roomId",
});

///////////////////////////////////

module.exports = {
  User,
  healthFacility,
  internetFacility,
  Room,
  additionalFacility,
  PropertyFacility,
  propertyList,
  Type,
  Owner,
  PropertyList,
  RoomType,
  SharingType,
  OccupanciesAndRent,
};
