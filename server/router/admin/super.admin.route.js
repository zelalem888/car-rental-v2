const express = require("express");
const {
  superAdminCreateController,
  superAdminUpdateController,
  superAdminDeleteController,
} = require("../../controller/admin/superAdmin.controller");

const router = express.Router();

// ============register admins/employees api===================

router.post("/admin/register", superAdminCreateController);

// ==================update admin info api=====================

router.put("/admin/update/:id", superAdminUpdateController);

// ================admin delete api =============================

router.delete("/admin/delete/:id", superAdminDeleteController);

module.exports = router;
