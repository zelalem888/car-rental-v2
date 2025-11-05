const express = require('express');
const db = require("../../db/config");

const router = express.Router()

// ==============all vehicles info API==================

router.get("/vehicles", async(req, res) =>{
    try{
        const [allVehicles] = await db.query("SELECT * FROM vehicle")
        res.send(allVehicles)
    }catch(error){
        res.send({message : error})
    }
})

// ===========searched vehicles info with a limit of 5 API===============

router.get("/vehicles/:name", async(req,res)=>{
    const paramsName = req.params.name
    try{
        const [searchedVehicle] = await db.query("SELECT * FROM vehicle WHERE V_Name = ? LIMIT 5" , paramsName)
       
        if(searchedVehicle.length < 1 ){
           return res.send({message : "there is no vehicle by this name: " + paramsName})
        }
        res.send(searchedVehicle)

    }catch(error){
        res.send({message : error})
    }
    
})

// ============searched vehicle info by V_ID and V_Name API======================
 
router.get('/vehicle/:name/:id',async (req, res)=>{
    const paramsName = req.params.name
    const paramsId = req.params.id
    const result = [paramsId , paramsName]
    try{
        const [searchedVehicle] = await db.query("SELECT * FROM vehicle WHERE V_ID = ? AND V_Name =?" , result)
       
        if(searchedVehicle.length < 1 ){
           return res.send({message : "there is no vehicle by this ID: " + paramsId})
        }
        res.send(searchedVehicle)

    }catch(error){
        res.send({message : error})
    }

})



module.exports = router