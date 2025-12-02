const express = require('express')
const { adminLoginService, adminPageService, adminVerifyService } = require('../../service/admin/auth.admin.service')

exports.adminLoginController = async (req, res) => {
  try {
    const browser =  req.headers["user-agent"];
    const rows = await adminLoginService(req.body, browser)

    if (rows.rows.length > 0) {
    
      // console.log(rows)
       return res.status(200).json({
      success: true,
      ...rows,
    });
    } else {
     return res.status(401).json({ success: false, message: "Invalid username or password" });


    }

   
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};


// ==================================================

exports.adminVerifyController = async (req, res) => {
  try {
    const result = await adminVerifyService(req.headers["jwt-token"])

    console.log("Controller verified =", result);
    return res.status(200).json({
      success: true,
      user: {
        id: result.id,
        name: result.name,
        type: result.type,
      }
    });
  } catch (error) {
    res.status(400)
  }
}
// ==================================================

exports.adminPageController = async (req, res) => {
  try {
    const result = await adminPageService(req.params)
    res.status(200).json(result)
  } catch (error) {
    return res.status(400).json(error)
  }
}