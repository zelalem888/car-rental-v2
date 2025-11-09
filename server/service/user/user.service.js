const db = require("../../db/config");

exports.usersInfoService = async (id) => {
  const paramID = id;

  const [findID] = await db.query(
    "SELECT * FROM customer WHERE C_ID = ?",
    paramID
  );
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
    updatingData.address,
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

  await db.query(
    "UPDATE customer SET FullName=? , Email=? , Password=? , PhoneNumber=? , DoB=? , Nationality=? , Address=?, City=? , Update_Date=? WHERE C_ID = ?",
    result
  );
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
