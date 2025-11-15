const express = require("express");
const {userAuthController, userRegisterController,userVerifyController} = require("../../controller/user/user.auth.controller")
const router = express.Router();


// ================user login api===========================

router.post("/user/login", userAuthController );

// ===================user verify api=======================

router.post("/user/verify", userVerifyController)

// ====================user register api====================

router.post("/user/register",userRegisterController);


module.exports = router;
