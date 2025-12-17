const db = require("../../db/config");
// const { v4: uuidv4, v4 } = require("uuid");
// const { v4 : uuidv4 } = require('uuid')


exports.allVehicleReservationService = async ({ id }) => {
  const [rows] = await db.query("SELECT * FROM reservation WHERE C_ID = ? ", [
    id,
  ]);

  for (let items of rows) {
    let DriverID = items.D_ID
    if (DriverID == null) {
      continue
    }
    const [driver] = await db.query("SELECT * FROM driver WHERE D_ID = ?", [DriverID])
    items.driverDetail = driver[0]

  }
  return rows;
};

// ================================================================================

exports.vehicleReservationService = async ({
  reservationData,
  userId,
  vehicleId,
  browser,
}) => {
  const status = "pending";
  const uuid = "1234567890"; // uuidv4();

  const [vehicleData] = await db.query(
    "SELECT * FROM vehicle WHERE V_ID = ?",
    vehicleId
  );

  const values = [
    userId,
    vehicleId,
    reservationData.vehicleDriver == "NoDriver" ? null : reservationData.vehicleDriver,
    reservationData.pickUpDate,
    reservationData.returnDate,
    reservationData.rentDay,
    reservationData.tax,
    reservationData.TotalPayment,
    status,
    uuid,
  ];

  const [rows] = await db.query(
    "INSERT INTO reservation (C_ID, V_ID, D_ID, Pickup_Date, Return_Date, Rent_Day, Tax_Amount, total_Payment, Status, Confirmation_Number) VALUES(?,?,?,?,?,?,?,?,?,?) ",
    values
  );
  await db.query(
    "INSERT INTO user_logs (User_ID, Role, Action, Target_ID, Description,Device) VALUES (?,?,?,?,?,?)",
    [
      userId,
      "customer",
      "Reservation Created.",
      rows.insertId,
      `Reservation Created by userID ${userId}`,
      browser,
    ]
  );

  const [vehicle] = await db.query(
    "SELECT * FROM vehicle WHERE V_ID = ?",
    vehicleId
  );

  const [uuID] = await db.query("SELECT Confirmation_Number FROM reservation WHERE R_ID = ?", rows.insertId)

  await db.query(

    "INSERT INTO reservation_logs(Reservation_ID, C_ID, V_ID,D_ID, Admin_ID, Action_Type, Old_Status,New_Status, Tax_Amount, Pickup_Date, Return_Date, Rent_Days, Price_Per_Day, Total_Charge, Confirmation_Number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      rows.insertId,
      userId,
      vehicleId,
      reservationData.vehicleDriver == "NoDriver" ? null : reservationData.vehicleDriver,
      vehicle[0].A_ID,
      reservationData.vehicleDriver == "NoDriver" ? null : reservationData.vehicleDriver,
      "created",
      "No status",
      "pending",
      reservationData.tax,
      reservationData.pickUpDate,
      reservationData.returnDate,
      reservationData.rentDay,
      vehicle[0].Price_Per_Day,
      reservationData.TotalPayment,
      uuID[0].Confirmation_Number
    ]
  );

  return rows;
};

// ==========================================================

exports.vehicleReservationUpdateService = async ({
  reservationID,
  updatingData,
  browser,
}) => {
  const date = new Date().toLocaleString();

  const values = [
    parseInt(updatingData.vehicleDriver),
    updatingData.pickUpDate,
    updatingData.returnDate,
    updatingData.rentDay,
    updatingData.totalPayment,
    updatingData.tax,
    reservationID,
  ];

  const [findID] = await db.query(
    "SELECT * FROM reservation WHERE R_ID = ?",
    reservationID
  );
  if (findID.length === 0) {
    throw new Error("there is no reservation in this ID to update.");
  }

  await db.query(
    "UPDATE reservation SET D_ID = ?, Pickup_Date = ?, Return_Date = ? , 	Rent_Day =?, total_Payment =? , Tax_Amount = ? WHERE R_ID = ?",
    values
  );

  await db.query(
    "INSERT INTO user_logs (User_ID, Role, Action, Target_ID, Description,Device) VALUES (?,?,?,?,?,?)",
    [
      findID[0].C_ID,
      "customer",
      "Update Reservation",
      reservationID,
      `Updated Reservation by userID ${findID[0].C_ID}`,
      browser,
    ]
  );

  const [vehicle] = await db.query(
    "SELECT * FROM vehicle WHERE V_ID = ?",
    findID[0].V_ID
  );

  await db.query(
    "INSERT INTO reservation_logs(Reservation_ID, C_ID, V_ID,D_ID, Admin_ID, Action_Type, Old_Status, New_Status, Pickup_Date, Return_Date, Rent_Days, Price_Per_Day,Tax_Amount, Total_Charge, Confirmation_Number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [reservationID,
      findID[0].C_ID,
      findID[0].V_ID,
      vehicle[0].A_ID,
      parseInt(updatingData.vehicleDriver),
      "updated",
      findID[0].Status,
      "pending",
      updatingData.pickUpDate,
      updatingData.returnDate,
      updatingData.rentDay,
      vehicle[0].Price_Per_Day,
      updatingData.tax,
      updatingData.totalPayment,
      findID[0].Confirmation_Number
    ]
  );


};

// ================================================================

exports.vehicleReservationDeleteService = async ({
  reservationID,
  browser,
}) => {
  const [findID] = await db.query(
    "SELECT * FROM reservation WHERE R_ID = ?",
    reservationID
  );
  if (findID.length === 0) {
    throw new Error("there is no reservation in this ID to Delete.");
  }

  await db.query("DELETE FROM reservation WHERE R_ID = ?", reservationID);

  await db.query(
    "INSERT INTO user_logs (User_ID, Role, Action, Target_ID, Description,Device) VALUES (?,?,?,?,?,?)",
    [
      findID[0].C_ID,
      "customer",
      "Delete Reservation",
      reservationID,
      `Deleted Reservation by userID ${findID[0].C_ID}`,
      browser,
    ]
  );
  const [vehicle] = await db.query(
    "SELECT * FROM vehicle WHERE V_ID = ?",
    findID[0].V_ID
  );
  await db.query(
    "INSERT INTO reservation_logs(Reservation_ID, C_ID, V_ID, Admin_ID, D_ID, Action_Type, Old_Status, New_Status, Pickup_Date, Return_Date, Rent_Days, Price_Per_Day, Total_Charge, Confirmation_Number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [reservationID,
      findID[0].C_ID,
      findID[0].V_ID,
      vehicle[0].A_ID,
      findID[0].D_ID,
      "deleted",
      findID[0].Status,
      "Reservation Deleted",
      findID[0].Pickup_Date,
      findID[0].Return_Date,
      findID[0].Rent_Day,
      vehicle[0].Price_Per_Day,
      findID[0].total_Payment,
      findID[0].Confirmation_Number
    ]
  );
};

// ===============================================================
exports.SingleVehicleReservationService = async ({ reservationID }) => {
  const [rows] = await db.query(
    "SELECT * FROM reservation WHERE R_ID = ?",
    reservationID
  );

  const [driver] = await db.query("SELECT * FROM driver WHERE D_ID = ?", [rows[0].D_ID])
  rows[0].driverDetail = driver[0]

  return rows;
};

//  ============================================================
exports.rentedVehicleService = async ({ userId }) => {
  const [rows] = await db.query(
    "SELECT * FROM rent WHERE C_ID  = ?",
    userId
  );

  for (let items of rows) {
    let DriverID = items.D_ID
    if (DriverID == null) {
      continue
    }
    const [driver] = await db.query("SELECT * FROM driver WHERE D_ID = ?", [DriverID])
    items.driverDetail = driver[0]

  }

  return rows;
};
//  ============================================================
exports.rejectedVehicleService = async ({ userId }) => {
  const [rows] = await db.query(
    "SELECT * FROM reservation_logs WHERE C_ID  = ?",
    userId
  );
  for (let items of rows) {
    let DriverID = items.D_ID
    if (DriverID == null) {
      continue
    }
    const [driver] = await db.query("SELECT * FROM driver WHERE D_ID = ?", [DriverID])
    items.driverDetail = driver[0]

  }
  return rows;
};

// =============================================================

exports.singleRentedService = async ({ rid }) => {
  const [rows] = await db.query(
    "SELECT * FROM rent WHERE  Reservation_R_ID  = ?",
    rid
  );
  return rows;

};
