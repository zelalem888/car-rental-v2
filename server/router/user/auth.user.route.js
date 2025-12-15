const express = require("express");
const { userAuthController, userRegisterController, userVerifyController, tokenExistController, forgotPasswordController, resetPasswordController } = require("../../controller/user/user.auth.controller")
const router = express.Router();


// ================user login api===========================

router.post("/user/login", userAuthController);

// ===================user verify api=======================

router.post("/user/verify", userVerifyController)

// ====================user register api====================

router.post("/user/register", userRegisterController);

// ====================user Forgot Password api====================

router.post("/auth/forgot-password", forgotPasswordController);

// ====================user Token Exist api====================

router.post("/auth/token-exist", tokenExistController);

// ====================user Reset Password api====================

router.post("/auth/reset-password", resetPasswordController);

module.exports = router;
