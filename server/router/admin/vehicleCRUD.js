const express = require("express");
const db = require("../../db/config");
const z = require("zod");

const router = express.Router();

// ============get all vehicle info api==============

router.get("/admin/vehicles", async(req, res) =>{
    try{
        const [allVehicles] = await db.query("SELECT * FROM vehicle")
        res.send(allVehicles)
    }catch(error){
        res.send({message : error})
    }
})

// ============register vehicle api===================

const vehicleSchema = z.object({
  vehicleName: z.string(),
  plateNumber: z.string().startsWith("ET", "et"),
  brandName: z.string(),
  brandID: z.string().toUpperCase(),
  pricePerDay: z.number(),
  modelYear: z.number(),
  seatCapacity: z.number(),
  fuelType: z.string(),
});

router.post("/admin/registerVehicle", async (req, res) => {
  const vehicleBody = req.body;
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

  try {
    const [check] = await db.query(
      "SELECT * FROM vehicle WHERE Plate_Number = ?",
      vehicleData.plateNumber
    );
    if (check.length < 0) {
      return res.send({ message: "this car Plate Number is already exist." });
    }
    try {
      await db.query(
        "INSERT INTO vehicle (V_Name,Plate_Number,Brand_Name,Price_Per_Day,Model_Year, Seating_Capacity, Fuel_Type,Updation_Date) VALUES (?,?,?,?,?,?,?,?)",
        VehicleResult
      );
      res.send({ message: "vehicle add successfully." });
    } catch (error) {
      res.send({ message: error });
    }
  } catch (error) {
    res.send({ message: error });
  }
});

// ==================update vehicle info api=====================

router.put("/admin/vehicle/update/:id", async (req, res) => {
  const paramID = req.params.id;
  const updatingData = req.body;
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

  try {
    const [findID] = await db.query(
      "SELECT * FROM vehicle WHERE V_ID = ?",
      paramID
    );
    if (findID.length === 0) {
      return res.send({ message: "there is no vehicle in this ID to update.",
        ID:paramID
       });
    }

    try {
      await db.query(
        "UPDATE vehicle SET V_Name=? , Plate_Number=? , Brand_Name=? , Price_Per_Day=? , Model_Year=? , Seating_Capacity=? , Fuel_Type=?, Updation_Date=? WHERE V_ID = ?",
        result
      );
      res.send({ message: "Update vehicle Success." });
    } catch (error) {
      res.send({ message: error });
    }
  } catch (error) {
    res.send({ message: error });
  }
});



// ================vehicle delete api =============================

router.delete("/admin/vehicle/delete/:id", async (req, res) => {
  const paramID = req.params.id;

  try {
    const [findID] = await db.query(
      "SELECT * FROM vehicle WHERE V_ID = ?",
      paramID
    );
    if (findID.length === 0) {
      return res.send({ message: "there is no vehicle in this ID to Delete.",
        ID : paramID
       });
    }

    try {
      await db.query("DELETE FROM vehicle WHERE V_ID = ?" , paramID);
      res.send({ message: "Vehicle Deleted successfully.",
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