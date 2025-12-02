const db = require("../../db/config");
const z = require("zod");

const adminSchema = z.object({
  type: z.string(),
  fullName: z.string().min(3).max(50),
  userName: z.string().trim(),
  password: z.string(),
  phoneNumber: z.number(),
  address: z.string(),
  status: z.string(),
  registrationDate: z.string(),
});

exports.getSingleAdminService = async ({ paramID }) => {
  console.log("Fetching admin with ID =", paramID);
  const [rows] = await db.query(
    "SELECT A_ID, FullName, Username, PhoneNumber, Address, Status, type, Updation_Date FROM admin WHERE A_ID = ?",
    [paramID]
  );
  console.log("Rows fetched for admin ID", paramID, ":", rows);
  return rows[0];
}

exports.getAllAdminsService = async () => {
  const [rows] = await db.query(
    "SELECT A_ID, FullName, Username, PhoneNumber, Address, Status, type, Updation_Date FROM admin WHERE type != 'superadmin'"
  );

  return rows;
};


exports.superAdminCreateService = async ({ adminBody }) => {
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

  // Check if username already exists
  const [check] = await db.query(
    "SELECT * FROM admin WHERE Username = ?",
    [adminData.userName]
  );

  if (check.length > 0) {
    throw new Error("This username already exists.");
  }

  // Insert into database
  await db.query(
    "INSERT INTO admin (type, FullName, Username, Password, PhoneNumber, Address, Status, Updation_Date) VALUES (?,?,?,?,?,?,?,?)",
    adminResult
  );

  return { message: "Admin registered successfully." };
};

// =============================================

exports.superAdminUpdateService = async ({ paramID, updatingData }) => {
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

  const [findID] = await db.query(
    "SELECT * FROM admin WHERE A_ID = ?",
    paramID
  );
  if (findID.length === 0) {
    throw new Error("there is no admin in this ID to update.")
  }


  await db.query(
    "UPDATE admin SET FullName=? , Username=? , Password=? , PhoneNumber=? , Address=? , Status=?, Updation_Date=? WHERE A_ID = ?",
    result
  );
};

// =============================================
exports.superAdminDeleteService = async ({ paramID }) => {
  const [rows] = await db.query(
    "SELECT * FROM admin WHERE A_ID = ?",
    [paramID]
  );

  if (rows.length === 0) {
    throw new Error("Admin not found.");
  }

  await db.query("DELETE FROM admin WHERE A_ID = ?", [paramID]);
  return
};