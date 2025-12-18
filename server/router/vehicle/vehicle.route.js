const express = require('express');
const { allVehicleInfoController,vehicleSearchController,oneVehicleInfoController,vehicleByIdController,activeDriverController } = require('../../controller/vehicle/vehicle.controller');
const { verifyToken } = require("../../middleware/auth")

const router = express.Router()

// ==============all vehicles info API==================

router.get("/vehicles", allVehicleInfoController )

// ===========searched vehicles info with a limit of 5 API===============

router.get("/vehicles/:name",vehicleSearchController)

// ============searched vehicle info by V_ID and V_Name API======================
 
router.get('/vehicle/:name/:id', oneVehicleInfoController)

// ============search vehicle info by id only===========================

router.get('/vehicle/:id', vehicleByIdController)

// ==============driver list api=============================

router.get('/driver/active', activeDriverController)



module.exports = router