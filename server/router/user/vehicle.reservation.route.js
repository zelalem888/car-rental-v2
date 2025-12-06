const express = require("express");
const {SingleVehicleReservationController,
     vehicleReservationController
     ,vehicleReservationUpdateController
     ,vehicleReservationDeleteController
     ,allVehicleReservationController
     ,rentedVehicleController
     } = require("../../controller/user/vehicle.reservation.controller");
const { verifyToken } = require("../../middleware/auth");
const router = express.Router();

// ==================all reserved for user====================
router.get("/user/reservation/:id" ,verifyToken, allVehicleReservationController)

// ==================reservation api===========================

router.post("/user/reservation/:id/:vehicleid",vehicleReservationController);

// ======================user update reservation info api===========================

router.put("/reservation/update/:reservationid", vehicleReservationUpdateController);

// ================user reservation delete  api =============================

router.delete("/reservation/delete/:reservationid",vehicleReservationDeleteController);

// ================single reservation api ==============================

router.get('/reservation/single/:reservationid', SingleVehicleReservationController)

// ================rented vehicle details api============================
router.get("/history/:userid", rentedVehicleController)


module.exports = router;
