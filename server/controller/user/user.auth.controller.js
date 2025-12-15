const { userAuthService, userRegisterService, userVerifyService, tokenExistService, forgotPasswordService, resetPasswordService } = require("../../service/user/user.auth.service");

exports.userAuthController = async (req, res) => {
  try {
    const browser = req.headers["user-agent"];
    const rows = await userAuthService(req.body, browser);
    console.log(rows)
    if (rows.rows.length > 0) {

      // console.log(rows)
      return res.status(200).json(rows.token);
    } else {
      return res.status(401).json("Invalid email or password.");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};
// ==============================================================

exports.userVerifyController = async (req, res) => {
  try {
    const result = await userVerifyService(req.headers["jwt-token"])

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error.message)
  }
}

// ==============================================================

exports.userRegisterController = async (req, res) => {
  try {
    const browser = req.headers["user-agent"];
    const result = await userRegisterService(req.body, browser)

    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
};

// ==============================================================

exports.tokenExistController = async (req, res) => {
  try {
    const { token } = req.body;
    const result = await tokenExistService(token);
    res.status(200).json({ valid: true });
  } catch (error) {
    res.status(400).json({ valid: false, error: error.message });
  }
};

exports.forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await forgotPasswordService(email);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
// ==============================================================

exports.resetPasswordController = async (req, res) => {
  try {
    const { token, password } = req.body;
    const result = await resetPasswordService(token, password);
    res.status(200).json({ message: "Password reset successful." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
