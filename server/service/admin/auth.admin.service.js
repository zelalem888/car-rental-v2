const db = require("../../db/config");
const jwt = require("jsonwebtoken");

exports.adminLoginService = async (data, browser) => {
  const loginData = data;
  const values = [loginData.username, loginData.password];

  const [rows] = await db.query(
    "SELECT A_ID, Username, Password FROM admin WHERE Username = ? AND Password = ?",
    values
  );
  if(rows.length === 0){
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

  // console.log(rows)
  const JWTSecretKey = process.env.JWT_ADMIN_SECRET;
  // console.log(JWTSecretKey)

  const id = rows[0].A_ID;
  const name = rows[0].Username;
  const type = rows[0].type;

  const jwtData = {
    signInTime: Date.now(),
    id,
    name,
    type,
  };
//   const token = jwt.sign(jwtData, JWTSecretKey);
//   const response = {
//     user: jwtData, token,
//   };
  const token = jwt.sign(jwtData, JWTSecretKey);
  const response = { rows, token };

  return response;
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
};
// ====================================

exports.adminPageService = async (params) => {
  const id = params.id
  const [rows] = await db.query("SELECT * FROM admin WHERE A_ID = ? ", id)
  return rows
}
