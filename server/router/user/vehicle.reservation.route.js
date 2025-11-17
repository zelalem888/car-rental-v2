const express = require("express");
const { vehicleReservationController,vehicleReservationUpdateController,vehicleReservationDeleteController,allVehicleReservationController } = require("../../controller/user/vehicle.reservation.controller");
const router = express.Router();

// ==================all reserved for user====================
router.get("/user/reservation/:id" , allVehicleReservationController)

// ==================reservation api===========================

router.post("/user/reservation/:id/:vehicleid",vehicleReservationController);

// ======================user update reservation info api===========================

router.put("/reservation/update/:id/:reservationid", vehicleReservationUpdateController);

// ================user reservation delete  api =============================

router.delete("/reservation/delete/:reservationid",vehicleReservationDeleteController);


module.exports = router;
