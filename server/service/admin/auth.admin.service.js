const db = require("../../db/config");

exports.adminLoginService = async (data)=>{
   const loginData = data;
  const values = [loginData.username, loginData.password];
    
    const [rows] = await db.query( "SELECT A_ID, Username, Password FROM admin WHERE Username = ? AND Password = ?", values);
    return rows
}

// ====================================

exports.adminPageService = async(params)=>{
  const id = params.id
  const [rows] = await db.query("SELECT * FROM admin WHERE A_ID = ? ", id)
  return rows
}
