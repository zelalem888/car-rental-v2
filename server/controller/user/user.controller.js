const {
  usersInfoService,
  usersInfoUpdateService,
  usersInfoDeleteService,
} = require("../../service/user/user.service");

exports.usersInfoController = async (req, res) => {
  try {
    const user = req.user;
    const paramID = req.params.id;
    if (user.id != paramID) {
      res.status(403).json({ message: "the url was manipulated" });
    }
    const result = await usersInfoService(req.params.id);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// ===============================================================
exports.usersInfoAdminController = async (req, res) => {
  try {
    const result = await usersInfoService(req.params.id);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ==============================================================

exports.usersInfoUpdateController = async (req, res) => {
  try {
    const result = await usersInfoUpdateService({
      paramID: req.params.id,
      updatingData: req.body,
    });

    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// =======================================================

exports.usersInfoDeleteController = async (req, res) => {
  try {
    const result = await usersInfoDeleteService(req.params.id);

    res.status(200).json({ message: "Account Deleted successfully.", ID: result });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
