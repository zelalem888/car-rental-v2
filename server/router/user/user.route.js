const express = require("express");
const z = require("zod");
const { allUsersController, usersInfoController, UsersDetailController, usersInfoUpdateController, usersInfoDeleteController,usersInfoAdminController,userUpdatePasswordController } = require("../../controller/user/user.controller");
const { verifyToken } = require("../../middleware/auth");

const router = express.Router();


// =========================all users api==============================
router.get("/user/all", allUsersController)
// ========================user get info api==========================

router.get("/user/:id", verifyToken, usersInfoController );

// ====================== user Information with reservation logHistory===================

router.get("/user/detail/:id" , UsersDetailController)

// ========================user get full info for admin api==========================

router.get("/user/admin/:id", usersInfoAdminController );

// ======================user update account info api===========================

router.put("/user/update/:id", usersInfoUpdateController);

// =====================user update password api============================

router.put("/user/updatepassword/:id", userUpdatePasswordController)

// ================user delete account api =============================

router.delete("/user/delete/:id",usersInfoDeleteController);

module.exports = router;