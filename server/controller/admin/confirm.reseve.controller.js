const express = require('express')
const { allReservationService,confirmReservationService,confirmedReservationService,pendingReservationService,doneReservationService } = require("../../service/admin/confirm.reseve.sevice")


exports.allReservationController= async(req, res) =>{
    try{
        const allReservation = await allReservationService()
        res.status(200).json(allReservation)
    }catch(error){
        res.status(400).json({message : error})
    }
}
// ===========================================================
exports.pendingReservationController= async(req, res) =>{
    try{
        const allReservation = await pendingReservationService()
        res.status(200).json(allReservation)
    }catch(error){
        res.status(400).json({message : error})
    }
}
// ============================================================
exports.confirmedReservationController= async(req, res) =>{
    try{
        const allReservation = await confirmedReservationService()
        res.status(200).json(allReservation)
    }catch(error){
        res.status(400).json({message : error})
    }
}


// ===========================================================

exports.confirmReservationController = async(req, res) => {

  try {
    const reservation = await confirmReservationService(req.params)

      res.status(200).json({ message: "rented Success."})
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  
}

// ============================================================
exports.doneReservationController =  async(req, res) => {

  try {
    const reservation = await doneReservationService(req.params)
      res.status(200).json(reservation)
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  
}