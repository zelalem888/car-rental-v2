const express = require("express");
const {userAuthController, userRegisterController} = require("../../controller/user/user.auth.controller")
const router = express.Router();


// ================user login api===========================

router.post("/user/login", userAuthController );

// ====================user register api====================

router.post("/user/register",userRegisterController);


module.exports = router;
