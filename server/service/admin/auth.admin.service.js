const db = require("../../db/config");
const jwt = require("jsonwebtoken");


exports.adminLoginService = async (data) => {
  const loginData = data;
  const values = [loginData.username, loginData.password];

  const [rows] = await db.query("SELECT A_ID, Username, Password, type FROM admin WHERE Username = ? AND Password = ?", values);

  // console.log(rows)
  const JWTSecretKey = process.env.JWT_ADMIN_SECRET;
  // console.log(JWTSecretKey)

  if (rows.length === 0) {
    return {
      success: false,
      message: "Invalid username or password",
    };
  }

  const id = rows[0].A_ID;
  const name = rows[0].Username;
  const type = rows[0].type;

  const jwtData = {
    signInTime: Date.now(),
    id,
    name,
    type,
  };
  const token = jwt.sign(jwtData, JWTSecretKey);
  const response = {
    user: jwtData, token,
  };

  return response;
}

// ====================================

exports.adminVerifyService = async (tokenKey) => {
  const jwtSecretKey = process.env.JWT_ADMIN_SECRET;
  try {
    if (!tokenKey) throw new Error("No token provided");

    const verified = jwt.verify(tokenKey, jwtSecretKey);
    if (verified) {
      console.log("verified = ", verified);
      return verified;
    } else {
      throw new Error("Token is Not verified.");
    }
  } catch (error) {
    throw new Error(error);
  }
}
// ====================================

exports.adminPageService = async (params) => {
  const id = params.id
  const [rows] = await db.query("SELECT * FROM admin WHERE A_ID = ? ", id)
  return rows
}
