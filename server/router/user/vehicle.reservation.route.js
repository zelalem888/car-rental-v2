const express = require("express");
const { SingleVehicleReservationController,
     vehicleReservationController
     , vehicleReservationUpdateController
     , vehicleReservationDeleteController
     , allVehicleReservationController
     , rentedVehicleController
     , singleRentedController
     , rejectedVehicleController
     , addPaymentPictureController
} = require("../../controller/user/vehicle.reservation.controller");
const {upload} = require("./uploadDriverLicense")
const {uploadP} = require("./uploadPayment")
const { verifyToken } = require("../../middleware/auth");
const router = express.Router();

// ==================all reserved for user====================
router.get("/user/reservation/:id", verifyToken, allVehicleReservationController)

// ==================reservation api===========================

router.post("/user/reservation/:id/:vehicleid", upload.single("driverLicensePhoto"), vehicleReservationController);

// ======================user update reservation info api===========================

router.put("/reservation/update/:reservationid" , upload.single("driverLicensePhoto"), vehicleReservationUpdateController);

// ================user reservation delete  api =============================

router.delete("/reservation/delete/:reservationid", vehicleReservationDeleteController);

// ================single reservation api ==============================

router.get('/reservation/single/:reservationid', SingleVehicleReservationController)

// ================rented vehicle details api============================
router.get("/history/:userid", rentedVehicleController)

// ================rejected vehicle details api============================
router.get("/reject/:userid", rejectedVehicleController)

// =================single rented car details api ====================

router.get("/history/single/:rid", singleRentedController)

// ======================payment add api======================

router.post("/payment/upload", uploadP.single("payment"), addPaymentPictureController)

module.exports = router;
