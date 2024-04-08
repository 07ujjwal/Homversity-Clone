const router = require("express").Router();
const user = require("./users-routes");
const api = require("./api-route");
const propertylist = require("./propertyList-router");
const owner = require("./owners-router");
const room = require("./room-route");
const property_facility = require("./propertyFacility-route");
const additional_facility = require("./additionalFacilities-router");
const health_facility = require("./healthFacility-router");
const InternetFacility = require("./internetFacilities");
const type = require("./type-router");
const roomType = require("./roomType-route");
const Occupancies = require("./occupancies");
const SharingType = require("./sharingType-router");

router.use("/", api);
router.use("/list", propertylist);
router.use("/owner", owner);
router.use("/room", room);
router.use("/property_facility", property_facility);
router.use("/additional_facility", additional_facility);
router.use("/health_facility", health_facility);
router.use("/internet_facility", InternetFacility);
router.use("/user", user);
router.use("/type", type);

router.use("/roomType", roomType);
router.use("/sharingType", SharingType);
router.use("/occupancies", Occupancies);

module.exports = router;
