const express = require('express')
const {adminLoginService} = require('../../service/admin/auth.admin.service')

exports.adminLoginController = async (req, res)=>{
  try {
    const rows = await adminLoginService(req.body)

    if (rows.length === 1) {
      return res.status(200).json({
        message: `Login successful.`,
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
}
