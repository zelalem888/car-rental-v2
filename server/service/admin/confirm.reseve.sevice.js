const db = require("../../db/config");

exports.allReservationService = async () => {
  const [rows] = await db.query("SELECT * FROM reservation");
  return rows;
};

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
    throw new Error({
      message: "there is no reservation in this ID to update.",
      ID: reservationID,
    });
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
    vehicleData[0].Price_Per_Day,
  ];

  await db.query(
    "INSERT INTO rent (C_ID, V_ID, A_ID,Reservation_R_ID, Pickup_Date,Return_Date,Daily_Fee) VALUES (?,?,?,?,?,?,?)",
    result
  );

  return reservationID;
};
