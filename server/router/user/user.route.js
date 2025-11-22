const express = require("express");
const z = require("zod");
const { usersInfoController, usersInfoUpdateController, usersInfoDeleteController,usersInfoAdminController } = require("../../controller/user/user.controller");
const { verifyToken } = require("../../middleware/auth");

const router = express.Router();

// ========================user get full info api==========================

router.get("/user/:id", verifyToken, usersInfoController );

// ========================user get full info for admin api==========================

router.get("/user/admin/:id", usersInfoAdminController );

// ======================user update account info api===========================

router.put("/user/update/:id", usersInfoUpdateController);

// ================user delete account api =============================

router.delete("/user/delete/:id",usersInfoDeleteController);

module.exports = router;