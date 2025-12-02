const express = require("express");
const {
  getSingleAdmin,
  getAllAdminsController,
  superAdminCreateController,
  superAdminUpdateController,
  superAdminDeleteController,
} = require("../../controller/admin/superAdmin.controller");

const router = express.Router();

// ==================get all admins api=====================

router.get("/superadmin/admins", getAllAdminsController);

// ===================== Get single admin api =====================

router.get("/superadmin/admin/:id", getSingleAdmin)

// ============register admins api===================

router.post("/superadmin/register", superAdminCreateController);

// ==================update admin info api=====================

router.put("/superadmin/update-admin/:id", superAdminUpdateController);

// ================admin delete api =============================

router.delete("/superadmin/delete/:id", superAdminDeleteController);

module.exports = router;
