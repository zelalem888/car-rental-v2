const express = require('express');
const { allVehicleInfoController,vehicleSearchController,oneVehicleInfoController } = require('../../controller/vehicle/vehicle.controller');

const router = express.Router()

// ==============all vehicles info API==================

router.get("/vehicles", allVehicleInfoController )

// ===========searched vehicles info with a limit of 5 API===============

router.get("/vehicles/:name",vehicleSearchController)

// ============searched vehicle info by V_ID and V_Name API======================
 
router.get('/vehicle/:name/:id', oneVehicleInfoController)



module.exports = router