const db = require("../../db/config");

exports.allReservationService = async () => {
  const [rows] = await db.query(`
    SELECT r.*
    FROM reservation r
    INNER JOIN (
      SELECT V_ID, MAX(Posting_Date) AS latest_date
      FROM reservation
      GROUP BY V_ID
    ) latest
      ON r.V_ID = latest.V_ID
     AND r.Posting_Date = latest.latest_date
    ORDER BY r.Posting_Date DESC
  `);

  return rows;
};


// ===============================================================
exports.pendingReservationService = async () => {
  const [rows] = await db.query(
    "SELECT * FROM reservation WHERE status = ?",
    "pending"
  );

  for(let name of rows){
    const [namedata] = await db.query("SELECT FullName FROM customer WHERE C_ID = ?", name.C_ID)
    name.userName = namedata[0].FullName
  }

  return rows;
};
// ==============================================================
exports.confirmedReservationService = async () => {
  const [rows] = await db.query(
    "SELECT * FROM reservation WHERE status = 'confirmed' OR status = 'onHold'"
  );
  for(let name of rows){
    const [namedata] = await db.query("SELECT FullName FROM customer WHERE C_ID = ?", name.C_ID)
    name.userName = namedata[0].FullName
  }
 
  return rows;
};
// ===============================================================

exports.confirmReservationService = async (params) => {
  const adminID = params.adminid;
  const reservationID = params.reservationid;
  let status = "confirmed";
  const date = new Date().toLocaleString();

  const [findID] = await db.query(
    "SELECT * FROM reservation WHERE R_ID = ?",
    reservationID
  );
  if (findID.length === 0) {
    throw new Error("there is no reservation in this ID to update.");
  }

  const todayDate = new Date()
  const pickup = new Date(findID[0].Pickup_Date)

  const DifferenceDate = pickup - todayDate
  const sevenDay = 1000 * 60 * 60 * 24 * 7

  if(DifferenceDate > sevenDay){
    status = "onHold"
  }


  await db.query("UPDATE reservation SET status = ?  WHERE R_ID = ?", [status ,reservationID]);

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
    data[0].D_ID,
    data[0].Pickup_Date,
    data[0].Return_Date,
    data[0].Rent_Day,
    vehicleData[0].Price_Per_Day,
    data[0].total_Payment,
    data[0].Confirmation_Number,
  ];

  await db.query(
    "INSERT INTO rent (C_ID, V_ID, A_ID,Reservation_R_ID, D_ID, Pickup_Date,Return_Date,Total_Rent_Day,Daily_Fee,Total_paid,Confirmation_Number) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
    result
  );

  await db.query(
    "INSERT INTO reservation_logs(Reservation_ID, C_ID, V_ID, Admin_ID, D_ID, Action_Type, Old_Status, New_Status, Tax_Amount, Pickup_Date, Return_Date, Rent_Days, Price_Per_Day, Total_Charge, Confirmation_Number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      reservationID,
      findID[0].C_ID,
      findID[0].V_ID,
      adminID,
      data[0].D_ID,
      "confirmed",
      findID[0].Status,
      `Reservation confirmed by AdminID ${adminID}`,
      data[0].Tax_Amount,
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
const pickup = new Date(findID[0].Pickup_Date);
const returnD = new Date(findID[0].Return_Date);

// Date-only comparison
today.setHours(0, 0, 0, 0);
pickup.setHours(0, 0, 0, 0);
returnD.setHours(0, 0, 0, 0);

const rentDay = parseInt(findID[0].Rent_Day);
const pricePerDay = parseFloat(vehicleData[0].Price_Per_Day);

const payment = rentDay * pricePerDay;
let refund = 0;
let overPay = 0;

/* ===============================
   1️⃣ Reservation not started
================================= */
if (pickup > today) {
  refund = payment * 0.6; // refund 60%, cut 40%

/* ===============================
   2️⃣ Early return
================================= */
} else if (today < returnD) {
  const remainingDays = Math.ceil(
    (returnD - today) / (1000 * 60 * 60 * 24)
  );

  const remainingFee = remainingDays * pricePerDay;
  refund = remainingFee * 0.6;

/* ===============================
   3️⃣ Late return
================================= */
} else if (today > returnD) {
  const overdueDays = Math.ceil(
    (today - returnD) / (1000 * 60 * 60 * 24)
  );

  overPay = overdueDays * pricePerDay * 1.5;
}

/* ===============================
   4️⃣ On-time return
================================= */
// refund = 0
// overPay = 0



  const result = [
    findID[0].C_ID,
    findID[0].V_ID,
    adminID,
    findID[0].R_ID,
    findID[0].Pickup_Date,
    findID[0].Return_Date,
    findID[0].Rent_Day,
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
    "INSERT INTO reservation_logs(Reservation_ID, C_ID, V_ID, Admin_ID, D_ID, Action_Type, Old_Status, New_Status,Tax_Amount, Pickup_Date, Return_Date, Rent_Days, Price_Per_Day, Total_Charge, Overpayment, Refund, Confirmation_Number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      reservationID,
      findID[0].C_ID,
      findID[0].V_ID,
      adminID,
      findID[0].D_ID,
      "done",
      findID[0].Status,
      `Reservation completed by AdminID ${adminID}`,
      findID[0].Tax_Amount,
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
    "INSERT INTO reservation_logs(Reservation_ID, C_ID, V_ID, Admin_ID, D_ID, Action_Type, Old_Status, New_Status, Pickup_Date, Return_Date, Rent_Days, Price_Per_Day, Total_Charge, Overpayment, Refund, Confirmation_Number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      reservationID,
      findID[0].C_ID,
      findID[0].V_ID,
      adminID,
      findID[0].D_ID,
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


// ====================================================================
exports.advancedSearchService = async (req) => {
  const { type, value } = req.query;

  if (!type || !value) {
    throw new Error("Search type and value are required");
  }

  const param = `%${value}%`;
  let query = "";
  let params = [];

  switch (type) {
    case "name":
      query = `SELECT C_ID , FullName, Email,PhoneNumber FROM customer WHERE FullName LIKE ?`;
      params = [param];
      break;

    case "email":
      query = `SELECT  C_ID , FullName, Email, PhoneNumber FROM customer WHERE Email LIKE ?`;
      params = [param];
      break;

    case "phone":
      query = `SELECT  C_ID, FullName, Email,PhoneNumber FROM customer WHERE PhoneNumber LIKE ?`;
      params = [param];
      break;

    default:
      throw new Error("Invalid search type");
  }

  const [rows] = await db.query(query, params);
  return rows;
};

