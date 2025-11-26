const db = require("../../db/config");
const jwt = require("jsonwebtoken")

exports.usersInfoService = async (id) => {
  const paramID = id;
  const [findID] = await db.query(
    "SELECT * FROM customer WHERE C_ID = ?",
    paramID
  );
  console.log(paramID)
  if (findID.length === 0) {
    throw new Error("there is no user in this ID.");
  }
  return findID;
};

// ========================================================

exports.usersInfoUpdateService = async ({ paramID, updatingData }) => {
  const data = new Date().toLocaleString();

  const result = [
    updatingData.fullName,
    updatingData.email,
    updatingData.password,
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
    "UPDATE customer SET FullName=? , Email=? , Password=? , PhoneNumber=? , DoB=? , Nationality=? , City=? , Update_Date=? WHERE C_ID = ?",
    result
  );
    const [userData] = await db.query(
    "SELECT * FROM customer WHERE C_ID = ?",
    paramID
  );

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

// =============================================================

exports.usersInfoDeleteService = async (id) => {
  const paramID = id;
  const [findID] = await db.query(
    "SELECT * FROM customer WHERE C_ID = ?",
    paramID
  );
  if (findID.length === 0) {
    throw new Error("there is no user in this ID to Delete.");
  }
  await db.query("DELETE FROM customer WHERE C_ID = ?", paramID);
  return paramID;
};
