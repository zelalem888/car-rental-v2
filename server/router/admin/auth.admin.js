const express = require("express");
const db = require("../../db/config");
const z = require("zod");

const router = express.Router();

// ==================user login api===========================

router.post("/admin/login", async (req, res) => {
  const loginData = req.body;
  const values = [loginData.username, loginData.password];

  try {
    const [rows] = await db.query( "SELECT A_ID, Username, Password FROM admin WHERE Username = ? AND Password = ?", values);

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

module.exports = router;
