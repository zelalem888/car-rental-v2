const { allVehicleInfoService, vehicleSearchService,oneVehicleSearchService } = require("../../service/vehicle/vehicle.service")

exports.allVehicleInfoController = async(req, res) =>{
    try{
        const result = await allVehicleInfoService()
        res.send(result)
    }catch(error){
        res.send({message : error})
    }
}
// ===================================================

exports.vehicleSearchController =  async(req,res)=>{
    try{
        const result = await vehicleSearchService({paramsName:req.params.name})
        res.send(result).status(200)
    }catch(error){
        res.send({message : error})
    }   
}
// ===========================================================

exports.oneVehicleInfoController = async (req, res)=>{
    try{

        const result = await oneVehicleSearchService({paramsName:req.params.name, paramsId:req.params.id})
        res.send(result)

    }catch(error){
        res.send({message : error})
    }

}