const db = require("../../db/config");
const z = require("zod");
const jwt = require("jsonwebtoken");

exports.userAuthService = async (loginData) => {
  const values = [loginData.email, loginData.password];
  const [rows] = await db.query(
    "SELECT C_ID, FullName, Email FROM customer WHERE Email = ? AND Password = ?",
    values
  );
  // console.log(rows)
  const JWTSecretKey = process.env.JWT_SECRET;
  // console.log(JWTSecretKey)
  
  const email = rows[0].email;
  const id = rows[0].C_ID;
  const name = rows[0].FullName;

  const jwtData = {
    signInTime: Date.now(),
    email,
    id,
    name,
  };

  const token = jwt.sign(jwtData, JWTSecretKey);
  const response = { rows, token };
  return response;
};

// ============================================================

exports.userVerifyService = async (tokenKey) => {
  const tokenHeaderKey = "jwt-token";
  const jwtSecretKey = process.env.JWT_SECRET;
  const token = tokenKey;
  try {
    const verified = jwt.verify(token, jwtSecretKey);
    if (verified) {
      console.log(verified);
      return verified;
    } else {
      throw new Error("Token is Not verified.");
    }
  } catch (error) {
    throw new Error(error);
  }
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
  // address: z.string().min(5),
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
    // validateRegister.address,
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
    "INSERT INTO customer (FullName , Email, Password, PhoneNumber, DoB,Nationality, City,Update_Date) VALUES (?,?,?,?,?,?,?,?)",
    result
  );

  const [getIdForToken] = await db.query(
    "SELECT C_ID,FullName,Email FROM customer WHERE Email = ?",
    validateRegister.email
  );

  console.log(getIdForToken);
  const JWTSecretKey = process.env.JWT_SECRET;
  const email = getIdForToken[0].email;
  const id = getIdForToken[0].C_ID;
  const name = getIdForToken[0].FullName;

  const jwtData = {
    signInTime: Date.now(),
    email,
    id,
    name,
  };

  const token = jwt.sign(jwtData, JWTSecretKey);

  return token;
};
