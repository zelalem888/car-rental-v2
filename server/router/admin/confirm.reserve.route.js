const express = require('express');
const db = require("../../db/config");
const { allReservationController,confirmReservationController,pendingReservationController,confirmedReservationController } = require('../../controller/admin/confirm.reseve.controller');


const router = express.Router()

// ==============all reservation info API==================

router.get("/reservation/vehicle", allReservationController)

// ===============pending reservations info API================

router.get("/reservation/vehicle/pending", pendingReservationController)

// =============confirmed reservations info API=============

router.get("/reservation/vehicle/confirmed", confirmedReservationController)

// ============== confirm reservation API==================

router.put("/reservation/confirm/:adminid/:reservationid", confirmReservationController);


module.exports = router