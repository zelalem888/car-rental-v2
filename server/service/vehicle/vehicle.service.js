const db = require("../../db/config");

exports.allVehicleInfoService = async () => {
  const [allVehicles] = await db.query("SELECT V_ID,V_Name,Plate_Number,Brand_Name,driver,Price_Per_Day,Model_Year,Seating_Capacity,Fuel_Type FROM vehicle");
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
