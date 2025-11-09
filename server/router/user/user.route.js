const express = require("express");
const z = require("zod");
const { usersInfoController, usersInfoUpdateController, usersInfoDeleteController } = require("../../controller/user/user.controller");

const router = express.Router();

// ========================user get full info api==========================

router.get("/user/:id", usersInfoController );

// ======================user update account info api===========================

router.put("/user/update/:id", usersInfoUpdateController);

// ================user delete account api =============================

router.delete("/user/delete/:id",usersInfoDeleteController);

module.exports = router;