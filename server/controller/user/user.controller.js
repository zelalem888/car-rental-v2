const {
  usersInfoService,
  usersInfoUpdateService,
  usersInfoDeleteService,
  usersUpdatePasswordService
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
        const browser =  req.headers["user-agent"];
    const result = await usersInfoUpdateService({
      paramID: req.params.id,
      updatingData: req.body,
      browser:browser
    });

    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ================================================================

exports.userUpdatePasswordController = async (req, res) => {
  try {
        const browser =  req.headers["user-agent"];
    const result = await usersUpdatePasswordService({
      paramID: req.params.id,
      updatingData: req.body,
      browser:browser
    });

    res.status(201).json({success: true , message : "password updated"});
  } catch (error) {
    console.log(error)
    res.status(400).json({ success: false, message: "internal Error." });
  }
};

// =======================================================

exports.usersInfoDeleteController = async (req, res) => {
  try {
        const browser =  req.headers["user-agent"];
    const result = await usersInfoDeleteService(req.params.id, browser);

    res.status(200).json({ message: "Account Deleted successfully.", ID: result });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
