const db = require("../../db/config");
const z = require("zod");
const fs = require('fs')

exports.adminAllVehiclesService = async () => {
  const [allVehicles] = await db.query("SELECT * FROM vehicle");
  return allVehicles;
};

// ====================================================
const vehicleSchema = z.object({
  A_ID : z.number() ,
  vehicleName: z.string(),
  plateNumber: z.string().refine(
    (p) => p.startsWith("ET") || p.startsWith("et"),
    "Plate must start with ET or et"
  ),
  brandName: z.string(),
  pricePerDay: z.number(),
  modelYear: z.number(),
  seatCapacity: z.number(),
  fuelType: z.string(),
}); 

exports.adminVehicleRegisterService = async (body, files) => {
     if (!files || files.length === 0) {
    throw new Error("At least one image is required");
  }

  const imagePaths = files.map(file => "/uploads/" + file.filename);
   console.log(imagePaths)
  const vehicleBody = {
    ...body,
    A_ID : parseInt(body.A_ID),
    pricePerDay: parseFloat(body.pricePerDay),
    modelYear: parseFloat(body.modelYear),
    seatCapacity: parseFloat(body.seatCapacity),
  };
  const vehicleData = vehicleSchema.parse(vehicleBody);
  const date = new Date().toLocaleString();
  const VehicleResult = [
    vehicleData.A_ID,
    vehicleData.vehicleName,
    vehicleData.plateNumber,
    vehicleData.brandName,
    vehicleData.pricePerDay,
    vehicleData.modelYear,
    vehicleData.seatCapacity,
    vehicleData.fuelType,
    JSON.stringify(imagePaths),
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
    "INSERT INTO vehicle (A_ID, V_Name,Plate_Number,Brand_Name,Price_Per_Day,Model_Year, Seating_Capacity, Fuel_Type, Images ,Updation_Date) VALUES (?,?,?,?,?,?,?,?,?,?)",
    VehicleResult
  );
};

// =====================================================

exports.adminVehicleUpdateService = async ({ paramID, updatingData, files }) => {
  const data = new Date().toLocaleString();
   if (!files || files.length === 0) {
   console.log("there is no image.")
  }
   const imagePaths = files.map(file => "/uploads/" + file.filename);
  //  console.log(imagePaths)

   const [findID] = await db.query(
     "SELECT * FROM vehicle WHERE V_ID = ?",
     paramID
    );
    
    if (findID.length === 0) {
      throw new Error("there is no vehicle in this ID to update.");
    }
    const existing = JSON.parse(findID[0].Images)

    const updatedImage = [...existing,...imagePaths]

  const result = [
    updatingData.vehicleName,
    updatingData.plateNumber,
    updatingData.brandName,
    updatingData.pricePerDay,
    updatingData.modelYear,
    updatingData.seatCapacity,
    updatingData.fuelType,
    JSON.stringify(updatedImage),
    data,
    paramID,
  ];
  
  await db.query(
    "UPDATE vehicle SET V_Name=? , Plate_Number=? , Brand_Name=? , Price_Per_Day=? , Model_Year=? , Seating_Capacity=? , Fuel_Type=?, Images=?, Updation_Date=? WHERE V_ID = ?",
    result
  );
};


// ==============================================================

exports.adminDeleteImageService = async ({paramID , updatingData})=>{
  
  const [findID] = await  db.query("SELECT Images FROM vehicle WHERE V_ID = ?", paramID)
  const images = JSON.parse(findID[0].Images)
  const filteredImages = images.filter((img)=> !img.includes(updatingData.image))
  console.log(findID)

  await db.query("UPDATE vehicle SET Images = ? WHERE V_ID = ?" , [JSON.stringify(filteredImages) , paramID])
  
  const [result] = await  db.query("SELECT Images FROM vehicle WHERE V_ID = ?", paramID)
  console.log(result)
    const filePath = path.join(__dirname, "../../uploads", updatingData.image);
  fs.unlink(filePath, () => {});


}
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
