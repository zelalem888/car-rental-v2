const db = require("../../db/config");

exports.allReservationService = async () => {
  const [rows] = await db.query("SELECT * FROM reservation");
  return rows;
};
// ===============================================================
exports.pendingReservationService = async () => {
  const [rows] = await db.query(
    "SELECT * FROM reservation WHERE status = ? ",
    "pending"
  );
  return rows;
};
// ==============================================================
exports.confirmedReservationService = async () => {
  const [rows] = await db.query(
    "SELECT * FROM reservation WHERE status = ? ",
    "confirmed"
  );
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

  const result = [
    data[0].C_ID,
    data[0].V_ID,
    adminID,
    data[0].R_ID,
    data[0].Pickup_Date,
    data[0].Return_Date,
    data[0].Rent_Day,
    vehicleData[0].Price_Per_Day,
    data[0].total_Payment,
    data[0].Confirmation_Number,
  ];

  await db.query(
    "INSERT INTO rent (C_ID, V_ID, A_ID,Reservation_R_ID, Pickup_Date,Return_Date,Total_Rent_Day,Daily_Fee,Total_paid,Confirmation_Number) VALUES (?,?,?,?,?,?,?,?,?,?)",
    result
  );

  await db.query(
    "INSERT INTO reservation_logs(Reservation_ID, C_ID, V_ID, Admin_ID, Action_Type, Old_Status, New_Status, Pickup_Date, Return_Date, Rent_Days, Price_Per_Day, Total_Charge, Confirmation_Number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      reservationID,
      findID[0].C_ID,
      findID[0].V_ID,
      vehicleData[0].A_ID,
      "confirmed",
      findID[0].Status,
      `Reservation confirmed by AdminID ${adminID}`,
      data[0].Pickup_Date,
      data[0].Return_Date,
      data[0].Rent_Day,
      vehicleData[0].Price_Per_Day,
      data[0].total_Payment,
      data[0].Confirmation_Number,
    ]
  );

  return reservationID;
};

// =============================================================
exports.doneReservationService = async (params) => {
  const adminID = params.adminid;
  const reservationID = params.reservationid;
  const date = new Date().toLocaleString();

  const [findID] = await db.query(
    "SELECT * FROM reservation WHERE R_ID = ?",
    reservationID
  );
  if (findID.length === 0) {
    throw new Error("there is no reservation in this ID to delete/done.");
  }

  const [vehicleData] = await db.query(
    "SELECT * FROM vehicle WHERE V_ID = ?",
    findID[0].V_ID
  );

  const today = new Date();
  const returning = new Date(findID[0].Return_Date);

  const diffMs = returning - today;
  const totalRentDay = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  let overPay = 0;
  let refund = 0;
  let payment = 0;

  if (totalRentDay < 0) {
    overPay = Math.abs(totalRentDay) * parseFloat(vehicleData[0].Price_Per_Day);
  } else if (totalRentDay === 0) {
    payment = 0;
  } else {
    refund = totalRentDay * parseFloat(vehicleData[0].Price_Per_Day);
  }

  const result = [
    findID[0].C_ID,
    findID[0].V_ID,
    adminID,
    findID[0].R_ID,
    findID[0].Pickup_Date,
    findID[0].Return_Date,
    totalRentDay,
    vehicleData[0].Price_Per_Day,
    overPay,
    refund,
    findID[0].Confirmation_Number,
    reservationID,
  ];

  await db.query(
    "UPDATE rent SET C_ID =? , V_ID =?, A_ID=?,Reservation_R_ID=?, Pickup_Date=?,Return_Date=?,Total_Rent_Day=? ,Daily_Fee=?,over_payment=?, Refund=? ,Confirmation_Number=? WHERE Reservation_R_ID=?",
    result
  );

  await db.query("DELETE FROM reservation WHERE R_ID=?", reservationID);


  await db.query(
    "INSERT INTO reservation_logs(Reservation_ID, C_ID, V_ID, Admin_ID, Action_Type, Old_Status, New_Status, Pickup_Date, Return_Date, Rent_Days, Price_Per_Day, Total_Charge, Overpayment, Refund, Confirmation_Number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      reservationID,
      findID[0].C_ID,
      findID[0].V_ID,
      vehicleData[0].A_ID,
      "done",
      findID[0].Status,
      `Reservation completed by AdminID ${adminID}`,
      findID[0].Pickup_Date,
      findID[0].Return_Date,
      findID[0].Rent_Day,
      vehicleData[0].Price_Per_Day,
      findID[0].total_Payment,
      overPay,
      refund,
      findID[0].Confirmation_Number,
    ]
  );


  const [rows] = await db.query(
    "SELECT * FROM rent WHERE Reservation_R_ID=?",
    reservationID
  );

  return rows;
};

// =============================================================
exports.rejectReservationService = async (params) => {
  const adminID = params.adminid;
  const reservationID = params.reservationid;
  let overPay = 0;
  let refund = 0;

  const [findID] = await db.query(
    "SELECT * FROM reservation WHERE R_ID = ?",
    reservationID
  );
  if (findID.length === 0) {
    throw new Error("there is no reservation in this ID to delete/done.");
  }

  const [vehicleData] = await db.query(
    "SELECT * FROM vehicle WHERE V_ID = ?",
    findID[0].V_ID
  );

  await db.query("DELETE FROM reservation WHERE R_ID=?", reservationID);


  await db.query(
    "INSERT INTO reservation_logs(Reservation_ID, C_ID, V_ID, Admin_ID, Action_Type, Old_Status, New_Status, Pickup_Date, Return_Date, Rent_Days, Price_Per_Day, Total_Charge, Overpayment, Refund, Confirmation_Number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      reservationID,
      findID[0].C_ID,
      findID[0].V_ID,
      vehicleData[0].A_ID,
      "rejected",
      findID[0].Status,
      `Reservation Rejected by AdminID ${adminID}`,
      findID[0].Pickup_Date,
      findID[0].Return_Date,
      findID[0].Rent_Day,
      vehicleData[0].Price_Per_Day,
      findID[0].total_Payment,
      overPay,
      refund,
      findID[0].Confirmation_Number,
    ]
  );
};
