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
    await adminVehicleRegisterService(req.body , req.files);

    res.status(201).json({ message: "vehicle add successfully." });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.adminVehicleUpdateController = async (req, res) => {
  try {
    await adminVehicleUpdateService({
      paramID: req.params.id,
      updatingData: req.body,
      files: req.files
    });
    res.send({ message: "Update vehicle Success." });
  } catch (error) {
    res.send({ message: error });
  }
};

exports.adminVehicleDeleteController = async (req, res) => {
  try {
    await adminVehicleDeleteService(req.params.id);
    res.status(200).json({ message: "Vehicle Deleted successfully."});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
