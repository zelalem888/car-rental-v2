const express = require("express");
const {
  adminAllVehiclesController,
  adminVehicleRegisterController,
  adminVehicleUpdateController,
  adminVehicleDeleteController,
} = require("../../controller/admin/vehicle.CRUD.controller");
const {upload}  = require("./uploadImage")
const router = express.Router();

// ============get all vehicle info api==============

router.get("/admin/vehicles" , adminAllVehiclesController);

// ============register vehicle api===================

router.post("/admin/registervehicle",upload.array("images", 6) , adminVehicleRegisterController);

// ==================update vehicle info api=====================

router.put("/admin/vehicle/update/:id" ,upload.array("images", 6), adminVehicleUpdateController);

// ================vehicle delete api =============================

router.delete("/admin/vehicle/delete/:id", adminVehicleDeleteController);

module.exports = router;
