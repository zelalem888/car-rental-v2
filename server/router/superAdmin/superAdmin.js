const express = require("express");
const db = require("../../db/config");
const z = require("zod");

const router = express.Router();

// ============register admins/employees api===================

const adminSchema = z.object({
  type: z.string(),
  fullName: z.string().min(3).max(50),
  userName: z.string().trim(),
  password: z.string(),
  phoneNumber: z.number(),
  address: z.string(),
  status: z.string(),
});

router.post("/admin/register", async (req, res) => {
  const adminBody = req.body;
  const adminData = adminSchema.parse(adminBody);
  const date = new Date().toLocaleString();
  const adminResult = [
    adminData.type,
    adminData.fullName,
    adminData.userName,
    adminData.password,
    adminData.phoneNumber,
    adminData.address,
    adminData.status,
    date,
  ];

  try {
    const [check] = await db.query(
      "SELECT * FROM admin WHERE Username = ?",
      adminData.userName
    );
    if (check.length < 0) {
      return res.send({ message: "this username is already exist." });
    }
    try {
      await db.query(
        "INSERT INTO admin (type,FullName,Username ,Password, PhoneNumber, Address,Status,Updation_Date) VALUES (?,?,?,?,?,?,?,?)",
        adminResult
      );
      res.send({ message: "admin add successfully." });
    } catch (error) {
      res.send({ message: error });
    }
  } catch (error) {
    res.send({ message: error });
  }
});


// ==================update vehicle info api=====================

router.put("/admin/update/:id", async (req, res) => {
  const paramID = req.params.id;
  const updatingData = req.body;
  const data = new Date().toLocaleString();

  const result = [
    updatingData.fullName,
    updatingData.userName,
    updatingData.password,
    updatingData.phoneNumber,
    updatingData.address,
    updatingData.status,
    data,
    paramID,
  ];

  try {
    const [findID] = await db.query(
      "SELECT * FROM admin WHERE A_ID = ?",
      paramID
    );
    if (findID.length === 0) {
      return res.send({ message: "there is no admin in this ID to update.",
        ID:paramID
       });
    }

    try {
      await db.query(
        "UPDATE admin SET FullName=? , Username=? , Password=? , PhoneNumber=? , Address=? , Status=?, Updation_Date=? WHERE A_ID = ?",
        result
      );
      res.send({ message: "Update admin Success." });
    } catch (error) {
      res.send({ message: error });
    }
  } catch (error) {
    res.send({ message: error });
  }
});



// ================vehicle delete api =============================

router.delete("/admin/delete/:id", async (req, res) => {
  const paramID = req.params.id;

  try {
    const [findID] = await db.query(
      "SELECT * FROM admin WHERE A_ID = ?",
      paramID
    );
    if (findID.length === 0) {
      return res.send({ message: "there is no admin in this ID to Delete.",
        ID : paramID
       });
    }

    try {
      await db.query("DELETE FROM admin WHERE A_ID = ?" , paramID);
      res.send({ message: "admin Deleted successfully.",
        ID: paramID
       });
    } catch (error) {
      res.send({ message: error });
    }
  } catch (error) {
    res.send({ message: error });
  }
});


module.exports = router;
