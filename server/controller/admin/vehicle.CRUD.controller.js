const {
  adminAllVehiclesService,
  adminVehicleRegisterService,
  adminVehicleUpdateService,
  adminVehicleDeleteService,
  adminDeleteImageService
} = require("../../service/admin/vehicle.CRUD.service");

exports.adminAllVehiclesController = async (req, res) => {
  try {
    const allVehicles = await adminAllVehiclesService();
    res.json(allVehicles);
  } catch (error) {
    res.json({ message: error });
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
    res.json({ message: "Update vehicle Success." });
  } catch (error) {
    res.json({ message: error });
  }
};

exports.adminDeleteImageController =  async (req, res) => {
  try {
    await adminDeleteImageService({
      paramID: req.params.id,
      updatingData: req.body
    });
    res.status(200).Json({ message: "image deleted Success." });
  } catch (error) {
    res.json({ message: error });
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
