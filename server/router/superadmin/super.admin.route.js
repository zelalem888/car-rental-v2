const express = require("express");
const {
  getSingleAdmin,
  getAllAdminsController,
  superAdminCreateController,
  superAdminUpdateController,
  superAdminDeleteController,
  addDriverController,
  getAllDriversController,
  superAdminDeleteDriverController,
  getSingleDriverController,
  superAdminUpdateDriverController
} = require("../../controller/admin/superAdmin.controller");

const router = express.Router();

// ==================get all admins api=====================

router.get("/superadmin/admins", getAllAdminsController);

// ==================get all admins api=====================

router.get("/superadmin/drivers", getAllDriversController);

// ===================== Get single admin api =====================

router.get("/superadmin/admin/:id", getSingleAdmin)

// ===================== Get single driver api =====================

router.get("/superadmin/driver/:id", getSingleDriverController)

// ============register admins api===================

router.post("/superadmin/register", superAdminCreateController);

// ==================update admin info api=====================

router.put("/superadmin/update-admin/:id", superAdminUpdateController);

// ==================update Driver info api=====================

router.put("/superadmin/update-driver/:id", superAdminUpdateDriverController);

// ================admin delete api =============================

router.delete("/superadmin/delete/:id", superAdminDeleteController);

// ================admin delete api =============================

router.delete("/superadmin/delete/driver/:id", superAdminDeleteDriverController);

// ===============add driver api=====================

router.post('/superadmin/driveradd', addDriverController)

module.exports = router;
