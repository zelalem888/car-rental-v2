const db = require("../../db/config");
const { v4 : uuidv4 } = require('uuid')

exports.vehicleReservationService = async ({ reservationData,userId, vehicleId}) => {
  const status = "pending";
  const uuid = uuidv4()
  const values = [
    userId,
    vehicleId,
    reservationData.pickUpDate,
    reservationData.returnDate,
    status,
    uuid
    
  ];

  const [rows] = await db.query(
    "INSERT INTO reservation (C_ID, V_ID, Pickup_Date, Return_Date, Status,Confirmation_Number) VALUES(?,?,?,?,?,?) ",
    values
  );
  return rows;
};


// ==========================================================

exports.vehicleReservationUpdateService = async({reservationID,updatingData})=>{
const date = new Date().toLocaleString();

  const values = [
    updatingData.pickUpDate, updatingData.returnDate, reservationID
  ];
   
    const [findID] = await db.query(
      "SELECT * FROM reservation WHERE R_ID = ?",
      reservationID
    );
    if (findID.length === 0) {
        throw new Error("there is no reservation in this ID to update.")
    }

      await db.query(
        "UPDATE reservation SET Pickup_Date = ?, Return_Date = ? WHERE R_ID = ?",
        values
      );
}

// ================================================================

exports.vehicleReservationDeleteService = async({reservationID})=>{
    const [findID] = await db.query(
      "SELECT * FROM reservation WHERE R_ID = ?",
      reservationID
    );
    if (findID.length === 0) {
        throw new Error("there is no reservation in this ID to Delete.")
    }

      await db.query("DELETE FROM reservation WHERE R_ID = ?" , reservationID);
}
