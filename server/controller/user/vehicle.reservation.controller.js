const {
  SingleVehicleReservationService,
  vehicleReservationService,
  vehicleReservationUpdateService,
  vehicleReservationDeleteService,
  allVehicleReservationService,
  rentedVehicleService,
} = require("../../service/user/vehicle.reservation.service");

exports.allVehicleReservationController = async (req, res) => {
  try {
    const result = await allVehicleReservationService({ id: req.params.id });
    res.status(200).json(result);
  } catch (error) {
    res.json({ message: error });
  }
};

// =====================================================================
exports.vehicleReservationController = async (req, res) => {
  try {
    const result = await vehicleReservationService({
      reservationData: req.body,
      userId: req.params.id,
      vehicleId: req.params.vehicleid,
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
    const result = await vehicleReservationUpdateService({
      reservationID: req.params.reservationid,
      updatingData: req.body,
    });
    res.send({ message: "Update Success." });
  } catch (error) {
    res.send({ message: error });
  }
};

// ======================================================
exports.vehicleReservationDeleteController = async (req, res) => {
  try {
    await vehicleReservationDeleteService({
      reservationID: req.params.reservationid,
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
      reservationID: req.params.reservationid,
    });
    res.status(200).json(result);
  } catch (error) {
    res.send({ message: error });
  }
};