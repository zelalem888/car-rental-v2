const express = require('express');
const db = require("../../db/config");
const { allReservationController,confirmReservationController } = require('../../controller/admin/confirm.reseve.controller');


const router = express.Router()

// ==============all reservation info API==================

router.get("/reservation/vehicle", allReservationController)

// ============== confirm reservation API==================

router.put("/reservation/confirm/:adminid/:reservationid", confirmReservationController);


module.exports = router