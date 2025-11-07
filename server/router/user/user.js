const express = require("express");
const z = require("zod");
const db = require("../../db/config");
const router = express.Router();

// ========================user get full info api==========================

router.get("/user/:id", async (req, res) => {
  const paramID = req.params.id;

  try {
    const [findID] = await db.query(
      "SELECT * FROM customer WHERE C_ID = ?",
      paramID
    );
    if (findID.length === 0) {
      return res.send({ message: "there is no user in this ID." });
    }
    res.send(findID);
  } catch (error) {
    res.send({ message: error });
  }
});

// ======================user update account info api===========================

router.put("/user/update/:id", async (req, res) => {
  const paramID = req.params.id;
  const updatingData = req.body;
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

  try {
    const [findID] = await db.query(
      "SELECT * FROM customer WHERE C_ID = ?",
      paramID
    );
    if (findID.length === 0) {
      return res.send({ message: "there is no user in this ID to update.",
        ID:paramID
       });
    }

    try {
      await db.query(
        "UPDATE customer SET FullName=? , Email=? , Password=? , PhoneNumber=? , DoB=? , Nationality=? , Address=?, City=? , Update_Date=? WHERE C_ID = ?",
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

// ================user delete account api =============================

router.delete("/user/delete/:id", async (req, res) => {
  const paramID = req.params.id;

  try {
    const [findID] = await db.query(
      "SELECT * FROM customer WHERE C_ID = ?",
      paramID
    );
    if (findID.length === 0) {
      return res.send({ message: "there is no user in this ID to Delete.",
        ID : paramID
       });
    }

    try {
      await db.query("DELETE FROM customer WHERE C_ID = ?" , paramID);
      res.send({ message: "Deleted successfully.",
        ID: paramID
       });
    } catch (error) {
      res.send({ message: error });
    }
  } catch (error) {
    res.send({ message: error });
  }
});

module.exports = router;