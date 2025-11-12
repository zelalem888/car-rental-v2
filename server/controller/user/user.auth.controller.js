const { userAuthService, userRegisterService } = require("../../service/user/user.auth.service");

exports.userAuthController = async (req, res) => {
  try {
    const rows = await userAuthService(req.body);

    if (rows.length === 1) {
      return res.status(200).json({
        message: `Login successful for ${rows[0].Email}`,
        customer: rows[0],
      });
    } else {
      return res.status(401).json({ message: "Invalid email or password." });
    }
  } catch (error) {
    console.error("Database error during login:", error);
    return res
      .status(500)
      .json({ message: "An internal server error occurred." });
  }
};

// ==============================================================

exports.userRegisterController = async (req, res) => {
  try {
    const result = await userRegisterService(req.body)
    
    res.status(201).json({ message : result + " registered!"});
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
};
