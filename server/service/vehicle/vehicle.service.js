const db = require("../../db/config");

exports.allVehicleInfoService = async () => {
  const [allVehicles] = await db.query("SELECT * FROM vehicle");
  return allVehicles;
};
// =======================================

exports.vehicleSearchService = async ({ paramsName }) => {
  const [searchedVehicle] = await db.query(
    "SELECT * FROM vehicle WHERE V_Name = ? LIMIT 5",
    paramsName
  );

  if (searchedVehicle.length < 1) {
    throw new Error(`there is no vehicle by this name: ${paramsName}`);
  }
  return searchedVehicle
};
// =============================================
exports.oneVehicleSearchService = async({paramsId , paramsName})=>{
    const values = [paramsId , paramsName]
     const [searchedVehicle] = await db.query("SELECT * FROM vehicle WHERE V_ID = ? AND V_Name =?" , values)
       
        if(searchedVehicle.length < 1 ){
            throw new Error ( `there is no vehicle by this ID: ${paramsId}`)
        }

        return searchedVehicle
}
// =============================================
exports.vehicleByIdService = async ({ paramsId }) => {

  const [searchedVehicle] = await db.query(
    "SELECT V_ID,V_Name,Plate_Number,Brand_Name,Price_Per_Day,Model_Year,Seating_Capacity,Fuel_Type,Images FROM vehicle WHERE V_ID = ? ",
    paramsId
  );

  if (searchedVehicle.length === 0) {
    throw new Error(`there is no vehicle by this ID: ${paramsId}`);
  }

  const [check] = await db.query(`SELECT Status, Pickup_Date FROM reservation WHERE V_ID = ? ORDER BY Posting_Date DESC LIMIT 1 `,
  [paramsId]
);

  if(check.length === 0){
    return searchedVehicle
  }else if(check[0].Status =="onHold"){
    searchedVehicle[0].status = "onHold"
    searchedVehicle[0].Pickup_Date = check[0].Pickup_Date
  }
  return searchedVehicle
};

// =============================================

exports.activeDriverService = async () => {
  const [activeDriver] = await db.query(
    "SELECT * FROM driver WHERE status = ? ",
    ["active"]
  );

  if (activeDriver.length < 1) {
    throw new Error(`there is no driver available`);
  }
  return activeDriver
};
