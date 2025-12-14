const express = require('express');
const db = require("../../db/config");
const { allReservationController, confirmReservationController, pendingReservationController, confirmedReservationController, doneReservationController, rejectReservationController } = require('../../controller/admin/confirm.reseve.controller');


const router = express.Router()

// ==============all reservation info API==================

router.get("/reservation/vehicle", allReservationController)

// ===============pending reservations info API================

router.get("/reservation/vehicle/pending", pendingReservationController)

// =============confirmed reservations info API=============

router.get("/reservation/vehicle/confirmed", confirmedReservationController)

// ============== confirm reservation API==================

router.put("/reservation/confirm/:adminid/:reservationid", confirmReservationController);

// ============== make cars available reservation API==================

router.put("/reservation/done/:adminid/:reservationid", doneReservationController);

// ============== reject reservation API==================

router.put("/reservation/reject/:adminid/:reservationid", rejectReservationController);


module.exports = router