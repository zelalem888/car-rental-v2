const db = require("../../db/config");
const jwt = require("jsonwebtoken");


exports.adminLoginService = async (data)=>{
   const loginData = data;
  const values = [loginData.username, loginData.password];
    
    const [rows] = await db.query( "SELECT A_ID, Username, Password FROM admin WHERE Username = ? AND Password = ?", values);

     // console.log(rows)
  const JWTSecretKey = process.env.JWT_ADMIN_SECRET;
  // console.log(JWTSecretKey)
  
  
  const id = rows[0].A_ID;
  const name = rows[0].Username;

  const jwtData = {
    signInTime: Date.now(),
    id,
    name,
  };
    const token = jwt.sign(jwtData, JWTSecretKey);
    const response = { rows, token };

    return response;
}

// ====================================

exports.adminVerifyService = async (tokenKey) => {
  const tokenHeaderKey = "jwt-token";
  const jwtSecretKey = process.env.JWT_ADMIN_SECRET;
  const token = tokenKey;
  try {
    const verified = jwt.verify(token, jwtSecretKey);
    if (verified) {
      console.log(verified);
      return verified;
    } else {
      throw new Error("Token is Not verified.");
    }
  } catch (error) {
    throw new Error(error);
  }
}
// ====================================

exports.adminPageService = async(params)=>{
  const id = params.id
  const [rows] = await db.query("SELECT * FROM admin WHERE A_ID = ? ", id)
  return rows
}
