const {
  SingleVehicleReservationService,
  vehicleReservationService,
  vehicleReservationUpdateService,
  vehicleReservationDeleteService,
  allVehicleReservationService,
  rentedVehicleService,
  singleRentedService,
  rejectedVehicleService,
  addPaymentPictureService
} = require("../../service/user/vehicle.reservation.service");

exports.allVehicleReservationController = async (req, res) => {
  try {
    const user = req.user
    const paramsId = req.params.id
    console.log(user, paramsId)
    if (user.id != paramsId) {
      res.status(403).json({ message: "SOME ONE CHANGED THE LINK." })
    }
    const result = await allVehicleReservationService({ id: req.params.id });
    res.status(200).json(result);
  } catch (error) {
    console.error("Error in allVehicleReservationController:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

// =====================================================================
exports.vehicleReservationController = async (req, res) => {
  try {
    const browser = req.headers["user-agent"];

    const reservationData = { ...req.body };
    if (req.file) {
      reservationData.driverLicenseFilePath = `/uploads/userLicense/${req.file.filename}`;
    }

    const result = await vehicleReservationService({
      reservationData,
      userId: req.params.id,
      vehicleId: req.params.vehicleid,
      browser: browser
    });

    if (result) {
      return res.status(200).json({
        message: `Reservation successful.`,
      });
    } else {
      return res.status(401).json({ message: "Invalid Reservation Data." });
    }
  } catch (error) {
    console.error("Database error during login:", error);
    return res
      .status(500)
      .json({ message: "An internal server error occurred." });
  }
};

// ====================================================

exports.vehicleReservationUpdateController = async (req, res) => {
  try {
    const browser = req.headers["user-agent"];
    const updatingData = { ...req.body };
    console.log(updatingData)
    if (req.file) {
      updatingData.driverLicensePhoto =
        `/uploads/userLicense/${req.file.filename}`;
    }

    await vehicleReservationUpdateService({
      reservationID: req.params.reservationid,
      updatingData,
      browser,
    });

    res.send({ message: "Update Success." });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: error.message || "Something went wrong.",
    });
  }
};



// ======================================================
exports.vehicleReservationDeleteController = async (req, res) => {
  try {
    const browser = req.headers["user-agent"];
    await vehicleReservationDeleteService({
      reservationID: req.params.reservationid,
      browser: browser
    });
    res.send({ message: "Deleted successfully." });
  } catch (error) {
    res.send({ message: error });
  }
};

//=======================================================
exports.SingleVehicleReservationController = async (req, res) => {
  try {
    const result = await SingleVehicleReservationService({
      reservationID: req.params.reservationid,
    });
    res.status(200).json(result);
  } catch (error) {
    res.send({ message: error });
  }
};
// =======================================================

exports.rentedVehicleController = async (req, res) => {
  try {
    const result = await rentedVehicleService({
      userId: req.params.userid,
    });
    res.status(200).json(result);
  } catch (error) {
    res.send({ message: error });
  }
};
// =======================================================

exports.rejectedVehicleController = async (req, res) => {
  try {
    const result = await rejectedVehicleService({
      userId: req.params.userid,
    });
    res.status(200).json(result);
  } catch (error) {
    res.send({ message: error });
  }
};

// ===========================================================

exports.singleRentedController = async (req, res) => {
  try {
    const result = await singleRentedService({
      rid: req.params.rid,
    });
    res.status(200).json(result);
  } catch (error) {
    res.send({ message: error });
  }
};

// ===========================================================

exports.addPaymentPictureController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Payment image is required" });
    }
    const { reservationId } = req.body;

    if (!reservationId) {
      return res.status(400).json({ message: "Reservation ID is required" });
    }

    const result = await addPaymentPictureService({
      rid: reservationId,
      imagePath: `/uploads/userPayment/${req.file.filename}`,
    });

    return res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
