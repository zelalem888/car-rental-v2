const { getSingleAdminService, getAllAdminsService, superAdminCreateService, superAdminUpdateService, superAdminDeleteService } = require("../../service/admin/superAdmin.service");


exports.getAllAdminsController = async (req, res) => {
  try {
    const admins = await getAllAdminsService();

    return res.status(200).json({
      success: true,
      admins,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message:"Internal server error",
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
    console.log(error)
    return res.status(500).json({
      success: false,
    })
  }
};


exports.superAdminCreateController = async (req, res) => {

  try {
    const result = await superAdminCreateService({ adminBody: req.body })
    res.status(200).json({ message: "admin registered successfully." });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message:"internal Error" });
  }
}
// ================================================

exports.superAdminUpdateController = async (req, res) => {

  try {
    const result = await superAdminUpdateService({ paramID: req.params.id, updatingData: req.body })
    res.json({ message: "Update admin Success." });

  } catch (error) {
    console.log(error)
    res.status(401).json({ message: "internal error" });
  }
}
// ===============================================

exports.superAdminDeleteController = async (req, res) => {
  try {
    await superAdminDeleteService({ paramID: req.params.id });
    return res.status(200).json({ success: true, message: "Admin deleted successfully." });
  } catch (error) {
    console.log(error)
    return res.status(400).json({ success: false, message: "internal error" });
  }
};

