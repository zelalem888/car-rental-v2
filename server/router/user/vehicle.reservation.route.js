const express = require("express");
const { vehicleReservationController,vehicleReservationUpdateController,vehicleReservationDeleteController } = require("../../controller/user/vehicle.reservation.controller");
const router = express.Router();


// ==================reservation api===========================

router.post("/user/reservation/:id/:vehicleid",vehicleReservationController);

// ======================user update account info api===========================

router.put("/reservation/update/:id/:reservationid", vehicleReservationUpdateController);

// ================reservation delete account api =============================

router.delete("/reservation/delete/:reservationid",vehicleReservationDeleteController);


module.exports = router;
