const db = require("../../db/config");
const z = require("zod");
const bcrypt = require('bcrypt')

const adminSchema = z.object({
  type: z.string(),
  fullName: z.string().min(3).max(50),
  userName: z.string().trim(),
  password: z.string(),
  phoneNumber: z
    .string()
    .regex(/^\+?\d{10,15}$/, "Invalid phone number format"),
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
// =====================================================================

exports.getSingleDriverService = async ({ paramID }) => {

  const [rows] = await db.query(
    "SELECT * FROM driver WHERE D_ID = ?",
    [paramID]
  );
  // console.log("Rows fetched for Driver ID", paramID, ":", rows);
  return rows[0];
}

// =====================================================================
exports.getAllAdminsService = async () => {
  const [rows] = await db.query(
    "SELECT A_ID, FullName, Username, PhoneNumber, Address, Status, type, Updation_Date FROM admin WHERE type != 'superadmin'"
  );

  return rows;
};


// ======================================================================

exports.getAllDriversService = async () => {
  const [rows] = await db.query(
    "SELECT * FROM driver"
  );
  return rows;
};
// ======================================================================


exports.superAdminCreateService = async ({ adminBody }) => {
  const adminData = adminSchema.parse(adminBody);
  const saltRounds = 10;
  let hashedPass = await bcrypt.hash(adminData.password, saltRounds);
  const date = new Date().toLocaleString();
  const adminResult = [
    adminData.type,
    adminData.fullName,
    adminData.userName,
    hashedPass,
    adminData.phoneNumber,
    adminData.address,
    adminData.status,

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
    "INSERT INTO admin (type, FullName, Username, Password, PhoneNumber, Address, Status) VALUES (?,?,?,?,?,?,?)",
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

// =====================================================
exports.superAdminUpdateDriverService = async ({ paramID, updatingData }) => {
  const data = new Date().toLocaleString();

  const result = [
    updatingData.fullName,
    updatingData.phoneNumber,
    updatingData.license_number,
    updatingData.experience_years,
    updatingData.status,
    data,
    paramID,
  ];

  const [findID] = await db.query(
    "SELECT * FROM driver WHERE D_ID = ?",
    paramID
  );
  if (findID.length === 0) {
    throw new Error("there is no Driver in this ID to update.")
  }


  await db.query(
    "UPDATE driver SET full_name=? , phone=? , license_number=? , experience_years=? , status=?, Updation_Date=? WHERE D_ID = ?",
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

// ====================================================

exports.superAdminDeleteDriverService = async ({ paramID }) => {
  const [rows] = await db.query(
    "SELECT * FROM driver WHERE D_ID = ?",
    [paramID]
  );

  if (rows.length === 0) {
    throw new Error("driver not found.");
  }

  await db.query("DELETE FROM driver WHERE D_ID = ?", [paramID]);
  return
};

// =================================================

exports.addDriverService = async (body) => {

  const driverInfo = [body.fullName, body.phoneNumber, body.license_number, body.experience_years, body.status]

  const [rows] = await db.query(
    "INSERT INTO driver (full_name, phone, license_number, experience_years, status  ) VALUES (?,?,?,?,?)",
    driverInfo
  );

};

// ==================================================

exports.AdminActivityService = async () => {
  try {
    const query = `
      SELECT
        admin.A_ID AS adminId,
        admin.FullName AS adminName,
        COUNT(log.Log_ID) AS totalActions,
        SUM(CASE WHEN log.Action_Type = 'created' THEN 1 ELSE 0 END) AS createdCount,
        SUM(CASE WHEN log.Action_Type = 'updated' THEN 1 ELSE 0 END) AS updatedCount,
        SUM(CASE WHEN log.Action_Type = 'confirmed' THEN 1 ELSE 0 END) AS confirmedCount,
        SUM(CASE WHEN log.Action_Type = 'cancelled' THEN 1 ELSE 0 END) AS cancelledCount,
        SUM(CASE WHEN log.Action_Type = 'rejected' THEN 1 ELSE 0 END) AS rejectedCount,
        SUM(CASE WHEN log.Action_Type = 'done' THEN 1 ELSE 0 END) AS doneCount,
        SUM(CASE WHEN log.Action_Type = 'overdue' THEN 1 ELSE 0 END) AS overdueCount,
        SUM(CASE WHEN log.Action_Type = 'deleted' THEN 1 ELSE 0 END) AS deletedCount
      FROM reservation_logs AS log
      INNER JOIN admin AS admin
        ON admin.A_ID = log.Admin_ID
      WHERE log.Admin_ID IS NOT NULL
      GROUP BY admin.A_ID
      ORDER BY totalActions DESC
    `;
    const [rows] = await db.query(query);
    return rows;
  } catch (err) {
    console.error("AdminActivityService Error:", err);
    throw err;
  }
};

// ==================================================
exports.ReservationSummaryService = async () => {

  const reservationQuery = `
    SELECT 
        COUNT(*) AS total_reservations,
        SUM(Status = 'pending') AS pending,
        SUM(Status = 'confirmed') AS approved
    FROM reservation;
  `;
  const [reservationRows] = await db.query(reservationQuery);
  const reservationData = reservationRows[0];


  const rejectedQuery = `
    SELECT COUNT(*) AS rejected
    FROM reservation_logs
    WHERE Action_Type = 'rejected';
  `;
  const [rejectedRows] = await db.query(rejectedQuery);
  const rejectedData = rejectedRows[0];


  const total = reservationData.total_reservations + rejectedData.rejected;

  return {
    total,
    pending: reservationData.pending,
    approved: reservationData.approved,
    rejected: rejectedData.rejected
  };
};

// ==================================================

exports.VehicleDemandService = async (req, res) => {
  const query = `
     SELECT 
    vehicle.V_ID AS vehicleId,
    vehicle.V_Name AS vehicleName,
    COUNT(rent.Rent_ID) AS totalReservations
FROM rent AS rent
JOIN vehicle AS vehicle ON vehicle.V_ID = rent.V_ID
GROUP BY vehicle.V_ID, vehicle.V_Name
ORDER BY totalReservations DESC;
  `;
  const [rows] = await db.query(query);
  return rows;
}

// ==================================================

exports.MonthlyReservationTrendService = async () => {
  const query = `
    SELECT 
      MONTH(Pickup_Date) AS month_number,
      COUNT(*) AS reservations_count
    FROM rent
    GROUP BY MONTH(Pickup_Date)
    ORDER BY MONTH(Pickup_Date);
  `;

  const [rows] = await db.query(query);

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const formattedData = rows.map(row => ({
    month: monthNames[row.month_number - 1],
    reservations: row.reservations_count
  }));

  return formattedData;
};

// ==================================================

exports.IncomeSummaryService = async () => {
  const query = `
    SELECT 
      IFNULL(SUM(Total_paid), 0) AS totalIncome
    FROM rent
  `;
  const [rows] = await db.query(query);
  return rows[0];
};

// ==================================================

exports.MonthlyIncomeTrendService = async () => {
  const query = `
    SELECT 
      MONTH(Update_Date) AS monthNumber,
      DATE_FORMAT(Update_Date, '%b') AS monthName,
      SUM(Total_paid) AS monthlyIncome
    FROM rent
    GROUP BY MONTH(Update_Date), DATE_FORMAT(Update_Date, '%b')
    ORDER BY MONTH(Update_Date);
  `;
  const [rows] = await db.query(query);
  return rows;
};

// ==================================================

exports.UserAnalysisService = async () => {
  // 1. Total users
  const [[total]] = await db.query(`
    SELECT COUNT(*) AS totalUsers
    FROM customer
  `);

  // 2. This month users
  const [[thisMonth]] = await db.query(`
    SELECT COUNT(*) AS newUsersThisMonth
    FROM customer
    WHERE YEAR(Register_Date) = YEAR(CURRENT_DATE())
      AND MONTH(Register_Date) = MONTH(CURRENT_DATE())
  `);

  // 3. Last month users
  const [[lastMonth]] = await db.query(`
    SELECT COUNT(*) AS newUsersLastMonth
    FROM customer
    WHERE YEAR(Register_Date) = YEAR(CURRENT_DATE() - INTERVAL 1 MONTH)
      AND MONTH(Register_Date) = MONTH(CURRENT_DATE() - INTERVAL 1 MONTH)
  `);

  // 4. Monthly trend
  const [monthlyTrend] = await db.query(`
    SELECT
      DATE_FORMAT(Register_Date, '%Y-%m') AS month,
      COUNT(*) AS users
    FROM customer
    GROUP BY month
    ORDER BY month
  `);

  // 5. Growth %
  const growth =
    lastMonth.newUsersLastMonth === 0
      ? 100
      : (
        ((thisMonth.newUsersThisMonth - lastMonth.newUsersLastMonth) /
          lastMonth.newUsersLastMonth) *
        100
      ).toFixed(1);

  return {
    totalUsers: total.totalUsers,
    newUsersThisMonth: thisMonth.newUsersThisMonth,
    newUsersLastMonth: lastMonth.newUsersLastMonth,
    growthPercentage: Number(growth),
    monthlyTrend
  };
};

