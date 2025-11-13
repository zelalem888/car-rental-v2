const express = require('express')
const {adminLoginService,adminPageService} = require('../../service/admin/auth.admin.service')

exports.adminLoginController = async (req, res)=>{
  try {
    const rows = await adminLoginService(req.body)

    if (rows.length > 0) {
      return res.status(200).json({message:`Login successful.`, data: rows});
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

// ==================================================

exports.adminPageController = async(req , res)=>{
  try {
    const result = await adminPageService(req.params)
    res.status(200).json(result)
  }catch(error){
    return res.status(400).json(error)
  }
}