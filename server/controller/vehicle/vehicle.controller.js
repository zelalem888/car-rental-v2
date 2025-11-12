const { allVehicleInfoService, vehicleSearchService,oneVehicleSearchService } = require("../../service/vehicle/vehicle.service")

exports.allVehicleInfoController = async(req, res) =>{
    try{
        const result = await allVehicleInfoService()
        res.status(200).json(result)
    }catch(error){
        res.status(400).json({message : error})
    }
}
// ===================================================

exports.vehicleSearchController =  async(req,res)=>{
    try{
        const result = await vehicleSearchService({paramsName:req.params.name})
        res.status(200).send(result)
    }catch(error){
        res.status(400).json({message : error})
    }   
}
// ===========================================================

exports.oneVehicleInfoController = async (req, res)=>{
    try{

        const result = await oneVehicleSearchService({paramsName:req.params.name, paramsId:req.params.id})
        res.status(200).json(result)

    }catch(error){
        res.status(400).json({message : error})
    }

}