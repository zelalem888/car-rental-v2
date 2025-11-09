const {
  adminAllVehiclesService,
  adminVehicleRegisterService,
  adminVehicleUpdateService,
  adminVehicleDeleteService,
} = require("../../service/admin/vehicle.CRUD.service");

exports.adminAllVehiclesController = async (req, res) => {
  try {
    const allVehicles = await adminAllVehiclesService();
    res.send(allVehicles);
  } catch (error) {
    res.send({ message: error });
  }
};

exports.adminVehicleRegisterController = async (req, res) => {
  try {
    await adminVehicleRegisterService(req.body);

    res.send({ message: "vehicle add successfully." });
  } catch (error) {
    res.send({ error: error.message });
  }
};

exports.adminVehicleUpdateController = async (req, res) => {
  try {
    await adminVehicleUpdateService({
      paramID: req.params.id,
      updatingData: req.body,
    });
    res.send({ message: "Update vehicle Success." });
  } catch (error) {
    res.send({ message: error });
  }
};

exports.adminVehicleDeleteController = async (req, res) => {
  try {
    await adminVehicleDeleteService(req.params.id);
    res.send({ message: "Vehicle Deleted successfully."});
  } catch (error) {
    res.send({ error: error.message });
  }
};
