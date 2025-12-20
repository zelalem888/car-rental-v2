const db = require("../../db/config");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const fs = require("fs");




exports.allUsersService = async () => {
  const [findID] = await db.query(
    "SELECT * FROM customer"
  );
  return findID;
};

// =========================================================

exports.usersInfoService = async (id) => {
  const paramID = id;
  const [findID] = await db.query(
    "SELECT * FROM customer WHERE C_ID = ?",
    paramID
  );
  // console.log(paramID)
  if (findID.length === 0) {
    throw new Error("there is no user in this ID.");
  }
  // const password = findID[0].Password
  return findID;
};

// ===========================================================

exports.UsersDetailService = async (id) => {
  const paramID = id;
  const [findID] = await db.query(
    "SELECT * FROM customer WHERE C_ID = ?",
    paramID
  );
  // console.log(paramID)
  if (findID.length === 0) {
    throw new Error("there is no user in this ID.");
  }
const [userReservationHistory] = await db.query("SELECT * FROM reservation WHERE C_ID = ? ", paramID)
for (let userH of userReservationHistory){
  let adminN = null
  const [adminID] = await db.query("SELECT A_ID FROM rent WHERE Reservation_R_ID  = ?" , [userH.R_ID])
  for(let admin of adminID){
    const [adminName] = await db.query("SELECT FullName FROM admin WHERE A_ID = ?" , [admin.A_ID])
    adminN = adminName[0].FullName
  }
  userH.adminName = adminN
}

const [userLog] = await db.query("SELECT * FROM reservation_logs WHERE C_ID = ? ", paramID)

  return {userReservedH : userReservationHistory, usersLog: userLog , customerName : findID};
};


// ========================================================

exports.usersInfoUpdateService = async ({ paramID, updatingData, browser }) => {
  const data = new Date().toLocaleString();

  const result = [
    updatingData.fullName,
    updatingData.email,
    // updatingData.password,
    updatingData.phoneNumber,
    updatingData.dateOfBirth,
    updatingData.nationality,
    updatingData.city,
    data,
    paramID,
  ];

  const [findID] = await db.query(
    "SELECT * FROM customer WHERE C_ID = ?",
    paramID
  );
  if (findID.length === 0) {
    throw new Error("there is no user in this ID to update.");
  }
  const [FindEmail] = await db.query(
  "SELECT Email FROM customer WHERE C_ID != ?",
  [paramID]
);
if(FindEmail > 0){
  for (let i = 0; i < FindEmail.length; i++) {
    if (FindEmail[i].Email === updatingData.email) {
      throw new Error("This Email already exists.");
    }
  }
}


  await db.query(
    "UPDATE customer SET FullName=? , Email=? , PhoneNumber=? , DoB=? , Nationality=? , City=? , Update_Date=? WHERE C_ID = ?",
    result
  );
    const [userData] = await db.query(
    "SELECT * FROM customer WHERE C_ID = ?",
    paramID
  );

  await db.query("INSERT INTO user_logs (User_ID, Role, Action, Description,Device) VALUES (?,?,?,?,?)",[paramID,"customer" ,"Update Account", `Updated Account by userID ${paramID}`, browser])


  // console.log(findID);
  const JWTSecretKey = process.env.JWT_SECRET;
  const email = userData[0].Email;
  const id = userData[0].C_ID;
  const name = userData[0].FullName;

const jwtData = {
    signInTime: Date.now(),
    email,
    id,
    name,
  };

  const token = jwt.sign(jwtData, JWTSecretKey);

  return token;

};

// ============================================================


exports.usersUpdatePasswordService = async ({ paramID, updatingData, browser }) => {
  const date = new Date().toLocaleString();
  const saltRounds = 10;

  const oldPassword = updatingData.oldPassword
  const newPassword = updatingData.newPassword

  const [findID] = await db.query(
    "SELECT * FROM customer WHERE C_ID = ?",
    paramID
  );
  if (findID.length === 0) {
    throw new Error("there is no user in this ID to update password.");
  }

  const hashPassword = findID[0].Password
  const match = await bcrypt.compare(oldPassword, hashPassword);
  console.log(match)
    if (!match) {
    throw new Error("incorrect password.");
  }

  let hashedPass = await bcrypt.hash(newPassword, saltRounds);
  
  await db.query(
    "UPDATE customer SET Password = ? , Update_Date=? WHERE C_ID = ?",
    [hashedPass, date ,paramID]
  );

  await db.query("INSERT INTO user_logs (User_ID, Role, Action, Description,Device) VALUES (?,?,?,?,?)",[paramID,"customer" ,"Update Account Password", `Updated Account Password by userID ${paramID}`, browser])

};


// =============================================================

exports.usersInfoDeleteService = async (id,browser) => {
  const paramID = id;
  const [findID] = await db.query(
    "SELECT * FROM customer WHERE C_ID = ?",
    paramID
  );
  if (findID.length === 0) {
    throw new Error("there is no user in this ID to Delete.");
  }
  await db.query("DELETE FROM customer WHERE C_ID = ?", paramID);
    
  await db.query("INSERT INTO user_logs (User_ID, Role, Action, Description, Device) VALUES (?,?,?,?,?)",[paramID,"customer" ,"Deleted Account", `Deleted Reservation by userID ${paramID}`, browser])

  return paramID;
};

// ==============================================================
exports.UserDocumentService = async (id, files, browser) => {
  if (!files || Object.keys(files).length === 0) {
    throw new Error("No documents uploaded");
  }

  const documents = {
    digital_id: files.digital_id?.[0]?.filename || null,
  };

  // Required validation
  if (!documents.digital_id) {
    throw new Error("Digital ID is required");
  }

  const savedPaths = {
    digital_id: documents.digital_id
      ? `/uploads/userDocument/${documents.digital_id}`
      : null
  };


  const [rows] = await db.query("UPDATE customer SET Documents = ?  WHERE C_ID = ?", [JSON.stringify(savedPaths) , id])

  await db.query("INSERT INTO user_logs (User_ID, Role, Action, Description,Device) VALUES (?,?,?,?,?)",[id,"customer" ,"inserted Documents", `Document inserted by userID ${id}`, browser])

  return rows;
};

// ================================================================

exports.checkDocumentService = async (id) => {
  const paramID = id;
  const [findID] = await db.query(
    "SELECT * FROM customer WHERE C_ID = ?",
    paramID
  );
  if (findID.length === 0) {
    throw new Error("there is no user in this ID");
  }
  if(findID[0].Documents == null){
    return {doc : false}
  }else{
    return {doc : true}
  }
};
