const db = require("../../db/config");

exports.allReservationService = async () => {
  const [rows] = await db.query("SELECT * FROM reservation");
  return rows;
};
// ===============================================================
exports.pendingReservationService = async () => {
  const [rows] = await db.query("SELECT * FROM reservation WHERE status = ? ", "pending");
  return rows;
};
// ==============================================================
exports.confirmedReservationService = async () => {
  const [rows] = await db.query("SELECT * FROM reservation WHERE status = ? ", "confirmed");
  return rows;
};
// ===============================================================

exports.confirmReservationService = async (params) => {
  const adminID = params.adminid;
  const reservationID = params.reservationid;
  const status = "confirmed";
  const date = new Date().toLocaleString();
  const results = [status, reservationID];

  const [findID] = await db.query(
    "SELECT * FROM reservation WHERE R_ID = ?",
    reservationID
  );
  if (findID.length === 0) {
    throw new Error("there is no reservation in this ID to update.");
  }

  await db.query("UPDATE reservation SET status = ? WHERE R_ID = ?", results);

  const [data] = await db.query(
    "SELECT * FROM reservation WHERE R_ID = ?",
    reservationID
  );
  const [vehicleData] = await db.query(
    "SELECT * FROM vehicle WHERE V_ID = ?",
    data[0].V_ID
  );
 

  const pickupD =JSON.stringify(data[0].Pickup_Date).slice(1,11);
  const returnD =JSON.stringify(data[0].Return_Date).slice(1,11);
  const pickupDate = pickupD.split("-");
  const returnDate = returnD.split("-");
  const totalRentDay =((parseInt(returnDate[0]) - parseInt(pickupDate[0])) * 365) +((parseInt(returnDate[1])- parseInt(pickupDate[1])) * 30) +  (parseInt(returnDate[2])- parseInt(pickupDate[2]))
  const totalPay = parseFloat(vehicleData[0].Price_Per_Day) * totalRentDay;

  
  const result = [
    data[0].C_ID,
    data[0].V_ID,
    adminID,
    data[0].R_ID,
    data[0].Pickup_Date,
    data[0].Return_Date,
    totalRentDay,
    vehicleData[0].Price_Per_Day,
    totalPay,
    data[0].Confirmation_Number
  ];

  await db.query(
    "INSERT INTO rent (C_ID, V_ID, A_ID,Reservation_R_ID, Pickup_Date,Return_Date,Total_Rent_Day,Daily_Fee,Total_paid,Confirmation_Number) VALUES (?,?,?,?,?,?,?,?,?,?)",
    result
  );

  return reservationID;
};
