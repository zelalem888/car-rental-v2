const express = require("express");
const db = require("../db/config");
const z = require("zod");

const router = express.Router();

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

router.post("/admin/register", async (req, res) => {
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

// ==========================================================================

router.get()


module.exports = router;
