const express = require("express");
const z = require("zod");
const db = require("../../db/config");
const router = express.Router();


// ==================reservation api===========================

router.post("/user/reservation/:id/:vehicleid", async (req, res) => {
  const reservationData = req.body;
  const userId = req.params.id;
  const vehicleId = req.params.vehicleid;
  const status = 'pending'
  const values = [userId, vehicleId,reservationData.pickUpDate, reservationData.returnDate,status]

  try {
    const [rows] = await db.query( "INSERT INTO reservation (C_ID, V_ID, Pickup_Date, Return_Date, Status) VALUES(?,?,?,?,?) ", values);
    
    console.log(rows)

    if (rows) {
      return res.status(200).json({
        message: `Reservation successful.`,
        customer: rows[0],
      });
    } else {
      return res.status(401).json({ message: "Invalid Reservation Data." });
    }
  } catch (error) {
    console.error("Database error during login:", error);
    return res
      .status(500)
      .json({ message: "An internal server error occurred." });
  }
});

// ======================user update account info api===========================

router.put("/reservation/update/:id/:reservationid", async (req, res) => {
  const reservationID = req.params.reservationid;
  const updatingData = req.body;
  const date = new Date().toLocaleString();

  const result = [
    updatingData.pickUpDate, updatingData.returnDate, reservationID
  ];

  try {
    const [findID] = await db.query(
      "SELECT * FROM reservation WHERE R_ID = ?",
      reservationID
    );
    if (findID.length === 0) {
      return res.send({ message: "there is no reservation in this ID to update.",
        ID:reservationID
       });
    }

    try {
      await db.query(
        "UPDATE reservation SET Pickup_Date = ?, Return_Date = ? WHERE R_ID = ?",
        result
      );
      res.send({ message: "Update Success." });
    } catch (error) {
      res.send({ message: error });
    }
  } catch (error) {
    res.send({ message: error });
  }
});

// ================reservation delete account api =============================

router.delete("/reservation/delete/:reservationid", async (req, res) => {
  const reservationID = req.params.reservationid;

  try {
    const [findID] = await db.query(
      "SELECT * FROM reservation WHERE R_ID = ?",
      reservationID
    );
    if (findID.length === 0) {
      return res.send({ message: "there is no reservation in this ID to Delete.",
        ID : reservationID
       });
    }

    try {
      await db.query("DELETE FROM reservation WHERE R_ID = ?" , reservationID);
      res.send({ message: "Deleted successfully.",
        ID: reservationID
       });
    } catch (error) {
      res.send({ message: error });
    }
  } catch (error) {
    res.send({ message: error });
  }
});


module.exports = router;
