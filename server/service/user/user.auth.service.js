const db = require("../../db/config");
const z = require("zod");

exports.userAuthService = async (loginData) => {
  const values = [loginData.email, loginData.password];
  const [rows] = await db.query(
    "SELECT C_ID, Email, Password FROM customer WHERE Email = ? AND Password = ?",
    values
  );
  return rows;
};

// ============================================================
const userSchema = z.object({
  fullName: z.string().min(3).max(100),
  email: z.string().email(),
  password: z.string().min(8),
  phoneNumber: z
    .string()
    .regex(/^\+?\d{10,15}$/, "Invalid phone number format"),
  // Important: Use coerce.date() to convert the input string to a Date object
  dateOfBirth: z.string().pipe(z.coerce.date()),
  nationality: z.string().min(2),
  address: z.string().min(5),
  city: z.string().min(2),
});

exports.userRegisterService = async (body) => {
  const registerData = body;
  const validateRegister = userSchema.parse(registerData);
  const date = new Date().toLocaleString();
  const result = [
    validateRegister.fullName,
    validateRegister.email,
    validateRegister.password,
    validateRegister.phoneNumber,
    validateRegister.dateOfBirth,
    validateRegister.nationality,
    validateRegister.address,
    validateRegister.city,
    date,
  ];

  const [checkData] = await db.query(
    "SELECT Email FROM customer WHERE Email = ?",
    validateRegister.email
  );

  if (checkData.length > 0) {
    throw new Error(
      `there is an email already created: ${validateRegister.email}`
    );
  }

  const [data] = await db.query(
    "INSERT INTO customer (FullName , Email, Password, PhoneNumber, DoB,Nationality, Address, City,Update_Date) VALUES (?,?,?,?,?,?,?,?,?)",
    result
  );

  return validateRegister.fullName
};
