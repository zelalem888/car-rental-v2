const express = require("express");
const {adminLoginController,adminPageController} = require('../../controller/admin/auth.admin.controller')

const router = express.Router();

// ==================user login api===========================

router.post("/admin/login", adminLoginController);

router.get("/admin/:id", adminPageController)

module.exports = router;
