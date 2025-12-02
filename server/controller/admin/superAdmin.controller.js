const { getSingleAdminService, getAllAdminsService, superAdminCreateService, superAdminUpdateService, superAdminDeleteService } = require("../../service/admin/superAdmin.service");


exports.getAllAdminsController = async (req, res) => {
  try {
    const admins = await getAllAdminsService();

    return res.status(200).json({
      success: true,
      admins,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

exports.getSingleAdmin = async (req, res) => {
  try {
    const adminID = req.params.id;

    const admins = await getSingleAdminService({ paramID: adminID });

    return res.status(200).json({
      success: true,
      admins,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
    })
  }
};


exports.superAdminCreateController = async (req, res) => {

  try {
    const result = await superAdminCreateService({ adminBody: req.body })
    res.send({ message: "admin added successfully." });
  } catch (error) {
    res.send({ message: error });
  }
}
// ================================================

exports.superAdminUpdateController = async (req, res) => {

  try {
    const result = await superAdminUpdateService({ paramID: req.params.id, updatingData: req.body })
    res.send({ message: "Update admin Success." });

  } catch (error) {
    res.send({ message: error });
  }
}
// ===============================================

exports.superAdminDeleteController = async (req, res) => {
  try {
    await superAdminDeleteService({ paramID: req.params.id });
    return res.status(200).json({ success: true, message: "Admin deleted successfully." });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

