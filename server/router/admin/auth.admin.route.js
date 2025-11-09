const express = require("express");
const {adminLoginController} = require('../../controller/admin/auth.admin.controller')

const router = express.Router();

// ==================user login api===========================

router.post("/admin/login", adminLoginController);

module.exports = router;
