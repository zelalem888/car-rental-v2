const db = require("../../db/config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.adminLoginService = async (data, browser) => {
  const loginData = data;
  const values = [loginData.username, loginData.password];

  const [passChecker] = await db.query(
    "SELECT * FROM admin WHERE Username = ?",
    values[0]
  );

  if (passChecker.length === 0) {
    throw new Error("Invalid email or password..");
  }
  const password = passChecker[0].Password;
  const match = await bcrypt.compare(values[1], password);
  if (!match) {
    throw new Error("Invalid email or password.");
  }
  const [rows] = await db.query(
    "SELECT A_ID, Username, type FROM admin WHERE Username = ?",
    loginData.username
  );
  console.log(rows)
  if (rows.length == 0) {
    return {
      success: false,
      message: "Invalid username or password",
    };
  }

  await db.query(
    "INSERT INTO user_logs (User_ID, Role, Action, Description,Device) VALUES (?,?,?,?,?)",
    [
      rows[0].A_ID,
      "admin",
      "Admin Login",
      `Admin logged In by AdminID ${rows[0].A_ID}`,
      browser,
    ]
  );

  const JWTSecretKey = process.env.JWT_ADMIN_SECRET;

  const id = rows[0].A_ID;
  const name = rows[0].Username;
  const type = rows[0].type;

  const jwtData = {
    signInTime: Date.now(),
    id,
    name,
    type
  };
  const token = jwt.sign(jwtData, JWTSecretKey);
  const response = {
    user: rows[0], token,
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
      // console.log("verified = ", verified);
      return verified;
    } else {
      throw new Error("Token is Not verified.");
    }
  } catch (error) {
    throw new Error(error);
  }
};
// ====================================

exports.adminPageService = async (params) => {
  const id = params.id
  const [rows] = await db.query("SELECT * FROM admin WHERE A_ID = ? ", id)
  return rows
}