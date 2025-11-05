const express = require("express");
const z = require("zod");
const db = require("../db/config");
const router = express.Router();


// ================user login api===========================

router.post("/user/login", async (req, res) => {
  const loginData = req.body;

  const values = [loginData.email, loginData.password];
  const sql =
    "SELECT C_ID, Email, Password FROM customer WHERE Email = ? AND Password = ?";

  try {
    const [rows] = await db.query(sql, values);

    if (rows.length === 1) {
      return res.status(200).json({
        message: `Login successful for ${loginData.email}.`,
        customer: rows[0],
      });
    } else {
      return res.status(401).json({ message: "Invalid email or password." });
    }
  } catch (error) {
    console.error("Database error during login:", error);
    return res
      .status(500)
      .json({ message: "An internal server error occurred." });
  }
});

// ====================user register api====================

const userSchema = z.object({
  fullName: z.string().min(3).max(100),
  email: z.string().email(),
  password: z.string().min(8),
  phoneNumber: z
    .string()
    .regex(/^\+?\d{10,15}$/, "Invalid phone number format"),
  // Important: Use coerce.date() to convert the input string to a Date object
  dateOfBirth: z.string().pipe(z.coerce.date()),
  nationality: z.string().min(2),
  address: z.string().min(5),
  city: z.string().min(2),
});

router.post("/user/register", async (req, res) => {
  try {
    const registerData = req.body;
    const validateRegister = userSchema.parse(registerData);
    const date = new Date().toLocaleString();
    const result = [
      validateRegister.fullName,
      validateRegister.email,
      validateRegister.password,
      validateRegister.phoneNumber,
      validateRegister.dateOfBirth,
      validateRegister.nationality,
      validateRegister.address,
      validateRegister.city,
      date,
    ];

    const [checkData] = await db.query(
      "SELECT Email FROM customer WHERE Email = ?",
      validateRegister.email
    );

    if (checkData.length > 0) {
      return res.send({
        message: "there is an email already created: " + registerData.email,
      });
    }

    try {
      const data = await db.query(
        "INSERT INTO customer (FullName , Email, Password, PhoneNumber, DoB,Nationality, Address, City,Update_Date) VALUES (?,?,?,?,?,?,?,?,?)",
        result
      );
    } catch (error) {
      res.send({ message: error }).status(400);
    }

    res.send(validateRegister.fullName + " registered!").status(200);
  } catch (error) {
    res.send({ message: error });
  }
});

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
