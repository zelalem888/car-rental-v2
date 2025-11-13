const db = require("../../db/config");
const z = require("zod");

exports.adminAllVehiclesService = async () => {
  const [allVehicles] = await db.query("SELECT * FROM vehicle");
  return allVehicles;
};

// ====================================================
const vehicleSchema = z.object({
  vehicleName: z.string(),
  plateNumber: z.string().startsWith("ET", "et"),
  brandName: z.string(),
  pricePerDay: z.number(),
  modelYear: z.number(),
  seatCapacity: z.number(),
  fuelType: z.string(),
});

exports.adminVehicleRegisterService = async (body) => {
  const vehicleBody = {
    ...body,
    pricePerDay: parseFloat(body.pricePerDay),
    modelYear: parseFloat(body.modelYear),
    seatCapacity: parseFloat(body.seatCapacity),
  };
  const vehicleData = vehicleSchema.parse(vehicleBody);
  const date = new Date().toLocaleString();
  const VehicleResult = [
    vehicleData.vehicleName,
    vehicleData.plateNumber,
    vehicleData.brandName,
    vehicleData.pricePerDay,
    vehicleData.modelYear,
    vehicleData.seatCapacity,
    vehicleData.fuelType,
    date,
  ];

  const [check] = await db.query(
    "SELECT * FROM vehicle WHERE Plate_Number = ?",
    vehicleData.plateNumber
  );
  if (check.length > 0) {
    throw new Error("this car Plate Number is already exist.");
  }

  await db.query(
    "INSERT INTO vehicle (V_Name,Plate_Number,Brand_Name,Price_Per_Day,Model_Year, Seating_Capacity, Fuel_Type,Updation_Date) VALUES (?,?,?,?,?,?,?,?)",
    VehicleResult
  );
};

// =====================================================

exports.adminVehicleUpdateService = async ({ paramID, updatingData }) => {
  const data = new Date().toLocaleString();

  const result = [
    updatingData.vehicleName,
    updatingData.plateNumber,
    updatingData.brandName,
    updatingData.pricePerDay,
    updatingData.modelYear,
    updatingData.seatCapacity,
    updatingData.fuelType,
    data,
    paramID,
  ];
  console.log(result);
  const [findID] = await db.query(
    "SELECT * FROM vehicle WHERE V_ID = ?",
    paramID
  );
  if (findID.length === 0) {
    throw new Error("there is no vehicle in this ID to update.");
  }

  await db.query(
    "UPDATE vehicle SET V_Name=? , Plate_Number=? , Brand_Name=? , Price_Per_Day=? , Model_Year=? , Seating_Capacity=? , Fuel_Type=?, Updation_Date=? WHERE V_ID = ?",
    result
  );
};
// ===============================================================

exports.adminVehicleDeleteService = async (id) => {
  const paramID = id;
  const [findID] = await db.query(
    "SELECT * FROM vehicle WHERE V_ID = ?",
    paramID
  );
  if (findID.length === 0) {
    throw new Error("there is no vehicle in this ID to Delete.");
  }

  await db.query("DELETE FROM vehicle WHERE V_ID = ?", paramID);
};
